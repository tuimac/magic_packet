from django.urls import path
from . import views

urlpatterns = [
    path('', views.SendPacketAPIViews.as_view())
]
