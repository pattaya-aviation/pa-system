# 🛩️ PAM — Pattaya Aviation System Management

> ระบบบริหารจัดการภายในของ Pattaya Aviation Co., Ltd.  
> เวอร์ชัน Static HTML + Supabase Backend | อัปเดตล่าสุด: 20 กุมภาพันธ์ 2569

---

## 📋 สารบัญ

- [ภาพรวมระบบ](#-ภาพรวมระบบ)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [โมดูลหลัก](#-โมดูลหลัก)
- [ข้อดีของระบบ](#-ข้อดีของระบบ--strengths)
- [จุดที่แก้ไขแล้ว](#-จุดที่แก้ไขแล้ว--fixed)
- [จุดที่ต้องดำเนินการเพิ่มเติม](#-จุดที่ต้องดำเนินการเพิ่มเติม--remaining)
- [ฐานข้อมูล](#-ฐานข้อมูล-supabase)
- [การติดตั้งและรัน](#-การติดตั้งและรัน)

---

## 🔭 ภาพรวมระบบ

PAM เป็นระบบเว็บภายในองค์กรสำหรับ Pattaya Aviation ประกอบด้วย **3 ส่วนหลัก**:

| ส่วน | คำอธิบาย | สถานะ |
|------|----------|-------|
| **Voice for Change (VFC)** | ระบบรับข้อร้องเรียน / ข้อเสนอแนะ / ชมเชย พร้อมติดตามสถานะ | ✅ ใช้งานได้ |
| **Tax System** | เครื่องมือคำนวณภาษีเงินได้บุคคลธรรมดา + แบบ ล.ย.01 | ✅ ใช้งานได้ |
| **Admin Portal** | แดชบอร์ดจัดการข้อมูล VFC, ตั้งค่าผู้ใช้, ธีม | ✅ ใช้งานได้ |

ระบบแบ่งเป็น **2 ฝั่ง** ชัดเจน:
- **User Portal** — หน้าที่พนักงานทั่วไปเข้าใช้ (ไม่ต้อง login)
- **Admin Portal** — หน้าจัดการสำหรับแอดมิน (ต้อง login ด้วย Microsoft Entra ID หรือ test user)

---

## 📁 โครงสร้างโปรเจกต์

```
pa-system/
├── function/                     # ฟังก์ชันและ Components ที่ใช้ร่วมกัน
│   ├── shared/                   # ใช้ทั้ง User + Admin
│   │   ├── css/fonts.css         # ฟอนต์ Sarabun + ซ่อน scrollbar
│   │   ├── js/supabase-config.js # Supabase client initialization (centralized)
│   │   └── logo/                 # โลโก้บริษัท
│   ├── user/                     # เฉพาะ User Portal
│   │   ├── components/
│   │   │   ├── navbar.js         # Navbar component (Desktop pill + Mobile hamburger)
│   │   │   └── vfc-form.js       # VFC form logic + validation + file upload
│   │   ├── css/
│   │   │   ├── user-base.css     # Base styles (bg-wrapper, fullscreen)
│   │   │   └── vfc-form.css      # Choices.js override + form z-index
│   │   └── wallpaper/            # Background images
│   └── admin/                    # เฉพาะ Admin Portal
│       ├── components/
│       │   ├── admin-nav.js      # Floating sidebar + mobile nav + logout
│       │   └── vfc-admin.js      # VFC management + Supabase data + admin response
│       └── css/
│           └── admin-base.css    # Admin base + dark mode themes
│
├── page/                         # หน้าเว็บทั้งหมด (HTML)
│   ├── Home/
│   │   └── pa-system.html        # หน้าแรกของระบบ
│   ├── vfc/                      # Voice for Change (User)
│   │   ├── vfc-home.html         # เมนูหลัก VFC (4 cards)
│   │   ├── complaint.html        # ฟอร์มร้องเรียน
│   │   ├── suggestion.html       # ฟอร์มข้อเสนอแนะ
│   │   ├── compliment.html       # ฟอร์มชมเชย
│   │   └── track.html            # ติดตามสถานะ (QR Code support)
│   ├── tax/                      # Tax System (User)
│   │   ├── tax-home.html         # เมนูหลักภาษี
│   │   ├── tax-calculator.html   # เครื่องคำนวณภาษี
│   │   └── pa-ly01.html          # ฟอร์ม ล.ย.01
│   └── admin_portal/             # Admin Portal
│       ├── index.html            # หน้าหลัก Admin
│       ├── vfc-admin/
│       │   └── index.html        # จัดการ VFC (Inbox/Table/Kanban/Dashboard)
│       └── settings/
│           └── index.html        # ตั้งค่า (ผู้ใช้/ธีม/ทั่วไป)
│
└── dont'use/                     # ไฟล์เก่าที่ไม่ได้ใช้แล้ว
```

---

## 🛠 เทคโนโลยีที่ใช้

| เทคโนโลยี | การใช้งาน |
|-----------|----------|
| **HTML5** | โครงสร้างหน้า (Static HTML — ไม่มี Build Tool) |
| **Tailwind CSS (CDN)** | สไตล์หลัก (utility-first) |
| **Vanilla CSS** | Custom styles (admin-base.css, vfc-form.css) |
| **JavaScript (Vanilla)** | Logic ทั้งหมด (ไม่ใช้ Framework) |
| **Supabase** | Backend-as-a-Service (DB + Auth + Storage) |
| **Choices.js** | Searchable dropdown (cascade: สถานี → ฝ่าย → แผนก) |
| **Font Awesome** | ไอคอน (User Portal) |
| **Google Fonts (Sarabun)** | ฟอนต์หลักทั้งระบบ |
| **MSAL.js** | Microsoft Entra ID authentication (Admin) |
| **QR Code API** | สร้าง + อ่าน QR Code สำหรับ tracking |

---

## 📦 โมดูลหลัก

### 1. 🎤 Voice for Change (VFC)

**ฝั่ง User:**
- ฟอร์ม 3 ประเภท: **ร้องเรียน**, **ข้อเสนอแนะ**, **ชมเชย**
- ✅ **Form Validation** — ตรวจสอบ subject, category, detail ก่อนส่ง พร้อม highlight border แดง
- ✅ **File Upload** — อัปโหลดไฟล์ไปยัง Supabase Storage (bucket: `vfc-attachments`)
- ✅ **Loading State** — ปุ่มส่งแสดง spinner ระหว่างส่งข้อมูล ป้องกัน double-submit
- รองรับ **ไม่ระบุตัวตน** (anonymous toggle)
- Cascade dropdown: สถานี → ฝ่าย → แผนก (ดึงจาก Supabase)
- สร้าง **Tracking Number** (VFC-XXXXXXXX) + QR Code
- หน้า **ติดตามสถานะ** — ค้นหาด้วย tracking number หรือ QR Code

**ฝั่ง Admin:**
- ✅ **เชื่อมข้อมูลจริงจาก Supabase** — ดึงจาก `vfc_submissions` table (mock data เป็น fallback)
- ✅ **Admin Response** — ฟังก์ชัน `submitAdminResponse()` ส่งคำตอบกลับไป Supabase
- ✅ **Status Update** — ฟังก์ชัน `updateSubmissionStatus()` เปลี่ยนสถานะ
- **Inbox view** — ดูข้อความแบบ email client (split panel)
- **Table view** — ตารางพร้อม filter (ประเภท / สถานะ)
- **Kanban view** — จัดกลุ่มตามสถานะ
- **Dashboard** — สรุปสถิติ
- Multi-window modal (เปิดหลายข้อความพร้อมกัน + minimize ได้)

### 2. 💰 Tax System

- **คำนวณภาษี** — รายได้, หักค่าใช้จ่าย, ลดหย่อน, ประกัน, กองทุน, บ้าน, เงินบริจาค
- **แบบ ล.ย.01** — ฟอร์มแจ้งรายการหักลดหย่อน + validation ข้อมูลส่วนตัว

### 3. ⚙️ Admin Portal

- **Authentication** — Microsoft Entra ID (MSAL.js) + Test user (development)
- **Floating Sidebar Nav** — เมนูลอยซ้ายมือแบบ macOS Dock
- ✅ **Settings** — ใช้ shared Supabase config (ไม่มี hardcoded keys แล้ว)
- **Dark Mode** — 3 ธีม (Light, Dark Grey, Dark Navy) persist ผ่าน localStorage

---

## ✅ ข้อดีของระบบ — Strengths

### 🎨 1. UI/UX Design ที่ดีมาก
- ดีไซน์ **Glassmorphism** (backdrop-blur + semi-transparent white) ทั้งระบบ
- การ์ดมุมโค้งใหญ่ (`rounded-[2rem]`, `rounded-[2.5rem]`) ให้ความรู้สึก modern
- Gradient shadows สีตาม context (shadow-red, shadow-blue, shadow-green)
- **Responsive Design** — รองรับทั้ง Desktop + Mobile + Tablet
- รองรับ iOS compatibility (bg-wrapper แบบ fixed, `viewport-fit=cover`, `100dvh`)

### 🧩 2. Component Architecture ดี
- **Navbar** (`navbar.js`) — reusable ทุกหน้า, auto-detect sub-page/home
- **VFC Form** (`vfc-form.js`) — shared logic สำหรับ 3 ฟอร์ม + validation + file upload
- **Admin Nav** (`admin-nav.js`) — auto-detect subfolder depth, รวม logout function
- แยก CSS เป็น layer: `fonts.css` → `user-base.css` → `vfc-form.css`

### 🔗 3. Supabase Integration
- Centralized config (`supabase-config.js`) — ใช้ project เดียวกันทั้งระบบ
- Cache mechanism สำหรับ Organization data
- Error handling ครบ (try/catch, console.error, user alerts)

### 🔐 4. Authentication ครอบคลุม
- Microsoft Entra ID (production) + Test user (development)
- Session-based auth (`sessionStorage`) — หมดอายุเมื่อปิด browser
- Auth guard ทุกหน้า admin

### 🌙 5. Dark Mode ระดับ Enterprise
- 3 ธีม: Light, Dark Grey, Dark Navy
- Persist ข้ามหน้า, apply ก่อน DOMContentLoaded (ไม่มี white flash)

### 📱 6. Mobile Experience ดีเยี่ยม
- Navbar แยก Desktop (floating pill) vs Mobile (fixed top + hamburger)
- File upload + camera capture บน mobile
- QR Code scan จากรูปภาพ

### 🏷️ 7. Tracking System ฉลาด
- Tracking number สุ่มด้วย `crypto.getRandomValues()`
- สร้าง QR Code + save เป็น PNG
- Timeline visualization สำหรับ tracking status

---

## 🔧 จุดที่แก้ไขแล้ว — Fixed

### ✅ 1. Form Validation (vfc-form.js)
- **ปัญหา:** ฟอร์ม VFC ไม่มี required fields validation
- **แก้ไข:** เพิ่มฟังก์ชัน `validateForm()` ตรวจสอบ subject, category, detail ก่อนส่ง
- **ผลลัพธ์:** border สีแดงบน field ที่ไม่ได้กรอก + alert แจ้งรายการที่ขาด

### ✅ 2. File Upload (vfc-form.js)
- **ปัญหา:** มี UI แนบไฟล์แต่ไม่มีโค้ดอัปโหลดจริง
- **แก้ไข:** เพิ่มฟังก์ชัน `uploadFiles()` อัปโหลดไปยัง Supabase Storage (`vfc-attachments` bucket)
- **ผลลัพธ์:** ไฟล์ถูกอัปโหลดจริง, URLs เก็บใน field `attachments` (JSON)
- **จำกัด:** ไฟล์ขนาดสูงสุด 10MB ต่อไฟล์

### ✅ 3. Loading State (vfc-form.js)
- **ปัญหา:** ไม่มี feedback ระหว่างส่งข้อมูล, อาจกดซ้ำได้
- **แก้ไข:** เพิ่มฟังก์ชัน `setSubmitLoading()` แสดง spinner + disable ปุ่ม
- **ผลลัพธ์:** ป้องกัน double-submit, มี visual feedback

### ✅ 4. Supabase Project Consolidation (settings/index.html)
- **ปัญหา:** Settings page ใช้ hardcoded Supabase keys จากคนละ project
- **แก้ไข:** เปลี่ยนไปใช้ shared `supabase-config.js` + `window.supabaseClient`
- **ผลลัพธ์:** ข้อมูลใช้ project เดียวกัน, ไม่มี API keys เปิดเผยเพิ่มเติม

### ✅ 5. Admin VFC — เชื่อมข้อมูลจริง (vfc-admin.js)
- **ปัญหา:** ใช้ mockup data 6 รายการ ไม่ดึงข้อมูลจริง
- **แก้ไข:** เพิ่ม `loadSubmissions()`, `transformSubmission()` ดึงจาก `vfc_submissions`
- **ผลลัพธ์:** แสดงข้อมูลจริงจาก Supabase, mock data เป็น fallback

### ✅ 6. Admin Response & Status Update (vfc-admin.js)
- **ปัญหา:** Admin ไม่สามารถตอบกลับหรือเปลี่ยนสถานะได้
- **แก้ไข:** เพิ่ม `submitAdminResponse()` และ `updateSubmissionStatus()` เขียนกลับ Supabase
- **ผลลัพธ์:** Admin สามารถตอบกลับ + เปลี่ยนสถานะจาก pending → in_progress → done

### ✅ 7. Duplicate Functions Removed
- **ปัญหา:** ฟังก์ชันซ้ำซ้อนข้ามไฟล์ (logout, toggleMobileMenu, toggleSubmenu)
- **แก้ไข:**
  - ลบ `logout()` ซ้ำจาก `admin_portal/index.html` และ `settings/index.html` (ใช้จาก `admin-nav.js`)
  - ลบ `toggleMobileMenu()` + `toggleSubmenu()` จาก `tax-home.html` (ใช้จาก `navbar.js`)

### ✅ 8. SEO Meta Tags — ทุกหน้า
- **ปัญหา:** ไม่มี `<meta name="description">` ในทุกหน้า
- **แก้ไข:** เพิ่ม meta description ที่สื่อความหมายให้ทุก 12 หน้า
- **ไฟล์ที่แก้:** pa-system.html, vfc-home.html, complaint.html, suggestion.html, compliment.html, track.html, tax-home.html, tax-calculator.html, pa-ly01.html, admin_portal/index.html, settings/index.html

### ✅ 9. Accessibility Fixes
- **ปัญหา:** `maximum-scale=1.0, user-scalable=no` ปิดการ zoom สำหรับผู้พิการ
- **แก้ไข:** ลบ `maximum-scale=1.0` และ `user-scalable=no` จากทุก viewport meta
- **ไฟล์ที่แก้:** 9 ไฟล์ใน User Portal (pa-system, vfc-*, tax-*)

### ✅ 10. Aria Labels
- **ปัญหา:** ไม่มี `aria-label` บนลิงก์/ปุ่มที่ไม่มี text ชัดเจน
- **แก้ไข:** เพิ่ม `aria-label` บนลิงก์การ์ดใน `vfc-home.html` (4 cards) และ `tax-home.html` (2 cards)

---

## ⚠️ จุดที่ต้องดำเนินการเพิ่มเติม — Remaining

### 🔴 ต้องทำบน Supabase Dashboard

| รายการ | คำอธิบาย | วิธีแก้ |
|--------|----------|--------|
| **RLS Policies** | API Keys ยังเข้าถึงได้จาก frontend — ต้องตั้ง Row Level Security | ไป Supabase Dashboard → ตั้ง RLS ทุก table |
| **Storage Bucket** | ต้องสร้าง bucket `vfc-attachments` | Supabase Dashboard → Storage → New Bucket |
| **`attachments` Column** | ต้องเพิ่ม column `attachments` (jsonb) ใน `vfc_submissions` | Supabase Dashboard → Table Editor |
| **`admin_response` Column** | ตรวจสอบว่ามี column `admin_response` (text) ใน `vfc_submissions` | Supabase Dashboard → Table Editor |
| **Test User** | `test/1234` ยังอยู่ — ต้องลบใน production | ลบ test user condition จาก pa-system.html |

### 🟡 แนะนำปรับปรุง

| รายการ | คำอธิบาย |
|--------|----------|
| **Tailwind CDN → Build** | ย้ายจาก CDN ไปใช้ Tailwind CLI + Vite (เร็วกว่า, purge unused CSS) |
| **Loading Skeletons** | เพิ่ม skeleton loading UI เมื่อดึงข้อมูลจาก Supabase |
| **HTML Deduplication** | complaint/suggestion/compliment HTML ซ้ำกัน ~80% — ควรรวมเป็น template |
| **Font Awesome → SVG** | เปลี่ยนจากโหลดทั้ง library ไปใช้ inline SVG เพื่อ performance |
| **Admin Search** | implement full-text search ใน Admin Portal (ปัจจุบันแสดง "Coming soon") |
| **E2E Testing** | เพิ่ม automated testing (Playwright / Cypress) |
| **`dont'use` Folder** | ลบ deprecated files ออก, ใช้ Git branches เก็บ history |

---

## 🗄️ ฐานข้อมูล (Supabase)

### Tables:

| Table | คำอธิบาย | ใช้ใน |
|-------|----------|-------|
| `stations` | รายชื่อสถานี | VFC Form dropdowns |
| `departments` | รายชื่อฝ่าย | VFC Form dropdowns |
| `sections` | รายชื่อแผนก | VFC Form dropdowns |
| `vfc_submissions` | ข้อมูลจากฟอร์ม VFC | VFC Submit + Track + Admin |
| `admin_users` | รายชื่อผู้ใช้ Admin | Settings page |

### VFC Submissions Schema:

```sql
tracking_number      : text       -- VFC-XXXXXXXX
type                 : text       -- complaint / compliment / suggestion
subject              : text
category             : text
is_anonymous         : boolean
reporter_name        : text
reporter_employee_id : text
reporter_station     : text
reporter_department  : text
reporter_section     : text
detail_station       : text
detail_department    : text
detail_section       : text
detail_text          : text
fix_text             : text
attachments          : jsonb      -- [{ name, url, size, type }] ← NEW
status               : text       -- pending / in_progress / done
admin_response       : text       -- คำตอบจาก Admin
created_at           : timestamptz
```

---

## 🚀 การติดตั้งและรัน

### Prerequisites
- เว็บเบราว์เซอร์ที่รองรับ ES6+ (Chrome, Firefox, Safari, Edge)
- ไม่ต้องติดตั้ง Node.js หรือ build tools

### วิธีรัน
1. เปิดไฟล์ `page/Home/pa-system.html` ด้วยเว็บเบราว์เซอร์
2. หรือใช้ Local Server:
   ```bash
   # Python
   python -m http.server 8080

   # Node.js
   npx serve .

   # VS Code — ติดตั้ง Live Server extension
   ```

### Supabase Setup (ถ้ายังไม่มี)
1. สร้าง Storage Bucket ชื่อ `vfc-attachments` (public read)
2. เพิ่ม column `attachments` (jsonb, nullable) ใน `vfc_submissions`
3. ตรวจสอบว่ามี column `admin_response` (text, nullable) ใน `vfc_submissions`
4. ตั้ง RLS policies ทุก table

### Admin Portal
1. คลิก **"เข้าสู่ระบบ"** ที่ Navbar
2. ใช้ Microsoft account หรือ Test user:
   - Email: `test` / Password: `1234`

---

## 📊 สรุปสถิติโค้ด

| รายการ | จำนวน |
|--------|-------|
| ไฟล์ HTML | 12 ไฟล์ |
| ไฟล์ JavaScript | 5 ไฟล์ |
| ไฟล์ CSS | 4 ไฟล์ |
| บรรทัดโค้ดรวม | ~7,000+ บรรทัด |

---

## � Changelog

### v1.1 — 20 ก.พ. 2569
- ✅ เพิ่ม Form Validation ใน VFC (subject, category, detail required)
- ✅ เพิ่ม File Upload ไปยัง Supabase Storage
- ✅ เพิ่ม Loading State ป้องกัน double-submit
- ✅ เชื่อม Admin VFC กับข้อมูลจริงจาก Supabase
- ✅ เพิ่มฟังก์ชัน Admin Response + Status Update
- ✅ รวม Supabase config เป็น project เดียว (ลบ hardcoded keys จาก settings)
- ✅ ลบฟังก์ชันซ้ำซ้อน (logout, toggleMobileMenu, toggleSubmenu)
- ✅ เพิ่ม meta description ทุก 12 หน้า
- ✅ แก้ viewport accessibility (ลบ user-scalable=no)
- ✅ เพิ่ม aria-label บนลิงก์การ์ดหลัก

### v1.0 — Initial Release
- Voice for Change (VFC) — User + Admin
- Tax System — Calculator + ล.ย.01
- Admin Portal — Settings + Dark Mode

---

> 📝 สร้างและอัปเดตโดย AI Analysis — 20 ก.พ. 2569
