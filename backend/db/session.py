from ..models.session import SessionKey
from ..models.user import User
from ..database import connection
from ..schemas.session import SessionKey_schema

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

@connection
async def db_add_session(sessioninfo: SessionKey, session: AsyncSession):
    try:
        session.add(sessioninfo)
        await session.commit()
    except Exception as e:
        raise e

@connection
async def db_del_session(sessioninfo: SessionKey, session: AsyncSession):
    try:
        query = delete(SessionKey).where(SessionKey.session_key==sessioninfo.session_key)
        await session.execute(query)
        await session.commit()
    except Exception as e:
        raise e
    
@connection
async def db_get_user_id_by_session(sessioninfo: SessionKey, session: AsyncSession) -> User | None:
    try:
        query = select(SessionKey).where(SessionKey.session_key==sessioninfo.session_key)
        result = await session.execute(query)
        fullSessoinInfo = result.scalar_one_or_none()

        if fullSessoinInfo == None:
            return None
        
        res = fullSessoinInfo.user_id

        return res
    except Exception as e:
        raise e
