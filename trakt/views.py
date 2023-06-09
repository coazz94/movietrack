from django.shortcuts import render, redirect
from rest_framework.views import APIView, status
from rest_framework.response import Response
from requests import Request, post
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, API_URL
from .util import *


# Create your views here.

# https://api.trakt.tv
# https://trakt.docs.apiary.io/#reference/authentication-oauth


class create_auth_url(APIView):
    def get(self, request, format=None):
        url = (
            Request(
                "GET",
                API_URL + "/oauth/authorize",
                params={
                    "response_type": "code",
                    "client_id": CLIENT_ID,
                    "redirect_uri": REDIRECT_URI,
                },
            )
            .prepare()
            .url
        )

        return Response({"url": url}, status=status.HTTP_200_OK)


class isAuthenticated(APIView):
    def get(self, request, format=None):
        is_auth = is_trakt_auth(self.request.session.session_key)
        return Response({"status": is_auth}, status=status.HTTP_200_OK)


class getTraktData(APIView):
    def get(self, request, format=None):
        media_type = self.request.query_params["type"]
        section = self.request.query_params["section"]
        pagination = self.request.query_params["page"]
        size = self.request.query_params["size"]
        session_id = request.session.session_key

        response = execute_trakt_collection_api(
            session_id=session_id,
            media_type=media_type,
            section=section,
            pagination=pagination,
            size=size,
        )

        if "error" in response:
            return Response(
                {"error": "no Content in Response"}, status=status.HTTP_204_NO_CONTENT
            )

        return Response(response, status=status.HTTP_200_OK)


class getMediaData(APIView):
    def get(self, request, format=None):
        slug = self.request.query_params["slug"]
        media_type = self.request.query_params["type"]
        session_id = request.session.session_key

        response = execute_trakt_single_api(
            slug=slug,
            session_id=session_id,
            media_type=media_type,
        )

        if "error" in response:
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        return Response(response, status=status.HTTP_200_OK)


def trakt_callback(request, format=None):
    code = request.GET.get("code")

    response = post(
        API_URL + "/oauth/token",
        data={
            "code": code,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code",
        },
    ).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    expires_in = response.get("expires_in")
    refresh_token = response.get("refresh_token")
    scope = response.get("scope")
    created_at = response.get("created_at")

    check_for_session(request)

    update_or_create_user_tokens(
        request.session.session_key,
        access_token,
        token_type,
        expires_in,
        refresh_token,
        scope,
    )

    return redirect("frontend:home")


def revokeAuthentication(request, format=None):
    token = get_user_tokens(request.session.session_key).refresh_token

    response = post(
        API_URL + "/oauth/revoke",
        data={"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET, "token": token},
    ).json()

    # return Response({"a": "bc"}, status=status.HTTP_200_OK)

    # return redirect("frontend:home")
