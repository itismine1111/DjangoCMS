from collections import defaultdict
from rest_framework import serializers
from drf_extra_fields.fields import HybridImageField
from app_cms.models import LinkInfo, LinkType

from app_cms.models import LinkType, LinkInfo

class LinkTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkType
        fields = "__all__"

    def validate_linkType(self, value):
        try:
            obj = LinkType.objects.get(linkType=value)
        except LinkType.DoesNotExist:
            obj = None

        if obj is not None:
            raise serializers.ValidationError("Another Link Type with the same name already exists.")
        
        return value


class LinkInfoSerializerMinified(serializers.ModelSerializer):
    class Meta:
        model = LinkInfo
        fields = ["id", "name"]


class LinkInfoSerializer(serializers.ModelSerializer):
    headerImage = HybridImageField(allow_null=True)
    sortOrderId = serializers.IntegerField(allow_null=True)
    class Meta:
        model = LinkInfo
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        link_type_serializer = LinkTypeSerializer(instance.linkTypeId)
        representation["linkType"] = link_type_serializer.data

        link_info_serializer = LinkInfoSerializerMinified(instance.parentId)
        representation["parent"] = link_info_serializer.data

        children = LinkInfo.objects.filter(parentId=representation["id"]);
        # print(f"Children : {len(children)}")

        if(len(children) != 0):
            representation["children"] = True
        else:
            representation["children"] = False

        return representation

    def validate_name(self, value):
        try:
            obj = LinkInfo.objects.get(name=value)
        except LinkInfo.DoesNotExist:
            obj = None

        if obj is not None:
            raise serializers.ValidationError("Another Link Info with the same name already exists.")
        
        return value
    

class GetLinkInfoSerializerTreeView(serializers.ModelSerializer):
    class Meta:
        model = LinkInfo
        fields = ("name", "url", "linkTypeId", "parentId", "isEnabled", "useExternalUrl", "externalUrl", "openInExternalWindow", "sortOrderId")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation

