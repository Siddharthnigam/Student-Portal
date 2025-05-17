from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    # Add student-specific fields here
    # e.g. enrollment_number = models.CharField(max_length=50)

class Faculty(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='faculty_profile')
    # Add faculty-specific fields here
    # e.g. department = models.CharField(max_length=100)

class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_profile')
    # Add admin-specific fields here
    # e.g. admin_code = models.CharField(max_length=50)
