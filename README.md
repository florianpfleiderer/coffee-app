# Getting Started with the application
To run this project in a docker container, go to the projects root folder and follow these commands:

```docker-compose up```

After this, you should see the containers for frontend and backend up and running in your docker application.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The Axios Library is used for API Requests.
We are using the yarn package manager (-> please don't run any npm or other package manager commands)

## Flask
Please initiate virtual environment with the name 'venv' to use yarn start-api.

```cd api```

```python3 -m venv venv```

Please run (to install all requirements in your virtual environment):

```pip install -r requirements.txt```


## installing Librarys
```
yarn install
yarn add <name>
```

## Project Structure

The project is organized as follows:

- `api/`: Contains the backend API code
- `frontend/`: Contains the React frontend code
- `docker-compose.yml`: Configures both the frontend and API services

## Running the Project

To run the entire application using Docker Compose:

```bash
docker-compose up
```

For development:
- Frontend: `cd frontend && npm start`
- API: `cd api && flask run`
