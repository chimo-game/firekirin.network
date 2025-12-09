# Supabase File Manager Setup Guide

## 🚀 Quick Start

Your file manager is ready! Follow these steps to get it working:

---

## Step 1: Create Supabase Account

1. Go to **[supabase.com](https://supabase.com)**
2. Click **Sign Up** → Use GitHub for easy login
3. Click **New Project**
   - **Project Name:** `firekirin-network`
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to you
4. Wait 2-3 minutes for project to initialize

---

## Step 2: Get Your API Keys

Once your project loads:

1. Click **Settings** in left sidebar
2. Click **API** tab
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** (the API key)

---

## Step 3: Configure Your File Manager

1. Open `file-manager.html` in your editor
2. Find these lines (around line 206-209):

```javascript
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY";
```

3. Replace with your actual values:

```javascript
const SUPABASE_URL = "https://abc123def456.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

4. Save the file

---

## Step 4: Enable Storage in Supabase

1. Go to your Supabase project
2. Click **Storage** in left sidebar
3. Click **Create a new bucket**
4. Name it: `files` (MUST match exactly!)
5. **Important:** Click to make it **Public**
6. Click **Create bucket**

---

## Step 5: Access Your File Manager

1. Push your changes to GitHub:

```bash
git add .
git commit -m "Add file manager with Supabase"
git push
```

2. Your file manager will be live at:
   - **`yoursite.vercel.app/file-manager.html`**
   - Or: **`yoursite.com/file-manager.html`** (if you have custom domain)

---

## 🎯 Using Your File Manager

### Upload Files

- **Drag & drop** files into the upload area
- Or click "Choose File" button
- Max 50MB per file

### Access Files

- Files get **automatic public URLs** like:
  - `https://your-project.supabase.co/storage/v1/object/public/files/yourfile.pdf`

### Download/Delete/Share

- **Copy URL** - Get shareable link (copies to clipboard)
- **Download** - Download to your computer
- **Delete** - Remove files

---

## 🔗 File URLs Format

Once uploaded, your files are accessible at:

```
https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/files/FILENAME
```

### Examples:

- PDF: `https://xxx.supabase.co/storage/v1/object/public/files/1734000000_document.pdf`
- Image: `https://xxx.supabase.co/storage/v1/object/public/files/1734000000_photo.jpg`
- ZIP: `https://xxx.supabase.co/storage/v1/object/public/files/1734000000_archive.zip`

You can share these URLs anywhere!

---

## 📊 Storage Limits

**Free Tier:**

- ✅ **1 GB** total storage
- ✅ Unlimited files (as long as they fit in 1GB)
- ✅ Unlimited bandwidth
- ✅ Public file access

**Upgrade Later:**

- **Pro Plan:** $25/month for 100GB
- **Team Plan:** $250/month for 500GB

---

## ⚙️ Security Settings

Your bucket is **Public** so anyone can access files by URL, but:

- Only files you upload are there
- No one can delete files without your credentials
- No one can upload files to your bucket

To make it private:

1. Go to **Storage** → **files** bucket
2. Click settings icon
3. Change to **Private**
4. Files need authentication to access

---

## 🆘 Troubleshooting

### Files won't upload

- Check internet connection
- File size < 50MB?
- Bucket name is exactly `files`?

### Can't find API keys

- Go to Supabase Dashboard
- Click your project name
- Settings → API tab

### Files aren't showing

- Wait 2 seconds and refresh
- Check bucket is **Public** (not Private)

### URLs aren't working

- Verify bucket name is `files`
- Check SUPABASE_URL has correct Project ID

---

## 📱 Adding to Navigation (Optional)

To add a link to your file manager in the header:

In `index.html`, find the navbar and add:

```html
<li class="navbar-item">
  <a href="/file-manager.html" class="navbar-link">Files</a>
</li>
```

---

## 🔄 Common Use Cases

### Share APK Files

```
Upload: app.apk → URL: https://xxx.supabase.co/.../app.apk
```

### Host Images

```
Upload: logo.png → URL: https://xxx.supabase.co/.../logo.png
```

### Store Documents

```
Upload: guide.pdf → URL: https://xxx.supabase.co/.../guide.pdf
```

---

## ✨ Features

✅ Beautiful dark theme (matches your site)
✅ Drag & drop upload
✅ File size display
✅ Copy URL to clipboard
✅ Download files directly
✅ Delete files
✅ Real-time file list
✅ Mobile responsive
✅ Loading states & error handling

---

## 🚨 Important Notes

1. **Credentials are in HTML** - This is okay because:

   - The `anon` key is meant to be public
   - It only allows uploads to your bucket
   - Users can't delete or modify files

2. **Always use ANON key** (not SECRET key!)

3. **Make bucket PUBLIC** - Only way to get shareable URLs

---

## 📞 Need Help?

If something doesn't work:

1. Check Supabase dashboard for any errors
2. Verify API keys are correct
3. Ensure bucket is named `files` (lowercase)
4. Refresh the page
5. Check browser console (F12) for error messages

---

Enjoy your file manager! 🎉
