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


def execute_trakt_collection_api(session_id, media_type, section, pagination, size):
    headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
    }

    endpoint = f"/{media_type}/{section}"
    pagination = f"?page={pagination}&limit={10}"
    response = get(API_URL + endpoint + pagination, {}, headers=headers)

    formatted_Data = formatTraktJson(response.json(), media_type[:-1], section)

    data = addImagesUrlToTraktData(
        formatted_Data, media_type=media_type, section=section
    )
    return data


def execute_trakt_single_api(session_id, media_type, slug):
    headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
    }

    endpoint = f"/{media_type}/{slug}?extended=full"

    response = get(API_URL + endpoint, {}, headers=headers)

    if response.status_code != 200:
        return {"error": "not valid title"}

    data = response.json()

    # put this into execute fanart
    if media_type == "movies":
        code = "tmdb"
    else:
        code = "tvdb"

    fanart_data = execute_fanart_api(data["ids"][code], media_type)

    data["poster_url"] = fanart_data["poster_url"]
    data["thumb_url"] = fanart_data["thumb_url"]

    return data


def execute_fanart_api(code, media_type):
    if media_type == "movies":
        fanart_type = "movies"
        img_type = "movie"
    else:
        fanart_type = "tv"
        img_type = "tv"

    endpoint = f"/{fanart_type}/{code}?api_key={FANART_API_KEY}"
    response = get(FANART_URL + endpoint, {})
    data = response.json()

    try:
        return {
            "poster_url": data[img_type + "poster"][0]["url"],
            "thumb_url": data[img_type + "thumb"][0]["url"],
        }

    except:
        return {}


def addImagesUrlToTraktData(data, media_type, section):
    for media in data:
        fanart_data = execute_fanart_api(code=media["code"], media_type=media_type)
        if fanart_data:
            media["poster_url"] = fanart_data["poster_url"]
            media["thumb_url"] = fanart_data["thumb_url"]

    return data


def formatTraktJson(trakt_response, media_type, section):
    temp = []

    if media_type == "movie":
        trakt_code = "tmdb"
    else:
        trakt_code = "tvdb"

    for item in trakt_response:
        if section == "trending":
            temp.append(
                {
                    "type": media_type,
                    "title": item[media_type]["title"],
                    "year": item[media_type]["year"],
                    "code": item[media_type]["ids"][trakt_code],
                    "slug": item[media_type]["ids"]["slug"],
                    "watchers": item["watchers"],
                }
            )
        else:
            temp.append(
                {
                    "type": media_type,
                    "title": item["title"],
                    "year": item["year"],
                    "code": item["ids"][trakt_code],
                    "slug": item["ids"]["slug"],
                    "watchers": "",
                }
            )

    return temp
