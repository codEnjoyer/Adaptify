from game.units import TaskUnit
from repository.sqlalchemy_repository import SQLAlchemyRepository


class TaskUnitRepository(SQLAlchemyRepository):
    model = TaskUnit
