import typing
import uuid

from sqlalchemy import String, UUID, ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.modules.schemas import ModuleRead

if typing.TYPE_CHECKING:
    from game.levels import Level
    from game.map import Map


class Module(BaseModel):
    __tablename__ = 'modules'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(length=255), nullable=False)
    map_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('maps.id'))
    previous_module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=True)
    next_module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=True)

    map: Mapped["Map"] = relationship(back_populates='modules', lazy='selectin')

    levels: Mapped[list["Level"]] = relationship(back_populates='module', lazy='selectin')
    levels_ids: AssociationProxy[list[uuid.UUID]] = association_proxy('levels', 'id')

    def to_read_schema(self) -> ModuleRead:
        return ModuleRead(id=self.id,
                          title=self.title,
                          map_id=self.map_id,
                          previous_module_id=self.previous_module_id,
                          next_module_id=self.next_module_id,
                          levels_ids=self.levels_ids)
