from django.utils.translation import gettext as _
from django.db import models


class LinkType(models.Model):
    linkType = models.models.CharField(_("Link Type"), max_length=100, blank=False, null=False,)

class LinkInfo(models.Model):
        name = models.CharField(_("Name"), max_length=100, null=True, blank=True)
        url = models.URLField(_("Link Url"), max_length=200)
        linkTypeId = models.ForeignKey(LinkType, on_delete=models.SET_NULL, null=True)
        parentId = models.ForeignKey("LinkInfo", on_delete=models.SET_NULL, name="linkInfoParent")
        # -parentId [foreign key -> LinkType]
        # -title [char]

        # -isEnabled [bool]
        # -content [textarea]
        # -externalUrl [url]
        # -useExternalUrl [bool]
        # -openInExternalWindow [bool]
        # -sortOrderId [int]
