/**
 * RecentLessons — 최근 본 수업 tracking
 * Saves viewed lessons to localStorage, displays in sidebar & my-classes page.
 * v1.0 — 2026-03-21
 */
const RecentLessons = {
  KEY: 'luna-recent-lessons',
  MAX: 10,

  save(lesson) {
    if (!lesson || !lesson.url) return;
    let recent = this.getAll();
    // Remove duplicate by URL
    recent = recent.filter(r => r.url !== lesson.url);
    // Add to front with timestamp
    lesson.date = lesson.date || new Date().toISOString();
    recent.unshift(lesson);
    // Trim to max
    if (recent.length > this.MAX) recent = recent.slice(0, this.MAX);
    try { localStorage.setItem(this.KEY, JSON.stringify(recent)); } catch(e) {}
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch(e) { return []; }
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  /**
   * Render recent lessons into sidebar container.
   * Shows max 5 items with a "더보기" link.
   * @param {string} containerId — DOM element id
   * @param {string} myClassesHref — relative path to my-classes.html
   */
  renderSidebar(containerId, myClassesHref) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const recent = this.getAll();
    if (!recent.length) {
      container.innerHTML = '<div class="px-3 py-2 text-[10px] text-slate-400 italic">아직 본 수업이 없어요</div>';
      return;
    }

    const show = recent.slice(0, 5);
    let html = show.map(r => {
      const safeTitle = (r.title || '').replace(/</g, '&lt;');
      const truncTitle = safeTitle.length > 22 ? safeTitle.slice(0, 20) + '...' : safeTitle;
      const thumbHtml = r.thumb
        ? `<img src="${r.thumb}" class="w-6 h-6 rounded object-cover flex-shrink-0" onerror="this.style.display='none'" alt=""/>`
        : `<span class="material-symbols-outlined text-slate-400 text-base flex-shrink-0">auto_stories</span>`;
      return `<a href="${r.url}" class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 transition-colors group" title="${safeTitle}">
        ${thumbHtml}
        <span class="truncate group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">${truncTitle}</span>
      </a>`;
    }).join('');

    if (recent.length > 5) {
      html += `<a href="${myClassesHref}" class="flex items-center gap-2 px-3 py-1.5 text-[10px] text-primary font-bold hover:underline">
        <span class="material-symbols-outlined text-xs">arrow_forward</span> 더보기 (${recent.length})
      </a>`;
    }

    container.innerHTML = html;
  },

  /**
   * Render full recent history with bigger cards (for my-classes.html).
   * @param {string} containerId — DOM element id
   */
  renderFull(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const recent = this.getAll();
    if (!recent.length) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <span class="material-symbols-outlined text-5xl mb-4 block">history</span>
          <p class="text-sm font-medium">아직 본 수업이 없습니다</p>
          <p class="text-xs mt-1 text-slate-300">수업 페이지를 방문하면 여기에 기록됩니다</p>
        </div>`;
      return;
    }

    container.innerHTML = recent.map(r => {
      const safeTitle = (r.title || '').replace(/</g, '&lt;');
      const dateStr = r.date ? new Date(r.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) : '';
      const thumbHtml = r.thumb
        ? `<img src="${r.thumb}" class="w-16 h-16 rounded-xl object-cover" onerror="this.parentElement.innerHTML='<div class=\\'w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center\\'><span class=\\'material-symbols-outlined text-slate-400\\'>auto_stories</span></div>'" alt=""/>`
        : `<div class="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><span class="material-symbols-outlined text-slate-400">auto_stories</span></div>`;
      return `
        <a href="${r.url}" class="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
          ${thumbHtml}
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold truncate group-hover:text-primary transition-colors">${safeTitle}</div>
            <div class="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-[11px]">schedule</span>
              ${dateStr}
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
        </a>`;
    }).join('');
  },

  /**
   * Auto-detect and save lesson from monthly-detail.html.
   * Reads URL params, page heading, and first image.
   */
  saveFromMonthlyDetail() {
    const params = new URLSearchParams(window.location.search);
    const monthId = params.get('month');
    if (!monthId) return;

    // Wait for page to render
    setTimeout(() => {
      const title = document.getElementById('hero-title')?.textContent || document.getElementById('nav-title')?.textContent || 'Monthly Lesson';
      const heroImg = document.getElementById('hero-image')?.src || '';
      // Use relative thumb for portability
      let thumb = heroImg;
      if (thumb && thumb.includes('/')) {
        // Keep relative to root if possible
        const idx = thumb.indexOf('images/');
        if (idx !== -1) thumb = thumb.slice(idx);
      }

      this.save({
        title: title,
        thumb: thumb,
        url: window.location.href,
      });
    }, 500);
  },

  /**
   * Auto-detect and save lesson from creativity-lesson.html.
   * Reads URL param and CREATIVITY_LESSONS data.
   */
  saveFromCreativityLesson() {
    const params = new URLSearchParams(window.location.search);
    const lessonId = parseInt(params.get('lesson')) || 0;
    if (!lessonId) return;

    setTimeout(() => {
      const lessons = (typeof CREATIVITY_LESSONS !== 'undefined') ? CREATIVITY_LESSONS : [];
      const meta = lessons.find(l => l.id === lessonId);
      const title = meta ? `${meta.id}강. ${meta.kr}` : `창의력 ${lessonId}강`;

      this.save({
        title: title,
        thumb: '', // creativity lessons don't have thumbnails in catalog
        url: window.location.href,
      });
    }, 300);
  },

  /**
   * Auto-detect and save from a generic lesson page (pages/lessons/).
   * Uses CLASSES_DATA if available.
   */
  saveFromLessonPage() {
    setTimeout(() => {
      const title = document.title.replace(/ [—–-] Luna.*$/i, '').trim() || 'Lesson';
      // Try to find a hero or cover image
      const heroImg = document.querySelector('.hero-img, .cover-img, [id*="hero"] img, header img');
      let thumb = heroImg ? heroImg.src : '';
      if (thumb) {
        const idx = thumb.indexOf('images/');
        if (idx !== -1) thumb = thumb.slice(idx);
      }

      this.save({
        title: title,
        thumb: thumb,
        url: window.location.href,
      });
    }, 500);
  }
};
