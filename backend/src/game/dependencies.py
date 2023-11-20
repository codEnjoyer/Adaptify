from repository.level_repository import LevelRepository
from repository.map_repository import MapRepository
from repository.module_repository import ModuleRepository
from repository.question_repository import QuestionRepository
from repository.task_unit_repository import TaskUnitRepository
from repository.theory_unit_repository import TheoryUnitRepository
from services.level_service import LevelService
from services.map_service import MapService
from services.module_service import ModuleService
from services.question_service import QuestionService
from services.task_unit_service import TaskUnitService
from services.theory_unit_service import TheoryUnitService


def map_service() -> MapService:
    return MapService(MapRepository)


def module_service() -> ModuleService:
    return ModuleService(ModuleRepository)


def level_service() -> LevelService:
    return LevelService(LevelRepository)


def task_unit_service() -> TaskUnitService:
    return TaskUnitService(TaskUnitRepository)


def theory_unit_service() -> TheoryUnitService:
    return TheoryUnitService(TheoryUnitRepository)


def question_service() -> QuestionService:
    return QuestionService(QuestionRepository)
# def users_service():
#     return UsersService(UsersRepository)
