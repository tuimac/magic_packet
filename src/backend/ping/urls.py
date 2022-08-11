from django.urls import path
from . import views

urlpatterns = [
    path('', views.PingAPIViews.as_view()),
    path('<str:ip>/', views.PingAPIViews.as_view())
]
