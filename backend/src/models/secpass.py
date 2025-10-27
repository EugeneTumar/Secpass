from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String
from ..database import Base

class SecPassModel(Base):
    __tablename__ = "Passwords"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    label: Mapped[str] = mapped_column(nullable=False)
    key_checker: Mapped[str] = mapped_column(nullable=False)
    secpass: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
