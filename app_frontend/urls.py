from django.urls import path, include
from .views import index, show_links_page, error404


urlpatterns = [
    path("", index, name="user-index"),
    path("page/<str:url>/", show_links_page, name="user-show-links-page"),
    path("404notfound/", error404, name="error404"),

]
