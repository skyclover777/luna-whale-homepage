/**
 * Luna Whale — Unified Navigation System v4
 *
 * 핵심 변경: URL path 추측 → data 속성 명시
 *
 * 사용법: <body data-nav-section="math" data-nav-parent="luna-math/index.html">
 *         <body data-nav-section="home"> (메인 홈)
 *
 * data-nav-section: home | math | tech | korean | en | lesson | tools | classes | games
 * data-nav-parent:  부모 페이지 상대 경로 (뒤로가기 목적지)
 * data-nav-home:    홈 페이지 상대 경로 (기본: 자동 계산)
 */
(function () {
    'use strict';

    const SECTIONS = {
        home: { label: 'Home', icon: '🏠', accent: '#6366f1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' },
        math: { label: 'Luna Math', icon: '∑', accent: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
        tech: { label: 'Luna TECH', icon: '⚙', accent: '#06b6d4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)' },
        korean: { label: '루나 국어', icon: '한', accent: '#D4A574', bg: 'rgba(212,165,116,0.12)', border: 'rgba(212,165,116,0.25)' },
        en: { label: 'Luna EN', icon: 'EN', accent: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.25)' },
        lesson: { label: '수업 홈', icon: '📖', accent: '#a8e6bf', bg: 'rgba(168,230,191,0.12)', border: 'rgba(168,230,191,0.25)' },
        tools: { label: 'Art Lab', icon: '🎨', accent: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
        classes: { label: '100강', icon: '📚', accent: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)' },
        games: { label: '게임', icon: '🎮', accent: '#c084fc', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.25)' },
    };

    const HUB_PATHS = {
        math: 'luna-math/index.html',
        tech: 'luna-tech/index.html',
        korean: 'luna-korean/index.html',
        en: 'luna-en/index.html'
    };

    // ── Helpers ──
    function getRelHome() {
        const path = location.pathname;
        if (path.includes('/pages/')) {
            const after = path.split('/pages/')[1];
            const depth = (after.match(/\//g) || []).length;
            return '../'.repeat(depth) + '../index.html';
        }
        return 'index.html';
    }

    function getRelBase() {
        const path = location.pathname;
        if (path.includes('/pages/')) {
            const after = path.split('/pages/')[1] || '';
            const depth = (after.match(/\//g) || []).length;
            return '../'.repeat(depth || 1);
        }
        return 'pages/';
    }

    // ── Context Detection ──
    // Priority: data attributes → fallback to path detection
    function getContext() {
        const body = document.body;
        const section = body.dataset.navSection;
        const parent = body.dataset.navParent;
        const homeUrl = body.dataset.navHome || getRelHome();

        // If data attributes are set, use them
        if (section) {
            return {
                section: section,
                parentUrl: parent || null,
                homeUrl: homeUrl,
                source: 'data'
            };
        }

        // Fallback: path-based detection (legacy support)
        return detectFromPath();
    }

    function detectFromPath() {
        const p = location.pathname.toLowerCase();
        const homeUrl = getRelHome();

        // Skip home page
        if (p.endsWith('/index.html') && !p.includes('/pages/')) return null;
        if (p === '/' || p === '') return null;

        // Hub pages → parent is home
        if (p.includes('/luna-math/index.html')) return { section: 'math', parentUrl: homeUrl, homeUrl, source: 'path' };
        if (p.includes('/luna-tech/index.html')) return { section: 'tech', parentUrl: homeUrl, homeUrl, source: 'path' };
        if (p.includes('/luna-korean/index.html')) return { section: 'korean', parentUrl: homeUrl, homeUrl, source: 'path' };
        if (p.includes('/luna-en/index.html')) return { section: 'en', parentUrl: homeUrl, homeUrl, source: 'path' };

        // Sub-pages → parent is hub
        if (p.includes('/luna-math/')) return { section: 'math', parentUrl: 'index.html', homeUrl, source: 'path' };
        if (p.includes('/luna-tech/')) return { section: 'tech', parentUrl: 'index.html', homeUrl, source: 'path' };
        if (p.includes('/luna-korean/')) return { section: 'korean', parentUrl: 'index.html', homeUrl, source: 'path' };
        if (p.includes('/luna-en/')) return { section: 'en', parentUrl: 'index.html', homeUrl, source: 'path' };

        // Lesson pages
        if (p.includes('/lessons/')) {
            return { section: 'lesson', parentUrl: null, homeUrl, source: 'path', useLunaApp: true };
        }

        // Games → detect which hub they belong to
        if (p.includes('/games/')) {
            if (p.includes('english-')) return { section: 'en', parentUrl: '../luna-en/index.html', homeUrl, source: 'path' };
            if (p.includes('korean-') || p.includes('joseon') || p.includes('story-builder'))
                return { section: 'korean', parentUrl: '../luna-korean/index.html', homeUrl, source: 'path' };
            return { section: 'games', parentUrl: homeUrl, homeUrl, source: 'path' };
        }

        // Typewriter
        if (p.includes('/typewriter/')) return { section: 'home', parentUrl: homeUrl, homeUrl, source: 'path' };

        // Creativity/Artist lessons
        if (p.includes('creativity-lesson') || p.includes('artist-lesson'))
            return { section: 'classes', parentUrl: p.includes('creativity') ? 'creativity-100.html' : 'artist-library.html', homeUrl, source: 'path' };
        if (p.includes('creativity-100') || p.includes('artist-library'))
            return { section: 'classes', parentUrl: 'classes.html', homeUrl, source: 'path' };

        // Main pages
        if (p.includes('/main/')) return { section: 'tools', parentUrl: homeUrl, homeUrl, source: 'path' };

        // Default
        return { section: 'home', parentUrl: homeUrl, homeUrl, source: 'path' };
    }

    // ── Theme Detection ──
    function isLightPage() {
        const bg = getComputedStyle(document.body).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            const m = bg.match(/\d+/g);
            if (m && m.length >= 3) {
                return (parseInt(m[0]) * 299 + parseInt(m[1]) * 587 + parseInt(m[2]) * 114) / 1000 > 160;
            }
        }
        return document.documentElement.classList.contains('light') ||
            document.body.classList.contains('light') ||
            document.body.classList.contains('bg-white');
    }

    // ── Inject Styles ──
    function injectStyles() {
        if (document.getElementById('luna-nav-v4-styles')) return;
        const s = document.createElement('style');
        s.id = 'luna-nav-v4-styles';
        s.textContent = `
            .lnv-trigger {
                position: fixed; top: 12px; right: 12px; z-index: 10000;
                width: 36px; height: 36px; border-radius: 12px;
                border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                font-size: 16px; font-weight: 700;
                transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
                backdrop-filter: blur(20px) saturate(1.6);
                -webkit-backdrop-filter: blur(20px) saturate(1.6);
                box-shadow: 0 2px 12px rgba(0,0,0,0.15);
                font-family: -apple-system, sans-serif;
            }
            .lnv-trigger--dark { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.12); }
            .lnv-trigger--dark:hover { background: rgba(255,255,255,0.18); color: #fff; transform: scale(1.08); }
            .lnv-trigger--light { background: rgba(0,0,0,0.06); color: rgba(0,0,0,0.5); border: 1px solid rgba(0,0,0,0.08); }
            .lnv-trigger--light:hover { background: rgba(0,0,0,0.1); color: rgba(0,0,0,0.8); transform: scale(1.08); }
            .lnv-trigger.open { border-radius: 12px 12px 0 0; box-shadow: none; }

            .lnv-popup {
                position: fixed; top: 48px; right: 12px; z-index: 10000;
                min-width: 220px; border-radius: 16px 0 16px 16px;
                padding: 10px; display: flex; flex-direction: column; gap: 4px;
                backdrop-filter: blur(24px) saturate(1.8);
                -webkit-backdrop-filter: blur(24px) saturate(1.8);
                box-shadow: 0 8px 40px rgba(0,0,0,0.25);
                opacity: 0; transform: translateY(-8px) scale(0.95);
                transform-origin: top right; pointer-events: none;
                transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
                font-family: -apple-system, 'Inter', 'Noto Sans KR', sans-serif;
            }
            .lnv-popup.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
            .lnv-popup--dark { background: rgba(15,20,40,0.92); border: 1px solid rgba(255,255,255,0.1); }
            .lnv-popup--light { background: rgba(255,255,255,0.94); border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 8px 40px rgba(0,0,0,0.1); }

            .lnv-item {
                display: flex; align-items: center; gap: 10px;
                padding: 9px 14px; border-radius: 11px;
                font-size: 13px; font-weight: 600; cursor: pointer;
                text-decoration: none !important;
                transition: all 0.15s; border: none; outline: none;
                background: transparent; width: 100%; text-align: left;
            }
            .lnv-item--dark { color: #cbd5e1; }
            .lnv-item--dark:hover { background: rgba(255,255,255,0.08); color: #f1f5f9; }
            .lnv-item--light { color: #475569; }
            .lnv-item--light:hover { background: rgba(0,0,0,0.05); color: #1e293b; }

            .lnv-item-icon {
                display: flex; align-items: center; justify-content: center;
                width: 28px; height: 28px; border-radius: 9px;
                font-size: 13px; font-weight: 800; flex-shrink: 0;
            }
            .lnv-item-label { flex: 1; }
            .lnv-item-arrow { font-size: 11px; opacity: 0.3; transition: transform 0.15s, opacity 0.15s; }
            .lnv-item:hover .lnv-item-arrow { opacity: 0.7; transform: translateX(2px); }

            .lnv-divider { height: 1px; margin: 4px 8px; }
            .lnv-divider--dark { background: rgba(255,255,255,0.06); }
            .lnv-divider--light { background: rgba(0,0,0,0.06); }

            .lnv-section-label {
                font-size: 10px; font-weight: 700;
                letter-spacing: 1.5px; text-transform: uppercase;
                padding: 6px 14px 2px;
            }
            .lnv-section-label--dark { color: rgba(255,255,255,0.25); }
            .lnv-section-label--light { color: rgba(0,0,0,0.25); }

            .lnv-backdrop { position: fixed; inset: 0; z-index: 9999; display: none; }
            .lnv-backdrop.show { display: block; }

            @media (max-width: 640px) {
                .lnv-trigger { top: 8px; right: 8px; width: 32px; height: 32px; font-size: 14px; }
                .lnv-popup { top: 40px; right: 8px; min-width: 200px; }
            }
        `;
        document.head.appendChild(s);
    }

    // ── Build Navigation ──
    function build(ctx) {
        const light = isLightPage();
        const theme = light ? 'light' : 'dark';
        const section = SECTIONS[ctx.section] || SECTIONS.home;

        // Backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'lnv-backdrop';

        // Trigger button
        const trigger = document.createElement('button');
        trigger.className = `lnv-trigger lnv-trigger--${theme}`;
        trigger.innerHTML = '‹';
        trigger.title = '이동';
        trigger.style.color = section.accent;

        // Popup
        const popup = document.createElement('div');
        popup.className = `lnv-popup lnv-popup--${theme}`;

        // 1. Back button (to parent)
        if (ctx.parentUrl) {
            const backItem = document.createElement('a');
            backItem.className = `lnv-item lnv-item--${theme}`;
            backItem.href = ctx.parentUrl;
            backItem.innerHTML =
                `<span class="lnv-item-icon" style="background:${section.bg};color:${section.accent};border:1px solid ${section.border}">${section.icon}</span>` +
                `<span class="lnv-item-label">← ${section.label}</span>` +
                `<span class="lnv-item-arrow">›</span>`;
            popup.appendChild(backItem);
        } else if (ctx.useLunaApp) {
            // Lesson pages: use LunaApp navigation
            const backItem = document.createElement('button');
            backItem.className = `lnv-item lnv-item--${theme}`;
            backItem.addEventListener('click', () => {
                if (typeof LunaApp !== 'undefined') {
                    const m = location.pathname.match(/lesson-(\d{4}-\d{2})/);
                    m ? LunaApp.navigate('monthlyDetail', { month: m[1] }) : LunaApp.navigate('home');
                } else {
                    location.href = ctx.homeUrl;
                }
            });
            backItem.innerHTML =
                `<span class="lnv-item-icon" style="background:${section.bg};color:${section.accent};border:1px solid ${section.border}">${section.icon}</span>` +
                `<span class="lnv-item-label">← ${section.label}</span>` +
                `<span class="lnv-item-arrow">›</span>`;
            popup.appendChild(backItem);
        }

        // 2. Home button (if not already going home)
        if (ctx.section !== 'home' && ctx.parentUrl !== ctx.homeUrl) {
            const hs = SECTIONS.home;
            const homeItem = document.createElement('a');
            homeItem.className = `lnv-item lnv-item--${theme}`;
            homeItem.href = ctx.homeUrl;
            homeItem.innerHTML =
                `<span class="lnv-item-icon" style="background:${hs.bg};color:${hs.accent};border:1px solid ${hs.border}">${hs.icon}</span>` +
                `<span class="lnv-item-label">Home</span>` +
                `<span class="lnv-item-arrow">›</span>`;
            popup.appendChild(homeItem);
        }

        // 3. Sibling hubs (when on a hub page)
        const hubKeys = ['math', 'tech', 'korean', 'en'];
        if (hubKeys.includes(ctx.section)) {
            const div = document.createElement('div');
            div.className = `lnv-divider lnv-divider--${theme}`;
            popup.appendChild(div);

            const lbl = document.createElement('div');
            lbl.className = `lnv-section-label lnv-section-label--${theme}`;
            lbl.textContent = '바로 이동';
            popup.appendChild(lbl);

            const base = getRelBase();
            hubKeys.filter(h => h !== ctx.section).forEach(h => {
                const s = SECTIONS[h];
                const a = document.createElement('a');
                a.className = `lnv-item lnv-item--${theme}`;
                a.href = base + HUB_PATHS[h];
                a.innerHTML =
                    `<span class="lnv-item-icon" style="background:${s.bg};color:${s.accent};border:1px solid ${s.border}">${s.icon}</span>` +
                    `<span class="lnv-item-label">${s.label}</span>` +
                    `<span class="lnv-item-arrow">›</span>`;
                popup.appendChild(a);
            });
        }

        // Toggle
        let isOpen = false;
        function toggle() {
            isOpen = !isOpen;
            popup.classList.toggle('show', isOpen);
            backdrop.classList.toggle('show', isOpen);
            trigger.classList.toggle('open', isOpen);
            trigger.innerHTML = isOpen ? '✕' : '‹';
        }
        trigger.addEventListener('click', toggle);
        backdrop.addEventListener('click', toggle);

        // Hide legacy back buttons
        document.querySelectorAll(
            '.back-btn, .back-to-hub, .back-to-art, .hud-home-btn, .btn-back-map, .back-link'
        ).forEach(el => { el.style.display = 'none'; });
        document.querySelectorAll(
            'button[onclick*="history.back"], button[onclick*="history.go"], a[href="javascript:history.back()"]'
        ).forEach(el => { el.style.display = 'none'; });

        document.body.appendChild(backdrop);
        document.body.appendChild(trigger);
        document.body.appendChild(popup);

        // Adjust position if topbar exists
        requestAnimationFrame(() => {
            const topbar = document.querySelector('.topbar, .top-bar, .lc-hub-header');
            if (topbar) {
                const h = topbar.getBoundingClientRect().height;
                trigger.style.top = (h + 8) + 'px';
                popup.style.top = (h + 8 + 36 + 4) + 'px';
            }
            const header = document.querySelector('header.sticky, header[class*="sticky"]');
            if (header && !topbar) {
                const hh = header.getBoundingClientRect().height;
                trigger.style.top = (hh + 8) + 'px';
                popup.style.top = (hh + 8 + 36 + 4) + 'px';
            }
        });
    }

    // ── Init ──
    function init() {
        const ctx = getContext();
        if (!ctx) return;

        // Skip pages that already have full navigation (sidebar pages)
        const hasSidebar = document.querySelector('.lc-sidebar, aside, nav.sidebar, .sidebar-nav, [class*="lg:ml-64"], [class*="sidebar"]');
        const hasMainHeader = document.querySelector('#header-math-btn, #header-tech-btn, a[href*="luna-math/index"]');
        if (hasSidebar || hasMainHeader) return;

        injectStyles();
        build(ctx);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
