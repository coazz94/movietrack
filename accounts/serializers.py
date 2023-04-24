from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


# https://www.youtube.com/watch?v=diB38AvVkHw


UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data["email"],
            password=clean_data["password"],
            username=clean_data["username"],
        )
        # user_obj.username = clean_data["username"]
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["email"], password=clean_data["password"]
        )
        if not user:
            raise ValidationsError("user not found")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model: UserModel
        fields = ("username", "password")


# {
# "email":"test@example.com",
# "username":"tester",
# "password":"testing123"
# }
