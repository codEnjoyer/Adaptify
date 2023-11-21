from game.levels import Level
from repository.sqlalchemy_repository import SQLAlchemyRepository


class LevelRepository(SQLAlchemyRepository):
    model = Level
