from repository.users.employee_repository import EmployeeRepository
from repository.users.tutor_repository import TutorRepository
from repository.users.user_repository import UserRepository
from services.users.employee_service import EmployeeService
from services.users.tutor_service import TutorService
from services.users.user_service import UserService


def employee_service() -> EmployeeService:
    return EmployeeService(EmployeeRepository)


def tutor_service() -> TutorService:
    return TutorService(TutorRepository)


def user_service() -> UserService:
    return UserService(UserRepository)
