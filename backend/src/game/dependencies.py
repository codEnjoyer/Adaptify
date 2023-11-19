from repository.level_repository import LevelRepository
from repository.map_repository import MapRepository
from repository.models_repository import ModuleRepository
from services.level_service import LevelService
from services.map_service import MapService
from services.module_service import ModuleService


def map_service() -> MapService:
    return MapService(MapRepository)


def module_service() -> ModuleService:
    return ModuleService(ModuleRepository)


def level_service() -> LevelService:
    return LevelService(LevelRepository)
# def users_service():
#     return UsersService(UsersRepository)
