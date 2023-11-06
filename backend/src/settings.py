from typing import ClassVar

from dotenv import load_dotenv
import os

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings

load_dotenv()

DB_USER = os.environ.get("POSTGRES_USER")
DB_PASS = os.environ.get("POSTGRES_PASSWORD")
DB_HOST = os.environ.get("POSTGRES_DB_HOST")
DB_PORT = os.environ.get("POSTGRES_DB_PORT")
DB_NAME = os.environ.get("POSTGRES_DB")


class Settings(BaseSettings):
    pg_url: ClassVar[PostgresDsn] = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
