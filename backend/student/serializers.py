from rest_framework import serializers
from .models import User, Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'description', 'syllabus', 'faculty']

class UserSerializer(serializers.ModelSerializer):
    created_courses = CourseSerializer(many=True, read_only=True)  # Faculty-created courses

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'password', 'created_courses']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password in responses