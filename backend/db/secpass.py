from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from backend.errors.custom_exceptions import SecpassNotFound

from ..schemas.secpass import SecpassFullSchema, SecpassModelSchema, SecpassShortSchema
from ..database import connection
from ..models.secpass import SecPassModel 

@connection
async def db_add_secpass(secPassinfo: SecPassModel, session: AsyncSession):
    try:
        session.add(secPassinfo)
        await session.commit()
    except Exception as e:
        raise e

@connection
async def db_del_secpass_by_id(id: int, session: AsyncSession):
    try:
        query = delete(SecPassModel).where(SecPassModel.id==id)
        await session.execute(query)
        await session.commit()
    except Exception as e:
        raise e
    
@connection
async def db_get_secpasses_by_user_id(user_id, session: AsyncSession) -> list[SecpassFullSchema]:
    try:
        query = select(SecPassModel).where(SecPassModel.user_id==user_id)
        result = await session.execute(query)
        secpass_list = result.scalars().all()
        return [SecpassModelSchema(id=secpass.id, label=secpass.label, key_checker=secpass.key_checker, secpass=secpass.secpass, user_id=secpass.user_id) for secpass in secpass_list]
    
    except Exception as e:
        raise e
    

@connection
async def db_get_secpass_by_id(id: int, session: AsyncSession) -> SecpassFullSchema:
    try:
        query = select(SecPassModel).where(SecPassModel.id==id)
        result = await session.execute(query)
        secpasses = result.one_or_none()
        if secpasses is None:
            raise SecpassNotFound
        secpass = secpasses[0]
        return SecpassModelSchema(id=secpass.id, label=secpass.label, key_checker=secpass.key_checker, secpass=secpass.secpass, user_id=secpass.user_id)
    
    except Exception as e:
        raise e
    
