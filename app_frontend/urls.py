from django.urls import path, include
from .views import index, show_links_page


urlpatterns = [
    path("", index, name="user-index"),
    path("<int:id>/<str:slug>/", show_links_page, name="user-show-links-page"),

]
