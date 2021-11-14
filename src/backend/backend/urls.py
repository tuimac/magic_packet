from django.urls import path, include
from . import views

urlpatterns = [
    path("api/sendpacket", include("sendpacket.urls")),
]
