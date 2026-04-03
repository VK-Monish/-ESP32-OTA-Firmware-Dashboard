# 🏢 Compademic OTA Dashboard - Admin Guide

## 📝 What is Compademic?

Compademic is an educational and academic technology company focused on enterprise firmware management and device update solutions. This OTA (Over-The-Air) dashboard is Compademic's flagship product for managing ESP32 firmware updates across enterprise deployments.

---

## 🔐 Admin Panel Access

### Login Credentials

**Password:** `moni`

The admin panel is now protected with authentication. Only authorized administrators with the correct password can access the management interface.

### How to Access Admin Panel

1. Open the dashboard
2. Click the **🔒 Admin Panel** tab
3. Enter password: `moni`
4. Click **🔓 Unlock Admin Panel**

---

## 🛡️ Security Features

✅ **Password Protected** - Admin panel requires authentication  
✅ **Logout Available** - Secure logout button in top-right corner  
✅ **Session Management** - Auto-clear after page navigation  
✅ **All Access Logged** - Compademic monitors all admin actions  

---

## 👨‍💼 Admin Panel Features

### Dashboard Overview

**Statistics:**
- Total uploaded firmware versions
- Latest version number
- Last upload timestamp

### Firmware Management

**Search:**
- Search by version number in real-time
- Instant filtering of results

**Sort Options:**
- Newest First
- Oldest First
- Version (A-Z)

**Actions:**
- **⬇️ Download** - Download firmware file
- **🔗 Copy URL** - Copy download URL to clipboard
- **🗑️ Delete** - Remove firmware version (with confirmation)

**Refresh:**
- Manual refresh button to reload firmware list

### File Information

For each firmware, you can view:
- Version number
- Upload timestamp
- Public download URL
- File ID reference

---

## 🚀 Upload Workflow (User Side)

Users can upload firmware through the **📤 Upload Firmware** tab:

1. Select .bin firmware file
2. Enter version number (e.g., 1.4, 2.0.1)
3. Click Upload
4. Confirmation message appears
5. File appears in Supabase Storage
6. Record created in OTA database

---

## 📂 Compademic Dashboard Branding

### Visual Identity

**Colors:**
- Primary: Blue (#3B82F6) + Cyan (#06B6D4)
- Secondary: Dark Slate (#0F172A)
- Accent: Light Slate (#CBD5E1)

**Typography:**
- Modern, clean sans-serif
- Professional and enterprise-focused

**Components:**
- "Powered by Compademic" badge
- "Enterprise Firmware Update Management System" tagline
- © 2026 Compademic footer

---

## 🔗 Use Cases

### For Administrators

1. **Monitor Uploads** - Track all firmware versions
2. **Manage Versions** - Delete outdated firmware
3. **Share URLs** - Copy download links for ESP32 devices
4. **Audit Trail** - View firmware upload history

### For ESP32 Devices

1. **Fetch URL** - Get public URL from admin panel
2. **OTA Update** - Use URL in HTTP OTA code
3. **Auto-update** - Devices check for new versions

---

## 📋 Admin Responsibilities

✅ Ensure only approved firmware is uploaded  
✅ Monitor upload frequency and activity  
✅ Delete compromised or obsolete versions  
✅ Manage firmware versioning  
✅ Provide URLs to field teams  
✅ Document security incidents  

---

## ⚠️ Security Best Practices

1. **Password Management**
   - Keep admin password secure ("moni" for demo)
   - Change password in production
   - Use strong passwords

2. **Access Control**
   - Only share admin URL with authorized users
   - Use VPN for remote access
   - Enable HTTPS in production

3. **Firmware Validation**
   - Verify firmware before upload
   - Check file integrity
   - Test firmware before production

4. **Logging & Audit**
   - Record who uploads what
   - Track all deletions
   - Monitor access patterns

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot login | Verify password is "moni" (case-sensitive) |
| Admin panel won't load | Clear browser cache, refresh page |
| 404 errors on URLs | Verify "OAT" storage bucket is PUBLIC |
| Files don't appear | Check RLS policies in Supabase |
| Cannot delete firmware | Ensure you have admin access |

---

## 📱 API Operations

### Admin Panel Operations

```javascript
// Get all firmware
GET /rest/v1/OTA?select=*&order=created_at.desc

// Delete firmware
DELETE /rest/v1/OTA?id=eq.{id}

// Get public URL
GET /storage/v1/object/public/OAT/[filename]
```

---

## 💾 Backup Recommendations

- Daily backups of OTA database
- Version storage backup strategy
- Document all firmware versions
- Maintain firmware changelog

---

## 📞 Support Contact

For technical support or issues:
- Check browser console (F12) for errors
- Verify Supabase credentials
- Check internet connection
- Review documentation

---

## 🎯 Next Steps

1. ✅ Access admin panel with password
2. ✅ Upload your first firmware
3. ✅ Test firmware download
4. ✅ Delete test firmware
5. ✅ Document your firmware versions

---

## 📄 Compademic Enterprise

**Dashboard Version:** 1.0.0  
**Built With:** React + Vite + Supabase  
**Company:** Compademic  
**Enterprise OTA Management System**  

© 2026 Compademic. All rights reserved.

---

Remember: **Password is "moni"** to access the admin panel! 🔐
