from django.contrib import admin
from .models import Course , Certificate , Workshop

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'duration', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'duration')
    search_fields = ('title', 'description')

@admin.register(Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'available_seats')
    search_fields = ('title', 'description')
