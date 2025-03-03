import { Router } from 'itty-router';

// Create a new router
const router = Router();

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
router.get('/api/coffees', async ({ env }) => {
  try {
    // Get coffees from KV store or return empty array if not found
    const coffees = await env.COFFEE_DB.get('coffees', { type: 'json' }) || [];
    return jsonResponse(coffees);
  } catch (error) {
    return jsonResponse({ error: 'Failed to fetch coffees' }, 500);
  }
});

router.post('/api/coffees', async (request, { env }) => {
  try {
    const coffee = await request.json();
    // Get existing coffees
    const coffees = await env.COFFEE_DB.get('coffees', { type: 'json' }) || [];
    // Add new coffee
    coffees.push(coffee);
    // Store updated array
    await env.COFFEE_DB.put('coffees', JSON.stringify(coffees));
    return jsonResponse({ message: "Coffee added successfully" });
  } catch (error) {
    return jsonResponse({ error: 'Failed to add coffee' }, 500);
  }
});

router.delete('/api/coffees/:name', async ({ params, env }) => {
  try {
    const { name } = params;
    // Get existing coffees
    const coffees = await env.COFFEE_DB.get('coffees', { type: 'json' }) || [];
    // Filter out the coffee to delete
    const updatedCoffees = coffees.filter(coffee => coffee.name !== name);
    // Store updated array
    await env.COFFEE_DB.put('coffees', JSON.stringify(updatedCoffees));
    return jsonResponse({ message: `Coffee ${name} deleted successfully.` });
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete coffee' }, 500);
  }
});

router.put('/api/coffees/:name', async (request, { params, env }) => {
  try {
    const { name } = params;
    const newAttribute = await request.json();
    
    // Get existing coffees
    const coffees = await env.COFFEE_DB.get('coffees', { type: 'json' }) || [];
    
    // Find and update the coffee
    const index = coffees.findIndex(coffee => coffee.name === name);
    if (index !== -1) {
      coffees[index] = { ...coffees[index], ...newAttribute };
      // Store updated array
      await env.COFFEE_DB.put('coffees', JSON.stringify(coffees));
      return jsonResponse({ message: "Coffee updated successfully." });
    }
    
    return jsonResponse({ message: "Coffee not found" }, 404);
  } catch (error) {
    return jsonResponse({ error: 'Failed to update coffee' }, 500);
  }
});

// Grinder routes
router.get('/api/grinders', async ({ env }) => {
  try {
    const grinders = await env.COFFEE_DB.get('grinders', { type: 'json' }) || [];
    return jsonResponse(grinders);
  } catch (error) {
    return jsonResponse({ error: 'Failed to fetch grinders' }, 500);
  }
});

router.post('/api/grinders', async (request, { env }) => {
  try {
    const grinder = await request.json();
    const grinders = await env.COFFEE_DB.get('grinders', { type: 'json' }) || [];
    grinders.push(grinder);
    await env.COFFEE_DB.put('grinders', JSON.stringify(grinders));
    return jsonResponse({ message: "Grinder added successfully" });
  } catch (error) {
    return jsonResponse({ error: 'Failed to add grinder' }, 500);
  }
});

router.delete('/api/grinders/:name', async ({ params, env }) => {
  try {
    const { name } = params;
    const grinders = await env.COFFEE_DB.get('grinders', { type: 'json' }) || [];
    const updatedGrinders = grinders.filter(grinder => grinder.name !== name);
    await env.COFFEE_DB.put('grinders', JSON.stringify(updatedGrinders));
    return jsonResponse({ message: `Grinder ${name} deleted successfully.` });
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete grinder' }, 500);
  }
});

router.put('/api/grinders/:name', async (request, { params, env }) => {
  try {
    const { name } = params;
    const newAttribute = await request.json();
    
    const grinders = await env.COFFEE_DB.get('grinders', { type: 'json' }) || [];
    const index = grinders.findIndex(grinder => grinder.name === name);
    if (index !== -1) {
      grinders[index] = { ...grinders[index], ...newAttribute };
      await env.COFFEE_DB.put('grinders', JSON.stringify(grinders));
      return jsonResponse({ message: "Grinder updated successfully." });
    }
    
    return jsonResponse({ message: "Grinder not found" }, 404);
  } catch (error) {
    return jsonResponse({ error: 'Failed to update grinder' }, 500);
  }
});

// Recipe routes
router.get('/api/recipes', async ({ env }) => {
  try {
    const recipes = await env.COFFEE_DB.get('recipes', { type: 'json' }) || [];
    return jsonResponse(recipes);
  } catch (error) {
    return jsonResponse({ error: 'Failed to fetch recipes' }, 500);
  }
});

router.post('/api/recipes', async (request, { env }) => {
  try {
    const recipe = await request.json();
    const recipes = await env.COFFEE_DB.get('recipes', { type: 'json' }) || [];
    recipes.push(recipe);
    await env.COFFEE_DB.put('recipes', JSON.stringify(recipes));
    return jsonResponse({ message: "Recipe added successfully" });
  } catch (error) {
    return jsonResponse({ error: 'Failed to add recipe' }, 500);
  }
});

router.delete('/api/recipes/:name', async ({ params, env }) => {
  try {
    const { name } = params;
    const recipes = await env.COFFEE_DB.get('recipes', { type: 'json' }) || [];
    const updatedRecipes = recipes.filter(recipe => recipe.name !== name);
    await env.COFFEE_DB.put('recipes', JSON.stringify(updatedRecipes));
    return jsonResponse({ message: `Recipe ${name} deleted successfully.` });
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete recipe' }, 500);
  }
});

router.put('/api/recipes/:name', async (request, { params, env }) => {
  try {
    const { name } = params;
    const newAttribute = await request.json();
    
    const recipes = await env.COFFEE_DB.get('recipes', { type: 'json' }) || [];
    const index = recipes.findIndex(recipe => recipe.name === name);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...newAttribute };
      await env.COFFEE_DB.put('recipes', JSON.stringify(recipes));
      return jsonResponse({ message: "Recipe updated successfully." });
    }
    
    return jsonResponse({ message: "Recipe not found" }, 404);
  } catch (error) {
    return jsonResponse({ error: 'Failed to update recipe' }, 500);
  }
});

// 404 for everything else
router.all('*', () => new Response('Not Found', { status: 404 }));

// Handle requests
export default {
  fetch: router.handle
};
