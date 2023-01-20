from django.utils.translation import gettext as _
from django.db import models


class LinkType(models.Model):
    linkType = models.CharField(_("Link Type"), max_length=100, blank=False, null=False,)

    def __str__(self):
        return self.linkType

class LinkInfo(models.Model):
        name = models.CharField(_("Name"), max_length=100, null=True, blank=True)
        url = models.URLField(_("Link Url"), max_length=200, null=True, blank=True)
        linkTypeId = models.ForeignKey(LinkType, on_delete=models.SET_NULL, null=True)
        parentId = models.ForeignKey("LinkInfo", on_delete=models.SET_NULL, related_name="linkInfoParent", null=True)
        title = models.CharField(_("Title "), max_length=50, null=True, blank=True)
        isEnabled = models.BooleanField(_("Is Enabled"), default=True)
        content = models.TextField(_("Content"), null=True, blank=True)
        useExternalUrl = models.BooleanField(_("Use External Url"), default=False)
        externalUrl = models.URLField(_("External Url"), max_length=200, null=True, blank=True)
        openInExternalWindow = models.BooleanField(_("Use External Url"), default=False)
        sortOrderId = models.IntegerField(_("Sort Order Id"), null=True, blank=True)
        # headerImage = models.ImageField()

        def __str__(self):
            return self.name