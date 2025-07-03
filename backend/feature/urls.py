from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet , CertificateViewSet , WorkshopViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'workshops', WorkshopViewSet)


urlpatterns = [
    path('', include(router.urls)),
]