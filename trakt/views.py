from django.shortcuts import render
from rest_framework.views import APIView, status
from rest_framework.response import Response


# Create your views here.


class AuthUrl(APIView):
    def get(self, request, format=None):
        print("hey")
        return Response({"error" : "Test"}, status = status.HTTP_200_OK )
