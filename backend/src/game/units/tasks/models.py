import uuid

from sqlalchemy import UUID, Boolean, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel


class Task(BaseModel):
    __tablename__ = 'tasks'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    is_accomplished: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    # TODO: Задание не может быть выполнено глобально, нужна таблица для выполненных заданий пользователями
    # requires_review: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    score_reward: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    content: Mapped[str] = mapped_column(Text, nullable=False, default="Текст задания")
    # proof: Mapped[URL] = mapped_column(URLType, nullable=True, default=None)

# class Proof(BaseModel):
#     __tablename__ = "proofs"
#
#     content: Mapped[list[URL]] = mapped_column()
#
#     user: Mapped[User] = relationship(back_populates="proof")
#     task: Mapped[Task] = relationship(back_populates="proof")
