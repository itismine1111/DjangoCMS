from django.urls import path, include
from .views import (
    LinkInfoApi,
    LinkTypeApi,
    updateLinkType,
    updateLinkInfo,
    ListLinkTypeApi,
    ListLinkInfoApi,
    ListLinkInfoApiFilters
)

urlpatterns = [
    path("linktype/", LinkTypeApi.as_view(), name="linkType"),
    path("linktype/<int:id>/", updateLinkType, name="updateLinkType"),
    path("linkinfo/", LinkInfoApi.as_view(), name="linkInfo"),
    path("linkinfo/<int:id>/", updateLinkInfo, name="updateLinkInfo"),
    path("linktype/list/", ListLinkTypeApi.as_view(), name="listLinkType"),
    path("linkinfo/list/", ListLinkInfoApi.as_view(), name="listLinkInfo"),
    path("linkinfo/list/filters/", ListLinkInfoApiFilters.as_view(), name="listLinkInfoFilters"),
]
