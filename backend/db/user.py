import inspect

from backend.errors.custom_exceptions import UserNotFound, SimilarUserExist
from ..models.user import User
from ..database import connection
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update, insert

@connection
async def db_add_user(user: User, session: AsyncSession):
    await db_check_for_similar_user(user, session)

    session.add(user)
    await session.commit()

@connection
async def db_del_user(user: User, session: AsyncSession):
    query = delete(User).where(User.id==user.id)
    await session.execute(query)
    session.expunge(User)
    await session.commit()

@connection
async def db_update_user(user: User, session: AsyncSession):
    await db_check_for_similar_user(user, session)

    query = update(User).where(User.id==user.id)

    update_is_empty = True
    if user.password_hash is not None:
        query = query.values(password_hash=user.password_hash)
        update_is_empty = False
    if user.login is not None:
        query = query.values(login=user.login)
        update_is_empty = False
    if user.name is not None:
        query = query.values(name=user.name)
        update_is_empty = False

    if update_is_empty:
        return None
    await session.execute(query)
    await session.commit()
    
@connection
async def db_get_user_by_signin(user: User, session: AsyncSession) -> User | None:
    query = select(User).where(User.login==user.login).where(User.password_hash==user.password_hash)
    result = await session.execute(query)
    record = result.scalar_one_or_none()
    if record is None:
        return None
    return record

@connection
async def db_get_user_by_id(user_id: int, session: AsyncSession) -> User:
    query = select(User).where(User.id==user_id)
    result = await session.execute(query)
        
    record = result.scalar_one_or_none()

    if(record is None):
        raise UserNotFound()

    return record

async def db_check_for_similar_user(user: User, session: AsyncSession):
    if user.login is None and user.name is None:
        return None
    if user.login is not None:
        query=select(User).where(User.login==user.login)
        similar_user = (await session.execute(query)).scalars().all()
        if len(similar_user) > 0:
            raise SimilarUserExist()
    if user.login is not None:
        query=select(User).where(User.name==user.name)
        similar_user = (await session.execute(query)).scalars().all()
        if len(similar_user) > 0:
            raise SimilarUserExist()
