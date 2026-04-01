# 🚀 ESP32 OTA Firmware Dashboard

A modern, minimal web application for uploading and managing firmware updates for ESP32 devices using React, Vite, and Supabase.

## ✨ Features

✅ **Clean Minimal UI** - Modern dashboard design with gradient theme  
✅ **.bin File Upload** - Only accepts .bin firmware files  
✅ **Version Control** - Track firmware versions  
✅ **Instant Upload** - Files uploaded directly to Supabase Storage  
✅ **Public URLs** - Auto-generated download links for ESP32 devices  
✅ **Status Messages** - Real-time upload feedback  
✅ **Last Upload Info** - Displays previously uploaded firmware  
✅ **Error Validation** - Comprehensive file and input validation  
✅ **Loading States** - Visual feedback during upload  
✅ **Responsive Design** - Works on desktop and mobile  

## 🔧 Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Supabase (Storage + Database)
- **Storage Bucket:** "OAT" (OTA Updates)
- **Database Table:** "OTA" (version, up_file, created_at)
- **Styling:** CSS3 with gradients and animations

## 📋 Prerequisites

- Node.js 16+ (with npm)
- Supabase account (already configured)
- Internet connection

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /home/monish/Documents/OAT_esp32
npm install
```

This installs:
- React 18
- Vite (build tool)
- Supabase JS client

### 2. Start Dev Server

```bash
npm run dev
```

The app opens at **http://localhost:5173** automatically.

## 📖 How to Use

1. **Select Firmware File** - Click the file input and select a `.bin` file
2. **Enter Version** - Type version number (e.g., 1.4, 2.0.1)
3. **Click Upload** - Upload button becomes active when both inputs are filled
4. **Wait for Completion** - Shows loading spinner during upload
5. **Success!** - Green success message and file appears in Supabase

### Validation

- ❌ Only `.bin` files allowed
- ❌ Version field cannot be empty
- ✅ File and version must be filled to upload

## 🗂️ Project Structure

```
OAT_esp32/
├── src/
│   ├── components/
│   │   ├── OTAUploader.jsx       # Main upload component
│   │   └── OTAUploader.css       # Component styling
│   ├── App.jsx                   # Root component
│   ├── App.css                   # App styling
│   ├── main.jsx                  # Vite entry point
│   ├── index.css                 # Global styles
│   └── supabaseClient.js         # Supabase configuration
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
├── .env                          # Supabase credentials
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

## 🔌 Supabase Configuration

### Environment Variables (.env)

```env
VITE_SUPABASE_URL=https://tawjqiyrnwxxbhdhkxxc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_TABLE=OTA
VITE_SUPABASE_BUCKET=OAT
```

### Storage Bucket: "OAT"

Files are stored in: `OAT/[timestamp]-[filename].bin`

Public URL format:
```
https://tawjqiyrnwxxbhdhkxxc.supabase.co/storage/v1/object/public/OAT/[filename].bin
```

### Database Table: "OTA"

```sql
CREATE TABLE OTA (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  version TEXT NOT NULL,
  up_file TEXT NOT NULL
);

ALTER TABLE OTA ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON OTA
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON OTA
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON OTA
  FOR DELETE USING (true);
```

**Table Columns:**
- `id` - Auto-increment primary key
- `created_at` - Timestamp of upload
- `version` - Firmware version (e.g., "1.4")
- `up_file` - Public URL to firmware file

## 🎨 Customization

### Change Color Scheme

Edit `OTAUploader.css` and update the gradient:

```css
/* Current: Blue to Cyan */
background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);

/* Alternative: Purple to Pink */
background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);

/* Alternative: Green to Teal */
background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
```

### Change Button Labels

Edit `OTAUploader.jsx` and update strings:

```jsx
'🚀 Upload Firmware'  // Change this
'Clear'               // Or this
```

### Add API Keys for ESP32

After uploading, the file URL is available in Supabase:

```
https://tawjqiyrnwxxbhdhkxxc.supabase.co/storage/v1/object/public/OAT/[filename].bin
```

Use this URL in your ESP32 code:

```cpp
// Example ESP32 OTA update code
const char* firmwareUrl = "https://tawjqiyrnwxxbhdhkxxc.supabase.co/storage/v1/object/public/OAT/...";
```

## 📱 API Calls Made by the App

### 1. Upload File to Storage
```
POST /storage/v1/object/OAT/[filename]
Headers: apikey, Authorization
Body: Binary file data
```

### 2. Get Public URL
```
URL Format: https://[url]/storage/v1/object/public/OAT/[filename]
```

