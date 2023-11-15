# Dockerfile
# Created on June 15 2023 by Florian Pfleiderer
# Copyright (c) MIT License


# Install the base requirements for the app.
# This stage is to support development.
FROM python:3.9
WORKDIR /app

COPY . ./api
WORKDIR /app/api
RUN pip install -r ./requirements.txt
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=80

EXPOSE 80

CMD ["flask", "run"]