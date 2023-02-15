from django_filters import rest_framework as filters
from app_cms.models import LinkInfo

class LinkInfoFilter(filters.FilterSet):
    class Meta: 
        model = LinkInfo
        fields =  {
            'parentId': ['exact',],
            'isEnabled': ['exact',],
            'linkTypeId': ['exact',],
        }

    # def get_filterset_kwargs(self, request, queryset, view):
    #     kwargs = super().get_filterset_kwargs(request, queryset, view)

    #     # merge filterset kwargs provided by view class
    #     if hasattr(view, 'get_filterset_kwargs'):
    #         kwargs.update(view.get_filterset_kwargs())

    #     print(kwargs)
    #     print("REACHING HERE")
    #     print(kwargs["parentId"])
    #     return kwargs
    
    def get_filterset(self, request, queryset, view):
        parent_id = self.request.query_params.get("parentId")
        if (parent_id == "" or parent_id == "null" or parent_id == None):
            queryset = queryset.filter(parentId__isnull=True)

        filterset = super().get_filterset(self, request, queryset, view)

        return filterset
