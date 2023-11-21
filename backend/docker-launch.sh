#!/bin/bash
# При запуске стоит указывать здесь номер последней миграции
alembic revision --autogenerate
alembic upgrade head || alembic upgrade 1d75241f340c
cd src || exit
gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:"$BACK_APP_PORT" --timeout 300