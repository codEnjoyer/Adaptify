#!/bin/bash
# При запуске стоит указывать здесь номер последней миграции
alembic revision --autogenerate
alembic upgrade head || alembic upgrade ee38e6a7803e
cd src || exit
gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:"$BACK_APP_PORT" --timeout 300