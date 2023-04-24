from django.urls import path, re_path
from .views import *

# from .views import CreateUserView

urlpatterns = [
    path("login", UserLogin.as_view(), name="login"),
    path("logout", UserLogout.as_view(), name="logout"),
    path("register", UserRegister.as_view(), name="register"),
    path("user", UserView.as_view(), name="user"),
]
