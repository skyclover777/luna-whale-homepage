/**
 * Art Cosmos Widget — 모든 페이지에서 사용 가능한 글로벌 음성 이미지 검색
 * 왼쪽 하단 플로팅 버튼 → 음성 인식 → 이미지 오버레이 → 닫기 애니메이션
 *
 * 사용법: 모든 HTML 페이지에 아래 3줄 추가
 * <script src="assets/data/art-archive.js"></script>
 * <script src="assets/js/voice-engine.js"></script>
 * <script src="assets/js/art-cosmos-widget.js"></script>
 */
(function () {
    'use strict';

    // 이미 초기화됐으면 중복 방지
    if (window.__artCosmosWidget) return;
    window.__artCosmosWidget = true;

    // 특정 페이지에서만 표시 (메인, 수업, 아트코스모스)
    const path = window.location.pathname;
    const showPages = [
        '/index.html', '/',                          // 메인
        '/pages/main/classes.html',                   // 수업 목록
        '/pages/main/monthly-detail.html',            // 월간 수업 상세
        '/pages/main/art-cosmos.html',                // 아트 코스모스
        '/pages/main/coloring.html',                  // 색칠교실
        '/pages/main/paper-craft.html',               // 종이오리기
    ];
    const showInLessons = path.includes('/pages/lessons/');  // 모든 수업 상세
    const shouldShow = showPages.some(p => path.endsWith(p)) || showInLessons;
    if (!shouldShow) return;

    // ─── Material Symbols 폰트 보장 ─────────────
    if (!document.querySelector('link[href*="Material+Symbols"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
        document.head.appendChild(link);
    }

    // ─── CSS 주입 ────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        /* 글로벌 위젯 버튼 (왼쪽 상단 고정) */
        .acw-btn {
            position: fixed; top: 16px; left: 210px; z-index: 9990;
            width: 44px; height: 44px; border-radius: 14px;
            background: linear-gradient(135deg, #1a1a3e, #2d2b6b);
            border: 1.5px solid rgba(99,102,241,0.4);
            color: #818cf8; cursor: pointer;
            box-shadow: 0 2px 12px rgba(99,102,241,0.25);
            display: flex; align-items: center; justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s, background 0.3s, border-color 0.3s;
        }
        .acw-btn:hover { transform: scale(1.08); box-shadow: 0 4px 20px rgba(99,102,241,0.4); border-color: #818cf8; }
        .acw-btn .acw-icon { font-size: 22px; transition: opacity 0.2s; }
        /* 사이드바 있어도 항상 왼쪽 상단 고정 */
        .acw-btn.listening {
            background: linear-gradient(135deg, rgba(239,68,68,0.85), rgba(249,115,22,0.85));
            animation: acw-pulse 1.5s ease-out infinite;
        }

        /* ON/OFF 토글 버튼 */
        .acw-toggle {
            position: fixed; top: 20px; left: 190px; z-index: 9990;
            display: none; align-items: center; gap: 6px;
            cursor: pointer; user-select: none;
        }
        .acw-toggle.active { display: flex; }
        .acw-toggle-track {
            width: 38px; height: 20px; border-radius: 10px;
            background: rgba(100,116,139,0.5); position: relative;
            transition: background 0.3s;
        }
        .acw-toggle.on .acw-toggle-track { background: rgba(239,68,68,0.8); }
        .acw-toggle-thumb {
            width: 16px; height: 16px; border-radius: 50%;
            background: white; position: absolute; top: 2px; left: 2px;
            transition: left 0.3s; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .acw-toggle.on .acw-toggle-thumb { left: 20px; }
        .acw-toggle-label {
            font-size: 11px; font-weight: 600; font-family: 'Lexend', sans-serif;
            color: #94a3b8; letter-spacing: 0.5px;
        }
        .acw-toggle.on .acw-toggle-label { color: #ef4444; }
        @keyframes acw-pulse {
            0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
            70% { box-shadow: 0 0 0 18px rgba(239,68,68,0); }
            100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }

        /* 음성 인디케이터 */
        .acw-indicator {
            position: fixed; top: 68px; left: 210px; z-index: 9991;
            background: rgba(10,10,30,0.92); backdrop-filter: blur(12px);
            border: 1px solid rgba(239,68,68,0.3); border-radius: 14px;
            padding: 10px 16px; display: none; align-items: center; gap: 10px;
            color: #e2e8f0; font-size: 13px; font-family: 'Lexend', sans-serif;
            max-width: 260px;
        }
        /* 인디케이터도 항상 상단 고정 */
        .acw-indicator.active { display: flex; }
        .acw-dot {
            width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
            background: #ef4444; animation: acw-blink 1s infinite;
        }
        @keyframes acw-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* 오버레이 */
        .acw-overlay {
            position: fixed; inset: 0; z-index: 9995;
            background: rgba(5,5,16,0.94); backdrop-filter: blur(16px);
            display: none; flex-direction: column; padding: 24px;
            overflow-y: auto; opacity: 0;
            transition: opacity 0.3s ease;
        }
        .acw-overlay.active { display: flex; opacity: 1; }
        .acw-overlay.closing { opacity: 0; }
        .acw-overlay::-webkit-scrollbar { width: 6px; }
        .acw-overlay::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }

        .acw-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 8px; flex-shrink: 0;
        }
        .acw-title { color: #818cf8; font-size: 20px; font-weight: 700; font-family: 'Lexend', sans-serif; }
        .acw-count { color: #64748b; font-size: 13px; margin-bottom: 16px; flex-shrink: 0; }
        .acw-status { color: #94a3b8; font-size: 14px; text-align: center; margin-bottom: 16px; }
        .acw-close {
            width: 40px; height: 40px; border-radius: 50%;
            background: rgba(255,255,255,0.1); border: none;
            color: white; cursor: pointer; display: flex;
            align-items: center; justify-content: center;
        }
        .acw-close:hover { background: rgba(255,255,255,0.2); }

        /* 그리드 */
        .acw-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 16px; flex: 1;
        }
        @media (min-width: 768px) { .acw-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); } }

        .acw-card {
            position: relative; border-radius: 14px; overflow: hidden;
            cursor: pointer; border: 2px solid transparent;
            background: rgba(30,30,60,0.5);
            transition: border-color 0.2s, transform 0.3s, opacity 0.4s;
        }
        .acw-card:hover { border-color: #818cf8; transform: scale(1.04); }
        .acw-card.selected { border-color: #f59e0b !important; }
        .acw-card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .acw-card-label { padding: 6px 10px; font-size: 11px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .acw-num {
            position: absolute; top: 8px; left: 8px;
            width: 32px; height: 32px; border-radius: 50%;
            background: rgba(99,102,241,0.9); color: white;
            font-size: 14px; font-weight: 700;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Lexend', sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        /* 닫기 애니메이션: 카드들이 아이콘으로 빨려들어감 */
        .acw-card.fly-out {
            position: fixed !important; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            opacity: 0; transform: scale(0.1) !important; z-index: 9999;
        }

        /* 뷰어 (라이트박스) */
        .acw-viewer {
            position: fixed; inset: 0; z-index: 9998;
            display: none; align-items: center; justify-content: center;
        }
        .acw-viewer.active { display: flex; }
        .acw-viewer-bg { position: absolute; inset: 0; background: rgba(0,0,0,0.92); cursor: pointer; }
        .acw-viewer-content { position: relative; z-index: 1; max-width: 90vw; max-height: 80vh; }
        .acw-viewer-img {
            max-width: 90vw; max-height: 80vh; border-radius: 16px;
            object-fit: contain; box-shadow: 0 0 60px rgba(99,102,241,0.3);
        }
        .acw-viewer-badge {
            position: absolute; top: 16px; left: 16px;
            background: rgba(99,102,241,0.9); color: white;
            padding: 6px 14px; border-radius: 999px;
            font-size: 14px; font-weight: 700; font-family: 'Lexend', sans-serif;
        }
        .acw-viewer-bar {
            position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 2;
            display: flex; align-items: center; gap: 8px;
            background: rgba(10,10,30,0.9); backdrop-filter: blur(12px);
            border: 1px solid rgba(99,102,241,0.2); border-radius: 999px; padding: 8px 16px;
        }
        .acw-vbtn {
            width: 40px; height: 40px; border-radius: 50%;
            background: rgba(255,255,255,0.08); border: none;
            color: #e2e8f0; cursor: pointer; display: flex;
            align-items: center; justify-content: center;
        }
        .acw-vbtn:hover:not(:disabled) { background: rgba(255,255,255,0.15); }
        .acw-vbtn:disabled { opacity: 0.3; cursor: default; }
        .acw-vcounter { color: #94a3b8; font-size: 13px; padding: 0 8px; font-family: 'Lexend', sans-serif; }
        .acw-vdiv { width: 1px; height: 24px; background: rgba(255,255,255,0.1); margin: 0 4px; }

        .acw-empty { text-align: center; padding: 60px 20px; color: #64748b; font-size: 14px; grid-column: 1/-1; }
        .acw-empty-sub { font-size: 12px; color: #475569; margin-top: 8px; }

        /* Print */
        .acw-print { display: none; }
        @media print {
            body > *:not(.acw-print) { display: none !important; }
            .acw-print { display: block !important; position: static; width: 100%; text-align: center; }
            .acw-print img { max-width: 100%; max-height: 90vh; object-fit: contain; }
        }

        @keyframes acw-spin { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // ─── HTML 주입 ───────────────────────────────
    const html = `
        <button class="acw-btn" id="acw-btn" title="Art Cosmos 음성 검색">
            <span class="material-symbols-outlined acw-icon" style="font-variation-settings:'FILL' 1">auto_awesome</span>
        </button>
        <div class="acw-toggle" id="acw-toggle">
            <div class="acw-toggle-track"><div class="acw-toggle-thumb"></div></div>
            <span class="acw-toggle-label">OFF</span>
        </div>
        <div class="acw-indicator" id="acw-indicator">
            <div class="acw-dot"></div>
            <span id="acw-transcript">듣고 있어요...</span>
        </div>
        <div class="acw-overlay" id="acw-overlay">
            <div class="acw-header">
                <div>
                    <div class="acw-title" id="acw-title"></div>
                    <div class="acw-count" id="acw-count"></div>
                </div>
                <button class="acw-close" id="acw-close-btn">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="acw-status" id="acw-status"></div>
            <div class="acw-grid" id="acw-grid"></div>
        </div>
        <div class="acw-viewer" id="acw-viewer"></div>
        <div class="acw-print" id="acw-print"></div>
    `;
    const container = document.createElement('div');
    container.id = 'art-cosmos-widget';
    container.innerHTML = html;
    document.body.appendChild(container);

    // ─── 상태 ────────────────────────────────────
    let voice = null;
    let parser = null;
    let results = [];
    let lastQuery = '';    // "다시" 명령용
    let viewerOpen = false;
    let viewerIndex = -1;

    // ─── 초기화 ──────────────────────────────────
    function init() {
        // VoiceEngine과 CommandParser는 voice-engine.js에서 로드됨
        if (typeof VoiceEngine !== 'undefined') {
            voice = new VoiceEngine({ lang: 'ko-KR' });
            voice.init();
            voice.addEventListener('result', onVoiceResult);
            voice.addEventListener('listening', onListeningChange);
            voice.addEventListener('error', onVoiceError);
        }
        if (typeof CommandParser !== 'undefined') {
            parser = new CommandParser();
        }

        // 이벤트 바인딩
        document.getElementById('acw-btn').addEventListener('click', toggleVoice);
        document.getElementById('acw-toggle').addEventListener('click', toggleVoice);
        document.getElementById('acw-close-btn').addEventListener('click', closeOverlay);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (viewerOpen) closeViewer();
                else if (isOverlayOpen()) closeOverlay();
            }
            if (!viewerOpen) return;
            if (e.key === 'ArrowRight') viewerNext();
            if (e.key === 'ArrowLeft') viewerPrev();
        });
    }

    // ─── 음성 처리 ───────────────────────────────
    function toggleVoice() {
        if (!voice) {
            // Voice not supported — fallback: prompt text input
            const q = prompt('검색어를 입력하세요 (예: 꽃, 고래, 공룡)');
            if (q) executeSearch(q, 10);
            return;
        }
        voice.toggle();
    }

    function onVoiceResult(e) {
        const { transcript, isFinal } = e.detail;
        document.getElementById('acw-transcript').textContent = transcript;
        if (!isFinal) return;
        if (!parser) return;
        const cmd = parser.parse(transcript);
        handleCommand(cmd);
    }

    function onListeningChange(e) {
        const btn = document.getElementById('acw-btn');
        const ind = document.getElementById('acw-indicator');
        const toggle = document.getElementById('acw-toggle');
        const label = toggle.querySelector('.acw-toggle-label');
        if (e.detail) {
            btn.classList.add('listening');
            ind.classList.add('active');
            toggle.classList.add('active', 'on');
            label.textContent = 'ON';
            document.getElementById('acw-transcript').textContent = '듣고 있어요...';
        } else {
            btn.classList.remove('listening');
            ind.classList.remove('active');
            toggle.classList.remove('on');
            label.textContent = 'OFF';
            // 토글은 한 번 보이면 계속 보임 (클릭으로 다시 켤 수 있게)
        }
    }

    function onVoiceError(e) {
        if (e.detail === 'not-allowed') {
            document.getElementById('acw-transcript').textContent = '마이크 권한을 허용해주세요';
        }
    }

    // ─── 명령 실행 ───────────────────────────────
    async function handleCommand(cmd) {
        switch (cmd.type) {
            case 'search':
                await executeSearch(cmd.query, cmd.count || 10);
                break;
            case 'zoom':
                if (cmd.number && results[cmd.number - 1]) openViewer(cmd.number - 1);
                break;
            case 'print':
                if (cmd.number && results[cmd.number - 1]) {
                    openViewer(cmd.number - 1);
                    setTimeout(printCurrent, 500);
                }
                break;
            case 'close':
                if (viewerOpen) closeViewer();
                else closeOverlay();
                break;
            case 'stop':
                // "루나 닫아줘" — 전부 닫고 음성도 끄기
                if (viewerOpen) closeViewer();
                closeOverlay();
                if (voice) voice.stop();
                break;
            case 'retry':
                // "다시" — 같은 검색어로 다시 (새로운 이미지)
                if (lastQuery) await executeSearch(lastQuery, 10);
                break;
            case 'next': viewerNext(); break;
            case 'prev': viewerPrev(); break;
        }
    }

    async function executeSearch(query, count) {
        lastQuery = query;
        // 로딩 표시
        showOverlay();
        document.getElementById('acw-title').textContent = `"${query}"`;
        document.getElementById('acw-count').textContent = '';
        document.getElementById('acw-status').textContent = '';
        document.getElementById('acw-grid').innerHTML = `
            <div class="acw-empty">
                <div style="width:40px;height:40px;border:3px solid #334155;border-top-color:#818cf8;border-radius:50%;animation:acw-spin 0.8s linear infinite;margin:0 auto 16px"></div>
                <p>검색 중...</p>
            </div>
        `;

        // searchArchive (art-archive.js)
        if (typeof searchArchive === 'function') {
            const { results: r, source } = await searchArchive(query, count);
            if (r.length > 0) {
                showResults(r, query, source);
            } else {
                showNoResults(query);
            }
        } else {
            showNoResults(query);
        }
    }

    // ─── 오버레이 ────────────────────────────────
    function showOverlay() {
        const ov = document.getElementById('acw-overlay');
        ov.classList.remove('closing');
        ov.classList.add('active');
        // Force reflow for opacity transition
        void ov.offsetHeight;
        ov.style.opacity = '1';
    }

    function isOverlayOpen() {
        return document.getElementById('acw-overlay').classList.contains('active');
    }

    function closeOverlay() {
        const ov = document.getElementById('acw-overlay');
        const grid = document.getElementById('acw-grid');
        const btnRect = document.getElementById('acw-btn').getBoundingClientRect();
        const targetX = btnRect.left + btnRect.width / 2;
        const targetY = btnRect.top + btnRect.height / 2;

        // 카드들을 아이콘으로 빨려들어가게 애니메이션
        const cards = grid.querySelectorAll('.acw-card');
        if (cards.length > 0) {
            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                // 현재 위치 고정
                card.style.left = rect.left + 'px';
                card.style.top = rect.top + 'px';
                card.style.width = rect.width + 'px';
                card.style.height = rect.height + 'px';
                card.classList.add('fly-out');
                // 약간의 시차
                setTimeout(() => {
                    card.style.left = targetX + 'px';
                    card.style.top = targetY + 'px';
                }, i * 30);
            });

            // 애니메이션 끝나면 오버레이 닫기
            setTimeout(() => {
                ov.classList.remove('active');
                ov.style.opacity = '0';
                grid.innerHTML = '';
                results = [];
            }, cards.length * 30 + 500);
        } else {
            ov.style.opacity = '0';
            setTimeout(() => {
                ov.classList.remove('active');
                results = [];
            }, 300);
        }
    }

    function showResults(r, queryText, source) {
        results = r;
        document.getElementById('acw-title').textContent = `"${queryText}"`;
        const label = source === 'lessons' ? '수업' : source === 'local' ? '로컬' : source === 'web' ? 'Unsplash/Pexels' : '로컬 + 웹';
        document.getElementById('acw-count').textContent = `${r.length}건 (${label})`;
        document.getElementById('acw-status').textContent = '';

        const grid = document.getElementById('acw-grid');
        grid.innerHTML = r.map((img, i) => `
            <div class="acw-card${img.category === 'lesson' ? ' acw-lesson-card' : ''}" data-idx="${i}" id="acw-card-${i}"${img.link ? ` data-link="${img.link}"` : ''}>
                <div class="acw-num">${img.category === 'lesson' ? (img.source === 'creativity100' ? '🎨' : img.source === 'artist100' ? '🖼️' : '📚') : i + 1}</div>
                <img src="${img.thumb}" alt="" loading="lazy"
                     onerror="this.parentElement.style.display='none'" />
                <div class="acw-card-label">${img.label || (img.keywords ? img.keywords[0] : '')}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.acw-card').forEach(card => {
            card.addEventListener('click', () => {
                const link = card.dataset.link;
                if (link) {
                    // 수업 카드 → 해당 수업 페이지로 이동
                    const base = window.location.pathname.includes('/pages/') ? '../../' : '';
                    window.location.href = base + link;
                } else {
                    openViewer(parseInt(card.dataset.idx));
                }
            });
        });
    }

    function showNoResults(query) {
        document.getElementById('acw-status').textContent = `"${query}" — 검색 결과가 없습니다`;
        document.getElementById('acw-grid').innerHTML = `
            <div class="acw-empty">
                <span class="material-symbols-outlined" style="font-size:48px;color:#475569">image_not_supported</span>
                <p>검색 결과가 없습니다</p>
                <p class="acw-empty-sub">API 키를 설정하면 Unsplash/Pexels에서 실시간 검색됩니다</p>
            </div>
        `;
    }

    // ─── 뷰어 ────────────────────────────────────
    function openViewer(index) {
        viewerIndex = index;
        viewerOpen = true;
        highlightCard(index);
        renderViewer();
    }

    function renderViewer() {
        const img = results[viewerIndex];
        if (!img) return;
        const vw = document.getElementById('acw-viewer');
        vw.innerHTML = `
            <div class="acw-viewer-bg" onclick="document.getElementById('acw-viewer').classList.remove('active');"></div>
            <div class="acw-viewer-content" onclick="event.stopPropagation()">
                <img src="${img.full}" class="acw-viewer-img" onerror="this.src='${img.thumb}'" />
                <div class="acw-viewer-badge">${viewerIndex + 1}번</div>
            </div>
            <div class="acw-viewer-bar">
                <button class="acw-vbtn" onclick="window.__acwPrev()" ${viewerIndex === 0 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <span class="acw-vcounter">${viewerIndex + 1} / ${results.length}</span>
                <button class="acw-vbtn" onclick="window.__acwNext()" ${viewerIndex === results.length - 1 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
                <div class="acw-vdiv"></div>
                <button class="acw-vbtn" onclick="window.__acwPrint()" title="인쇄">
                    <span class="material-symbols-outlined">print</span>
                </button>
                <button class="acw-vbtn" onclick="window.__acwCloseViewer()" title="닫기">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        `;
        vw.classList.add('active');
    }

    function closeViewer() {
        viewerOpen = false;
        document.getElementById('acw-viewer').classList.remove('active');
        document.getElementById('acw-viewer').innerHTML = '';
    }

    function viewerNext() {
        if (viewerIndex < results.length - 1) { viewerIndex++; renderViewer(); highlightCard(viewerIndex); }
    }
    function viewerPrev() {
        if (viewerIndex > 0) { viewerIndex--; renderViewer(); highlightCard(viewerIndex); }
    }

    function highlightCard(idx) {
        document.querySelectorAll('.acw-card').forEach(c => c.classList.remove('selected'));
        const card = document.getElementById(`acw-card-${idx}`);
        if (card) { card.classList.add('selected'); card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }

    function printCurrent() {
        const img = results[viewerIndex];
        if (!img) return;
        const p = document.getElementById('acw-print');
        p.innerHTML = `<img src="${img.full}" onerror="this.src='${img.thumb}'" />`;
        p.style.display = 'block';
        window.print();
        p.style.display = 'none';
    }

    // 글로벌 함수 (뷰어 onclick에서 접근)
    window.__acwNext = viewerNext;
    window.__acwPrev = viewerPrev;
    window.__acwPrint = printCurrent;
    window.__acwCloseViewer = closeViewer;

    // ─── DOM 준비되면 초기화 ─────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
