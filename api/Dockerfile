# Dockerfile
# Created on June 15 2023 by Florian Pfleiderer
# Copyright (c) MIT License


# Install the base requirements for the app.
# This stage is to support development.
FROM python:3.9
WORKDIR /app

# Copy only requirements first to leverage Docker cache
COPY api/requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the api directory
COPY api/ .

ENV FLASK_APP=api.py
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000

EXPOSE 8000

# Change the command to use Flask run instead
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]