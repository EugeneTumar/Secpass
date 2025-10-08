from fastapi import APIRouter, Body, Header, Request, Response

from backend.errors.custom_exceptions import UserNotFound

from ..schemas.session import SessionKey_schema
from ..schemas.user import User_create_schema, User_signin_schema
from ..services.auth import get_user_by_request, signIn, signOut, signUp

auth_Router = APIRouter()

@auth_Router.post('/signup')
async def sign_up(user: User_create_schema):
    await signUp(user)

@auth_Router.post('/signin')
async def sign_in(login: str, password: str, response: Response):
    try:
        user = User_signin_schema(login=login, password=password)
        session = await signIn(user)
        return session
    except UserNotFound:
        response.status_code = 400
    except Exception as e:
        response.status_code = 500

@auth_Router.post('/signout')
async def sign_out(response: Response, session: str):
    try:
        await signOut(session)
    except Exception as e:
        response.status_code = 500


@auth_Router.get('/getuser')
async def get_user(response: Response, session: str):
    try:
        return await get_user_by_request(session)
    except Exception as e:
        print(e)
        response.status_code = 500
