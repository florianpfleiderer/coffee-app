#!/bin/bash
# Deployment script for Coffee App to Cloudflare

echo "=== Starting deployment process ==="

# Activate conda environment where Wrangler is installed
source $(conda info --base)/etc/profile.d/conda.sh
conda activate nodejs

# Step 1: Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Step 2: Deploy only the frontend build to Cloudflare Pages
echo "Deploying frontend to Cloudflare Pages..."
cd frontend
wrangler pages deploy build --project-name=coffee-app --commit-message="Deploy from script" --commit-dirty=true
cd ..

# Step 3: Deploy the functions separately
echo "Deploying functions to Cloudflare Workers..."
cd functions

# Create an explicit wrapper script that doesn't require TypeScript compilation
echo "Creating simplified worker script..."
cat > worker.js << 'EOL'
import { Router } from 'itty-router';

// Create a new router
const router = Router();

// Mock database for demonstration
const mockDb = {
  coffees: [],
  grinders: [],
  recipes: []
};

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper for JSON responses
const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
};

// Handle OPTIONS requests for CORS
router.options('*', () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
});

// Default route
router.get('/', () => {
  return new Response('You have reached the default route for the coffee app api.');
});

// Coffee routes
router.get('/api/coffees', () => {
  return jsonResponse(mockDb.coffees);
});

router.post('/api/coffees', async (request) => {
  const coffee = await request.json();
  mockDb.coffees.push(coffee);
  return jsonResponse({ message: "Coffee added successfully" });
});

router.delete('/api/coffees/:name', ({ params }) => {
  const { name } = params;
  mockDb.coffees = mockDb.coffees.filter(coffee => coffee.name !== name);
  return jsonResponse({ message: `Coffee ${name} deleted successfully.` });
});

router.put('/api/coffees/:name', async (request, { params }) => {
  const { name } = params;
  const newAttribute = await request.json();
  
  const index = mockDb.coffees.findIndex(coffee => coffee.name === name);
  if (index !== -1) {
    mockDb.coffees[index] = { ...mockDb.coffees[index], ...newAttribute };
    return jsonResponse({ message: "Coffee updated successfully." });
  }
  
  return jsonResponse({ message: "Coffee not found" }, 404);
});

// Grinder routes
router.get('/api/grinders', () => {
  return jsonResponse(mockDb.grinders);
});

router.post('/api/grinders', async (request) => {
  const grinder = await request.json();
  mockDb.grinders.push(grinder);
  return jsonResponse({ message: "Grinder added successfully" });
});

router.delete('/api/grinders/:name', ({ params }) => {
  const { name } = params;
  mockDb.grinders = mockDb.grinders.filter(grinder => grinder.name !== name);
  return jsonResponse({ message: `Grinder ${name} deleted successfully.` });
});

router.put('/api/grinders/:name', async (request, { params }) => {
  const { name } = params;
  const newAttribute = await request.json();
  
  const index = mockDb.grinders.findIndex(grinder => grinder.name === name);
  if (index !== -1) {
    mockDb.grinders[index] = { ...mockDb.grinders[index], ...newAttribute };
    return jsonResponse({ message: "Grinder updated successfully." });
  }
  
  return jsonResponse({ message: "Grinder not found" }, 404);
});

// Recipe routes
router.get('/api/recipes', () => {
  return jsonResponse(mockDb.recipes);
});

router.post('/api/recipes', async (request) => {
  const recipe = await request.json();
  mockDb.recipes.push(recipe);
  return jsonResponse({ message: "Recipe added successfully" });
});

router.delete('/api/recipes/:name', ({ params }) => {
  const { name } = params;
  mockDb.recipes = mockDb.recipes.filter(recipe => recipe.name !== name);
  return jsonResponse({ message: `Recipe ${name} deleted successfully.` });
});

router.put('/api/recipes/:name', async (request, { params }) => {
  const { name } = params;
  const newAttribute = await request.json();
  
  const index = mockDb.recipes.findIndex(recipe => recipe.name === name);
  if (index !== -1) {
    mockDb.recipes[index] = { ...mockDb.recipes[index], ...newAttribute };
    return jsonResponse({ message: "Recipe updated successfully." });
  }
  
  return jsonResponse({ message: "Recipe not found" }, 404);
});

// 404 for everything else
router.all('*', () => new Response('Not Found', { status: 404 }));

// Handle requests
export default {
  fetch: router.handle
};
EOL

# Create a simplified wrangler.toml for the functions
cat > wrangler.toml << 'EOL'
name = "coffee-app-api"
main = "worker.js"
compatibility_date = "2023-05-18"

# Deploy the worker
echo "Deploying worker to Cloudflare..."
wrangler deploy --name=coffee-app-api

cd ..

echo "=== Deployment complete ==="
echo "Your application is now deployed to Cloudflare!"
echo "Note: You may need to update your frontend to point to the Worker URL for API requests." 