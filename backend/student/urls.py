from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CourseViewSet  # Import all required view sets

# Initialize router
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)  # Register the CourseViewSet

urlpatterns = [
    path('api/', include(router.urls)),  # Includes auto-generated routes
    path('api/users/login/', UserViewSet.as_view({'post': 'login'})),  # Explicit login route
]