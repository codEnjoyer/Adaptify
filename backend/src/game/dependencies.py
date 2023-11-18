from repository.map_repository import MapRepository
from repository.models_repository import ModuleRepository
from services.map_service import MapService
from services.module_service import ModuleService


def map_service() -> MapService:
    return MapService(MapRepository)


def module_service() -> ModuleService:
    return ModuleService(ModuleRepository)

# def users_service():
#     return UsersService(UsersRepository)
