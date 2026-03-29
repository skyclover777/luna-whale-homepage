/**
 * Hub Navigation Bar — 허브 페이지 간 이동 토글
 * 각 허브 헤더에 형제 허브 바로가기 아이콘을 자동 삽입
 *
 * Usage: <script src="../../assets/js/hub-nav-bar.js"></script>
 * Requires: <body data-nav-section="math|tech|korean|en">
 */
(function () {
    'use strict';

    const HUBS = [
        { id: 'home', label: 'Home', icon: '🏠', color: '#6366f1', path: '../../index-v2.html' },
        { id: 'math', label: 'Math', icon: '∑', color: '#f59e0b', path: '../../pages/luna-math/index-v2.html' },
        { id: 'tech', label: 'TECH', icon: '⚙', color: '#06b6d4', path: '../../pages/luna-tech/index-v2.html' },
        { id: 'korean', label: '국어', icon: '한', color: '#D4A574', path: '../../pages/luna-korean/index-v2.html' },
        { id: 'en', label: 'EN', icon: 'EN', color: '#FF6B6B', path: '../../pages/luna-en/index-v2.html' },
    ];

    function getBasePath() {
        const p = location.pathname;
        if (p.includes('/luna-math/')) return '';
        if (p.includes('/luna-tech/')) return '';
        if (p.includes('/luna-korean/')) return '';
        if (p.includes('/luna-en/')) return '';
        return '';
    }

    function fixPath(hubPath) {
        // Hub pages are siblings, so relative paths need adjustment
        const p = location.pathname;
        if (p.includes('/luna-math/')) {
            if (hubPath.includes('luna-tech')) return '../luna-tech/index-v2.html';
            if (hubPath.includes('luna-korean')) return '../luna-korean/index-v2.html';
            if (hubPath.includes('luna-en')) return '../luna-en/index-v2.html';
            if (hubPath.includes('index-v2.html') && !hubPath.includes('luna-')) return '../../index-v2.html';
        }
        if (p.includes('/luna-tech/')) {
            if (hubPath.includes('luna-math')) return '../luna-math/index-v2.html';
            if (hubPath.includes('luna-korean')) return '../luna-korean/index-v2.html';
            if (hubPath.includes('luna-en')) return '../luna-en/index-v2.html';
            if (hubPath.includes('index-v2.html') && !hubPath.includes('luna-')) return '../../index-v2.html';
        }
        if (p.includes('/luna-korean/')) {
            if (hubPath.includes('luna-math')) return '../luna-math/index-v2.html';
            if (hubPath.includes('luna-tech')) return '../luna-tech/index-v2.html';
            if (hubPath.includes('luna-en')) return '../luna-en/index-v2.html';
            if (hubPath.includes('index-v2.html') && !hubPath.includes('luna-')) return '../../index-v2.html';
        }
        if (p.includes('/luna-en/')) {
            if (hubPath.includes('luna-math')) return '../luna-math/index-v2.html';
            if (hubPath.includes('luna-tech')) return '../luna-tech/index-v2.html';
            if (hubPath.includes('luna-korean')) return '../luna-korean/index-v2.html';
            if (hubPath.includes('index-v2.html') && !hubPath.includes('luna-')) return '../../index-v2.html';
        }
        return hubPath;
    }

    function init() {
        const section = document.body.dataset.navSection;
        if (!section || !['math', 'tech', 'korean', 'en'].includes(section)) return;

        // Find the hub header (first <header> on page)
        const header = document.querySelector('header');
        if (!header) return;

        // Create hub nav bar
        const bar = document.createElement('div');
        bar.style.cssText = 'display:flex;gap:6px;position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:9000;padding:8px 12px;border-radius:16px;background:rgba(15,20,35,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4)';

        HUBS.forEach(hub => {
            const isActive = hub.id === section;
            const btn = document.createElement('a');
            btn.href = fixPath(hub.path);
            btn.style.cssText = `display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;text-decoration:none;font-size:14px;font-weight:800;transition:all 0.2s;border:1px solid ${isActive ? hub.color : 'transparent'};background:${isActive ? hub.color + '22' : 'transparent'};color:${isActive ? hub.color : 'rgba(255,255,255,0.5)'}`;
            btn.title = hub.label;
            btn.textContent = hub.icon;

            if (!isActive) {
                btn.onmouseover = () => { btn.style.background = hub.color + '15'; btn.style.color = hub.color; btn.style.borderColor = hub.color + '40'; };
                btn.onmouseout = () => { btn.style.background = 'transparent'; btn.style.color = 'rgba(255,255,255,0.5)'; btn.style.borderColor = 'transparent'; };
            }

            bar.appendChild(btn);
        });

        document.body.appendChild(bar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
