/**
 * Luna Whale - Global Sound Manager
 * Tasteful, subtle sound effects for meaningful interactions.
 * Sounds are barely noticeable — enhancing, not distracting.
 */
(function () {
    'use strict';

    // Don't inject on TECH pages (they have their own sound system)
    if (window.location.pathname.includes('luna-tech')) return;

    // --- Base path detection (same logic as luna-tech-flip.js) ---
    function getBasePath() {
        const path = window.location.pathname;
        if (path.endsWith('/index.html') && !path.includes('/pages/')) return '';
        if (path === '/' || path === '') return '';
        const depth = (path.match(/pages\//g) || []).length;
        if (depth > 0) {
            const parts = path.split('/').filter(Boolean);
            const idx = parts.indexOf('pages');
            if (idx >= 0) {
                const levelsDown = parts.length - 1 - idx;
                return '../'.repeat(levelsDown + 1);
            }
        }
        return '';
    }

    const BASE = getBasePath();
    const SND = BASE + 'assets/sounds/SonSounds/';

    // --- Sound definitions ---
    const SOUNDS = {
        click:     { src: SND + 'SCH - Click - 3.mp3',        vol: 0.08 },
        pageFlip:  { src: SND + 'DA - Paper Turn - 3.mp3',    vol: 0.12 },
        pop:       { src: SND + 'DA - Pop - 3.mp3',           vol: 0.10 },
        whoosh:    { src: SND + 'KF - Whoosh Soft - 2.mp3',   vol: 0.12 },
        success:   { src: SND + 'DA - Chimes - 1.mp3',        vol: 0.15 },
        coin:      { src: SND + 'DA - Coin - 3.mp3',          vol: 0.12 },
        bell:      { src: SND + 'DA - Bells - 2.mp3',         vol: 0.15 },
        data:      { src: SND + 'DA - Data - 3.mp3',          vol: 0.10 },
        hover:     { src: SND + 'DA - Pop - 1.mp3',           vol: 0.06 },
    };

    // --- Sound Manager ---
    const LunaSound = {
        muted: localStorage.getItem('luna-mute') === 'true',
        cache: {},
        _unlocked: false,

        play(name) {
            if (this.muted || !this._unlocked) return;
            const def = SOUNDS[name];
            if (!def) return;
            // Clone audio for overlapping playback
            if (!this.cache[name]) {
                this.cache[name] = new Audio(def.src);
            }
            const a = this.cache[name];
            a.volume = def.vol;
            a.currentTime = 0;
            a.play().catch(function(){});
        },

        toggle() {
            this.muted = !this.muted;
            localStorage.setItem('luna-mute', this.muted);
            updateMuteBtn();
            return this.muted;
        },

        // Unlock audio context on first user interaction
        unlock() {
            if (this._unlocked) return;
            this._unlocked = true;
            // Pre-warm one sound to wake up audio context
            var a = new Audio(SOUNDS.click.src);
            a.volume = 0;
            a.play().then(function() { a.pause(); }).catch(function(){});
        }
    };

    // Expose globally
    window.LunaSound = LunaSound;

    // --- Unlock on first interaction ---
    function onFirstInteraction() {
        LunaSound.unlock();
        document.removeEventListener('click', onFirstInteraction, true);
        document.removeEventListener('touchstart', onFirstInteraction, true);
    }
    document.addEventListener('click', onFirstInteraction, true);
    document.addEventListener('touchstart', onFirstInteraction, true);

    // --- Mute Toggle Button ---
    function createMuteBtn() {
        var btn = document.createElement('button');
        btn.id = 'luna-sound-toggle';
        btn.setAttribute('aria-label', 'Toggle sound');
        btn.title = 'Sound On/Off';
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '80px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            zIndex: '9998',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: 'transform 0.2s, opacity 0.2s',
            opacity: '0.6',
            padding: '0',
            lineHeight: '1',
        });
        btn.addEventListener('mouseenter', function() { btn.style.opacity = '1'; btn.style.transform = 'scale(1.1)'; });
        btn.addEventListener('mouseleave', function() { btn.style.opacity = '0.6'; btn.style.transform = 'scale(1)'; });
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            LunaSound.toggle();
            if (!LunaSound.muted) LunaSound.play('click');
        });
        document.body.appendChild(btn);
        updateMuteBtn();

        // Dark mode support
        if (document.documentElement.classList.contains('dark')) {
            btn.style.background = 'rgba(30,30,50,0.85)';
        }
        var obs = new MutationObserver(function() {
            btn.style.background = document.documentElement.classList.contains('dark')
                ? 'rgba(30,30,50,0.85)'
                : 'rgba(255,255,255,0.9)';
        });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    function updateMuteBtn() {
        var btn = document.getElementById('luna-sound-toggle');
        if (btn) btn.textContent = LunaSound.muted ? '\uD83D\uDD07' : '\uD83D\uDD0A';
    }

    // --- Event Delegation: attach sounds to meaningful interactions ---
    function initSoundBindings() {
        var page = window.location.pathname;

        // =============================================
        // GLOBAL: Sidebar menu clicks
        // =============================================
        document.addEventListener('click', function(e) {
            // Sidebar nav items
            var sideItem = e.target.closest('.app-sidebar a, .app-sidebar button');
            if (sideItem) { LunaSound.play('click'); return; }

            // Bottom nav items
            var bottomItem = e.target.closest('.bottom-nav a, .bottom-nav button');
            if (bottomItem) { LunaSound.play('click'); return; }
        });

        // =============================================
        // INDEX (Home) page
        // =============================================
        if (page.endsWith('index.html') || page === '/' || page === '') {
            document.addEventListener('click', function(e) {
                // Monthly lesson card click
                if (e.target.closest('.masonry-item a, .feed-card')) {
                    LunaSound.play('pageFlip');
                    return;
                }
                // Category/color pills
                if (e.target.closest('[data-month], .color-card-anim')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // MONTHLY DETAIL (lesson slides)
        // =============================================
        if (page.includes('monthly-detail')) {
            document.addEventListener('click', function(e) {
                // Slide navigation arrows
                if (e.target.closest('.slide-nav, .nav-arrow, [class*="prev"], [class*="next"]') ||
                    e.target.closest('button[onclick*="slide"], button[onclick*="Slide"]')) {
                    LunaSound.play('whoosh');
                    return;
                }
                // Gallery image lightbox
                if (e.target.closest('.gallery-img, .lightbox-trigger, [data-lightbox]')) {
                    LunaSound.play('pop');
                    return;
                }
                // Tab switches
                if (e.target.closest('.tab-btn, [role="tab"]')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // GALLERY page
        // =============================================
        if (page.includes('gallery')) {
            document.addEventListener('click', function(e) {
                // Image open
                if (e.target.closest('.gallery-item, .gallery-card, img')) {
                    LunaSound.play('pop');
                    return;
                }
            });
        }

        // =============================================
        // REVIEW-SUBMIT page
        // =============================================
        if (page.includes('review-submit')) {
            document.addEventListener('click', function(e) {
                // Star rating
                if (e.target.closest('.star, [data-star], .rating')) {
                    LunaSound.play('coin');
                    return;
                }
                // Submit/upload success will be handled by the page's own logic
                // We expose LunaSound globally so pages can call LunaSound.play('success')
            });
        }

        // =============================================
        // CLASSES page
        // =============================================
        if (page.includes('classes.html')) {
            document.addEventListener('click', function(e) {
                // Category icon click
                if (e.target.closest('.category-card, .cat-icon, [data-category]')) {
                    LunaSound.play('click');
                    return;
                }
                // Lesson card
                if (e.target.closest('.lesson-card, .class-card')) {
                    LunaSound.play('pageFlip');
                    return;
                }
            });
        }

        // =============================================
        // COLORING page
        // =============================================
        if (page.includes('coloring')) {
            document.addEventListener('click', function(e) {
                // Image card
                if (e.target.closest('.coloring-card, .card, .grid img, .coloring-item')) {
                    LunaSound.play('pop');
                    return;
                }
                // Print button
                if (e.target.closest('[onclick*="print"], .print-btn, button[class*="print"]')) {
                    LunaSound.play('bell');
                    return;
                }
                // Category switch
                if (e.target.closest('.cat-btn, .category-btn, [data-cat]')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // PAPER-CRAFT page
        // =============================================
        if (page.includes('paper-craft')) {
            document.addEventListener('click', function(e) {
                // Image card
                if (e.target.closest('.card, .grid img, .craft-item')) {
                    LunaSound.play('pop');
                    return;
                }
                // Print
                if (e.target.closest('[onclick*="print"], .print-btn')) {
                    LunaSound.play('bell');
                    return;
                }
                // Category
                if (e.target.closest('.cat-btn, .category-btn, [data-cat]')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // ART-SHOP page
        // =============================================
        if (page.includes('art-shop')) {
            document.addEventListener('click', function(e) {
                // Sketch toggle
                if (e.target.closest('.sketch-toggle, [data-sketch], .toggle-sketch')) {
                    LunaSound.play('data');
                    return;
                }
                // Download
                if (e.target.closest('.download-btn, [download], a[href*="download"]')) {
                    LunaSound.play('coin');
                    return;
                }
                // Category
                if (e.target.closest('.cat-btn, .category-btn, [data-cat], .filter-btn')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // CREATIVITY-100 (bookshelf)
        // =============================================
        if (page.includes('creativity-100')) {
            document.addEventListener('click', function(e) {
                // Book on shelf
                if (e.target.closest('.book-item, .book-spine, .shelf-book, [data-lesson]')) {
                    LunaSound.play('pageFlip');
                    return;
                }
                // Category tabs
                if (e.target.closest('.cat-tab, .category-tab, [data-cat]')) {
                    LunaSound.play('click');
                    return;
                }
            });
        }

        // =============================================
        // CREATIVITY-LESSON (lesson page)
        // =============================================
        if (page.includes('creativity-lesson')) {
            document.addEventListener('click', function(e) {
                // Tab switch
                if (e.target.closest('.tab-btn, [role="tab"], .guide-tab, .activity-tab')) {
                    LunaSound.play('click');
                    return;
                }
                // Image select in activity
                if (e.target.closest('.img-option, .selectable-img, [data-img-select]')) {
                    LunaSound.play('pop');
                    return;
                }
                // Print
                if (e.target.closest('[onclick*="print"], .print-btn')) {
                    LunaSound.play('bell');
                    return;
                }
            });
        }
    }

    // --- Initialize when DOM is ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createMuteBtn();
            initSoundBindings();
        });
    } else {
        createMuteBtn();
        initSoundBindings();
    }

})();
