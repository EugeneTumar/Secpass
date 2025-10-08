import asyncio
import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

Base = declarative_base()

current_directory = os.getcwd()
load_dotenv(os.path.join(current_directory, '.env'))
engine = create_async_engine('postgresql+asyncpg://postgres:@localhost:5432/secpass')
sessionmaker = async_sessionmaker(engine, expire_on_commit=False)


def connection(method):
    async def wrapper(*args, **kwargs):
        async with sessionmaker() as session:
            try:
                res = await method(*args, session=session, **kwargs)
            
                await session.commit()
                await session.close() 

                return res
            except Exception as e:
                await session.rollback() 
                raise e 
            finally:
                await session.close() 
    return wrapper
