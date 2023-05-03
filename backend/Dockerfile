FROM python:3.9

WORKDIR /app

COPY requirements.txt ./

RUN apt update && \
    apt install -y ffmpeg && \
    pip install -r requirements.txt
