from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArpAPIViews.as_view()),
    path('<str:ip>/', views.ArpAPIViews.as_view()),
    path('<str:ip>/<str:interface>/', views.ArpAPIViews.as_view()),
]
