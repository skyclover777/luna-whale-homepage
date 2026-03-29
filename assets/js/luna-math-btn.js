/**
 * Luna Math — Golden Spiral Dissolve Transition
 * 골든 나선이 펼쳐지며 황금 먼지가 흩날리는 전환 효과
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

    if (window.location.pathname.includes('luna-math')) return;
    const hasHeaderBtn = !!document.getElementById('header-math-btn');

    const basePath = getBasePath();

    /* ─── Styles ────────────────────────────────────── */
    const style = document.createElement('style');
    style.textContent = `
        .luna-math-btn {
            position: fixed; top: 16px; right: 56px;
            width: 36px; height: 36px; border-radius: 10px;
            background: linear-gradient(135deg, #78350f, #92400e);
            border: 1px solid rgba(245,158,11,0.3);
            cursor: pointer; z-index: 9998;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 0 12px rgba(245,158,11,0.12);
        }
        .luna-math-btn:hover {
            border-color: rgba(245,158,11,0.6);
            box-shadow: 0 0 24px rgba(245,158,11,0.3);
            transform: scale(1.08);
        }
        .luna-math-btn-icon {
            width: 20px; height: 20px; position: relative;
        }
        /* CSS compass/protractor icon */
        .luna-math-btn-icon::before {
            content: ''; position: absolute;
            top: 2px; left: 3px;
            width: 14px; height: 14px;
            border: 1.5px solid #f59e0b;
            border-radius: 50%;
            border-bottom-color: transparent;
            box-shadow: 0 0 6px rgba(245,158,11,0.3);
        }
        .luna-math-btn-icon::after {
            content: ''; position: absolute;
            top: 3px; left: 9px;
            width: 1.5px; height: 12px;
            background: #f59e0b;
            transform-origin: top center;
            transform: rotate(25deg);
            box-shadow: 0 0 4px rgba(245,158,11,0.4);
        }
        .luna-math-btn .math-pulse {
            position: absolute; top: 5px; right: 5px;
            width: 4px; height: 4px; border-radius: 50%;
            background: #f59e0b;
            animation: mathPulse 2.5s ease-in-out infinite;
        }
        @keyframes mathPulse {
            0%,100% { opacity: 1; box-shadow: 0 0 4px #f59e0b; }
            50% { opacity: 0.3; }
        }
        .luna-math-btn .math-tooltip {
            position: absolute; right: calc(100% + 10px); top: 50%;
            transform: translateY(-50%);
            background: #1c1917; color: #f59e0b;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 10px; font-style: italic;
            padding: 4px 10px; border-radius: 6px;
            border: 1px solid rgba(245,158,11,0.15);
            white-space: nowrap; pointer-events: none;
            opacity: 0; transition: opacity 0.2s;
        }
        .luna-math-btn:hover .math-tooltip { opacity: 1; }
    `;
    document.head.appendChild(style);

    /* ─── Button ────────────────────────────────────── */
    const btn = document.createElement('button');
    btn.className = 'luna-math-btn';
    btn.setAttribute('aria-label', 'Luna Math 열기');
    btn.innerHTML = `
        <div class="luna-math-btn-icon"></div>
        <div class="math-pulse"></div>
        <div class="math-tooltip">Luna Math</div>
    `;

    /* ─── Warm chime sound ──────────────────────────── */
    function playWarmChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            // Warm bell-like chime
            [523.25, 659.25, 783.99].forEach(function (freq, i) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
                gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.6);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 0.7);
            });
        } catch (e) {}
    }

    /* ─── Golden spiral + dust transition ──────────── */
    function startGoldenTransition(callback) {
        const W = window.innerWidth;
        const H = window.innerHeight;

        // Overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:100000;pointer-events:none;background:transparent;';
        document.body.appendChild(overlay);

        // Canvas
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        canvas.style.cssText = 'position:absolute;inset:0;';
        overlay.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Golden particles
        const particles = [];
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                size: Math.random() * 2.5 + 0.5,
                speedY: -(Math.random() * 2 + 0.5),
                speedX: (Math.random() - 0.5) * 1.5,
                alpha: Math.random() * 0.7 + 0.2,
                decay: 0.003 + Math.random() * 0.005,
            });
        }

        // Spiral params
        let spiralAngle = 0;
        let spiralScale = 0;
        let fadeAlpha = 0;
        let frame = 0;

        function animate() {
            frame++;
            fadeAlpha = Math.min(frame / 100, 1);

            // Dark overlay fade in
            ctx.fillStyle = 'rgba(15,23,41,' + (fadeAlpha * 0.6) + ')';
            ctx.fillRect(0, 0, W, H);

            // Golden ratio spiral expanding from button position
            const btnRect = btn.getBoundingClientRect();
            const ox = btnRect.left + btnRect.width / 2;
            const oy = btnRect.top + btnRect.height / 2;

            spiralAngle += 0.15;
            spiralScale += 0.8;

            ctx.strokeStyle = 'rgba(245,158,11,' + Math.max(0, 0.15 - frame * 0.001) + ')';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let a = 0; a < spiralAngle; a += 0.05) {
                const r = 3 * Math.pow(1.1, a) * (spiralScale / 30);
                const x = ox + r * Math.cos(a);
                const y = oy + r * Math.sin(a);
                if (a === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Particles floating upward
            particles.forEach(function (p) {
                p.y += p.speedY;
                p.x += p.speedX;
                p.alpha -= p.decay;
                if (p.alpha <= 0) {
                    p.x = Math.random() * W;
                    p.y = H + 10;
                    p.alpha = Math.random() * 0.5 + 0.2;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(245,158,11,' + Math.max(0, p.alpha) + ')';
                ctx.fill();
            });

            // Full black fade after 1.2s
            if (frame > 70) {
                const blackAlpha = Math.min((frame - 70) / 30, 1);
                ctx.fillStyle = 'rgba(15,23,41,' + blackAlpha + ')';
                ctx.fillRect(0, 0, W, H);
            }

            // Text appears
            if (frame > 85) {
                const textAlpha = Math.min((frame - 85) / 15, 1);
                ctx.font = 'italic 16px "Playfair Display", Georgia, serif';
                ctx.fillStyle = 'rgba(245,158,11,' + textAlpha + ')';
                ctx.textAlign = 'center';
                ctx.fillText('Entering Luna Math...', W / 2, H / 2);
            }

            if (frame < 110) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(callback, 200);
            }
        }
        animate();
    }

    /* ─── Click handler ─────────────────────────────── */
    let isTransitioning = false;
    function triggerMathTransition() {
        if (isTransitioning) return;
        isTransitioning = true;
        playWarmChime();
        try {
            const snd = new Audio(basePath + 'assets/sounds/SonSounds/DA - Paper Turn - 3.mp3');
            snd.volume = 0.15;
            snd.play().catch(function () {});
        } catch (e) {}
        startGoldenTransition(function () {
            window.location.href = basePath + 'pages/luna-math/index.html';
        });
    }

    // 헤더 버튼에 전환 효과 연결
    if (hasHeaderBtn) {
        var headerBtn = document.getElementById('header-math-btn');
        headerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            triggerMathTransition();
        });
    } else {
        // fixed 버튼 생성 (서브 페이지용)
        btn.addEventListener('click', triggerMathTransition);
        if (document.body) document.body.appendChild(btn);
        else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(btn); });
    }
})();
