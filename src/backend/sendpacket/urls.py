from django.urls import path
from . import views

urlpatterns = [
    path('', views.SendpacketAPIViews.as_view()),
    path('<str:macaddress>/', views.SendpacketAPIViews.as_view())
]
