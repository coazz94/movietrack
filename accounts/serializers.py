from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError


UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, clean_data):
        """create a new user"""
        try:
            user_obj = UserModel.objects.create_user(
                email=clean_data["email"],
                password=clean_data["password"],
                username=clean_data["username"],
            )
            user_obj.save()
            return user_obj

        except Exception as e:
            error = {
                "message": ",".join(e.args) if len(e.args) > 0 else "Unknown Error"
            }
            raise serializers.ValidationError(error)


class UserLoginSerializer(serializers.Serializer):
    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["username"], password=clean_data["password"]
        )
        if not user:
            raise serializers.ValidationError("User not found")
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("username", "password")
