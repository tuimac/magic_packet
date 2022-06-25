from django.urls import path
from . import views

urlpatterns = [
    path('', views.PingAPIViews.as_view())
]
