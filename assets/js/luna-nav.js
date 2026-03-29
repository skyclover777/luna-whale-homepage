/**
 * Luna Whale — Unified Navigation System v3
 * 우상단 작은 < 버튼 → 클릭 시 네비 팝업
 * 어떤 페이지에도 겹치지 않는 최소 침습 디자인
 */
(function() {
    'use strict';

    const SECTIONS = {
        home:    { label: 'Home',       icon: '🏠', accent: '#6366f1', bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.3)' },
        math:    { label: 'Luna Math',  icon: '∑',  accent: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
        tech:    { label: 'Luna TECH',  icon: '⚙',  accent: '#06b6d4', bg: 'rgba(6,182,212,0.15)',  border: 'rgba(6,182,212,0.3)' },
        science: { label: 'Luna Science', icon: '🧪', accent: '#39ff14', bg: 'rgba(57,255,20,0.15)', border: 'rgba(57,255,20,0.3)' },
        korean:  { label: '루나 국어',   icon: '한', accent: '#D4A574', bg: 'rgba(212,165,116,0.15)', border: 'rgba(212,165,116,0.3)' },
        en:      { label: 'Luna EN',    icon: 'EN', accent: '#FF6B6B', bg: 'rgba(255,107,107,0.15)', border: 'rgba(255,107,107,0.3)' },
        lesson:  { label: '수업 홈',     icon: '📖', accent: '#a8e6bf', bg: 'rgba(168,230,191,0.15)', border: 'rgba(168,230,191,0.3)' },
        tools:   { label: 'Art Lab',    icon: '🎨', accent: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)' },
        classes: { label: '100강',       icon: '📚', accent: '#fb923c', bg: 'rgba(251,146,60,0.15)',  border: 'rgba(251,146,60,0.3)' },
        games:   { label: '게임',        icon: '🎮', accent: '#c084fc', bg: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.3)' },
    };

    const HUB_MAP = {
        math: 'luna-math/index.html',
        tech: 'luna-tech/index.html',
        science: 'luna-science/index.html',
        korean: 'luna-korean/index.html',
        en: 'luna-en/index.html'
    };

    // ── Path Detection ──
    function detectContext() {
        var p = location.pathname.toLowerCase();
        if (p.endsWith('/index.html') && !p.includes('/pages/')) return null;
        if (p === '/' || p === '') return null;

        if (p.includes('/luna-math/index.html'))   return { parent: 'home', current: 'math',   backUrl: getRelHome() };
        if (p.includes('/luna-science/index.html'))  return { parent: 'home', current: 'science', backUrl: getRelHome() };
        if (p.includes('/luna-tech/index.html'))    return { parent: 'home', current: 'tech',   backUrl: getRelHome() };
        if (p.includes('/luna-korean/index.html'))  return { parent: 'home', current: 'korean', backUrl: getRelHome() };
        if (p.includes('/luna-en/index.html'))      return { parent: 'home', current: 'en',     backUrl: getRelHome() };
        if (p.includes('/luna-math/'))  return { parent: 'math',   current: null, backUrl: 'index.html' };
        if (p.includes('/luna-science/')) return { parent: 'science', current: null, backUrl: 'index.html' };
        if (p.includes('/luna-tech/'))  return { parent: 'tech',   current: null, backUrl: 'index.html' };
        if (p.includes('/luna-korean/')) return { parent: 'korean', current: null, backUrl: 'index.html' };
        if (p.includes('/luna-en/'))    return { parent: 'en',     current: null, backUrl: 'index.html' };
        if (p.includes('/lessons/'))    return { parent: 'lesson', current: null, backUrl: null, useLunaApp: true };
        if (p.includes('/games/')) {
            if (p.includes('english-')) return { parent: 'en', current: null, backUrl: '../luna-en/index.html' };
            if (p.includes('korean-') || p.includes('joseon') || p.includes('story-builder'))
                return { parent: 'korean', current: null, backUrl: '../luna-korean/index.html' };
            return { parent: 'home', current: 'games', backUrl: getRelHome() };
        }
        if (p.includes('/typewriter/')) return { parent: 'home', current: null, backUrl: getRelHome() };
        if (p.includes('artist-package-detail'))
            return { parent: 'classes', current: null, backUrl: 'artist-packages.html' };
        if (p.includes('artist-packages'))
            return { parent: 'classes', current: null, backUrl: 'artist-library.html' };
        if (p.includes('creativity-lesson') || p.includes('artist-lesson'))
            return { parent: 'classes', current: null, backUrl: p.includes('creativity') ? 'creativity-100.html' : 'artist-library.html' };
        if (p.includes('creativity-100') || p.includes('artist-library'))
            return { parent: 'home', current: 'classes', backUrl: 'classes.html' };
        if (p.includes('/main/'))    return { parent: 'home', current: 'tools', backUrl: getRelHome() };
        if (p.includes('/policy/') || p.includes('/admin/') || p.includes('/special/'))
            return { parent: 'home', current: null, backUrl: getRelHome() };
        if (p.includes('/student/')) return { parent: 'home', current: null, backUrl: getRelHome() };
        return { parent: 'home', current: null, backUrl: getRelHome() };
    }

    function getRelHome() {
        var path = location.pathname;
        if (path.includes('/pages/')) {
            var after = path.split('/pages/')[1];
            var depth = (after.match(/\//g) || []).length;
            return '../'.repeat(depth) + '../index.html';
        }
        return 'index.html';
    }

    function getRelBase() {
        var path = location.pathname;
        if (path.includes('/pages/')) {
            var after = path.split('/pages/')[1] || '';
            var depth = (after.match(/\//g) || []).length;
            return '../'.repeat(depth || 1);
        }
        return 'pages/';
    }

    // ── Styles ──
    function injectStyles() {
        if (document.getElementById('luna-nav-styles')) return;
        var s = document.createElement('style');
        s.id = 'luna-nav-styles';
        s.textContent = `
            /* ── Trigger Button (항상 우상단) ── */
            .ln-trigger {
                position: fixed;
                top: 12px;
                right: 12px;
                z-index: 10000;
                width: 36px; height: 36px;
                border-radius: 12px;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 700;
                transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
                backdrop-filter: blur(20px) saturate(1.6);
                -webkit-backdrop-filter: blur(20px) saturate(1.6);
                box-shadow: 0 2px 12px rgba(0,0,0,0.15);
                font-family: -apple-system, sans-serif;
            }
            .ln-trigger--dark {
                background: rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.7);
                border: 1px solid rgba(255,255,255,0.12);
            }
            .ln-trigger--dark:hover {
                background: rgba(255,255,255,0.18);
                color: #fff;
                transform: scale(1.08);
            }
            .ln-trigger--light {
                background: rgba(0,0,0,0.06);
                color: rgba(0,0,0,0.5);
                border: 1px solid rgba(0,0,0,0.08);
            }
            .ln-trigger--light:hover {
                background: rgba(0,0,0,0.1);
                color: rgba(0,0,0,0.8);
                transform: scale(1.08);
            }
            .ln-trigger.open {
                border-radius: 12px 12px 0 0;
                box-shadow: none;
            }

            /* ── Popup Panel ── */
            .ln-popup {
                position: fixed;
                top: 48px;
                right: 12px;
                z-index: 10000;
                min-width: 200px;
                border-radius: 16px 0 16px 16px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                backdrop-filter: blur(24px) saturate(1.8);
                -webkit-backdrop-filter: blur(24px) saturate(1.8);
                box-shadow: 0 8px 40px rgba(0,0,0,0.25);
                opacity: 0;
                transform: translateY(-8px) scale(0.95);
                transform-origin: top right;
                pointer-events: none;
                transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
                font-family: -apple-system, 'Inter', 'Noto Sans KR', sans-serif;
            }
            .ln-popup.show {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }
            .ln-popup--dark {
                background: rgba(15, 20, 40, 0.92);
                border: 1px solid rgba(255,255,255,0.1);
            }
            .ln-popup--light {
                background: rgba(255, 255, 255, 0.94);
                border: 1px solid rgba(0,0,0,0.08);
                box-shadow: 0 8px 40px rgba(0,0,0,0.1);
            }

            /* ── Popup Items ── */
            .ln-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 9px 14px;
                border-radius: 11px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none !important;
                transition: all 0.15s;
                border: none;
                outline: none;
                background: transparent;
                width: 100%;
                text-align: left;
            }
            .ln-item--dark { color: #cbd5e1; }
            .ln-item--dark:hover { background: rgba(255,255,255,0.08); color: #f1f5f9; }
            .ln-item--light { color: #475569; }
            .ln-item--light:hover { background: rgba(0,0,0,0.05); color: #1e293b; }
            .ln-item-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px; height: 28px;
                border-radius: 9px;
                font-size: 13px;
                font-weight: 800;
                flex-shrink: 0;
            }
            .ln-item-label { flex: 1; }
            .ln-item-arrow {
                font-size: 11px;
                opacity: 0.3;
                transition: transform 0.15s, opacity 0.15s;
            }
            .ln-item:hover .ln-item-arrow { opacity: 0.7; transform: translateX(2px); }

            .ln-divider {
                height: 1px;
                margin: 4px 8px;
            }
            .ln-divider--dark { background: rgba(255,255,255,0.06); }
            .ln-divider--light { background: rgba(0,0,0,0.06); }

            .ln-section-label {
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                padding: 6px 14px 2px;
            }
            .ln-section-label--dark { color: rgba(255,255,255,0.25); }
            .ln-section-label--light { color: rgba(0,0,0,0.25); }

            /* ── Backdrop ── */
            .ln-backdrop {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: none;
            }
            .ln-backdrop.show { display: block; }

            @media (max-width: 640px) {
                .ln-trigger { top: 8px; right: 8px; width: 32px; height: 32px; font-size: 14px; }
                .ln-popup { top: 40px; right: 8px; min-width: 180px; }
            }
        `;
        document.head.appendChild(s);
    }

    function isLightPage() {
        var bg = getComputedStyle(document.body).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            var m = bg.match(/\d+/g);
            if (m && m.length >= 3) {
                return (parseInt(m[0]) * 299 + parseInt(m[1]) * 587 + parseInt(m[2]) * 114) / 1000 > 160;
            }
        }
        return document.documentElement.classList.contains('light') ||
               document.body.classList.contains('light') ||
               document.body.classList.contains('bg-white');
    }

    // ── Build ──
    function build(ctx) {
        var light = isLightPage();
        var theme = light ? 'light' : 'dark';
        var section = SECTIONS[ctx.parent] || SECTIONS.home;

        // Backdrop (클릭하면 닫기)
        var backdrop = document.createElement('div');
        backdrop.className = 'ln-backdrop';

        // Trigger button
        var trigger = document.createElement('button');
        trigger.className = 'ln-trigger ln-trigger--' + theme;
        trigger.id = 'luna-nav-trigger';
        trigger.innerHTML = '‹';
        trigger.title = '이동';
        trigger.style.color = section.accent;

        // Popup
        var popup = document.createElement('div');
        popup.className = 'ln-popup ln-popup--' + theme;
        popup.id = 'luna-nav-popup';

        // === Popup content ===

        // 1. 뒤로가기 (현재 섹션 부모로)
        var backItem = document.createElement(ctx.backUrl ? 'a' : 'button');
        backItem.className = 'ln-item ln-item--' + theme;
        if (ctx.backUrl) backItem.href = ctx.backUrl;
        else if (ctx.useLunaApp) {
            backItem.addEventListener('click', function() {
                if (typeof LunaApp !== 'undefined') {
                    var m = location.pathname.match(/lesson-(\d{4}-\d{2})/);
                    m ? LunaApp.navigate('monthlyDetail', { month: m[1] }) : LunaApp.navigate('home');
                } else { history.back(); }
            });
        } else {
            backItem.addEventListener('click', function() { history.back(); });
        }
        backItem.innerHTML =
            '<span class="ln-item-icon" style="background:' + section.bg + ';color:' + section.accent + ';border:1px solid ' + section.border + '">' + section.icon + '</span>' +
            '<span class="ln-item-label">← ' + section.label + '</span>' +
            '<span class="ln-item-arrow">›</span>';
        popup.appendChild(backItem);

        // 2. 홈으로 (이미 홈이 parent가 아닌 경우)
        if (ctx.parent !== 'home') {
            var homeItem = document.createElement('a');
            homeItem.className = 'ln-item ln-item--' + theme;
            homeItem.href = getRelHome();
            var hs = SECTIONS.home;
            homeItem.innerHTML =
                '<span class="ln-item-icon" style="background:' + hs.bg + ';color:' + hs.accent + ';border:1px solid ' + hs.border + '">' + hs.icon + '</span>' +
                '<span class="ln-item-label">Home</span>' +
                '<span class="ln-item-arrow">›</span>';
            popup.appendChild(homeItem);
        }

        // 3. 형제 섹션들 (허브 페이지에서)
        var hubs = ['math', 'tech', 'korean', 'en'];
        if (ctx.current && hubs.includes(ctx.current)) {
            var div = document.createElement('div');
            div.className = 'ln-divider ln-divider--' + theme;
            popup.appendChild(div);

            var lbl = document.createElement('div');
            lbl.className = 'ln-section-label ln-section-label--' + theme;
            lbl.textContent = '바로 이동';
            popup.appendChild(lbl);

            var base = getRelBase();
            hubs.filter(function(h) { return h !== ctx.current; }).forEach(function(h) {
                var s = SECTIONS[h];
                var a = document.createElement('a');
                a.className = 'ln-item ln-item--' + theme;
                a.href = base + HUB_MAP[h];
                a.innerHTML =
                    '<span class="ln-item-icon" style="background:' + s.bg + ';color:' + s.accent + ';border:1px solid ' + s.border + '">' + s.icon + '</span>' +
                    '<span class="ln-item-label">' + s.label + '</span>' +
                    '<span class="ln-item-arrow">›</span>';
                popup.appendChild(a);
            });
        }

        // 4. 하단 유틸리티: 상점
        (function() {
            var utilDiv = document.createElement('div');
            utilDiv.className = 'ln-divider ln-divider--' + theme;
            popup.appendChild(utilDiv);

            var shopItem = document.createElement('a');
            shopItem.className = 'ln-item ln-item--' + theme;
            shopItem.href = (function() {
                var p = location.pathname;
                if (p.includes('/pages/main/')) return 'shop.html';
                if (p.includes('/pages/')) {
                    var after = p.split('/pages/')[1] || '';
                    var d = (after.match(/\//g) || []).length;
                    return '../'.repeat(d || 1) + 'main/shop.html';
                }
                return 'pages/main/shop.html';
            })();
            shopItem.innerHTML =
                '<span class="ln-item-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;border:1px solid rgba(245,158,11,0.3)">🛒</span>' +
                '<span class="ln-item-label">상점</span>' +
                '<span class="ln-item-arrow">›</span>';
            popup.appendChild(shopItem);
        })();

        // Toggle logic
        var isOpen = false;
        function toggle() {
            isOpen = !isOpen;
            popup.classList.toggle('show', isOpen);
            backdrop.classList.toggle('show', isOpen);
            trigger.classList.toggle('open', isOpen);
            trigger.innerHTML = isOpen ? '✕' : '‹';
        }
        trigger.addEventListener('click', toggle);
        backdrop.addEventListener('click', toggle);

        // 기존 back 버튼 숨기기
        document.querySelectorAll('.back-btn, .back-to-hub, .back-to-art, .hud-home-btn, .btn-back-map, .back-link').forEach(function(el) {
            el.style.display = 'none';
        });
        // onclick="history.back()" 또는 arrow_back 아이콘 버튼도 숨기기
        document.querySelectorAll('button[onclick*="history.back"], button[onclick*="history.go"]').forEach(function(el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('a[href="javascript:history.back()"]').forEach(function(el) {
            el.style.display = 'none';
        });

        document.body.appendChild(backdrop);
        document.body.appendChild(trigger);
        document.body.appendChild(popup);

        // topbar/header가 있으면 겹치지 않게 위치 조정
        requestAnimationFrame(function() {
            var topbar = document.querySelector('.topbar, .top-bar');
            if (topbar) {
                var h = topbar.getBoundingClientRect().height;
                trigger.style.top = (h + 8) + 'px';
                popup.style.top = (h + 8 + 36 + 4) + 'px';
            }
            // 메인 홈 헤더 (sticky header with flex)
            var header = document.querySelector('header.sticky, header[class*="sticky"]');
            if (header && !topbar) {
                var hh = header.getBoundingClientRect().height;
                trigger.style.top = (hh + 8) + 'px';
                popup.style.top = (hh + 8 + 36 + 4) + 'px';
            }
        });
    }

    function init() {
        var ctx = detectContext();
        if (!ctx) return;

        // 앱 프레임 (사이드바가 있는 페이지)에서는 표시 안함 — 이미 사이드바 네비가 있음
        var hasSidebar = document.querySelector('aside, nav.sidebar, .sidebar-nav, [class*="lg:ml-64"], [class*="sidebar"]');
        // 메인 홈 헤더 아이콘(∑,⚙,EN,한)이 있는 페이지도 제외
        var hasMainHeader = document.querySelector('#header-math-btn, #header-tech-btn, a[href*="luna-math/index"]');
        if (hasSidebar || hasMainHeader) return;

        injectStyles();
        build(ctx);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
