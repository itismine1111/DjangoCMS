from django_filters import rest_framework as filters
from app_cms.models import LinkInfo

class LinkInfoFilter(filters.FilterSet):

    class Meta: 
        model = LinkInfo
        fields =  {
            'parentId': ['exact',],
            'isEnabled': ['exact',],
        }
        # search_fields = ["=parentId", "=isEnabled"]
        # ordering_fields = ["sortOrderId"]