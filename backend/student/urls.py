from django.urls import path, include
from .views import RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter

def api_root(request):
    return HttpResponse("Users API root. Available endpoints: register/, login/, token/refresh/, profile/")

router = DefaultRouter()

urlpatterns = [
    path('', api_root, name='api_root'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('', include(router.urls)),
]
