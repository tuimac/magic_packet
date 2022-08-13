from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.InterfaceListAPIViews.as_view()),
    path('info/<str:interface>/', views.InterfaceInfoAPIViews.as_view())
]
