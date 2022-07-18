from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArpAPIViews.as_view()),
    path('scan', views.ArpScanAPIViews.as_view())
]
