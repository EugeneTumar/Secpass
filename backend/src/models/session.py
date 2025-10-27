from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String
from ..database import Base

class SessionKey(Base):
    __tablename__ = "SessionKeys"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int]
    session_key: Mapped[str] = mapped_column(String(100), nullable=False)
