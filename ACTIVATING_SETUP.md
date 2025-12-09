# How to Access `/activating` Folder via Supabase

## 📋 Quick Setup

You now have two ways to serve your `/activating` files:

### **Option A: Direct HTML File (Easiest)**
Access at: **`firekirin.network/activating.html`**
- Shows all files in `/activating` folder
- Can upload new files
- Can download files
- Can share download links

### **Option B: Create a Route (Recommended)**
Access at: **`firekirin.network/activating`**

To do this, create a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/activating", "destination": "/activating.html" }
  ]
}
```

---

## 🚀 Setup Steps

### Step 1: Configure Supabase Credentials
Edit `activating.html` and find this section (around line 186):

```javascript
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY";
```

Replace with your actual credentials from Supabase Dashboard.

### Step 2: Create `/activating` Folder in Supabase
1. Go to Supabase Dashboard → Storage → `files` bucket
2. Click **Create folder**
3. Name it: `activating`

### Step 3: Upload Your Files
You have two ways:

**Method A: Via Web GUI**
- Open `firekirin.network/activating.html`
- Click "Choose File to Upload"
- Select files from your `/activating` folder

**Method B: Via Supabase Dashboard**
- Go to Storage → `files` → `activating` folder
- Click Upload
- Select your PHP/executable files

### Step 4: Deploy to Vercel
```bash
git add activating.html
git commit -m "Add /activating file server"
git push
```

---

## 📁 File Structure in Supabase

After setup, your files will be organized like:
```
files/
  └── activating/
      ├── 1734000000_index.php
      ├── 1734000000_config.php
      ├── 1734000000_functions.php
      ├── 1734000000_homepage.php
      └── ...
```

---

## 🔗 Access Your Files

### Download Link
```
https://your-project.supabase.co/storage/v1/object/public/files/activating/filename.php
```

### Share Files
1. Open `/activating.html`
2. Click **Copy URL** next to file
3. Share the link with others
4. They can download and execute

---

## ⚙️ About Your PHP Files

Your current `/activating` folder contains:
- ✅ `index.php` - Main file
- ✅ `config.php` - Configuration
- ✅ `functions.php` - Helper functions
- ✅ `homepage.php` - Home page
- ✅ `install.php` - Installation script
- ✅ And more...

**Important Note:**
- PHP files **cannot execute** in browser storage (security)
- You can **download** them to run locally
- Or **move** them to a backend server that supports PHP

---

## 🎯 Accessing `/activating` Route

### If you want `/activating` instead of `/activating.html`

Create `vercel.json` in your root folder:
```json
{
  "rewrites": [
    { "source": "/file-manager.html", "destination": "/file-manager.html" },
    { "source": "/activating", "destination": "/activating.html" }
  ]
}
```

Then push to GitHub:
```bash
git add vercel.json
git commit -m "Add route rewrites for cleaner URLs"
git push
```

Now users can access: `firekirin.network/activating`

---

## 📊 Features

✅ List all files in `/activating` folder
✅ Download files directly
✅ Upload new files
✅ Copy download links
✅ Show file size and type
✅ Mobile responsive
✅ Beautiful dark theme

---

## 🔒 Security Notes

1. **Files are PUBLIC** - Anyone with link can download
2. **No execution** - PHP files won't run (need backend server)
3. **Only you can upload** - Uses protected API key

To make folder **private**:
- Edit `activating.html`
- Change bucket from `files` to a private bucket
- (More complex setup)

---

## 💡 Examples

### Access PHP file
```
https://your-project.supabase.co/storage/v1/object/public/files/activating/1734000000_index.php
```

### Share with others
```
Click "Copy URL" on the file → Send to anyone
They can download and run it
```

### Download & Run Locally
```bash
# Download file
wget https://your-project.supabase.co/storage/v1/object/public/files/activating/index.php

# Run PHP script
php index.php
```

---

## ❓ FAQs

**Q: Why can't PHP execute in browser?**
A: Security. PHP needs server-side processing, Supabase storage is client-side CDN.

**Q: How do I execute PHP files?**
A: Download them → Run locally with `php filename.php` or upload to a PHP hosting server.

**Q: Can I password-protect files?**
A: Yes, use private buckets in Supabase (more complex setup).

**Q: Can users upload files?**
A: Yes, they can via the web interface (you could add authentication later).

---

Enjoy your activation system! 🎉
