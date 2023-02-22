from django.urls import path, include
from .views import login_view

from django.conf.urls import handler404


urlpatterns = [
    # path("login/", login_view, name="login"),
    
]


# handler404 = "app_frontend_admin.views.error_not_found_404"
