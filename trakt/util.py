from .models import TraktToken
from django.utils import timezone
from datetime import timedelta
from requests import post, put, get
from .credentials import CLIENT_ID, CLIENT_SECRET, API_URL, FANART_API_KEY, FANART_URL


def get_user_tokens(session_id):
    user_tokens = TraktToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    return None


def refresh_spotify_token(session_id):
    refresh_token = TraktToken.objects.filter(session_id).refresh_token

    if refresh_token:
        response = post(
            API_URL + "/oauth/token",
            data={
                "refresh_token": refresh_token,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "grant_type": "refresh_token",
            },
        ).json()

        access_token = response.get("access_token")
        token_type = response.get("token_type")
        expires_in = response.get("expires_in")
        scope = response.get("scope")

        update_or_create_user_tokens(
            session_id, access_token, token_type, expires_in, refresh_token, scope
        )


def is_trakt_auth(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        return True
    return False


def check_for_session(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()


def update_or_create_user_tokens(
    session_id, access_token, token_type, expires_in, refresh_token, scope
):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.scope = scope
        tokens.save(
            update_fields=[
                "access_token",
                "refresh_token",
                "expires_in",
                "token_type",
                "scope",
            ]
        )
    else:
        tokens = TraktToken(
            user=session_id,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type,
            expires_in=expires_in,
            scope=scope,
        )
        tokens.save()


## TODO FILTER HERE Movies with out URL
def execute_trakt_api(session_id, media_type, section, pagination, size):
    headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
    }
    endpoint = f"/{media_type}/{section}"
    pagination = f"?page={pagination}&limit={size}"
    response = get(API_URL + endpoint + pagination, {}, headers=headers)

    # try:
    data = addImagesUrlToTraktData(response.json(), media_type=media_type)
    return data
    # except:
    #     return {"Error" : "Issue with Request to Trakt"}


def execute_fanart_api(code, media_type):
    if media_type == "shows":
        media_type = "tv"

    endpoint = f"/{media_type}/{code}?api_key={FANART_API_KEY}"
    response = get(FANART_URL + endpoint, {})

    return response.json()


def addImagesUrlToTraktData(data, media_type):
    ## for movies = tmdb, for shows tvdb

    if media_type == "shows":
        trakt_code = "tvdb"
    else:
        trakt_code = "tmdb"

    for x, media in enumerate(data):
        code = media[media_type[:-1]]["ids"][trakt_code]
        name = media[media_type[:-1]]["title"]
        fanart_data = execute_fanart_api(code=code, media_type=media_type)
        ##TODO Try to get a url, if not set url to ""
        ##TODO adjust the link name of the fanart data to the mediatype
        try:
            poster_url = fanart_data["tv" + "poster"][0]["url"]
            thumb_url = fanart_data["tv" + "thumb"][0]["url"]
            # poster_url = fanart_data[media_type[:-1] + "poster"][0]["url"]
            # thumb_url = fanart_data[media_type[:-1] + "thumb"][0]["url"]
            media[media_type[:-1]]["poster_url"] = poster_url
            media[media_type[:-1]]["thumb_url"] = thumb_url
        except:
            continue

    return data
