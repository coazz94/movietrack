from django.urls import path, re_path
from .views import *


urlpatterns = [
        path("get-auth-url", AuthUrl.as_view()),
]
