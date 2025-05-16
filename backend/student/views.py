from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Course, User
from .serializers import CourseSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def faculty_courses(self, request, pk=None):
        """Retrieve courses created by a specific faculty member"""
        try:
            faculty = User.objects.get(pk=pk, role='faculty')
            courses = Course.objects.filter(faculty=faculty)
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'Faculty not found'}, status=400)