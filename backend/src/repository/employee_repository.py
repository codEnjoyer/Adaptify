from repository.sqlalchemy_repository import SQLAlchemyRepository
from users.employees import Employee


class EmployeeRepository(SQLAlchemyRepository):
    model = Employee
