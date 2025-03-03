// Configuration file for the Coffee App

// Debugging info to help understand the environment
console.log('Current environment:', process.env.NODE_ENV);

// API base URL - update this with your Cloudflare Worker URL when deployed
let API_BASE_URL = '';

if (process.env.NODE_ENV === 'production') {
  // In production, use the Cloudflare Worker URL
  API_BASE_URL = 'https://coffee-app-api.code-user.workers.dev';
  console.log('Using production API URL:', API_BASE_URL);
} else {
  // In development, use an empty string to leverage the proxy in package.json
  // or you can set a local development URL if you're not using the proxy
  API_BASE_URL = '';
  console.log('Using development proxy configuration');
}

// Remove trailing slash if present
if (API_BASE_URL.endsWith('/')) {
  API_BASE_URL = API_BASE_URL.slice(0, -1);
}

export { API_BASE_URL }; 