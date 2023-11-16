FROM python:3.11.4-slim-bullseye

WORKDIR /app

COPY ./requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip

RUN pip install --no-cache-dir -r ./requirements.txt

COPY ./ ./

RUN chmod a+x ./*.sh