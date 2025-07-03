from django.contrib.auth.models import AbstractUser
from django.db import models
from feature.models import Course, Certificate  # ✅ Use shared models

# 👤 Custom User with Role Field
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

# 🎓 Student Profile

from django.db.models import Max

from .models import CustomUser



class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    enrollment_number = models.CharField(max_length=100, unique=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    # 📚 Simple fields for dashboard-related info
    courses = models.TextField(blank=True, help_text="Comma-separated course names")
    grades = models.TextField(blank=True, help_text="Comma-separated course:grade pairs")
    certificates = models.TextField(blank=True, help_text="Comma-separated certificate names")

    # 💸 Split fees into two parts
    fee_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    fee_due = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    # 📅 Attendance percentage (0–100)
    attendance_percentage = models.FloatField(default=0.0)


    def save(self, *args, **kwargs):
        if not self.enrollment_number:
            last_enrollment = Student.objects.aggregate(max_id=Max('enrollment_number'))
            last_number = 1000
            if last_enrollment['max_id']:
                try:
                    last_number = int(last_enrollment['max_id'][3:])
                except:
                    pass
            self.enrollment_number = f"STU{last_number + 1}"
        super().save(*args, **kwargs)

        
# 👨‍🏫 Faculty Profile
class Faculty(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='faculty_profile')
    department = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

# 👩‍💼 Admin Profile
class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_profile')
    admin_code = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user.username

# 📅 Attendance Records
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ])

    def __str__(self):
        return f"{self.student.user.username} - {self.date} - {self.status}"

# 💸 Fee Details
class Fee(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    paid = models.PositiveIntegerField()
    due = models.PositiveIntegerField()

# 📊 Gradebook
class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_name = models.CharField(max_length=100)
    grade = models.CharField(max_length=2)

# 📚 Course Enrollment
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_on = models.DateField(auto_now_add=True)

# 🏆 Student-Certificate Linkage
class StudentCertificate(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE)
    awarded_on = models.DateField(auto_now_add=True)