from django.urls import path, include
from .views import index

urlpatterns = [
    path("", index, name="user-index"),

]
