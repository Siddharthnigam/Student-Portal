from .models import Course , Certificate , Workshop
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'duration', 'level', 'created_at']


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'title', 'description', 'image', 'duration', 'level']

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'image', 'date', 'location', 'available_seats']
