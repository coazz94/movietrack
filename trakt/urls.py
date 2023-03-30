from django.urls import path, re_path
from .views import *


urlpatterns = [
        path("auth-user", create_auth_url.as_view()),
        path("redirect", trakt_callback),
        path("is-auth", isAuthenticated.as_view()),
        path("revoke-auth", revokeAuthentication),
        path("get-data", getTrendingMovies.as_view()),
        path("get-img", getImagesLink.as_view()),
]
