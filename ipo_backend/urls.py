from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ipo.views import RegisterView  # User registration view

# Simple homepage
def home(request):
    return HttpResponse("Welcome to IPO Application Backend")

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # Homepage
    path('', home),

    # Authentication endpoints (JWT + Register)
    path('api/auth/register/', RegisterView.as_view(), name='register'),       # User registration
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_login'), # Login - JWT token
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),# Refresh JWT token

    # IPO endpoints (CRUD)
    path('api/', include('ipo.urls')),  # Routes defined inside ipo/urls.py
]
