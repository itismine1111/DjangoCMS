from django.urls import path, include
from .views import index, add_link_type, add_link_info, list_link_type, list_link_info

urlpatterns = [
    path("", index, name="index"),
    path("add-link-type/", add_link_type, name="add-link-type"),
    path("add-link-info/", add_link_info, name="add-link-info"),
    path("list-link-type/", list_link_type, name="list-link-type"),
    path("list-link-info/", list_link_info, name="list-link-info"),
]
