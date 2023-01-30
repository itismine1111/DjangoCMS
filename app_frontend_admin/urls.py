from django.urls import path, include
from .views import index, add_link_type, add_link_info, list_link_type, list_link_info

urlpatterns = [
    path("", index, name="index"),
    path("add-link-type/", add_link_type, name="add-link-type"),
    path("add-link-info/", add_link_info, name="add-link-info"),
    path("linktype/list/", list_link_type, name="link-type-list"),
    path("linkinfo/list/", list_link_info, name="link-info-list"),
]