### 3. Insert Metadata to Database
```
POST /rest/v1/OTA
Headers: apikey, Authorization, Content-Type: application/json
Body: {
  "version": "1.4",
  "up_file": "https://..."
}
```

### 4. Fetch Last Upload
```
GET /rest/v1/OTA?select=*&order=created_at.desc&limit=1
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing Supabase credentials" | Check `.env` file exists with correct credentials |
| Upload fails | Ensure `OAT` bucket is PUBLIC in Supabase Storage |
| Files don't appear in list | Verify RLS policies are enabled in Supabase |
| .bin file not accepted | Check file extension and MIME type |
| CORS errors | Using REST API, should not have CORS issues |
| Port 5173 already in use | Run `npm run dev -- --port 5174` (or another port) |

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized production files in `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag & drop dist/ folder to netlify.com
```

## 🔐 Security Notes

### Current Setup (Public)
- Anyone can upload firmware
- Anyone can download files
- Suitable for internal networks

### Production Setup (Recommended)
```sql
-- Only allow uploads from authenticated users
CREATE POLICY "Allow authenticated insert" ON OTA
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Only admins can delete
CREATE POLICY "Allow admin delete" ON OTA
  FOR DELETE USING (auth.role() = 'admin');
```

Then integrate Supabase Auth in the component.

## 📊 File Upload Limits

- **Max File Size:** 5GB (Supabase default)
- **Recommended:** Keep under 1MB for ESP32
- **Typical ESP32 firmware:** 256KB - 4MB

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)

## 💡 Example: Using Uploaded Firmware in ESP32

```cpp
#include <WiFi.h>
#include <HttpUpdate.h>

const char* FIRMWARE_URL = "https://tawjqiyrnwxxbhdhkxxc.supabase.co/storage/v1/object/public/OAT/[filename].bin";

void updateFirmware() {
  Serial.println("Starting OTA update...");
  
  WiFiClientSecure client;
  client.setInsecure(); // For testing only
  
  t_httpUpdate_return ret = httpUpdate.update(client, FIRMWARE_URL);
  
  switch(ret) {
    case HTTP_UPDATE_FAILED:
      Serial.printf("Update failed: %s\n", httpUpdate.getLastErrorString().c_str());
      break;
    case HTTP_UPDATE_NO_UPDATES:
      Serial.println("No updates available");
      break;
    case HTTP_UPDATE_OK:
      Serial.println("Update successful!");
      break;
  }
}
```

## ✅ Testing Checklist

- [ ] App loads without errors
- [ ] Can select .bin file
- [ ] Cannot select non-.bin files
- [ ] Version input accepts text
- [ ] Upload button disabled until file and version selected
- [ ] Upload shows spinner during upload
- [ ] Success message appears after upload
- [ ] File appears in Supabase Storage
- [ ] Record appears in OTA table
- [ ] Last upload info displays
- [ ] Clear button resets inputs
- [ ] Error messages display properly

## 📝 Development Notes

### Component State

```javascript
selectedFile    // The .bin file selected
version         // Version string (1.4, 2.0.1, etc)
loading         // True during upload
message         // Success/error messages
lastVersion     // Last uploaded firmware info
```

### Key Functions

```javascript
loadLastVersion()   // Fetch most recent upload
handleFileSelect()  // Validate and select file
handleUpload()      // Upload file + insert DB record
handleClearInputs() // Reset form
```

## 🎯 Next Steps

1. **Customize Colors** - Edit CSS gradient values
2. **Add Authentication** - Integrate Supabase Auth
3. **Add File Management** - List all firmware versions
4. **Add Download Links** - Direct firmware downloads
5. **Add Device Tracking** - Track which devices have which versions
6. **Add Release Notes** - Store changelog info
7. **Automated Tests** - Add Jest + React Testing Library

## 📞 Common Questions

**Q: Can I upload multiple files at once?**  
A: Currently single file. To support multiple, modify `handleFileSelect` to accept multiple files.

**Q: How do ESP32 devices download the firmware?**  
A: Use the public URL from the `up_file` field in your HTTP OTA update code.

**Q: Can I delete uploaded firmware?**  
A: Yes, add a delete button to remove from storage and database.

**Q: How do I add version information?**  
A: The version field is simple text. You could extend with semver validation.

**Q: Can I support other file types?**  
A: Change `.accept=".bin"` to allow other extensions (e.g., `.elf`, `.hex`).

## 📄 License

MIT - Feel free to use and modify

---

## 🎉 Ready to Go!

Everything is configured with your Supabase credentials. Just run:

```bash
npm install
npm run dev
```

Upload your first ESP32 firmware and start managing OTA updates! 🚀

For support or issues, check the troubleshooting section above or review the code comments for detailed explanations.
