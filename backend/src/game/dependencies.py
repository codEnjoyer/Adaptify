from repository.level_repository import LevelRepository
from repository.map_repository import MapRepository
from repository.module_repository import ModuleRepository
from repository.task_unit_repository import TaskUnitRepository
from services.level_service import LevelService
from services.map_service import MapService
from services.module_service import ModuleService
from services.task_unit_service import TaskUnitService


def map_service() -> MapService:
    return MapService(MapRepository)


def module_service() -> ModuleService:
    return ModuleService(ModuleRepository)


def level_service() -> LevelService:
    return LevelService(LevelRepository)


def task_unit_service() -> TaskUnitService:
    return TaskUnitService(TaskUnitRepository)
# def users_service():
#     return UsersService(UsersRepository)
