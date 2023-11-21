from game.map import Map
from repository.sqlalchemy_repository import SQLAlchemyRepository


class MapRepository(SQLAlchemyRepository):
    model = Map
