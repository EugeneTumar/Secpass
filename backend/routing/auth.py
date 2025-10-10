from fastapi import APIRouter, Response

from ..utils.route_excepter import route_excepter

from ..schemas.user import User_create_schema, User_signin_schema
from ..services.auth import get_user_by_session, signIn, signOut, signUp

auth_Router = APIRouter()

@auth_Router.post('/signup')
async def sign_up(user: User_create_schema):
    return await route_excepter(signUp, user)

@auth_Router.post('/signin')
async def sign_in(login: str, password: str):
    user = User_signin_schema(login=login, password=password)
    session = await route_excepter(signIn, user)
    return session

@auth_Router.post('/signout')
async def sign_out(session: str):
    return await route_excepter(signOut, session)


@auth_Router.get('/getuser')
async def get_user(session: str):
    return await route_excepter(get_user_by_session, session) 
