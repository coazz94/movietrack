from django.urls import path, re_path
from .views import index
from django.views.generic.base import RedirectView

## for the redirect in the trakt api, so it finds this by the appname
app_name = "frontend"

urlpatterns = [
    path("", index, name="home"),
    re_path(r"^movies/(?P<path>.*)$", index),
    path("movies/latest/", index),
    path("movies/trending/", index, name="main"),
    path("movies/popular/", index),
    re_path(r"^movies/(?P<path>.*)$", index),
    path("shows/latest/", index),
    path("shows/trending/", index),
    re_path(
        r"^shows/(?P<path>.*)$",
        index,
    ),
    path("login", index),
    path("register", index),
]
