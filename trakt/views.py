from django.shortcuts import render, redirect
from rest_framework.views import APIView, status
from rest_framework.response import Response
from requests import Request, post
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from .util import *


API_URL = "https://api.trakt.tv"


# Create your views here.

# https://api.trakt.tv
# https://trakt.docs.apiary.io/#reference/authentication-oauth

# class AuthUrl(APIView):
#     def get(self, request, format=None):

#         return Response({"error" : "Test"}, status = status.HTTP_200_OK )


class create_auth_url(APIView):
    def get(self, request, format=None):

        url = Request("GET", API_URL + "/oauth/authorize", params={
            "response_type" : "code",
            "client_id" : CLIENT_ID,
            "redirect_uri" : REDIRECT_URI,
        }).prepare().url

        return Response({"url" : url}, status = status.HTTP_200_OK)


def trakt_callback(request, format=None):
    code = request.GET.get("code")

    response = post(API_URL + "/oauth/token", data= {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    expires_in = response.get("expires_in")
    refresh_token = response.get("refresh_token")
    scope = response.get("scope")
    created_at = response.get("created_at")


    check_for_session(request)

    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token, scope)

    return redirect("frontend:home")


class isAuthenticated(APIView):
    def get(self, request, format=None):
        is_auth = is_trakt_auth(self.request.session.session_key)
        return Response({"status" : is_auth}, status=status.HTTP_200_OK)