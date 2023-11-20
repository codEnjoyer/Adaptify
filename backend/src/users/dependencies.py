from repository.employee_repository import EmployeeRepository
from repository.tutor_repository import TutorRepository
from repository.user_repository import UserRepository
from services.employee_service import EmployeeService
from services.tutor_service import TutorService
from services.user_service import UserService


def employee_service() -> EmployeeService:
    return EmployeeService(EmployeeRepository)


def tutor_service() -> TutorService:
    return TutorService(TutorRepository)


def user_service() -> UserService:
    return UserService(UserRepository)
