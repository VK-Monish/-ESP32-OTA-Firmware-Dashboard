# ⚡ Quick Setup (5 Minutes)

## Step 1: Install Dependencies (2 min)

```bash
cd /home/monish/Documents/OAT_esp32
npm install
```

## Step 2: Verify Supabase Database

First, create the OTA table in your Supabase dashboard. Run this SQL in Supabase SQL Editor:

```sql
-- Create OTA firmware table
CREATE TABLE IF NOT EXISTS OTA (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  version TEXT NOT NULL,
  up_file TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE OTA ENABLE ROW LEVEL SECURITY;

-- Create public access policies
DROP POLICY IF EXISTS "Allow public select" ON OTA;
CREATE POLICY "Allow public select" ON OTA
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON OTA;
CREATE POLICY "Allow public insert" ON OTA
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete" ON OTA;
CREATE POLICY "Allow public delete" ON OTA
  FOR DELETE USING (true);
```

## Step 3: Verify Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Check if "OAT" bucket exists
3. If NOT, click **+ New Bucket** and create:
   - Name: `OAT`
   - Make it **PUBLIC** (uncheck private)

## Step 4: Start Dev Server (1 min)

```bash
npm run dev
```

App opens automatically at **http://localhost:5173**

## Step 5: Test Upload

1. Select a `.bin` firmware file
2. Enter a version (e.g., `1.4`)
3. Click **Upload Firmware**
4. Check success message
5. Verify file in Supabase Storage
6. Verify record in OTA table

## ✅ Done!

Your ESP32 OTA dashboard is ready to use! 🎉

---

## 🔧 Environment Variables

File: `.env`

```env
VITE_SUPABASE_URL=https://tawjqiyrnwxxbhdhkxxc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_TABLE=OTA
VITE_SUPABASE_BUCKET=OAT
```

✅ Already configured!

---

## 📱 What's Included

| File | Purpose |
|------|---------|
| `src/components/OTAUploader.jsx` | Main upload component |
| `src/App.jsx` | Root React component |
| `src/supabaseClient.js` | Supabase initialization |
| `.env` | Your credentials |
| `vite.config.js` | Vite configuration |
| `package.json` | Dependencies |

---

## 🚀 Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🐛 Issues?

| Problem | Fix |
|---------|-----|
| Port in use | `npm run dev -- --port 5174` |
| Module not found | `rm -rf node_modules && npm install` |
| Credentials error | Check `.env` file exists |
| Upload fails | Verify OAT bucket is PUBLIC |

---

Start uploading firmware! 🎊
