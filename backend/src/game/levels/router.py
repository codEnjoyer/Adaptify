from uuid import UUID

from fastapi import APIRouter

from game.levels.schemas import LevelRead, LevelCreate, LevelUpdate

router = APIRouter(prefix="/levels", tags=["Levels"])


@router.get("/")
async def root() -> list[LevelRead]:
    return []


@router.get("/{id}")
async def get_level(id: UUID) -> LevelRead:
    return LevelRead(id=id, is_accomplished=False)


@router.post("/")
async def post_level(level_create: LevelCreate) -> LevelRead:
    return LevelRead()


@router.delete("/{id}")
async def delete_level(id: UUID) -> LevelRead:
    return LevelRead(id=id, is_accomplished=False)


@router.patch("/{id}")
async def update_level(id: UUID,
                       level_update: LevelUpdate) -> LevelRead:
    return LevelRead(id=id, is_accomplished=True)
