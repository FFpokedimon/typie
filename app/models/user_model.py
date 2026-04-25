from sqlalchemy import LargeBinary
from sqlalchemy.orm import Mapped, mapped_column

from app.db.db_connection import database


class User(database.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    forename: Mapped[str] = mapped_column(nullable=True)
    surname: Mapped[str] = mapped_column(nullable=True)
    age: Mapped[int] = mapped_column(nullable=True)
    grade: Mapped[int] = mapped_column(nullable=False)
    city: Mapped[str] = mapped_column(nullable=True)
    avatar: Mapped[bytes] = mapped_column(LargeBinary, nullable=True)
    level: Mapped[int] = mapped_column(nullable=True)
    total_score: Mapped[int] = mapped_column(nullable=False)
