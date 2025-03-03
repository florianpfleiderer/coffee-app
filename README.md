# Coffee App

A comprehensive application for coffee enthusiasts to track their beans, recipes, and brewing methods.

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)

## Project Overview

This application allows coffee enthusiasts to:
- Track their coffee inventory
- Record brewing recipes
- Manage grinder settings
- Explore coffee news and varieties
- View coffee-growing regions on a map

## Project Structure

The project is organized as follows:

- `api/`: Contains the Flask backend API code
- `frontend/`: Contains the React frontend code
- `functions/`: Contains Cloudflare Worker functions
- `docker-compose.yml`: Configures both the frontend and API services
- `deploy.sh`: Script for deploying to Cloudflare

## Local Development

### Prerequisites

- Node.js and npm/yarn
- Python 3.7+ and pip
- Docker and Docker Compose (for containerized deployment)

### Setting Up the Frontend

```bash
cd frontend
yarn install
yarn start
```

The frontend will be available at http://localhost:3000.

### Setting Up the Backend

```bash
cd api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

The API will be available at http://localhost:5000.

## Docker Deployment

### Local Deployment with Docker Compose

Docker Compose allows you to run both the frontend and backend in containers, which ensures consistency across development environments.

1. Make sure Docker and Docker Compose are installed on your system.

2. From the project root directory, run:

```bash
docker-compose up
```

This command will:
- Build the frontend and backend Docker images if they don't exist
- Create and start containers for both services
- Configure networking between them
- Map ports to your host machine

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

4. To stop the containers, press `Ctrl+C` in the terminal or run:

```bash
docker-compose down
```

### Docker Compose Configuration

The `docker-compose.yml` file configures:
- API service with Flask running on port 8000
- Frontend service with React running on port 3000
- Health checks to ensure the API is running before starting the frontend
- A bridged network for communication between services
- Volume mapping for live code updates during development

## Production Deployment

### Deploying to Cloudflare with deploy.sh

The project includes a deployment script that automates deployment to Cloudflare Pages and Workers.

1. Prerequisites:
   - Cloudflare account
   - Wrangler CLI installed and authenticated
   - Node.js environment (Conda or other)

2. Run the deployment script:

```bash
chmod +x deploy.sh  # Make the script executable (one-time setup)
./deploy.sh
```

The script will:
1. Build the React frontend
2. Deploy the frontend to Cloudflare Pages
3. Set up and deploy a Cloudflare Worker for the API
4. Configure routing and CORS

Once deployed, your application will be available at your Cloudflare Pages URL, with the API accessible through Cloudflare Workers.

### Manual Deployment

If you prefer to deploy manually or to a different platform:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `build` directory to your hosting platform.

3. Set up the backend API on a server of your choice, ensuring it's accessible to your frontend.

4. Update the API URL in the frontend configuration.
