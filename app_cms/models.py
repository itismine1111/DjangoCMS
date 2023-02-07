from django.utils.translation import gettext as _
from django.db import models
import uuid
from ckeditor.fields import RichTextField

class LinkType(models.Model):
    linkType = models.CharField(_("Link Type"), max_length=100, blank=False, null=False,)

    def __str__(self):
        return self.linkType


def get_header_img_filepath(instance, filename):
    ext = filename.split(".")[-1]
    newfilename = str(uuid.uuid1()) + "." + ext
    return(f"header-images/{newfilename}")


def get_default_header_img_filepath():
    return "header-images/default/default-header-img.png"

class LinkInfo(models.Model):
        name = models.CharField(_("Name"), max_length=100, null=False, blank=False)
        url = models.CharField(_("Link Url"), max_length=200, null=True, blank=True)
        linkTypeId = models.ForeignKey(LinkType, on_delete=models.SET_NULL, null=True)
        parentId = models.ForeignKey("LinkInfo", on_delete=models.SET_NULL, related_name="linkInfoParent", null=True)
        title = models.CharField(_("Title "), max_length=50, null=True, blank=True)
        isEnabled = models.BooleanField(_("Is Enabled"), default=True)
        # content = models.TextField(_("Content"), null=True, blank=True)
        content = RichTextField(blank=True, null=True)
        useExternalUrl = models.BooleanField(_("Use External Url"), default=False)
        externalUrl = models.URLField(_("External Url"), max_length=200, null=True, blank=True)
        openInExternalWindow = models.BooleanField(_("Use External Url"), default=False)
        sortOrderId = models.IntegerField(_("Sort Order Id"), null=True, blank=True)
        headerImage = models.ImageField(upload_to=get_header_img_filepath, default=get_default_header_img_filepath, null=True, blank=True)

        def __str__(self):
            return self.name