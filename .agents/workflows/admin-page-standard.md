---
description: Standard layout for admin sub-pages (header + floating icons + floating pill tabs + hamburger dropdown)
---

# Admin Page Standard Layout

มาตรฐานโครงสร้างหน้า admin ประกอบด้วย:
- **Body resets** — margin, overflow, height
- **Admin-content** — main content area (desktop sidebar offset, mobile full width)
- **Page header** — title + subtitle
- **Floating icons** — admin-nav sidebar (desktop) / hamburger (mobile)
- **Floating pill tabs** — horizontal capsule tabs with active pill highlight
- **Pill hamburger + dropdown** — mobile-only hamburger inside tab row with dropdown menu

## CSS File

ทุกหน้า admin ใช้ไฟล์เดียว:

```html
<link rel="stylesheet" href="../../../function/portal/css/admin-page.css">
```

> **หมายเหตุ:** ไม่ต้องใส่ CSS แยก — layout ทั้งหมดรวมอยู่ใน `admin-page.css` แล้ว

## HTML Structure

```html
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../../../function/shared/css/fonts.css" />
  <link rel="stylesheet" href="../../../function/portal/css/admin-base.css" />
  <script src="../../../function/portal/components/admin-nav.js"></script>

  <!-- Admin Page Standard CSS (body + layout + header + floating pill tabs) -->
  <link rel="stylesheet" href="../../../function/portal/css/admin-page.css">

  <!-- Page-specific CSS -->
  <link rel="stylesheet" href="../../../function/portal/css/xxx-table.css">
</head>

<body>
  <!-- Admin Navigation -->
  <div id="adminNavContainer" data-admin-nav="PAGE_ID"></div>

  <!-- Main Content -->
  <div class="admin-content">

    <!-- Page Header -->
    <div class="admin-page-header">
      <div class="page-title-group">
        <h1 class="page-title">Page Title</h1>
        <p class="page-subtitle">Description text</p>
      </div>
    </div>

    <!-- Floating Pill Tabs + Hamburger -->
    <div class="admin-tabs-row">
      <div class="admin-tabs" id="navbarTabBar">
        <button class="admin-tab active" id="tabXxx" onclick="switchTab('xxx')">
          <svg>...</svg>
          Tab Label
        </button>
        <!-- More tabs... -->
      </div>
      <!-- Hamburger menu (mobile only) -->
      <div class="pill-hamburger-wrap">
        <button class="pill-hamburger" onclick="togglePillMenu()" aria-label="เมนู">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div class="pill-dropdown hidden" id="pillDropdown">
          <a href="../../home/main/pam.html" class="pill-dropdown-item">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/>
            </svg>
            หน้าแรก
          </a>
          <div class="pill-dropdown-divider"></div>
          <button onclick="logout()" class="pill-dropdown-item pill-dropdown-logout">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>

    <script>
      function togglePillMenu() {
        const dd = document.getElementById('pillDropdown');
        dd.classList.toggle('hidden');
      }
      document.addEventListener('click', function(e) {
        const wrap = document.querySelector('.pill-hamburger-wrap');
        const dd = document.getElementById('pillDropdown');
        if (wrap && dd && !wrap.contains(e.target)) {
          dd.classList.add('hidden');
        }
      });
    </script>

    <!-- Tab Contents -->
    <div id="contentXxx" class="tab-content">
      <!-- Content here -->
    </div>
    <div id="contentYyy" class="tab-content hidden">
      <!-- Content here -->
    </div>

  </div><!-- /admin-content -->
</body>
</html>
```

## Key CSS Classes

| Class | หน้าที่ |
|-------|---------|
| `.admin-content` | Main content area (desktop: margin-left 80px, mobile: full width) |
| `.admin-page-header` | Page header container |
| `.page-title` | Page title (h1) |
| `.page-subtitle` | Page subtitle |
| `.admin-tabs-row` | Flex wrapper สำหรับ pill tabs + hamburger |
| `.admin-tabs` | Floating pill container (gray bg, `border-radius: 9999px`) |
| `.admin-tab` | Individual tab pill button |
| `.admin-tab.active` | Active tab (white bg + shadow) |
| `.tab-badge` | Badge inside tab (e.g. count) |
| `.pill-hamburger-wrap` | Hamburger wrapper (mobile only) |
| `.pill-hamburger` | Circle hamburger button (mobile only) |
| `.pill-dropdown` | Dropdown menu from hamburger |
| `.pill-dropdown-item` | Dropdown menu item |
| `.pill-dropdown-logout` | Logout item (red on hover) |

## Tab Switching JS

```javascript
function switchTab(tabName) {
  document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

  const btnId = 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
  const contentId = 'content' + tabName.charAt(0).toUpperCase() + tabName.slice(1);

  document.getElementById(btnId).classList.add('active');
  const el = document.getElementById(contentId);
  el.classList.remove('hidden');
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'contentFadeIn 0.35s ease-out';
}
```

## Naming Convention

- Tab button IDs: `tab{Name}` (e.g. `tabInbox`, `tabCards`)
- Content div IDs: `content{Name}` (e.g. `contentInbox`, `contentCards`)
- CSS class: `.admin-tab` (NOT `.tab-btn`)
- Tabs row wrapper: `.admin-tabs-row`
- Hamburger wrapper: `.pill-hamburger-wrap`

## Design Notes

- **Pill container**: gray bg `#f3f4f6`, rounded `9999px`, padding `4px`
- **Active tab**: white bg `#ffffff`, shadow, blue text `#1d4ed8`
- **Hamburger**: separate circle `40px`, visible only on mobile (`max-width: 1023px`)
- **Dropdown**: `border-radius: 14px`, shadow, animation slide-down
- **Dark mode**: ทุก element รองรับ `body.dark-grey` / `body.dark-navy`
- **Mobile**: pill tabs-row sticky `top: 0`, tabs scroll horizontally

## Reference

[vfc/index.html](file:///c:/dev/PAM/page/portal/vfc/index.html)
[admin-page.css](file:///c:/dev/PAM/function/portal/css/admin-page.css)
