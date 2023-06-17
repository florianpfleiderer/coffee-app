# Install the base requirements for the app.
# This stage is to support development.
FROM python:3.9
WORKDIR /app

COPY . .
RUN pip install -r ./requirements.txt
ENV FLASK_ENV production
EXPOSE 5000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "80"]