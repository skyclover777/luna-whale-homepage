/**
 * ArchiveViewer - 풀스크린 라이트박스 + prev/next + 인쇄
 * 음성 명령 또는 클릭으로 이미지 확대, 이동, 출력
 */
class ArchiveViewer {
    constructor() {
        this.images = [];
        this.currentIndex = -1;
        this.isOpen = false;
        this.lightbox = null;
    }

    init() {
        this.lightbox = document.getElementById('archive-lightbox');

        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key === 'ArrowRight') this.next();
            else if (e.key === 'ArrowLeft') this.prev();
            else if (e.key === 'Escape') this.close();
        });
    }

    open(img, imageList, index) {
        this.images = imageList;
        this.currentIndex = index;
        this.isOpen = true;
        this.render();
    }

    render() {
        if (!this.lightbox) return;
        const img = this.images[this.currentIndex];
        if (!img) return;

        this.lightbox.innerHTML = `
            <div class="viewer-backdrop" onclick="archiveViewer.close()"></div>
            <div class="viewer-content" onclick="event.stopPropagation()">
                <img src="${img.full}" alt=""
                     class="viewer-image"
                     onerror="this.src='${img.thumb}'" />
                <div class="viewer-number-badge">${this.currentIndex + 1}번</div>
            </div>
            <div class="viewer-controls">
                <button onclick="archiveViewer.prev()" class="viewer-btn" ${this.currentIndex === 0 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <span class="viewer-counter">${this.currentIndex + 1} / ${this.images.length}</span>
                <button onclick="archiveViewer.next()" class="viewer-btn" ${this.currentIndex === this.images.length - 1 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
                <div class="viewer-divider"></div>
                <button onclick="archiveViewer.printCurrent()" class="viewer-btn viewer-btn-action" title="인쇄">
                    <span class="material-symbols-outlined">print</span>
                </button>
                <button onclick="archiveViewer.close()" class="viewer-btn viewer-btn-action" title="닫기">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        `;

        this.lightbox.classList.add('active');
    }

    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.render();
            if (window.archiveUI) archiveUI.highlightCard(this.currentIndex);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.render();
            if (window.archiveUI) archiveUI.highlightCard(this.currentIndex);
        }
    }

    printCurrent() {
        const img = this.images[this.currentIndex];
        if (!img) return;

        let container = document.getElementById('print-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'print-container';
            document.body.appendChild(container);
        }
        container.innerHTML = `<img src="${img.full}" onerror="this.src='${img.thumb}'" />`;
        container.style.display = 'block';
        window.print();
        container.style.display = 'none';
    }

    close() {
        this.isOpen = false;
        if (this.lightbox) {
            this.lightbox.classList.remove('active');
            this.lightbox.innerHTML = '';
        }
    }
}
