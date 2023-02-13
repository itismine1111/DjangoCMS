from django_filters import rest_framework as filters
from app_cms.models import LinkInfo

class LinkInfoFilter(filters.FilterSet):
    # parentId = filters.MultipleChoiceFilter(
    #     # name='parentId',
    #     lookup_expr='exact',
    #     conjoined=True,  # uses AND instead of OR
    # )

    class Meta: 
        model = LinkInfo
        fields =  {
            'parentId': ['exact',],
            'isEnabled': ['exact',],
            'linkTypeId': ['exact',],
        }
