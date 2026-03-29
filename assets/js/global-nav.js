/* ═══════════════════════════════════════════════
   Global Navigation Sidebar — Luna Whale
   Self-injecting component for all pages
   ═══════════════════════════════════════════════ */

(function() {
    'use strict';

    // ─── Base path detection ───
    // basePath를 현재 페이지 URL로부터 계산
    function getBasePath() {
        const path = window.location.pathname;
        // /pages/main/classes.html → ../../
        // /pages/luna-math/index.html → ../../
        // /index.html → ./
        // / → ./
        const parts = path.split('/').filter(Boolean);
        const htmlFile = parts[parts.length - 1];
        const isHTML = htmlFile && htmlFile.endsWith('.html');
        const dirDepth = isHTML ? parts.length - 1 : parts.length;
        if (dirDepth <= 0) return './';
        return '../'.repeat(dirDepth);
    }
    const basePath = getBasePath();

    // ─── Navigation items ───
    const NAV_ITEMS = [
        // 콘텐츠 묶음 (파스텔)
        { icon: 'home', label: '홈', href: 'index.html', id: 'home', ic: '#FFB3BA' },
        { icon: 'school', label: '수업T', href: 'pages/main/classesT.html', id: 'classesT', ic: '#BAE1FF' },
        { icon: 'family_restroom', label: '수업M', href: 'pages/main/classesM.html', id: 'classesM', ic: '#FFB3D9' },
        { icon: 'hub', label: '코스모스', href: 'pages/main/art-cosmos.html', id: 'cosmos', tooltip: 'Art Cosmos', ic: '#D4BFFF' },
        { icon: 'palette', label: '아틀리에', href: 'pages/main/art-shop.html', id: 'art-shop', tooltip: 'Illustration', ic: '#FFDFBA' },
        { icon: 'shopping_cart', label: '상점', href: 'pages/main/shop.html', id: 'shop', tooltip: 'Shop', ic: '#FFD700' },
        { type: 'divider' },
        // Luna 모듈
        { iconText: '🎨', textClass: 'art', label: 'Art', href: 'index.html#home', id: 'home-art', tooltip: 'Luna Whale Art' },
        { iconText: '∑', textClass: 'math', label: 'Math', href: 'pages/luna-math/index.html', id: 'math', tooltip: 'Luna Math' },
        { iconText: '⚙', textClass: 'tech', label: 'TECH', href: 'pages/luna-tech/index.html', id: 'tech', tooltip: 'Luna TECH' },
        { iconText: 'EN', textClass: 'en', label: 'English', href: 'pages/luna-en/index.html', id: 'en', tooltip: 'Luna English' },
        { iconText: '한', textClass: 'korean', label: '국어', href: 'pages/luna-korean/index.html', id: 'korean', tooltip: 'Luna 국어' },
        { iconText: '🧪', textClass: 'science', label: 'Science', href: 'pages/luna-science/index.html', id: 'science', tooltip: 'Luna Science' },
        { iconText: '🎵', textClass: 'music', label: 'Music', href: 'pages/luna-music/index.html', id: 'music', tooltip: 'Luna Music' },
        { type: 'divider' },
        // 유틸
        { icon: 'sports_esports', label: '놀이터', href: 'pages/student/playground.html', id: 'playground', tooltip: 'Playground', ic: '#BAFFC9' },
        { icon: 'gallery_thumbnail', label: '갤러리', href: 'pages/main/gallery.html', id: 'gallery', ic: '#FFFFBA' },
        { icon: 'person', label: '프로필', href: 'pages/main/profile.html', id: 'profile', tooltip: 'Profile', ic: '#D5D5D5' },
        { icon: 'settings', label: '설정', href: 'pages/main/settings.html', id: 'settings', tooltip: 'Settings', ic: '#C0C0C0' },
    ];

    // ─── Detect current page ───
    function detectActivePage() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        // 서브 폴더 index.html 먼저 체크 (luna-math/index.html 등)
        if (path.includes('luna-math')) return 'math';
        if (path.includes('luna-tech')) return 'tech';
        if (path.includes('luna-en')) return 'en';
        if (path.includes('luna-korean')) return 'korean';
        if (path.includes('luna-science')) return 'science';
        if (path.includes('classesT')) return 'classesT';
        if (path.includes('classesM')) return 'classesM';
        if (path.includes('classes')) return 'classesT';
        if (path.includes('gallery')) return 'gallery';
        if (path.includes('art-cosmos')) return 'cosmos';
        if (path.includes('playground')) return 'playground';
        if (path.includes('art-shop')) return 'art-shop';
        if (path.includes('shop')) return 'shop';
        if (path.includes('profile')) return 'profile';
        if (path.includes('settings')) return 'settings';
        // 루트 index.html: 해시로 구분
        if (path === '/' || path.endsWith('/index.html') || path === '/index.html') {
            return hash === '#home' ? 'home-art' : 'home';
        }
        return '';
    }

    // ─── Build HTML ───
    function buildNavHTML() {
        const activePage = detectActivePage();

        let itemsHTML = '';
        NAV_ITEMS.forEach(item => {
            if (item.type === 'divider') {
                itemsHTML += '<div class="gnav-divider"></div>';
                return;
            }

            const isActive = item.id === activePage ? ' active' : '';
            const tooltip = item.tooltip || item.label;
            const href = basePath + item.href;
            const style = item.ic ? ' style="--ic:' + item.ic + '"' : '';

            let iconHTML;
            if (item.iconText) {
                iconHTML = '<span class="gnav-icon-text ' + (item.textClass || '') + '">' + item.iconText + '</span>';
            } else {
                iconHTML = '<span class="material-symbols-rounded">' + item.icon + '</span>';
            }

            itemsHTML +=
                '<a class="gnav-item' + isActive + '" href="' + href + '" data-tooltip="' + tooltip + '"' + style + '>' +
                    iconHTML +
                    '<span class="gnav-item-label">' + item.label + '</span>' +
                '</a>';
        });

        return '<div class="gnav-backdrop" id="gnavBackdrop"></div>' +
               '<nav class="gnav-sidebar" id="gnavSidebar">' +
                   '<button class="gnav-close" id="gnavClose" aria-label="닫기">' +
                       '<span class="material-symbols-rounded">close</span>' +
                   '</button>' +
                   itemsHTML +
               '</nav>' +
               '<button class="gnav-pill" id="gnavPill" aria-label="메뉴">' +
                   '<span class="material-symbols-rounded">chevron_left</span>' +
               '</button>';
    }

    // ─── Inject CSS ───
    function injectCSS() {
        if (document.getElementById('gnav-css')) return;
        const link = document.createElement('link');
        link.id = 'gnav-css';
        link.rel = 'stylesheet';
        link.href = basePath + 'assets/css/global-nav.css?v=20260329g';
        document.head.appendChild(link);

        // Material Symbols 폰트 보장
        if (!document.querySelector('link[href*="Material+Symbols+Rounded"]')) {
            const font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
            document.head.appendChild(font);
        }
    }

    // ─── Hide all old navigation ───
    function hideOldNav() {
        document.body.classList.add('hide-old-nav');

        // JS로도 직접 숨기기 (CSS 로딩 전에도 작동하도록)
        const selectors = [
            '.app-sidebar', '.bottom-nav', '#sidebar', '.sidebar:not(.gnav-sidebar)',
            '#techSidebar', '.tech-sidebar', '#luna-nav-trigger', '#luna-nav-popup',
            '.hub-nav-bar', '#hub-nav-bar',
            '#header-math-btn', '#header-tech-btn', '#header-en-btn',
            '#header-korean-btn', '#header-playground-btn',
            // 동적으로 생성되는 fixed 버튼들
            '.luna-math-btn', '.luna-tech-flip-btn',
            // Art Cosmos 음성검색 위젯
            '.acw-btn', '.acw-panel'
        ];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = 'none';
            });
        });

        // main-content의 margin-left 제거 (기존 사이드바용)
        const mc = document.querySelector('.main-content');
        if (mc) mc.style.marginLeft = '0';
    }

    // ─── Init ───
    function init() {
        // 이미 초기화되었으면 중복 방지
        if (document.getElementById('gnav-root')) return;

        injectCSS();

        // 최상위에 fixed 래퍼 생성
        const wrapper = document.createElement('div');
        wrapper.id = 'gnav-root';
        wrapper.innerHTML = buildNavHTML();
        document.documentElement.appendChild(wrapper);

        // 기존 nav 숨기기
        hideOldNav();

        // References
        const pill = document.getElementById('gnavPill');
        const sidebar = document.getElementById('gnavSidebar');
        const backdrop = document.getElementById('gnavBackdrop');
        if (!pill || !sidebar) return;

        let isOpen = false;

        // 저장된 상태 복원 (데스크탑)
        if (window.innerWidth >= 768) {
            const saved = localStorage.getItem('gnav-open');
            isOpen = saved !== 'false'; // 기본 열림
            if (isOpen) {
                sidebar.classList.add('open');
                pill.classList.add('open');
            }
        }

        function toggle() {
            isOpen = !isOpen;
            sidebar.classList.toggle('open', isOpen);
            pill.classList.toggle('open', isOpen);
            backdrop.classList.toggle('open', isOpen && window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                localStorage.setItem('gnav-open', isOpen);
            }
        }

        const closeBtn = document.getElementById('gnavClose');

        pill.addEventListener('click', toggle);
        backdrop.addEventListener('click', toggle);
        if (closeBtn) closeBtn.addEventListener('click', toggle);

        // ESC로 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) toggle();
        });

        // DOM 변경 감시 (동적으로 추가되는 nav 요소 숨기기)
        const observer = new MutationObserver(function() {
            hideOldNav();
        });
        observer.observe(document.body, { childList: true, subtree: false });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
