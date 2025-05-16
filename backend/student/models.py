from django.db import models

class User(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
    )

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    syllabus = models.TextField()

    # Faculty relationship (A faculty can create multiple courses)
    faculty = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_courses", limit_choices_to={'role': 'faculty'})

    def __str__(self):
        return f"{self.name} ({self.code})"