from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import (
    CustomUser, Student, Faculty, Admin,
    Attendance, Fee, Grade, Certificate,
    Course, Enrollment
)

# 👤 User Summary Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']


# 📝 User Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
        )
        role = validated_data['role']
        if role == 'student':
            Student.objects.create(user=user)
        elif role == 'faculty':
            Faculty.objects.create(user=user)
        elif role == 'admin':
            Admin.objects.create(user=user)
        return user


# 🎓 Student Profile Serializer


class StudentProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'username',
            'email',
            'enrollment_number',
            'phone',
            'address',
            'profile_image',
            'courses',
            'grades',
            'certificates',
            'fee_paid',
            'fee_due',
            'attendance_percentage',
        ]


# 🗓️ Attendance Serializer
class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['date', 'status']


# 💰 Fee Serializer
class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = ['total', 'paid', 'due']


# 📊 Grade Serializer
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['course_name', 'grade']


# 🏅 Certificate Serializer
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['title', 'description', 'image']


# 📚 Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'duration', 'level']


# 📌 Enrollment Serializer (Nested Course)
class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Enrollment
        fields = ['course', 'enrolled_on']


# 📊🎓 Student Dashboard Serializer (Nested View)
class StudentDashboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    grades = GradeSerializer(many=True, source='grade_set', read_only=True)
    attendance = AttendanceSerializer(many=True, source='attendance_set', read_only=True)
    fees = serializers.SerializerMethodField()
    enrollments = EnrollmentSerializer(many=True, source='enrollment_set', read_only=True)

    class Meta:
        model = Student
        fields = [
            'username',
            'email',
            'enrollment_number',
            'phone',
            'address',
            'profile_image',
            'grades',
            'attendance',
            'fees',
            'enrollments',
        ]

    def get_fees(self, obj):
        fee_qs = obj.fee_set.first()
        return FeeSerializer(fee_qs).data if fee_qs else None