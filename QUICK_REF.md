# 🎯 Compademic OTA Dashboard - Quick Reference

## 🔐 ADMIN LOGIN

**Password:** `moni`

---

## 📱 Two Main Tabs

### 1️⃣ Upload Firmware (📤)
- Public access (no password)
- Select .bin file
- Enter version (e.g., 1.4)
- Click Upload
- File uploaded to Supabase

### 2️⃣ Admin Panel (🔒)
- **REQUIRES PASSWORD**: `moni`
- View all firmware versions
- Search by version
- Sort (newest/oldest/A-Z)
- Copy download URLs
- Delete firmware
- Statistics dashboard

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then visit: **http://localhost:5173**

---

## 🏢 Compademic Branding

- ✅ "Compademic OTA Dashboard" title
- ✅ "Powered by Compademic" badge
- ✅ Enterprise styling
- ✅ Professional color scheme (Blue + Cyan)
- ✅ © 2026 Compademic footer

---

## 🔓 How to Login to Admin

1. App loads → Main dashboard
2. Click **🔒 Admin Panel** tab
3. Login screen appears
4. Enter password: **`moni`**
5. Click **🔓 Unlock Admin Panel**
6. ✅ Access granted!

---

## 🚪 How to Logout

- Click **🚪 Logout** button (top-right after login)
- Returns to login screen
- Must re-enter password to access again

---

## 📊 Admin Panel Features

| Feature | Details |
|---------|---------|
| **Search** | Find firmware by version |
| **Sort** | Newest, Oldest, or A-Z |
| **Download** | Direct file download |
| **Copy URL** | Get public download link |
| **Delete** | Remove firmware with confirmation |
| **Stats** | Total, Latest, Last upload |
| **Refresh** | Reload firmware list |

---

## 🛡️ File Structure

```
src/
├── components/
│   ├── AdminLogin.jsx       ← Login form (password here)
│   ├── AdminPanel.jsx       ← Management dashboard
│   └── OTAUploader.jsx      ← Upload form
├── App.jsx                  ← Tab navigation
├── App.css                  ← App styling
└── index.css                ← Global theme
```

---

## 🎨 Colors

- **Primary Blue:** #3B82F6
- **Accent Cyan:** #06B6D4
- **Dark Background:** #0F172A
- **Text Light:** #E2E8F0

---

## 📝 Password Location

In code: `src/components/AdminLogin.jsx`

```javascript
const ADMIN_PASSWORD = 'moni'
```

**For production:** Change to strong password

---

## ✅ Testing Checklist

- [ ] App starts: `npm run dev`
- [ ] Header shows "Compademic OTA Dashboard"
- [ ] Upload tab works (no password)
- [ ] Admin tab shows login
- [ ] Login with "moni" works
- [ ] Admin panel loads
- [ ] Logout button works
- [ ] F12 console has no errors

---

## 📚 Documentation

- **README.md** - Full feature guide
- **SETUP.md** - Installation guide  
- **ADMIN_GUIDE.md** - Admin panel guide
- **COMPADEMIC_UPDATE_SUMMARY.md** - Changes made

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Wrong password | Use `moni` (case-sensitive) |
| Can't see admin panel | Click 🔒 Admin Panel tab |
| Login doesn't work | Check console (F12) for errors |
| No upload success | Verify .OAT bucket is PUBLIC |
| Files don't appear | Clear browser cache |

---

## 🚀 Deploy to Production

```bash
npm run build
# Deploy dist/ folder to hosting
```

**Remember to change password from "moni" before deploying!**

---

## 💼 Company Info

**Company:** Compademic  
**Product:** OTA Firmware Dashboard  
**Version:** 1.0.0  
**Type:** Enterprise IoT Management  

---

## 🔗 Dashboard URL

**Development:** http://localhost:5173

**Admin Password:** `moni` 🔐

---

**Ready to manage firmware? Let's go! 🚀**
