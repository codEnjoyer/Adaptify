import uuid

from sqlalchemy import String, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.levels.models import Level


class Module(BaseModel):
    __tablename__ = 'modules'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)

    levels: Mapped[list[Level]] = relationship(back_populates='module')
    previous_module: Mapped["Module"] = relationship(back_populates='next_module')
    next_module: Mapped["Module"] = relationship(back_populates='previous_module')
