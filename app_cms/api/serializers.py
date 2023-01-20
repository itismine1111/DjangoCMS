from rest_framework import serializers
from app_cms.models import LinkType, LinkInfo

class LinkTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkType
        fields = "__all__"

class LinkInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkInfo
        fields = "__all__"

    