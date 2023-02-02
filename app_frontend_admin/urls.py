from django.urls import path, include
from .views import index, error_not_found_404, add_link_type, add_link_info, list_link_type, list_link_info, edit_link_type, edit_link_info

from django.conf.urls import handler404


urlpatterns = [
    path("", index, name="index"),
    path("error-not-found/", error_not_found_404, name="404-not-found"),
    path("linktype/add/", add_link_type, name="linktype-add"),
    path("linkinfo/add/", add_link_info, name="linkinfo-add"),
    path("linktype/edit/<int:pk>/", edit_link_type, name="linktype-edit"),
    path("linkinfo/edit/<int:pk>/", edit_link_info, name="linkinfo-edit"),
    path("linktype/list/", list_link_type, name="linktype-list"),
    path("linkinfo/list/", list_link_info, name="linkinfo-list"),
    
]


# handler404 = "app_frontend_admin.views.error_not_found_404"
