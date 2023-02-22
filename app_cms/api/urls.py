from django.urls import path, include
from .views import (
    LinkInfoApi,
    LinkTypeApi,
    updateLinkType,
    updateLinkInfo,
    ListLinkTypeApi,
    ListLinkInfoApiFilters,
    set_sorting_order,
    get_link_infos_tree_view,
    get_link_infos_tree_view1,
    cachedLinkedInfoApi
)

urlpatterns = [
    path("linktype/", LinkTypeApi.as_view(), name="api-linkType"),
    path("linktype/<int:id>/", updateLinkType, name="api-updateLinkType"),
    path("linkinfo/", LinkInfoApi.as_view(), name="api-linkInfo"),
    path("linkinfo/<int:id>/", updateLinkInfo, name="api-updateLinkInfo"),
    path("linktype/list/", ListLinkTypeApi.as_view(), name="api-listLinkType"),
    path("linkinfo/list/", ListLinkInfoApiFilters.as_view(), name="api-listLinkInfoFilters"),
    # path("linkinfo/list/", cachedLinkedInfoApi, name="api-listLinkInfoFilters"),
    path("linkinfo/sort-order-ids/", set_sorting_order, name="api-listLinkInfoSortOrderIds"),
    # path("linkinfo/treeview/", get_link_infos_tree_view, name="api-listLinkInfoTreeView"),
    path("linkinfo/treeview/", get_link_infos_tree_view1, name="api-listLinkInfoTreeView"),
]
