from game.units.tasks import EmployeeTask
from repository.sqlalchemy_repository import SQLAlchemyRepository


class EmployeeTaskRepository(SQLAlchemyRepository):
    model = EmployeeTask
