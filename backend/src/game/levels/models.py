import typing
import uuid

from sqlalchemy import String, Boolean, UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from game.modules.models import Module
    from game.units.tasks.models import TaskUnit
    from game.units.theory.models import TheoryUnit


class Level(BaseModel):
    __tablename__ = 'levels'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    is_accomplished: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    module: Mapped["Module"] = relationship(back_populates='level')
    theory: Mapped[list["TheoryUnit"]] = relationship(back_populates='level')
    tasks: Mapped[list["TaskUnit"]] = relationship(back_populates='level')
