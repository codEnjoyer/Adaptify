#!/bin/bash
# При запуске стоит указывать здесь номер последней миграции
alembic upgrade b71a5f16b60e
cd src || exit
gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:"$BACK_APP_PORT" --timeout 300