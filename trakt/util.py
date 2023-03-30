from .models import TraktToken
from django.utils import timezone
from datetime import timedelta
from requests import  post, put, get
from .credentials import CLIENT_ID, CLIENT_SECRET, API_URL, FANART_API_KEY, FANART_URL


def get_user_tokens(session_id):
    user_tokens = TraktToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    return None

def refresh_spotify_token(session_id):

    refresh_token = TraktToken.objects.filter(session_id).refresh_token

    if refresh_token:

        response = post(API_URL + "/oauth/token", data= {
        "refresh_token" : refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "refresh_token",
        }).json()

        access_token = response.get("access_token")
        token_type = response.get("token_type")
        expires_in = response.get("expires_in")
        scope = response.get("scope")


        update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token, scope)

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

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token, scope):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.scope = scope
        tokens.save(update_fields=["access_token", "refresh_token", "expires_in", "token_type", "scope"])
    else:
        tokens = TraktToken(user=session_id, access_token=access_token,
                            refresh_token=refresh_token, token_type=token_type, expires_in=expires_in, scope=scope)
        tokens.save()

def execute_trakt_api(session_id, endpoint, pagination):
    headers = {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
    }

    response = get(API_URL + endpoint + pagination, {}, headers=headers)

    try:

        data = addImagesUrlToTrakt(response.json())
        return data

    except:
        return {"Error" : "Issue with Request"}

## TODO Look up if headers aren't for example setting that are send through the url
def execute_fanart_api(endpoint):
    url = FANART_URL + endpoint + FANART_API_KEY
    response = get(url, {})

    try:
        return response.json()
    except:
        return {"Error" : "Issue with Request"}


def addImagesUrlToTrakt(data):
    print(data)
    return data

def extractIDs(movie_list):
    pass



"""
[{'watchers': 168, 'movie': {'title': 'Avatar: The Way of Water', 'year': 2022, 'ids': {'trakt': 56580, 'slug': 'avatar-the-way-of-water-2022', 'imdb': 'tt1630029', 'tmdb': 76600}}}, {'watchers': 28, 'movie': {'title': 'John Wick: Chapter 4', 'year': 2023, 'ids': {'trakt': 448646, 'slug': 'john-wick-chapter-4-2023', 'imdb': 'tt10366206', 'tmdb': 603692}}}, {'watchers': 27, 'movie': {'title': 'Operation Fortune: Ruse de Guerre',
'year': 2023, 'ids': {'trakt': 580591, 'slug': 'operation-fortune-ruse-de-guerre-2023', 'imdb': 'tt7985704', 'tmdb': 739405}}}, {'watchers': 25, 'movie': {'title': 'Champions', 'year': 2023, 'ids': {'trakt': 748466,
'slug': 'champions-2023', 'imdb': 'tt15339570', 'tmdb': 933419}}}, {'watchers': 22, 'movie': {'title': 'Cocaine Bear', 'year': 2023, 'ids': {'trakt': 638759, 'slug': 'cocaine-bear-2023', 'imdb': 'tt14209916', 'tmdb': 804150}}}, {'watchers': 21, 'movie': {'title': 'John Wick: Chapter 3 - Parabellum', 'year': 2019, 'ids': {'trakt': 304278, 'slug': 'john-wick-chapter-3-parabellum-2019', 'imdb': 'tt6146586', 'tmdb': 458156}}}, {'watchers': 17, 'movie': {'title': 'John Wick: Chapter 2', 'year': 2017, 'ids': {'trakt': 205127, 'slug': 'john-wick-chapter-2-2017', 'imdb': 'tt4425200', 'tmdb': 324552}}}, {'watchers': 16, 'movie': {'title': 'A Man Called Otto', 'year': 2022, 'ids': {'trakt': 751967, 'slug': 'a-man-called-otto-2022', 'imdb': 'tt7405458', 'tmdb': 937278}}}, {'watchers': 14, 'movie': {'title': 'Plane', 'year': 2023, 'ids': {'trakt': 483349, 'slug':
'plane-2023', 'imdb': 'tt5884796', 'tmdb': 646389}}}, {'watchers': 12, 'movie': {'title': 'Luther: The Fallen Sun', 'year': 2023, 'ids': {'trakt': 564840, 'slug': 'luther-the-fallen-sun-2023', 'imdb': 'tt3155298', 'tmdb': 722149}}}]

"""