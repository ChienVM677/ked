/**
 * KED - Main Application Orchestrator v6.0
 * Điều phối Hệ thống Giáo dục Sớm Đa Phân hệ (SPA Dashboard Hub)
 * Vương Quốc: HÌNH ẢNH | CHỮ CÁI | CON SỐ | VƯỜN TRUYỆN | ĐẢO KHO BÁU
 */

const App = {
    currentZone: 'home',
    stars: 0,
    stickersCount: 0,
    sessionCount: 0,
    sessionLimit: 200,
    currentLevel: 1, // 1: Bé Mầm 3T, 2: Bé Chồi 4T, 3: Bé Lá 5T

    init() {
        // Nạp số sao đã lưu
        const savedStars = localStorage.getItem('ked_stars_v2');
        if (savedStars) {
            this.stars = parseInt(savedStars, 10) || 0;
        }
        this.updateStarUI();

        // Nạp cấp độ đã lưu
        const savedLevel = localStorage.getItem('ked_level_v2');
        if (savedLevel) {
            this.currentLevel = parseInt(savedLevel, 10) || 1;
        }
        this.updateLevelUI();

        // Nạp số lượng sticker
        this.updateStickersUI();

        // Khởi tạo SoundEngine
        SoundEngine.init();

        // Lắng nghe các nút điều khiển trên Header
        const btnSound = document.getElementById('btn-sound-toggle');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                const enabled = SoundEngine.toggleSound();
                btnSound.textContent = enabled ? '🔊' : '🔇';
                btnSound.title = enabled ? 'Âm thanh: Đang Bật' : 'Âm thanh: Đang Tắt';
            });
        }

        const btnFull = document.getElementById('btn-fullscreen');
        if (btnFull) {
            btnFull.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            });
        }

        // Khởi chạy về trang chủ
        this.openZone('home');
    },

    openZone(zoneName) {
        this.currentZone = zoneName;
        SoundEngine.playPop();

        // Cập nhật trạng thái active trên Sidebar
        const navBtns = document.querySelectorAll('.sidebar-nav-btn');
        navBtns.forEach(btn => {
            if (btn.getAttribute('data-zone') === zoneName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Ẩn tất cả các view
        const views = document.querySelectorAll('.zone-view');
        views.forEach(v => v.classList.remove('active-zone'));

        const targetView = document.getElementById(`view-${zoneName}`);
        if (targetView) {
            targetView.classList.add('active-zone');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Hiện / ẩn nút "Về trang chủ"
        const btnHome = document.getElementById('btn-home-nav');
        if (btnHome) {
            btnHome.style.display = zoneName === 'home' ? 'none' : 'inline-flex';
        }

        // Khởi tạo phân hệ tương ứng
        if (zoneName === 'images') {
            if (typeof ImagesZone !== 'undefined') ImagesZone.init();
        } else if (zoneName === 'visual') {
            if (typeof VisualZone !== 'undefined') VisualZone.init();
        } else if (zoneName === 'letters') {
            if (typeof LettersZone !== 'undefined') LettersZone.init();
        } else if (zoneName === 'numbers') {
            if (typeof NumbersZone !== 'undefined') NumbersZone.init();
        } else if (zoneName === 'stories') {
            if (typeof StoriesZone !== 'undefined') StoriesZone.init();
        } else if (zoneName === 'treasure') {
            if (typeof TreasureZone !== 'undefined') TreasureZone.init();
        } else if (zoneName === 'home') {
            SoundEngine.playVoice('prompt_welcome');
        }
    },

    setLevel(level) {
        SoundEngine.playPop();
        this.currentLevel = level;
        localStorage.setItem('ked_level_v2', level);
        this.updateLevelUI();

        let levelName = "Bé Mầm (3 Tuổi)";
        if (level === 2) levelName = "Bé Chồi (4 Tuổi)";
        if (level === 3) levelName = "Bé Lá (5 Tuổi)";
        SoundEngine.speakFallback(`Đã chuyển sang cấp độ: ${levelName}`);
    },

    updateLevelUI() {
        const pills = document.querySelectorAll('.level-pill-btn');
        pills.forEach(p => {
            const lvl = parseInt(p.getAttribute('data-level'), 10);
            if (lvl === this.currentLevel) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });
    },

    addStar() {
        this.stars += 1;
        localStorage.setItem('ked_stars_v2', this.stars);
        this.updateStarUI();

        // Hiệu ứng ngôi sao nảy rung rinh
        const badge = document.querySelector('.star-badge');
        if (badge) {
            badge.classList.add('star-bump');
            setTimeout(() => badge.classList.remove('star-bump'), 600);
        }
    },

    updateStarUI() {
        const starEl = document.getElementById('star-count');
        if (starEl) {
            starEl.textContent = this.stars;
        }
        const valStars = document.getElementById('val-stars');
        if (valStars) {
            valStars.textContent = this.stars;
        }
    },

    updateStickersUI() {
        let count = 0;
        const saved = localStorage.getItem('ked_stickers_v2');
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                count = arr.length;
            } catch (e) {}
        }
        this.stickersCount = count;
        const el = document.getElementById('sticker-count');
        if (el) el.textContent = count;
    },

    recordSessionQuestion() {
        this.sessionCount += 1;
        this.updateSessionCounterUI();

        if (this.sessionCount >= this.sessionLimit) {
            if (typeof TreasureZone !== 'undefined') {
                TreasureZone.triggerScreenTimeLock();
            }
        }
    },

    resetSessionCounter() {
        this.sessionCount = 0;
        this.updateSessionCounterUI();
    },

    updateSessionCounterUI() {
        const el = document.getElementById('val-session-count');
        if (el) el.textContent = this.sessionCount;
        const headerEl = document.getElementById('header-session-count');
        if (headerEl) headerEl.textContent = `${this.sessionCount}/${this.sessionLimit}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
