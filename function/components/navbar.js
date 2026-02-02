/**
 * PA-System Shared Navbar Component
 * 
 * Usage: Include this script in your HTML and call renderNavbar() after the container element
 * 
 * Example:
 *   <div id="navbar-container"></div>
 *   <script src="../../function/components/navbar.js"></script>
 *   <script>renderNavbar();</script>
 */

(function() {
    'use strict';

    // Auto-detect base path from current page location (always return relative path)
    function getBasePath() {
        // Always return relative path to avoid file:// security issues
        return '../../';
    }

    // Generate navbar HTML
    function generateNavbarHTML(basePath) {
        // Determine current page for active states
        const currentPath = window.location.pathname;
        const isHomePage = currentPath.includes('/Home/');
        const isVFCPage = currentPath.includes('/vfc/');
        const isTaxPage = currentPath.includes('/tax/');
        
        // Check if this is a sub/detail page
        const isSubPage = (currentPath.includes('complaint.html') || 
                          currentPath.includes('compliment.html') || 
                          currentPath.includes('suggestion.html') || 
                          currentPath.includes('track.html') ||
                          currentPath.includes('tax-calculator.html') ||
                          currentPath.includes('pa-ly01.html'));
        
        // Generate relative paths
        const paths = {
            logo: `${basePath}function/logo/Pattaya Aviation.png`,
            home: `${basePath}page/Home/pa-system.html`,
            vfcHome: `${basePath}page/vfc/vfc-home.html`,
            complaint: `${basePath}page/vfc/complaint.html`,
            compliment: `${basePath}page/vfc/compliment.html`,
            suggestion: `${basePath}page/vfc/suggestion.html`,
            track: `${basePath}page/vfc/track.html`,
            taxHome: `${basePath}page/tax/tax-home.html`,
            taxCalculator: `${basePath}page/tax/tax-calculator.html`,
            paLy01: `${basePath}page/tax/pa-ly01.html`
        };
        
        // Determine back URL based on current section
        const backUrl = isVFCPage ? paths.vfcHome : isTaxPage ? paths.taxHome : paths.home;
        
        // If sub page, return simple navbar with back button and title
        if (isSubPage) {
            return `
    <!-- Sub Page Navbar (Floating Pill Style) -->
    <nav class="fixed top-4 left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 z-50">
        <div class="bg-white/70 backdrop-blur-xl rounded-3xl px-3 py-2 flex items-center gap-3 shadow-lg border border-gray-200/50">
            <!-- Back Button -->
            <a href="${backUrl}" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100/70 transition-colors shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </a>
            
            <!-- Divider -->
            <div class="h-8 w-px bg-gray-300"></div>
            
            <!-- Title & Subtitle -->
            <div class="flex flex-col pr-3">
                <span class="text-gray-800 font-semibold text-sm leading-tight" id="navbarPageTitle"></span>
                <span class="text-gray-500 text-xs leading-tight" id="navbarPageSubtitle"></span>
            </div>
        </div>
    </nav>`;
        }

        return `
    <!-- Desktop Navbar (Floating Pill Style) -->
    <nav class="hidden lg:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div class="bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-1 shadow-lg border border-gray-200/50">
            <!-- Logo -->
            <a href="${paths.home}" class="shrink-0 mr-2">
                <img src="${paths.logo}" alt="Logo" class="h-8 object-contain">
            </a>
            
            <!-- Menu Items -->
            <div class="flex items-center gap-1">
                <a href="${paths.home}" class="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-colors font-medium text-sm">
                    หน้าหลัก
                </a>
                
                <!-- Voice for Change with Dropdown -->
                <div class="relative group">
                    <a href="${paths.vfcHome}" class="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-colors font-medium text-sm flex items-center gap-1">
                        Voice for Change
                        <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                    <!-- Dropdown -->
                    <div class="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 transition-all duration-200 z-50">
                        <a href="${paths.complaint}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">ร้องเรียน</span>
                        </a>
                        <a href="${paths.compliment}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">ชมเชย</span>
                        </a>
                        <a href="${paths.suggestion}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">เสนอแนะ</span>
                        </a>
                        <div class="h-px bg-gray-100 my-1"></div>
                        <a href="${paths.track}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">ติดตามคำร้อง</span>
                        </a>
                    </div>
                </div>
                
                <!-- Tax with Dropdown -->
                <div class="relative group">
                    <a href="${paths.taxHome}" class="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 rounded-full transition-colors font-medium text-sm flex items-center gap-1">
                        ภาษี
                        <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                    <!-- Dropdown -->
                    <div class="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 transition-all duration-200 z-50">
                        <a href="${paths.taxCalculator}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">คำนวณภาษี</span>
                        </a>
                        <a href="${paths.paLy01}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                            <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">ลดหย่อนภาษี (ล.ย.01)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- Mobile Navbar (Floating Pill Style) -->
    <nav class="lg:hidden fixed top-4 left-4 right-4 z-50">
        <div class="bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 flex items-center justify-between shadow-lg border border-gray-200/50">
            <!-- Logo -->
            <a href="${paths.home}" class="shrink-0" id="mobileLogoLink">
                <img src="${paths.logo}" alt="Logo" class="h-8 object-contain" id="navbarLogo">
            </a>
            
            <!-- Hamburger Button -->
            <button id="menuToggle" onclick="toggleMobileMenu()" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100/70 transition-colors">
                <svg id="hamburgerIcon" class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <svg id="closeIcon" class="w-5 h-5 text-gray-700 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        
        <!-- Mobile Dropdown Menu -->
        <div id="dropdownMenu" class="hidden mt-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 py-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div class="flex flex-col">
                <a href="${paths.home}" class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 rounded-xl mx-2 transition-colors">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="text-gray-800 font-medium">หน้าหลัก</span>
                </a>
                
                <!-- Voice for Change Section -->
                <div class="border-t border-gray-100/50 mt-2 pt-2 mx-2">
                    <div class="flex items-center justify-between hover:bg-gray-50/70 rounded-xl transition-colors">
                        <a href="${paths.vfcHome}" class="flex-1 flex items-center gap-3 px-5 py-3">
                            <svg class="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                            <span class="text-gray-800 font-medium">Voice for Change</span>
                        </a>
                        <button onclick="toggleSubmenu('vfcSubmenu', 'vfcArrow')" class="px-4 py-3">
                            <svg id="vfcArrow" class="w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <!-- VFC Submenu -->
                    <div id="vfcSubmenu" class="hidden">
                        <a href="${paths.complaint}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">ร้องเรียน</span>
                        </a>
                        <a href="${paths.compliment}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">ชมเชย</span>
                        </a>
                        <a href="${paths.suggestion}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">เสนอแนะ</span>
                        </a>
                        <a href="${paths.track}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">ติดตามคำร้อง</span>
                        </a>
                    </div>
                </div>
                
                <!-- Tax Section -->
                <div class="border-t border-gray-100/50 mt-2 pt-2 mx-2">
                    <div class="flex items-center justify-between hover:bg-gray-50/70 rounded-xl transition-colors">
                        <a href="${paths.taxHome}" class="flex-1 flex items-center gap-3 px-5 py-3">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="text-gray-800 font-medium">ภาษี</span>
                        </a>
                        <button onclick="toggleSubmenu('taxSubmenu', 'taxArrow')" class="px-4 py-3">
                            <svg id="taxArrow" class="w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <!-- Tax Submenu -->
                    <div id="taxSubmenu" class="hidden">
                        <a href="${paths.taxCalculator}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">คำนวณภาษี</span>
                        </a>
                        <a href="${paths.paLy01}" class="flex items-center gap-3 px-9 py-2.5 hover:bg-gray-50/70 rounded-lg mx-2 transition-colors">
                            <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">ลดหย่อนภาษี (ล.ย.01)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
`;
    }

    // Toggle mobile menu function
    window.toggleMobileMenu = function() {
        const dropdownMenu = document.getElementById('dropdownMenu');
        const hamburgerIcon = document.getElementById('hamburgerIcon');
        const closeIcon = document.getElementById('closeIcon');
        
        if (!dropdownMenu) return;
        
        dropdownMenu.classList.toggle('hidden');
        
        // Toggle icons
        if (dropdownMenu.classList.contains('hidden')) {
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    };

    // Toggle submenu function
    window.toggleSubmenu = function(submenuId, arrowId) {
        const submenu = document.getElementById(submenuId);
        const arrow = document.getElementById(arrowId);
        if (submenu && arrow) {
            submenu.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
        }
    };

    // Main render function
    window.renderNavbar = function(options = {}) {
        const container = document.getElementById('navbar-container');
        if (!container) {
            console.error('Navbar container not found. Please add <div id="navbar-container"></div> to your HTML.');
            return;
        }

        const basePath = options.basePath || getBasePath();
        container.innerHTML = generateNavbarHTML(basePath);

        // Check if this is a detail page (not a home page)
        const currentPath = window.location.pathname;
        const isDetailPage = (currentPath.includes('complaint.html') || 
                              currentPath.includes('compliment.html') || 
                              currentPath.includes('suggestion.html') || 
                              currentPath.includes('track.html') ||
                              currentPath.includes('tax-calculator.html') ||
                              currentPath.includes('pa-ly01.html'));
        
        if (isDetailPage) {
            // Set page title
            const titleElement = document.getElementById('navbarPageTitle');
            if (titleElement) {
                titleElement.textContent = container.dataset.pageTitle || document.title.split(' - ')[0];
            }
            
            // Set page subtitle
            const subtitleElement = document.getElementById('navbarPageSubtitle');
            if (subtitleElement && container.dataset.pageSubtitle) {
                subtitleElement.textContent = container.dataset.pageSubtitle;
            }
        }
    };

    // Auto-render if container exists when script loads
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('navbar-container');
        if (container && !container.innerHTML.trim()) {
            window.renderNavbar();
        }
    });

})();
