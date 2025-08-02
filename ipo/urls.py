from django.urls import path
from .views import IPOListCreateView, IPODetailView

urlpatterns = [
    path('ipos/', IPOListCreateView.as_view(), name='ipo-list-create'),  # list/create IPOs
    path('ipos/<int:pk>/', IPODetailView.as_view(), name='ipo-detail'),  # single IPO
]
