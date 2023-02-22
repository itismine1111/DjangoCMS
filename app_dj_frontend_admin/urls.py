from django.urls import path, include
from .views import index, list_link_type, edit_link_type, del_link_type, list_link_info, edit_link_info, del_link_info, set_sorting_order, post_link_type_form, post_edit_link_type_form

urlpatterns = [
    path("", index, name="dj-index"),
    path("linktype/list/", list_link_type, name="dj-list-link-type"),
    path("linkinfo/list/", list_link_info, name="dj-list-link-info"),
    path("linktype/edit/temp/<int:id>/", edit_link_type, name="dj-edit-link-type"),
    path("linkinfo/edit/temp/<int:id>/", edit_link_info, name="dj-edit-link-info"),
    path("linktype/del/<int:id>/", del_link_type, name="dj-del-link-type"),
    path("linkinfo/del/<int:id>/", del_link_info, name="dj-del-link-info"),
    path("linkinfo/setsortorder/", set_sorting_order, name="dj-link-info-set-sort-order"),


    path("linktype/add/", post_link_type_form, name="dj-link-type-add"),
    path("linktype/edit/<int:id>/", post_edit_link_type_form, name="dj-link-type-edit"),
    
]
