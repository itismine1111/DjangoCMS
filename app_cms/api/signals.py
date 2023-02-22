from django.core.cache import cache
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from app_cms.models import LinkInfo

@receiver(post_save, sender=LinkInfo, dispatch_uid="Links Info Updated")
def link_info_obj_post_save_handler(sender, **kwargs):
    cache.delete("list_link_info_tree_view_obj_dict")

@receiver(post_delete, sender=LinkInfo, dispatch_uid="Link Info Deleted")
def link_info_obj_post_delete_handler(sender, **kwargs):
    cache.delete("list_link_info_tree_view_obj_dict")