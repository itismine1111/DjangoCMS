"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_swagger.views import get_swagger_view

swagger_schema_view = get_swagger_view(title='DjangoCMS API')



urlpatterns = [
    path("", include("app_frontend.urls")),
    # path("accounts/", include("app_accounts.urls")),
    path("cms/accounts/", include("django.contrib.auth.urls")),
    path("api/cms/", include("app_cms.api.urls")),
    path("cms/admin/", include("app_frontend_admin.urls")),
    path("dj/cms/admin/", include("app_dj_frontend_admin.urls")),
    path("admin/", admin.site.urls),
    path("swagger/cms/", swagger_schema_view)

]


# Adding the static urls
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


