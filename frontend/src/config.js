// Configuration file for the Coffee App

// API base URL - update this with your Cloudflare Worker URL when deployed
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://coffee-app-api.your-cloudflare-worker-url.workers.dev' 
  : '';  // In development, empty string means use the proxy from package.json

export { API_BASE_URL }; 