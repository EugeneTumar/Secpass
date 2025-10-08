import inspect

from backend.errors.custom_exceptions import UserNotFound
from ..models.user import User
from ..database import connection
from ..schemas.user import Full_user_schema, User_create_schema, User_schema, User_signin_schema
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update, insert

@connection
async def db_add_user(user: User, session: AsyncSession):
    try:
        session.add(user)
        await session.commit()
    except Exception as e:
        frame = inspect.currentframe()
        print(frame.f_code.co_name)
        raise e

@connection
async def db_del_user(user: User, session: AsyncSession):
    try:
        query = delete(User).where(User.id==user.id)
        await session.execute(query)
        session.expunge(User)
        await session.commit()
    except Exception as e:
        frame = inspect.currentframe()
        print(frame.f_code.co_name)
        raise e

#might update password_hash only
@connection
async def db_update_user(user: User, session: AsyncSession):
    try:
        query = update(User).where(User.id==user.id).values(password_hash=user.password_hash)
        await session.execute(query)
        await session.commit()
    except Exception as e:
        frame = inspect.currentframe()
        print(frame.f_code.co_name)
        raise e
    
@connection
async def db_get_user_by_signin(user: User, session: AsyncSession) -> Full_user_schema | None:
    try:
        query = select(User).where(User.login==user.login).where(User.password_hash==user.password_hash)
        result = await session.execute(query)
        record = result.scalar_one_or_none()
        if record is None:
            return None
        return Full_user_schema(name=record.name, login=record.login, password_hash=record.password_hash, id=record.id)
    except Exception as e:
        frame = inspect.currentframe()
        print(frame.f_code.co_name)
        raise e

@connection
async def db_get_user_by_id(user_id: int, session: AsyncSession):
    try:
        query = select(User).where(User.id==user_id)
        result = await session.execute(query)
        
        record = result.scalar_one_or_none()

        if(record is None):
            raise UserNotFound

        return record
    except Exception as e:
        raise e
