import asyncio
from logging.config import fileConfig
import os
import sys

import alembic_postgresql_enum

from sqlalchemy import Connection
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

sys.path.append(os.path.join(sys.path[0], 'src'))
from settings import Settings

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.

config = context.config
ini_section = config.config_ini_section
config.set_section_option(ini_section, "pg_url", Settings.pg_url)

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata

from game.map import Map
from game.modules import Level
from game.levels import Level
from game.units.tasks import TaskUnit, EmployeeTask
from game.units.theory import TheoryUnit  # , TheoryVideo
from game.units.tasks.questions import Question
from game.units.tasks.questions.answers import AnswerOption
from game.units.tasks.proofs.models import Proof, ProofVideos, ProofImages

from users import User
from users.tutors import Tutor
from users.employees import Employee

from database import BaseModel

target_metadata = BaseModel.metadata


# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """In this scenario we need to create an Engine
    and associate a connection with the context.

    """

    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""

    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
