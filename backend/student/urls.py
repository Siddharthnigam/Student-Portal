from django.urls import path, include
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    RegisterView,
    ProfileView,
    StudentDashboardView,
    AllStudentsView,
    StudentUpdateView,  # 👈 make sure to import this
)

def api_root(request):
    return HttpResponse("Users API root. Available endpoints: register/, login/, token/refresh/, profile/, student/dashboard/")

router = DefaultRouter()

urlpatterns = [
    path('', api_root, name='api_root'),

    # 🧾 Auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 👤 Profile
    path('profile/', ProfileView.as_view(), name='profile'),

    # 🎓 Student API
    path('api/students/', AllStudentsView.as_view(), name='all-students'),
    path('api/students/<int:user__id>/', StudentUpdateView.as_view(), name='student-update'),
    path('student/dashboard/', StudentDashboardView.as_view(), name='student-dashboard'),

    path('', include(router.urls)),
]