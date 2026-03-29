/**
 * ArchiveSearchUI - 번호 매긴 썸네일 그리드 오버레이
 * Force Graph 위에 반투명 오버레이로 검색 결과 표시
 */
class ArchiveSearchUI {
    constructor() {
        this.currentResults = [];
        this.selectedIndex = -1;
        this.overlay = null;
        this.grid = null;
        this.transcript = null;
        this.status = null;
        this.countEl = null;
    }

    init() {
        this.overlay = document.getElementById('archive-overlay');
        this.grid = document.getElementById('archive-grid');
        this.transcript = document.getElementById('archive-transcript');
        this.status = document.getElementById('archive-status');
        this.countEl = document.getElementById('archive-count');
    }

    showLoading(queryText) {
        this.transcript.textContent = `"${queryText}"`;
        this.countEl.textContent = '';
        this.status.textContent = '';
        this.grid.innerHTML = `
            <div class="archive-empty">
                <div style="width:40px;height:40px;border:3px solid #334155;border-top-color:#818cf8;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px"></div>
                <p>검색 중...</p>
                <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
            </div>
        `;
        this.overlay.classList.add('active');
        const canvas = document.getElementById('cosmos-canvas');
        if (canvas) canvas.style.opacity = '0.1';
    }

    showResults(results, queryText, source = 'local') {
        this.currentResults = results;
        this.selectedIndex = -1;

        // 헤더 업데이트
        this.transcript.textContent = `"${queryText}"`;
        const sourceLabel = source === 'local' ? '로컬 아카이브' :
                           source === 'web' ? 'Unsplash/Pexels' : '로컬 + 웹';
        this.countEl.textContent = `${results.length}장 발견 (${sourceLabel})`;
        this.status.textContent = '';

        // 썸네일 그리드 생성
        this.grid.innerHTML = results.map((img, i) => `
            <div class="archive-card" data-index="${i}" id="archive-card-${i}">
                <div class="archive-number">${i + 1}</div>
                <img src="${img.thumb}" alt="${img.keywords ? img.keywords[0] : ''}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22200%22><rect fill=%22%231e1e3e%22 width=%22160%22 height=%22200%22/><text x=%2280%22 y=%22100%22 fill=%22%23475569%22 text-anchor=%22middle%22 font-size=%2212%22>No Image</text></svg>'" />
                <div class="archive-card-label">${img.keywords ? img.keywords[0] : 'Image ' + (i+1)}</div>
            </div>
        `).join('');

        // 카드 클릭 이벤트
        this.grid.querySelectorAll('.archive-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                this.selectImage(idx);
            });
        });

        // 오버레이 열기
        this.overlay.classList.add('active');
        const canvas = document.getElementById('cosmos-canvas');
        if (canvas) canvas.style.opacity = '0.1';
    }

    showNoResults(queryText) {
        this.status.textContent = `"${queryText}" — 검색 결과가 없습니다. 아카이브에 이미지를 추가해주세요.`;
        this.transcript.textContent = '';
        this.countEl.textContent = '';
        this.grid.innerHTML = `
            <div class="archive-empty">
                <span class="material-symbols-outlined" style="font-size:48px;color:#475569">image_not_supported</span>
                <p>검색 결과가 없습니다</p>
                <p class="archive-empty-sub">API 키를 설정하면 Unsplash/Pexels에서 실시간 검색됩니다</p>
                <p class="archive-empty-sub">로컬에 미드저니 이미지를 추가하면 더 빠르게 검색됩니다</p>
            </div>
        `;
        this.overlay.classList.add('active');
        const canvas = document.getElementById('cosmos-canvas');
        if (canvas) canvas.style.opacity = '0.1';
    }

    selectImage(index) {
        if (index < 0 || index >= this.currentResults.length) return;
        this.selectedIndex = index;
        this.highlightCard(index);

        const img = this.currentResults[index];
        if (img && typeof archiveViewer !== 'undefined') {
            archiveViewer.open(img, this.currentResults, index);
        }
    }

    highlightCard(index) {
        this.grid.querySelectorAll('.archive-card').forEach(c =>
            c.classList.remove('archive-card-selected'));
        const card = document.getElementById(`archive-card-${index}`);
        if (card) {
            card.classList.add('archive-card-selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    close() {
        this.overlay.classList.remove('active');
        this.currentResults = [];
        this.selectedIndex = -1;
        const canvas = document.getElementById('cosmos-canvas');
        if (canvas) canvas.style.opacity = '1';
    }

    isOpen() {
        return this.overlay && this.overlay.classList.contains('active');
    }
}
