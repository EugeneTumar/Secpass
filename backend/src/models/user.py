from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String
from ..database import Base

class User(Base): 
    __tablename__ = "Users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    login: Mapped[str] = mapped_column(String(100), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(100), nullable=False)
