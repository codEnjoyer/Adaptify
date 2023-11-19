from game.modules import Module
from repository.sqlalchemy_repository import SQLAlchemyRepository


class ModuleRepository(SQLAlchemyRepository):
    model = Module
