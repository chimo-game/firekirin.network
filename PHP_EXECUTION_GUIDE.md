# PHP Execution Setup - Complete Guide

## 🎯 The Challenge

You want to run PHP code on Vercel, but **Vercel doesn't support PHP natively**. Here are your options:

---

## ✅ Option 1: Use Vercel API Routes (Node.js) - Recommended

Your PHP code is a **proxy/router** that fetches from a main server. We've created a Node.js equivalent.

### Setup Steps:

1. **Edit `/api/activating.js`**

   Find these lines:

   ```javascript
   const CONFIG = {
     server_url: 'YOUR_MAIN_SERVER_URL',  // e.g., https://your-backend.com
     api_key: 'YOUR_API_KEY',
     debug: false,
     ...
   };
   ```

   Replace with your actual values:

   ```javascript
   const CONFIG = {
     server_url: 'https://your-main-server.com',
     api_key: 'your-api-key-here',
     debug: false,
     ...
   };
   ```

2. **Deploy to Vercel**

   ```bash
   git add api/
   git commit -m "Add activating API routes"
   git push
   ```

3. **Access your endpoint**
   - `firekirin.network/api/activating?request=homepage`
   - `firekirin.network/api/activating?request=install`

---

## ❌ Option 2: Deploy PHP to Separate Server

If your PHP needs to **run PHP functions** (not just proxy), you need a PHP host:

### Free PHP Hosting Options:

- **Vercel** → Deploy PHP to **separate service**
- **Heroku** → Free tier available
- **Railway.app** → Free hobby tier
- **Replit** → Can run PHP
- **000webhost.com** → Free PHP hosting

### Setup:

1. Upload your `/activating` folder to PHP hosting
2. Get your PHP server URL
3. Update `/api/activating.js` with that URL
4. Vercel API proxies to PHP server

---

## 🚀 Option 3: Convert PHP to Node.js

If you want everything on Vercel, convert your PHP code to JavaScript.

### Your current PHP does:

1. Load config
2. Route requests to different files
3. Cache responses
4. Fetch from main server

### We can create Node.js versions of these:

#### Example: `homepage.php` → `api/pages/homepage.js`

```javascript
// homepage.js
export default async function handler(req, res) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Homepage</title>
    </head>
    <body>
      <h1>Welcome to HomePath</h1>
      <!-- Your homepage content -->
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
}
```

---

## 📊 Comparison

| Option                            | Pros                                 | Cons                     | Best For             |
| --------------------------------- | ------------------------------------ | ------------------------ | -------------------- |
| **Option 1** (API Proxy)          | Easy setup, uses existing PHP server | Requires main server     | Redirecting/proxying |
| **Option 2** (Separate PHP Host)  | Full PHP support                     | Two separate services    | Complex PHP logic    |
| **Option 3** (Convert to Node.js) | All on Vercel, single service        | Requires code conversion | Complete migration   |

---

## 🔧 Implementation Details

### API Route Structure:

```
api/
├── activating.js      (Main router - fetches from your PHP server)
├── execute.js         (Execute uploaded files)
└── pages/
    ├── homepage.js
    ├── install.js
    └── ...
```

### Access patterns:

```
# Proxy to PHP server
GET /api/activating?request=homepage

# Execute custom code
POST /api/execute
  { fileUrl: "...", fileType: "javascript" }

# Direct page access (if converted)
GET /api/pages/homepage
```

---

## 🎯 Recommended Approach for You

Since your PHP is a **proxy/router** (not complex PHP logic):

### Step 1: Keep PHP on original server

Your `/activating` PHP stays where it is

### Step 2: Update `/api/activating.js`

Point to your PHP server

### Step 3: Access via Vercel

```
firekirin.network/api/activating?request=homepage
```

### Step 4 (Optional): Create URL alias

Add to `vercel.json`:

```json
{
  "rewrites": [{ "source": "/activating", "destination": "/api/activating" }]
}
```

Then access: `firekirin.network/activating?request=homepage`

---

## 📝 What You Need to Do

### Immediate (5 minutes):

1. ✅ Add your main server URL to `/api/activating.js`
2. ✅ Add your API key
3. ✅ Deploy to Vercel

### Testing:

```bash
# After deployment, test:
curl "https://firekirin.network/api/activating?request=homepage"
```

### Advanced (if needed):

- Create more API routes for other pages
- Add error handling
- Add caching logic

---

## 📚 File Reference

### `/api/activating.js`

- **Purpose**: Main router/proxy
- **Access**: `/api/activating`
- **Parameters**:
  - `request`: What to fetch (homepage, install, etc.)
  - `pretty`: Pretty URL mode (0 or 1)

### `/api/execute.js`

- **Purpose**: Execute uploaded code
- **Access**: `/api/execute`
- **Methods**: POST
- **Parameters**:
  - `fileUrl`: URL of file to execute
  - `fileType`: "javascript" or "php"
  - `params`: Parameters to pass

---

## ⚡ Quick Start

### 1. Get your main server URL

```
Your current PHP server: https://example.com/activating/
Or wherever your PHP files are hosted
```

### 2. Edit `/api/activating.js`

```javascript
const CONFIG = {
  server_url: "https://YOUR_SERVER.com/activating/", // ← Update this
  api_key: "YOUR_KEY_HERE", // ← Update this
  debug: false,
  cache_time: 86400,
  default: "homepage",
};
```

### 3. Deploy

```bash
git add api/activating.js
git commit -m "Configure activating API"
git push
```

### 4. Test

```
Open: https://firekirin.network/api/activating?request=homepage
```

---

## 🆘 Troubleshooting

**Q: "Server error" when accessing API**
A: Check if `server_url` is correct and accessible

**Q: PHP files won't execute**
A: Vercel doesn't support PHP. Use Option 1 or 2.

**Q: Want to run PHP on Vercel?**
A: Not possible. Deploy to separate PHP hosting + use API proxy.

---

## 🔐 Security Notes

✅ API validates file sources
✅ Only allowed domains can execute
✅ API key in config protects your server
✅ Request timeout prevents hanging

---

Need help configuring? Let me know your:

1. Current PHP server URL
2. API key
3. Which pages you need to route (`homepage`, `install`, etc.)

I'll set it up completely for you! 🚀
