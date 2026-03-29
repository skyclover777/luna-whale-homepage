/* ============================================
   LUNA WHALE ART LAB — Shared App Logic
   ============================================ */

/* ─── Navigation ─── */
window.LunaApp = {
    pages: {
        home: '/index.html',
        login: '/pages/auth/login.html',
        signup: '/pages/auth/login.html',
        profile: '/pages/main/profile.html',
        settings: '/pages/main/settings.html',
        classes: '/pages/main/classes.html',
        classGuideWeb: '/pages/main/class-guide-web.html',
        classGuideApp: '/pages/main/class-guide-app.html',
        payment: '/pages/main/shop.html',
        createClass: '/pages/admin/create-class.html',
        admin: '/pages/admin/admin.html',
        myClasses: '/pages/main/my-classes.html',
        monthlyCatalog: '/pages/main/monthly-catalog.html',
        adultCatalog: '/pages/main/adult-catalog.html',
        masterpieceCatalog: '/pages/main/masterpiece-catalog.html',
        monthlyDetail: '/pages/main/monthly-detail.html',
    },

    navigate(page, params = {}) {
        if (this.pages[page]) {
            let url = this.pages[page];

            // Fix for file:// protocol root-relative paths
            if (window.location.protocol === 'file:' && url.startsWith('/')) {
                // If we're inside /pages/... we need to go up to project root
                if (window.location.pathname.includes('/pages/')) {
                    url = '../../' + url.substring(1);
                } else {
                    url = url.substring(1);
                }
            }

            const searchParams = new URLSearchParams(params);
            const searchString = searchParams.toString();
            if (searchString) {
                url += (url.includes('?') ? '&' : '?') + searchString;
            }
            console.log('LunaApp: Navigating to', url);
            window.location.href = url;
        }
    },

    goBack() {
        window.history.back();
    },

    /* ─── Active Nav State ─── */
    setActiveNav(pageKey) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.page === pageKey);
        });
    },

    /* ─── Toast ─── */
    toast(msg, duration = 3000) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), duration);
    },

    /* ─── Session (fake auth state) ─── */
    get user() {
        try { return JSON.parse(localStorage.getItem('lw_user') || 'null'); } catch { return null; }
    },
    set user(v) { localStorage.setItem('lw_user', JSON.stringify(v)); },
    get isAdmin() { return this.user?.role === 'admin'; },
    get isTeacher() { return this.user?.role === 'teacher'; },
    get isGuest() { return !this.user; },
    get purchasedClasses() { return this.user?.purchasedClasses || []; },
    get canManage() { return this.isAdmin || this.isTeacher; },

    get isPremium() { return this.user?.isPremium === true; },
    get isParentAccess() { return this.user?.isParentAccess === true; },

    /** Check if classId is a monthly lesson (courseCode starts with digits+M) */
    isMonthlyClass(classId) {
        if (!classId || typeof CLASSES_DATA === 'undefined') return false;
        const cls = CLASSES_DATA.find(c => c.id === classId);
        return cls?.courseCode ? /^\d{2}M/.test(cls.courseCode) : false;
    },

    hasAccessToClass(classId) {
        if (!classId) return false;
        if (this.isAdmin || this.isPremium) return true;
        // Parent basic: everything except monthly lessons
        if (this.isParentAccess) return !this.isMonthlyClass(classId);
        return this.purchasedClasses.includes(classId);
    },

    login(data) {
        // Clear old session first to be safe
        localStorage.removeItem('lw_user');

        // Firebase user login is handled by firebase-auth.js (LunaAuth)
        // This method is now used for legacy/demo logins only

        // If user is Whale, they have purchased 3 specific classes
        if (data.id === 'Whale' || data.name === 'Whale' || data.email === 'Whale' || data.email?.includes('whale')) {
            data.id = 'Whale';
            data.name = 'Whale';
            data.role = 'user';
            data.purchasedClasses = ['traditional-patterns', 'seasonal-glasses', 'wooden-pencil-case'];
            this.user = data;
            this.navigate('home');
        } else if (data.id === 'Luna' || data.name === 'Luna' || data.email === 'Luna' || data.role === 'admin' || data.email?.includes('admin')) {
            data.id = 'Luna';
            data.name = 'Luna';
            data.role = 'admin';
            this.user = data;
            // Admins go to dashboard
            this.navigate('admin');
        } else {
            // Social login buttons (Google/Facebook) or other emails lead to active state with default access
            data.purchasedClasses = ['traditional-patterns'];
            data.isGuest = false;
            this.user = data;
            this.navigate('home');
        }
    },

    async logout() {
        // Firebase logout if available
        if (window.LunaAuth) {
            await LunaAuth.logout();
        }
        localStorage.clear();
        // Ensure we go to the absolute login path
        window.location.href = window.location.protocol === 'file:' ?
            (window.location.pathname.includes('/pages/') ? '../../pages/auth/login.html' : 'pages/auth/login.html') :
            '/pages/auth/login.html';
    },

    /* ─── Drag & Drop Upload ─── */
    initUploadZone(el, onFiles) {
        if (!el) return;
        el.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            if (el.dataset.accept) input.accept = el.dataset.accept;
            input.onchange = e => onFiles(Array.from(e.target.files));
            input.click();
        });
        ['dragenter', 'dragover'].forEach(ev =>
            el.addEventListener(ev, e => { e.preventDefault(); el.classList.add('drag-over'); }));
        ['dragleave', 'drop'].forEach(ev =>
            el.addEventListener(ev, e => { e.preventDefault(); el.classList.remove('drag-over'); }));
        el.addEventListener('drop', e => {
            const files = Array.from(e.dataTransfer.files);
            onFiles(files);
        });
    },

    /* ─── Filter Pills ─── */
    initPills(containerEl, onChange) {
        if (!containerEl) return;
        containerEl.querySelectorAll('.pill').forEach(pill => {
            pill.addEventListener('click', () => {
                containerEl.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                if (onChange) onChange(pill.dataset.filter || pill.textContent.trim());
            });
        });
    },
    /* ─── Sidebar Submenu ─── */
    toggleSidebarSubmenu(id, arrowId) {
        const submenu = document.getElementById(id);
        const arrow = document.getElementById(arrowId);
        if (submenu) {
            const isOpen = submenu.classList.toggle('open');
            if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    },

    /* ─── Language Picker ─── */
    toggleLang(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;
        const isOpen = dropdown.style.display === 'block' || dropdown.classList.contains('open');
        // Close all lang menus (clear inline style so CSS takes effect)
        document.querySelectorAll('[id^="lang-dropdown"], [id^="lang-menu"], [id^="lang-panel"]').forEach(d => {
            d.style.display = '';
            d.classList.remove('open');
        });
        // Toggle this one open if it was closed
        if (!isOpen) dropdown.style.display = 'block';
    },

    closeAllLangMenus() {
        document.querySelectorAll('[id^="lang-dropdown"], [id^="lang-menu"], [id^="lang-panel"]').forEach(d => {
            d.style.display = '';
            d.classList.remove('open');
        });
    },

    /* ─── Device Management ─── */
    deviceStoreKey: 'lw_devices',
    initDeviceManagement() {
        const listEl = document.getElementById('device-list');
        if (!listEl) return;

        // Load or init mock data
        let devices = JSON.parse(localStorage.getItem(this.deviceStoreKey)) || [];
        this.renderDeviceList(devices);
    },

    renderDeviceList(devices) {
        const listEl = document.getElementById('device-list');
        const countEl = document.getElementById('device-count');
        if (!listEl) return;

        if (countEl) countEl.textContent = `${devices.length}/3`;

        listEl.innerHTML = devices.map(dev => `
            <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 transition-all hover:border-primary/30">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-400">
                        <span class="material-symbols-outlined text-2xl">${dev.type === 'pc' ? 'desktop_windows' : 'smartphone'}</span>
                    </div>
                    <div>
                        <div class="font-bold text-sm">${dev.name}</div>
                        <div class="text-[10px] text-slate-500 font-medium mt-0.5">
                            <span data-i18n="pro_last_login">Last Login</span>: ${dev.lastLogin}
                        </div>
                    </div>
                </div>
                <button onclick="LunaApp.unregisterDevice('${dev.id}')" 
                    class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-black hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all uppercase tracking-wider"
                    data-i18n="pro_unregister">
                    Unregister
                </button>
            </div>
        `).join('') || `<p class="text-center py-8 text-slate-400 text-sm">No devices registered</p>`;

        // Re-apply translations for new content
        if (window.lwApplyLang) window.lwApplyLang(listEl);
    },

    unregisterDevice(id) {
        let devices = JSON.parse(localStorage.getItem(this.deviceStoreKey) || '[]');
        devices = devices.filter(d => d.id !== id);
        localStorage.setItem(this.deviceStoreKey, JSON.stringify(devices));
        this.renderDeviceList(devices);
        this.toast('Device unregistered successfully');
    },

    /* ─── Utils for Scalability & UX ─── */
    utils: {
        boostBrilliance(rgbaStr, boost = 1.3, minAlpha = 0.6) {
            if (!rgbaStr) return rgbaStr;
            const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (!match) return rgbaStr;
            let [_, r, g, b, a] = match.map(Number);
            a = isNaN(a) ? 0.8 : Math.max(a, minAlpha);
            r = Math.min(255, Math.floor(r * boost));
            g = Math.min(255, Math.floor(g * boost));
            b = Math.min(255, Math.floor(b * boost));
            const max = Math.max(r, g, b);
            if (max > 0) {
                const satBoost = 1.2;
                r = Math.min(255, Math.floor(r === max ? r * satBoost : r));
                g = Math.min(255, Math.floor(g === max ? g * satBoost : g));
                b = Math.min(255, Math.floor(b === max ? b * satBoost : b));
            }
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        },

        initLazyLoading() {
            this.lazyLoad('img[data-src]');
        },

        lazyLoad(selector) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            obs.unobserve(img);
                        }
                    }
                });
            }, { rootMargin: '200px' });
            document.querySelectorAll(selector).forEach(img => observer.observe(img));
        }
    },

    /* ─── Admin Photo Editor ─── */
    initAdminPhotoEditor(containerSelector = 'main') {
        // Only trigger on PC (lg: 1024px+) and for Admins
        if (window.innerWidth < 1024 || !this.isAdmin) return;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Find all images that are part of the lesson content
        // We filter out tiny icons or decorative elements by checking size/context if needed
        const images = container.querySelectorAll('img:not([id^="lang-"]):not(.no-edit)');

        images.forEach(img => {
            // Avoid double-wrapping
            if (img.parentElement.classList.contains('admin-photo-wrapper')) return;

            // Create wrapper to hold the button
            const wrapper = document.createElement('div');
            wrapper.className = 'admin-photo-wrapper relative group/admin border-2 border-transparent hover:border-primary/20 transition-all duration-300';

            // Mirror some image classes for layout consistency
            if (img.classList.contains('w-full')) wrapper.classList.add('w-full');
            if (img.classList.contains('rounded-xl')) wrapper.classList.add('rounded-xl');
            if (img.classList.contains('rounded-2xl')) wrapper.classList.add('rounded-2xl');

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            // Create Edit Button
            const btn = document.createElement('button');
            btn.className = 'absolute top-2 right-2 z-[99] hidden group-hover/admin:flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all cursor-pointer pointer-events-auto';
            btn.innerHTML = `
                <span class="material-symbols-outlined text-sm">edit</span>
                REPLACE PHOTO
            `;

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const newUrl = prompt('Enter new image URL:', img.src);
                if (newUrl && newUrl !== img.src) {
                    img.src = newUrl;
                    this.toast('Photo updated (Preview only)');
                }
            });

            wrapper.appendChild(btn);
        });
    },

};

