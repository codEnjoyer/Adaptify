from uuid import UUID

from fastapi import APIRouter

from game.units.theory.schemas import TheoryUnitRead, TheoryUnitCreate, TheoryUnitUpdate
from utils.types import TheoryUnitServiceType

router = APIRouter(tags=["Theory"])


@router.get('/theory/', tags=['Dev'])
async def root(theory_unit_service: TheoryUnitServiceType) -> list[TheoryUnitRead]:
    return await theory_unit_service.get_all()


# @router.get("/maps/{map_id}/modules/{module_id}/levels/{level_id}/theory/{theory_id}/")
# async def get_level_theory_unit(map_id: UUID,
#                                 module_id: UUID,
#                                 level_id: UUID,
#                                 theory_id: UUID,
#                                 theory_unit_service: TheoryUnitServiceType) -> TheoryUnitRead:
#     return await theory_unit_service.get_one(theory_id)


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/theory/")
async def post_theory_unit_to_level(map_id: UUID,
                                    module_id: UUID,
                                    level_id: UUID,
                                    theory_create: TheoryUnitCreate,
                                    theory_unit_service: TheoryUnitServiceType) -> TheoryUnitRead:
    return await theory_unit_service.create_one(level_id, theory_create)


@router.delete("/maps/{map_id}/modules/{module_id}/levels/{level_id}/theory/{theory_id}/")
async def delete_theory_unit_from_level(map_id: UUID,
                                        module_id: UUID,
                                        level_id: UUID,
                                        theory_id: UUID,
                                        theory_unit_service: TheoryUnitServiceType) -> TheoryUnitRead:
    return await theory_unit_service.delete_one(theory_id)


@router.patch("/maps/{map_id}/modules/{module_id}/levels/{level_id}/theory/{theory_id}/")
async def update_theory_unit_in_level(map_id: UUID,
                                      module_id: UUID,
                                      level_id: UUID,
                                      theory_id: UUID,
                                      theory_update: TheoryUnitUpdate,
                                      theory_unit_service: TheoryUnitServiceType) -> TheoryUnitRead:
    return await theory_unit_service.update_one(theory_id, theory_update)
