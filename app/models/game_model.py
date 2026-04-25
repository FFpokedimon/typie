from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.db_connection import database


class Game(database.Model):
    __tablename__ = "games"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    chars: Mapped[str] = mapped_column(nullable=False)
    velocity: Mapped[str] = mapped_column(nullable=False)
    time: Mapped[int] = mapped_column(nullable=False)
    score: Mapped[int] = mapped_column(nullable=False)
