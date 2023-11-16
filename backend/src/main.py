from fastapi import FastAPI, APIRouter, status, Depends
from fastapi.responses import RedirectResponse

from game.levels.router import router as levels_router
from game.modules.router import router as modules_router
from game.map.router import router as map_router
from game.units.tasks.router import router as tasks_router
from game.units.theory.router import router as theory_router

from users.router import router as users_router
from users.tutors.router import router as tutors_router
from users.employees.router import router as employees_router

from auth.router import router as auth_router
from auth.base_config import current_active_user

from settings import Settings

app = FastAPI(title="Adaptify")


def include_routers(*routers: APIRouter) -> None:
    for router in routers:
        app.include_router(router)


@app.get("/", response_class=RedirectResponse, status_code=status.HTTP_308_PERMANENT_REDIRECT)
async def root():
    return f'http://localhost:{Settings.backend_port}/docs'


@app.get("/protected-route")
async def protected_route(user=Depends(current_active_user)):
    return "Hi there prot"


@app.get("/unprotected-route")
async def unprotected_route():
    return "Hi there unprot"


include_routers(
    # levels_router,
    # modules_router,
    # map_router,
    # tasks_router,
    # theory_router,
    # users_router,
    # tutors_router,
    # employees_router,
    auth_router
)
