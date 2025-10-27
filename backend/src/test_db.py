from .database import Base, engine
from sqlalchemy.ext.asyncio import AsyncSession
import pytest

@pytest.mark.asyncio
async def test_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)