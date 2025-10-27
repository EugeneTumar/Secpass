
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
import asyncio

from backend.database import Base
import os
from dotenv import load_dotenv

env_directory = os.getcwd()
load_dotenv(os.path.join(env_directory, '.env'))
DATABASE_URL = os.environ.get('DATABASE_URL')
print(DATABASE_URL)

engine = create_async_engine('postgresql+asyncpg://postgres:@localhost:5432/secpass')
sessionmaker = async_sessionmaker(engine, expire_on_commit=False)

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        print(1)

if __name__=='__main__':
    asyncio.run(init_models())
    