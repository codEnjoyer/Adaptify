from typing import ClassVar

from dotenv import load_dotenv
import os

from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings

load_dotenv()

DB_USER = os.environ.get("POSTGRES_USER")
DB_PASS = os.environ.get("POSTGRES_PASSWORD")
DB_HOST = os.environ.get("POSTGRES_DB_HOST")
DB_PORT = os.environ.get("POSTGRES_DB_PORT")
DB_NAME = os.environ.get("POSTGRES_DB")

SECRET_JWT_KEY = os.environ.get("SECRET_JWT_KEY")

BACK_APP_PORT = os.environ.get("BACK_APP_PORT")
FRONT_APP_PORT = os.environ.get("FRONT_APP_PORT")


class Settings(BaseSettings):
    pg_url: ClassVar[PostgresDsn] = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    secret_jwt: ClassVar[SecretStr] = SECRET_JWT_KEY
    backend_port: ClassVar[int] = BACK_APP_PORT
    frontend_port: ClassVar[int] = FRONT_APP_PORT
