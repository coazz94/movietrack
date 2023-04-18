from django.urls import path, re_path
from . import views

urlpatterns = [path("api/users", views.UserCreate.as_view(), name="account-create")]
