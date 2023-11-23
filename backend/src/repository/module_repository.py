from game.modules import Level
from repository.sqlalchemy_repository import SQLAlchemyRepository


class ModuleRepository(SQLAlchemyRepository):
    model = Level
