from rest_framework import serializers
from .models import CustomUser, Student, Faculty, Admin
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

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
