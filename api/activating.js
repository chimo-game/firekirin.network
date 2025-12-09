/**
 * API Route: /api/activating
 * This is a Node.js version of your PHP activating system
 * It acts as a router/proxy to fetch content from your main server
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // ==========================================
    // CONFIGURATION - STANDALONE MODE (No Hostinger needed)
    // ==========================================
    const CONFIG = {
      mode: 'standalone',  // 'standalone' or 'proxy'
      server_url: '',  // Leave empty for standalone mode
      api_key: '',
      debug: true,
      cache_time: 86400, // 24 hours in seconds
      default: 'homepage'
    };
    // ==========================================

    // Validate configuration
    if (CONFIG.server_url === 'YOUR_MAIN_SERVER_URL') {
      return res.status(400).json({
        error: 'Configuration Error',
        message: 'Please update server_url to your Hostinger domain in /api/activating.js'
      });
    }

    // Get request parameters
    const { request = CONFIG.default, pretty } = req.query;
    const protocol = req.secure ? 'https' : 'http';
    const prettUrlMode = pretty === '1' ? 1 : 0;

    // Debug logging
    if (CONFIG.debug) {
      console.log('DEBUG MODE ENABLED');
      console.log('Request:', request);
      console.log('Query:', req.query);
      console.log('Protocol:', protocol);
    }

    // Build URL to main server
    const mainServerUrl = new URL(CONFIG.server_url);
    mainServerUrl.searchParams.append('request', request);
    mainServerUrl.searchParams.append('api', CONFIG.api_key);
    mainServerUrl.searchParams.append('pretty_url', prettUrlMode);

    if (CONFIG.debug) {
      console.log('Fetching from:', mainServerUrl.toString());
    }

    // Fetch content from main server
    const response = await fetch(mainServerUrl.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'FireKirin-Activating-System/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000 // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const content = await response.text();

    // Validate content
    if (!content || content.length < 100) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Could not retrieve content from main server'
      });
    }

    // Return content with appropriate headers
    if (content.includes('<!DOCTYPE') || content.includes('<html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else if (content.includes('{') && content.includes('}')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    }

    // Cache headers (optional)
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    return res.status(200).send(content);

  } catch (error) {
    console.error('Activating API Error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      debug: {
        timestamp: new Date().toISOString(),
        path: req.url
      }
    });
  }
}
