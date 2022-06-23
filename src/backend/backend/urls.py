from django.urls import path, include

urlpatterns = [
    path("api/sendpacket", include("sendpacket.urls")),
]
