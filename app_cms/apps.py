from django.apps import AppConfig


class AppCmsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app_cms"

    def ready(self):
        import app_cms.api.signals