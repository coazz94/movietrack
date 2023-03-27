from django.urls import path, re_path
from .views import index
from django.views.generic.base import RedirectView


urlpatterns = [
        # Home url
        path("", index),
        ## all other paths
        re_path(r'^movies/(?P<path>.*)$', index),

        ## Movies urls
        # path("movies/", index),
        path("movies/latest/", index),
        path("movies/trending/", index , name="main"),

        ## Match any other url typed in and redirect via react
        re_path(r'^movies/(?P<path>.*)$', index),


        ## Shows urls
        # path("shows/", index),
        path("shows/latest/", index),
        path("shows/trending/", index,name="main"),

        ## same as for Movies
        re_path(r'^shows/(?P<path>.*)$', index,),

]
