/**
 * Luna Whale TECH — Slice Dissolve + Matrix Rain
 * 화면을 30개 세로 슬라이스로 자르고 랜덤 디졸브 + 코드 비
 */
(function () {
    'use strict';

    function getBasePath() {
        const path = window.location.pathname;
        if (path.endsWith('/index.html') && !path.includes('/pages/')) return '';
        if (path === '/' || path === '') return '';
        const parts = path.split('/').filter(Boolean);
        const idx = parts.indexOf('pages');
        if (idx >= 0) return '../'.repeat(parts.length - 1 - idx + 1);
        return '';
    }

    if (window.location.pathname.includes('luna-tech')) return;

    // 헤더 버튼이 있으면 fixed 버튼은 안 만들고, 전환 효과만 연결
    const hasHeaderBtn = !!document.getElementById('header-tech-btn');

    const basePath = getBasePath();

    const style = document.createElement('style');
    style.textContent = `
        .luna-tech-flip-btn {
            position: fixed; top: 16px; right: 16px;
            width: 36px; height: 36px; border-radius: 10px;
            background: linear-gradient(135deg, #0a0a1a, #1a1a3a);
            border: 1px solid rgba(6,182,212,0.3);
            cursor: pointer; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 0 12px rgba(6,182,212,0.15);
        }
        .luna-tech-flip-btn:hover {
            border-color: rgba(6,182,212,0.6);
            box-shadow: 0 0 24px rgba(6,182,212,0.3);
            transform: scale(1.08);
        }
        .luna-tech-flip-icon {
            width: 20px; height: 20px; position: relative;
        }
        .luna-tech-flip-icon::before {
            content: ''; position: absolute; top: 4px; left: 4px;
            width: 12px; height: 12px;
            border: 1.5px solid #06b6d4; border-radius: 3px;
            box-shadow: 0 0 6px rgba(6,182,212,0.4);
        }
        .luna-tech-flip-icon::after {
            content: ''; position: absolute; top: 9px; left: 0;
            width: 4px; height: 1.5px; background: #06b6d4;
            box-shadow: 16px 0 0 #06b6d4, 7px -9px 0 #06b6d4, 7px 9px 0 #06b6d4;
        }
        .luna-tech-flip-btn .pulse-dot {
            position: absolute; top: 5px; right: 5px;
            width: 4px; height: 4px; border-radius: 50%;
            background: #10b981;
            animation: techPulse 2s ease-in-out infinite;
        }
        @keyframes techPulse {
            0%,100% { opacity:1; box-shadow:0 0 4px #10b981; }
            50% { opacity:0.4; }
        }
        .luna-tech-flip-btn .tech-tooltip {
            position: absolute; right: calc(100% + 10px); top: 50%;
            transform: translateY(-50%);
            background: #0a0a1a; color: #06b6d4;
            font-family: monospace; font-size: 10px;
            padding: 4px 10px; border-radius: 6px;
            border: 1px solid rgba(6,182,212,0.2);
            white-space: nowrap; pointer-events: none;
            opacity: 0; transition: opacity 0.2s;
        }
        .luna-tech-flip-btn:hover .tech-tooltip { opacity: 1; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.className = 'luna-tech-flip-btn';
    btn.innerHTML = `
        <div class="luna-tech-flip-icon"></div>
        <div class="pulse-dot"></div>
        <div class="tech-tooltip">TECH Lab</div>
    `;

    function playCyberSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start(); osc.stop(ctx.currentTime + 0.5);
        } catch (e) {}
    }

    // ─── Slice Dissolve + Matrix Rain ─────────────────────
    function startSliceDissolve(callback) {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const SLICES = 30;
        const sliceW = Math.ceil(W / SLICES);

        // 매트릭스 캔버스 (배경)
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        canvas.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // 매트릭스 레인 데이터
        const fontSize = 13;
        const cols = Math.ceil(W / fontSize);
        const drops = new Array(cols).fill(0).map(() => Math.random() * -30 | 0);
        const chars = 'アイウエオカキクケコ01<>{}[]サシスセソ234タチツテト56789ABCDEF';

        // 30개 슬라이스 오버레이 (현재 화면을 가리는 검은 바)
        const sliceContainer = document.createElement('div');
        sliceContainer.style.cssText = 'position:fixed;inset:0;z-index:100000;pointer-events:none;display:flex;';
        document.body.appendChild(sliceContainer);

        const slices = [];
        // 중앙에서 바깥으로 디졸브 (center-out order with slight randomness)
        const center = SLICES / 2;
        const order = Array.from({length: SLICES}, (_, i) => i);
        // Sort by distance from center, with small random jitter
        order.sort((a, b) => {
            const distA = Math.abs(a - center) + Math.random() * 2;
            const distB = Math.abs(b - center) + Math.random() * 2;
            return distA - distB;
        });

        for (let i = 0; i < SLICES; i++) {
            const slice = document.createElement('div');
            slice.style.cssText = `
                width: ${sliceW}px; height: 100%;
                background: #0a0a1a;
                opacity: 0;
                transition: opacity ${0.3 + Math.random() * 0.3}s ease;
            `;
            sliceContainer.appendChild(slice);
            slices.push(slice);
        }

        // 랜덤 타이밍으로 슬라이스 디졸브 (검은색이 나타남)
        const totalTime = 1800; // 1.8초
        order.forEach((sliceIdx, i) => {
            const delay = (i / SLICES) * totalTime * 0.7 + Math.random() * 200;
            setTimeout(() => {
                slices[sliceIdx].style.opacity = '1';
            }, delay);
        });

        // 매트릭스 레인 애니메이션
        let frame = 0;
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, W, H);

            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < cols; i++) {
                if (Math.random() > 0.7) continue; // 일부만 그려서 성능 절약
                const char = chars[Math.random() * chars.length | 0];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // 밝은 선두
                ctx.fillStyle = '#fff';
                ctx.fillText(char, x, y);
                // 초록 잔상
                ctx.fillStyle = `rgba(0,${160 + Math.random() * 80 | 0},${60 + Math.random() * 40 | 0},0.8)`;
                ctx.fillText(chars[Math.random() * chars.length | 0], x, y - fontSize);
                ctx.fillStyle = `rgba(0,${120 + Math.random() * 60 | 0},${40 + Math.random() * 30 | 0},0.4)`;
                ctx.fillText(chars[Math.random() * chars.length | 0], x, y - fontSize * 2);

                drops[i]++;
                if (drops[i] * fontSize > H && Math.random() > 0.98) drops[i] = 0;
            }

            frame++;
            if (frame < 120) { // 2초
                requestAnimationFrame(drawMatrix);
            } else {
                // 중앙 텍스트
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#06b6d4';
                ctx.font = 'bold 16px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('[ ENTERING TECH LAB ]', W / 2, H / 2);
                setTimeout(callback, 400);
            }
        }
        drawMatrix();
    }

    let isFlipping = false;
    function triggerTechTransition() {
        if (isFlipping) return;
        isFlipping = true;
        playCyberSound();
        try {
            const snd = new Audio(basePath + 'assets/sounds/SonSounds/SCH - Glitch - 6.mp3');
            snd.volume = 0.15;
            snd.play();
        } catch(e){}
        startSliceDissolve(() => {
            window.location.href = basePath + 'pages/luna-tech/index.html';
        });
    }

    // 헤더 버튼에 전환 효과 연결
    if (hasHeaderBtn) {
        const headerBtn = document.getElementById('header-tech-btn');
        headerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            triggerTechTransition();
        });
    } else {
        // fixed 버튼 생성 (서브 페이지용)
        btn.addEventListener('click', triggerTechTransition);
        if (document.body) document.body.appendChild(btn);
        else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
    }
})();
