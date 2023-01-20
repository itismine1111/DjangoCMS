from django_filters import rest_framework as filters
from app_cms.models import LinkInfo

class LinkInfoFilter(filters.FilterSet):

    class Meta: 
        model = LinkInfo
        # fields = ["parentId", "isEnabled", "sortOrderId"]
        search_fields = ["=parentId", "=isEnabled"]
        ordering_fields = ["sortOrderId"]