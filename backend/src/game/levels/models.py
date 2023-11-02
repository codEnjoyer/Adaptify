import typing
import uuid

from sqlalchemy import String, Boolean, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from game.modules.models import Module
    from game.units.tasks.models import Task
    from game.units.theory.models import Theory


class Level(BaseModel):
    __tablename__ = 'levels'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    is_accomplished: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    module: Mapped["Module"] = relationship(back_populates='level')
    theory: Mapped[list["Theory"]] = relationship(back_populates='level')
    tasks: Mapped[list["Task"]] = relationship(back_populates='level')
