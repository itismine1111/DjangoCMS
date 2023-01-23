from rest_framework import serializers
from drf_extra_fields.fields import HybridImageField

from app_cms.models import LinkType, LinkInfo

class LinkTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkType
        fields = "__all__"

class LinkInfoSerializer(serializers.ModelSerializer):
    headerImage = HybridImageField()
    class Meta:
        model = LinkInfo
        fields = "__all__"

    