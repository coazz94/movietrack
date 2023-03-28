from .models import TraktToken
from django.utils import timezone
from datetime import timedelta


def get_user_tokens(session_id):
    user_tokens = TraktToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    return None

def is_trakt_auth(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        # if expiry <= timezone.now():
            # refresh_spotify_token(session_id)
        print(expiry)
        return True
    return False

def check_for_session(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token, scope):
    # print(f"\n UPDATE OR CREATE FUNCTION \n DATA: \n{session_id, access_token, token_type, expires_in, refresh_token}\n\n\n")
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if tokens:
        # print("TOKENS EXIST")
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.scope = scope
        tokens.save(update_fields=["access_token", "refresh_token", "expires_in", "token_type", "scope"])
    else:
        # print("TOKENS NEW")
        tokens = TraktToken(user=session_id, access_token=access_token,
                            refresh_token=refresh_token, token_type=token_type, expires_in=expires_in, scope=scope)
        tokens.save()

