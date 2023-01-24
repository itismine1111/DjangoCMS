from rest_framework import serializers
from drf_extra_fields.fields import HybridImageField

from app_cms.models import LinkType, LinkInfo

class LinkTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkType
        fields = "__all__"


class LinkInfoSerializerMinified(serializers.ModelSerializer):
    class Meta:
        model = LinkInfo
        fields = ["id", "name"]


class LinkInfoSerializer(serializers.ModelSerializer):
    headerImage = HybridImageField()
    class Meta:
        model = LinkInfo
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        link_type_serializer = LinkTypeSerializer(instance.linkTypeId)
        representation["linkType"] = link_type_serializer.data

        link_info_serializer = LinkInfoSerializerMinified(instance.parentId)
        representation["parent"] = link_info_serializer.data

        return representation
    