// ─── Global Styles (Injected immediately to prevent FOUC) ───
(function injectGlobalStyles() {
    if (typeof document !== 'undefined' && !document.getElementById('luna-global-styles')) {
        const style = document.createElement('style');
        style.id = 'luna-global-styles';
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .page-fade {
                animation: fadeIn 0.4s ease-out forwards;
            }
            /* robust language dropdown hiding */
            [id^="lang-dropdown"], [id^="lang-menu"], [id^="lang-panel"] {
                display: none;
                animation: fadeIn 0.2s ease-out;
            }

            /* Global Sidebar & Submenu Styles */
            .app-sidebar {
                display: none;
            }
            @media (min-width: 1024px) {
                .app-sidebar { display: flex !important; }
                .main-content { margin-left: 240px !important; }
                .bottom-nav { display: none !important; }
                .lg\\:ml-60 { margin-left: 15rem !important; } /* 240px */
            }
            .submenu-container {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .submenu-container.open {
                max-height: 400px;
            }
            .submenu-item {
                display: block;
                padding: 0.5rem 1rem 0.5rem 3.2rem;
                font-size: 0.75rem;
                color: #64748b;
                transition: all 0.2s;
                border-radius: 0.75rem;
                margin: 0.1rem 0;
                font-weight: 500;
                text-decoration: none;
            }
            .submenu-item:hover {
                color: #1337ec;
                background: rgba(19, 55, 236, 0.05);
            }
            #submenu-arrow {
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
})();

/* ─── Global Nav wiring ─── */
document.addEventListener('DOMContentLoaded', () => {

    /* Wire all [data-page] elements */
    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', () => LunaApp.navigate(el.dataset.page));
    });
    /* Wire all [data-back] elements */
    document.querySelectorAll('[data-back]').forEach(el => {
        el.addEventListener('click', () => LunaApp.goBack());
    });
    /* Wire logout */
    document.querySelectorAll('[data-logout]').forEach(el => {
        el.addEventListener('click', () => LunaApp.logout());
    });

    /* Global Click-away for Language Menus */
    document.addEventListener('click', (e) => {
        // Match any element with a lang-related onclick (toggleLang, toggleLangCur, toggleLangPri, etc.)
        const isLangTrigger = e.target.closest('[onclick*="lang"], [onclick*="Lang"]');
        const isInsideMenu = e.target.closest('[id^="lang-dropdown"], [id^="lang-menu"], [id*="lang-container"]');
        if (!isLangTrigger && !isInsideMenu) {
            LunaApp.closeAllLangMenus();
        }
    });

    /* Page fade animation trigger */
    document.body.classList.add('page-fade');

    /* Admin Tools Init */
    LunaApp.initAdminPhotoEditor();

    /* Device Management Init */
    LunaApp.initDeviceManagement();

    /* ─── Visitor Tracking ─── */
    if (window.LunaAuth && LunaAuth.logVisit) {
        LunaAuth.logVisit();
    }

    /* ─── KakaoTalk Floating Button ─── */
    (function injectKakaoButton() {
        // Skip on login/signup pages
        if (window.location.pathname.includes('/auth/')) return;

        const kakaoBtn = document.createElement('a');
        kakaoBtn.href = 'https://open.kakao.com/o/sLunaWhale'; // Replace with actual KakaoTalk open chat link
        kakaoBtn.target = '_blank';
        kakaoBtn.id = 'kakao-float-btn';
        kakaoBtn.title = 'KakaoTalk 문의';
        kakaoBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 9999;
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: #FEE500;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
        `;
        kakaoBtn.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M128 36C70.562 36 24 72.713 24 118.244C24 147.628 43.389 173.574 72.629 188.351L63.189 222.073C62.637 224.104 65.052 225.727 66.828 224.552L106.715 197.917C113.604 198.847 120.712 199.487 128 199.487C185.438 199.487 232 162.775 232 118.244C232 72.713 185.438 36 128 36Z" fill="#3C1E1E"/>
            </svg>
        `;

        // Hover effect
        kakaoBtn.addEventListener('mouseenter', () => {
            kakaoBtn.style.transform = 'scale(1.1)';
            kakaoBtn.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
        });
        kakaoBtn.addEventListener('mouseleave', () => {
            kakaoBtn.style.transform = 'scale(1)';
            kakaoBtn.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });

        // Adjust position on mobile to not overlap bottom nav
        if (window.innerWidth < 1024) {
            kakaoBtn.style.bottom = '90px';
        }

        document.body.appendChild(kakaoBtn);
    })();
});
