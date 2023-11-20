from repository.employee_repository import EmployeeRepository
from repository.tutor_repository import TutorRepository
from services.employee_service import EmployeeService
from services.tutor_service import TutorService


def employee_service() -> EmployeeService:
    return EmployeeService(EmployeeRepository)


def tutor_service() -> TutorService:
    return TutorService(TutorRepository)
