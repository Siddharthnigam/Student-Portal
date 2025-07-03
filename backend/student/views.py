from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListAPIView

from .models import (
    CustomUser, Student, Faculty, Admin,
    Attendance, Fee, Grade, Enrollment, StudentCertificate
)
from feature.models import Certificate

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    StudentProfileSerializer,
    AttendanceSerializer,
    FeeSerializer,
    GradeSerializer,
    EnrollmentSerializer,
    CertificateSerializer,
)

from rest_framework.generics import RetrieveUpdateAPIView
from .models import Student
from .serializers import StudentProfileSerializer

class StudentUpdateView(RetrieveUpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    lookup_field = 'user__id'
    

# ✅ FIXED: Student listing view
class AllStudentsView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()  # ✅ Added this line
    serializer_class = StudentProfileSerializer


# 📝 Registration View
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# 👤 Authenticated Profile View
class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "user": UserSerializer(user).data
        }

        if user.role == "student":
            try:
                student_profile = Student.objects.get(user=user)
                data["student_profile"] = StudentProfileSerializer(student_profile).data
            except Student.DoesNotExist:
                data["student_profile"] = None

        return Response(data)


# 🎓 Student Dashboard View
class StudentDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = Student.objects.get(user=request.user)

            profile_data = StudentProfileSerializer(student).data
            attendance_data = AttendanceSerializer(Attendance.objects.filter(student=student), many=True).data
            grade_data = GradeSerializer(Grade.objects.filter(student=student), many=True).data
            course_data = EnrollmentSerializer(Enrollment.objects.filter(student=student), many=True).data
            certificate_ids = StudentCertificate.objects.filter(student=student).values_list('certificate_id', flat=True)
            certificate_data = CertificateSerializer(Certificate.objects.filter(id__in=certificate_ids), many=True).data

            try:
                fee_data = FeeSerializer(Fee.objects.get(student=student)).data
            except Fee.DoesNotExist:
                fee_data = {}

            return Response({
                "profile": profile_data,
                "attendance": attendance_data,
                "fees": fee_data,
                "grades": grade_data,
                "courses": course_data,
                "certificates": certificate_data,
            })

        except Student.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=404)