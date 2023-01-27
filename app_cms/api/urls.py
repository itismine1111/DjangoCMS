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
    path("linktype/", LinkTypeApi.as_view(), name="api-linkType"),
    path("linktype/<int:id>/", updateLinkType, name="api-updateLinkType"),
    path("linkinfo/", LinkInfoApi.as_view(), name="api-linkInfo"),
    path("linkinfo/<int:id>/", updateLinkInfo, name="api-updateLinkInfo"),
    path("linktype/list/", ListLinkTypeApi.as_view(), name="api-listLinkType"),
    path("linkinfo/list/filters", ListLinkInfoApi.as_view(), name="api-listLinkInfo"),
    path("linkinfo/list/", ListLinkInfoApiFilters.as_view(), name="api-listLinkInfoFilters"),
]
