from repository.map_repository import MapRepository
from services.map_service import MapService


def map_service() -> MapService:
    return MapService(MapRepository)

# def users_service():
#     return UsersService(UsersRepository)
