import typing
import uuid

from sqlalchemy import String, UUID
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.map.schemas import MapRead, MapCreate

if typing.TYPE_CHECKING:
    from game.modules.models import Level


class Map(BaseModel):
    __tablename__ = "maps"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(length=255), nullable=False)

    modules: Mapped[list["Level"]] = relationship(back_populates='map', lazy='selectin')
    modules_ids: AssociationProxy[list[uuid.UUID]] = association_proxy('modules', 'id')

    def to_read_schema(self) -> MapRead:
        return MapRead(id=self.id,
                       title=self.title,
                       modules_ids=self.modules_ids)
