import typing
import uuid

from sqlalchemy import UUID, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from users.tutors.schemas import TutorRead

if typing.TYPE_CHECKING:
    from users import User
    from users.employees import Employee


class Tutor(BaseModel):
    __tablename__ = "tutors"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('users.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    patronymic: Mapped[str] = mapped_column(String(length=255))

    user: Mapped["User"] = relationship(back_populates='tutor', lazy='selectin')
    employees: Mapped[list["Employee"]] = relationship(back_populates='tutor', lazy='selectin')

    def to_read_schema(self) -> TutorRead:
        return TutorRead(id=self.id,
                         name=self.name,
                         last_name=self.last_name,
                         patronymic=self.patronymic,
                         user=self.user)
