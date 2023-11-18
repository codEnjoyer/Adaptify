import typing
import uuid

from sqlalchemy import String, UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from game.map.models import Map
    from game.levels.models import Level


class Module(BaseModel):
    __tablename__ = 'modules'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    previous_module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=True)
    next_module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=True)
    map_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('maps.id'))
    title: Mapped[str] = mapped_column(String(length=255), nullable=False)

    map: Mapped["Map"] = relationship(back_populates='modules')
    # levels: Mapped[list["Level"]] = relationship(back_populates='module')
    # next_module: Mapped["Module"] = relationship(back_populates='previous_module')
    # previous_module: Mapped["Module"] = relationship(back_populates='next_module')
