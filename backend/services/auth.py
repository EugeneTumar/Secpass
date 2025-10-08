from fastapi import Request, Response

from backend.models.session import SessionKey
from ..models.user import User
from ..schemas.user import User_signin_schema, User_create_schema, UserOpenSchema
from ..schemas.session import SessionKey_schema, Session_schema
from ..db.session import db_add_session, db_del_session, db_get_user_id_by_session
from ..db.user import db_get_user_by_signin, db_add_user, db_get_user_by_id
from ..utils.crypto import create_session_key
from ..errors.custom_exceptions import UserNotFound, SessionNotFound
from ..utils.crypto import hash_func



async def signUp(user: User_create_schema):
    try:
        await db_add_user(User(**crypt_user(user)))
    except Exception as e:
        raise e

async def signIn(signin_info: User_signin_schema) -> int:
    user = await db_get_user_by_signin(User(**crypt_user(signin_info)))

    if not user:
        raise UserNotFound
    
    unique_session_key = await create_unique_session_key()
    session_info = Session_schema(session_key=unique_session_key, user_id=user.id)

    await db_add_session(SessionKey(**session_info.model_dump()))

    return {'session': unique_session_key}


async def signOut(session: str):
    if not session is None:
        session_key_schema = SessionKey_schema(session_key=session)
        await db_del_session(SessionKey(**session_key_schema.model_dump()))


async def create_unique_session_key() -> str:
    is_unique_session_key = False
    session_key = 0

    while not is_unique_session_key:
        session_key = create_session_key()
        session_key_schema = SessionKey_schema(session_key=session_key)
        user = await db_get_user_id_by_session(SessionKey(**session_key_schema.model_dump()))
        is_unique_session_key = user is None  

    return session_key      

def crypt_user(user):
    res = user.model_dump()
    res["password_hash"]=hash_func(user.password)
    del res["password"]
    return res



async def get_user_by_session(session: str) -> UserOpenSchema:
    user_id = await get_user_id_by_session(session)
    
    user = await db_get_user_by_id(user_id=user_id)
    if user is None:
        raise UserNotFound
    return UserOpenSchema(id=user.id, name=user.name, login=user.login)

async def get_user_by_request(session: str) -> UserOpenSchema:
    return await get_user_by_session(session)

async def get_user_id_by_session(session: str) -> User:
    user_id = await db_get_user_id_by_session(SessionKey(session_key = session))
    if user_id is None:
        raise SessionNotFound
    return user_id

async def get_user_id_by_request(request: Request) -> User:
    session = request.cookies.get("session")
    return await get_user_id_by_session(session)