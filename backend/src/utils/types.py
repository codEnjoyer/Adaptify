from typing import Annotated

from fastapi import Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from auth.base_config import current_user, current_superuser
from database import get_async_session
from game.dependencies import map_service, module_service
from services.map_service import MapService
from services.module_service import ModuleService
from users.models import User

CurrentUser = Annotated[User, Depends(current_user)]
CurrentSuperuser = Annotated[User, Depends(current_superuser)]

MapServiceType = Annotated[MapService, Depends(map_service)]
ModuleServiceType = Annotated[ModuleService, Depends(module_service)]

AsyncDBSession = Annotated[AsyncSession, Depends(get_async_session)]
QueryDBLimit = Annotated[int, Query(ge=0, le=10 ** 3)]
QueryDBOffset = Annotated[int, Query(ge=0, le=10 ** 6)]