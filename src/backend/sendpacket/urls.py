from django.urls import path
from . import views

urlpatterns = [
    path('<str:macaddr>/', views.SendPacketAPIViews.as_view())
]
