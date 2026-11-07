/**
 * KED - Main Application Orchestrator v6.6
 * Điều phối Hệ thống Giáo dục Sớm Đa Phân hệ & Quản lý Đa Hồ Sơ Người Chơi
 * Hỗ trợ 2 Chế Độ Giao Diện Độc Lập: MÁY TÍNH (Sidebar) & ĐIỆN THOẠI (Bottom Nav)
 */

const App = {
    currentZone: 'home',
    stars: 0,
    stickersCount: 0,
    sessionCount: 0,
    sessionLimit: 200,
    currentLevel: 1, // 1: Bé Mầm 3T, 2: Bé Chồi 4T, 3: Bé Lá 5T

    // --- QUẢN LÝ HỒ SƠ BÉ (MULTI-CHILD PROFILES) ---
    profiles: [],
    activeProfileId: null,
    tempNewChildAge: 3,
    tempNewChildAvatar: '🐻',
    parentChallengeAnswer: 0,

    init() {
        // 1. Nạp và khởi tạo hệ thống hồ sơ bé
        this.initProfiles();

        // 2. Khởi tạo SoundEngine
        SoundEngine.init();

        // 3. Lắng nghe các nút điều khiển trên Header
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

        // 4. Khởi tạo trạng thái giao diện thiết bị (Desktop / Mobile)
        const savedViewMode = localStorage.getItem('ked_force_mobile_view');
        if (savedViewMode === 'true') {
            document.body.classList.add('force-mobile-view');
            const btnToggle = document.getElementById('btn-view-toggle');
            if (btnToggle) btnToggle.textContent = '💻';
        }

        // 5. Mặc định mở ở Trang Chủ và kích hoạt Cổng Chọn Hồ Sơ Bé (Phương án A)
        this.openZone('home');
        this.showProfileGate();
    },

    // ========================================================
    // QUẢN LÝ HỒ SƠ BÉ & LOCALSTORAGE
    // ========================================================
    initProfiles() {
        const saved = localStorage.getItem('ked_profiles_v3');
        if (saved) {
            try {
                this.profiles = JSON.parse(saved);
            } catch (e) {
                this.profiles = [];
            }
        }

        // Nếu chưa có hồ sơ nào, khởi tạo 2 hồ sơ mặc định sinh động
        if (!this.profiles || this.profiles.length === 0) {
            this.profiles = [
                {
                    id: 'p_bo',
                    name: 'Bé Bo',
                    age: 3,
                    level: 1,
                    avatar: '🐻',
                    stars: 12,
                    questionsCount: 18,
                    stickers: ['stk_bear', 'stk_star'],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'p_bong',
                    name: 'Bé Bống',
                    age: 5,
                    level: 3,
                    avatar: '🐰',
                    stars: 25,
                    questionsCount: 42,
                    stickers: ['stk_rabbit', 'stk_flower', 'stk_heart'],
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveProfiles();
        }

        // Chọn bé gần nhất hoặc bé đầu tiên
        const savedActiveId = localStorage.getItem('ked_active_profile_id_v3');
        const found = this.profiles.find(p => p.id === savedActiveId);
        if (found) {
            this.activeProfileId = found.id;
        } else {
            this.activeProfileId = this.profiles[0].id;
        }

        this.applyActiveProfile(false);
    },

    saveProfiles() {
        localStorage.setItem('ked_profiles_v3', JSON.stringify(this.profiles));
    },

    getActiveProfile() {
        return this.profiles.find(p => p.id === this.activeProfileId) || this.profiles[0];
    },

    applyActiveProfile(announce = true) {
        const p = this.getActiveProfile();
        if (!p) return;

        this.stars = p.stars || 0;
        this.currentLevel = p.level || (p.age === 5 ? 3 : p.age === 4 ? 2 : 1);
        this.updateStarUI();
        this.updateLevelUI();
        this.updateStickersUI();

        // Cập nhật Topbar Profile Chip
        const topAvatar = document.getElementById('top-avatar');
        if (topAvatar) topAvatar.textContent = p.avatar;
        const topName = document.getElementById('top-name');
        if (topName) topName.textContent = p.name;
        const topLevel = document.getElementById('top-level');
        if (topLevel) {
            const lvlName = p.age === 5 ? 'Lớp Lá (5T)' : p.age === 4 ? 'Lớp Chồi (4T)' : 'Lớp Mầm (3T)';
            topLevel.textContent = lvlName;
        }

        localStorage.setItem('ked_active_profile_id_v3', p.id);

        if (announce) {
            SoundEngine.playPop();
            SoundEngine.speakFallback(`Chào mừng ${p.name} đến với KED! Bé học thật chăm ngoan nhé!`);
        }
    },

    // ========================================================
    // CỔNG CHỌN HỒ SƠ BÉ (PROFILE GATE)
    // ========================================================
    showProfileGate() {
        SoundEngine.playPop();
        const modal = document.getElementById('profile-gate-modal');
        if (!modal) return;

        this.renderProfilesList();
        this.hideNewProfileForm();
        modal.style.display = 'flex';
    },

    hideProfileGate() {
        const modal = document.getElementById('profile-gate-modal');
        if (modal) modal.style.display = 'none';
    },

    renderProfilesList() {
        const container = document.getElementById('profiles-list-container');
        if (!container) return;

        container.innerHTML = this.profiles.map(p => {
            const isActive = p.id === this.activeProfileId;
            const lvlName = p.age === 5 ? 'Bé Lá (5T)' : p.age === 4 ? 'Bé Chồi (4T)' : 'Bé Mầm (3T)';
            return `
                <div class="child-profile-card ${isActive ? 'active-profile' : ''}" onclick="App.selectProfile('${p.id}')">
                    <div class="profile-avatar-big">${p.avatar}</div>
                    <div class="profile-name-big">${p.name}</div>
                    <div class="profile-meta-row">
                        <span class="profile-badge-age">${lvlName}</span>
                        <span class="profile-badge-stars">⭐ ${p.stars || 0} Sao</span>
                    </div>
                    <button class="btn-select-profile">
                        ${isActive ? '👉 Đang Chọn Học' : 'Chọn Bé Học ➔'}
                    </button>
                </div>
            `;
        }).join('');
    },

    selectProfile(profileId) {
        this.activeProfileId = profileId;
        this.applyActiveProfile(true);
        this.hideProfileGate();
    },

    showNewProfileForm() {
        SoundEngine.playPop();
        const form = document.getElementById('new-profile-form');
        const actions = document.getElementById('gate-main-actions');
        if (form) form.style.display = 'block';
        if (actions) actions.style.display = 'none';

        const nameInput = document.getElementById('input-new-child-name');
        if (nameInput) {
            nameInput.value = '';
            setTimeout(() => nameInput.focus(), 200);
        }
    },

    hideNewProfileForm() {
        const form = document.getElementById('new-profile-form');
        const actions = document.getElementById('gate-main-actions');
        if (form) form.style.display = 'none';
        if (actions) actions.style.display = 'flex';
    },

    pickNewChildAge(age, btn) {
        SoundEngine.playPop();
        this.tempNewChildAge = age;
        const allBtns = document.querySelectorAll('.age-pick-btn');
        allBtns.forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
    },

    pickNewChildAvatar(avatar, btn) {
        SoundEngine.playPop();
        this.tempNewChildAvatar = avatar;
        const allAvatars = document.querySelectorAll('.avatar-pick-opt');
        allAvatars.forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
    },

    confirmCreateProfile() {
        const nameInput = document.getElementById('input-new-child-name');
        const name = (nameInput ? nameInput.value.trim() : '') || 'Bé Yêu';
        const age = this.tempNewChildAge || 3;
        const level = age === 5 ? 3 : age === 4 ? 2 : 1;
        const avatar = this.tempNewChildAvatar || '🐻';

        const newProfile = {
            id: 'p_' + Date.now(),
            name: name,
            age: age,
            level: level,
            avatar: avatar,
            stars: 0,
            questionsCount: 0,
            stickers: [],
            createdAt: new Date().toISOString()
        };

        this.profiles.push(newProfile);
        this.saveProfiles();
        this.selectProfile(newProfile.id);
    },

    // ========================================================
    // KHÓA PHỤ HUYNH & BÁO CÁO HỌC TẬP (PARENT DASHBOARD)
    // ========================================================
    openParentDashboardGate() {
        SoundEngine.playPop();
        this.hideProfileGate();

        // Tạo bài toán đố vui bằng chữ cho phụ huynh
        const n1 = Math.floor(Math.random() * 5) + 2; // 2..6
        const n2 = Math.floor(Math.random() * 4) + 1; // 1..4
        this.parentChallengeAnswer = n1 + n2;

        const words = ["Không", "Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười"];
        const qText = `${words[n1]} cộng ${words[n2].toLowerCase()} bằng mấy?`;

        const challengeTextEl = document.getElementById('parent-challenge-text');
        if (challengeTextEl) challengeTextEl.textContent = qText;

        // Sinh 4 đáp án lựa chọn
        const options = [this.parentChallengeAnswer];
        while (options.length < 4) {
            const fake = Math.floor(Math.random() * 9) + 2;
            if (!options.includes(fake)) options.push(fake);
        }
        // Trộn ngẫu nhiên
        options.sort(() => Math.random() - 0.5);

        const optsContainer = document.getElementById('parent-challenge-options');
        if (optsContainer) {
            optsContainer.innerHTML = options.map(ans => `
                <button class="limit-opt-btn" style="padding:10px 18px;font-size:16px;font-weight:900;" onclick="App.verifyParentGate(${ans})">
                    ${ans}
                </button>
            `).join('');
        }

        const errEl = document.getElementById('parent-challenge-error');
        if (errEl) errEl.style.display = 'none';

        const challengeModal = document.getElementById('parent-challenge-modal');
        if (challengeModal) challengeModal.style.display = 'flex';
    },

    closeParentChallenge() {
        const challengeModal = document.getElementById('parent-challenge-modal');
        if (challengeModal) challengeModal.style.display = 'none';
        this.showProfileGate();
    },

    verifyParentGate(selectedAns) {
        if (selectedAns === this.parentChallengeAnswer) {
            SoundEngine.playTing();
            const challengeModal = document.getElementById('parent-challenge-modal');
            if (challengeModal) challengeModal.style.display = 'none';
            this.openParentDashboard();
        } else {
            SoundEngine.playSoftNotice();
            const errEl = document.getElementById('parent-challenge-error');
            if (errEl) errEl.style.display = 'block';
        }
    },

    openParentDashboard() {
        const modal = document.getElementById('parent-dashboard-modal');
        if (!modal) return;

        this.renderParentReports();
        modal.style.display = 'flex';
    },

    closeParentDashboard() {
        const modal = document.getElementById('parent-dashboard-modal');
        if (modal) modal.style.display = 'none';
        this.applyActiveProfile(false);
    },

    renderParentReports() {
        const container = document.getElementById('parent-reports-container');
        if (!container) return;

        container.innerHTML = this.profiles.map(p => {
            const isCurrent = p.id === this.activeProfileId;
            const lvlName = p.age === 5 ? 'Lớp Lá (5 Tuổi)' : p.age === 4 ? 'Lớp Chồi (4 Tuổi)' : 'Lớp Mầm (3 Tuổi)';
            const qCount = p.questionsCount || 0;
            const stars = p.stars || 0;
            const stkCount = (p.stickers && p.stickers.length) || 0;

            return `
                <div class="child-report-card">
                    <div class="child-report-top">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span style="font-size:32px;">${p.avatar}</span>
                            <div>
                                <h4 style="font-size:18px;font-weight:900;color:#1e293b;">
                                    ${p.name} ${isCurrent ? '<span style="font-size:12px;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:8px;">Đang học</span>' : ''}
                                </h4>
                                <div style="font-size:12px;color:#64748b;font-weight:700;">${lvlName}</div>
                            </div>
                        </div>
                        <div>
                            ${this.profiles.length > 1 ? `
                                <button onclick="App.deleteProfile('${p.id}')" style="background:#fee2e2;color:#b91c1c;border:none;padding:6px 10px;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;">
                                    Xóa Hồ Sơ
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="child-report-stats">
                        <div class="report-stat-box">
                            <div class="stat-box-val">${qCount}</div>
                            <div class="stat-box-lbl">Câu Đã Chơi</div>
                        </div>
                        <div class="report-stat-box">
                            <div class="stat-box-val">⭐ ${stars}</div>
                            <div class="stat-box-lbl">Sao Đã Đạt</div>
                        </div>
                        <div class="report-stat-box">
                            <div class="stat-box-val">🎁 ${stkCount}</div>
                            <div class="stat-box-lbl">Sticker Mở Khóa</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    deleteProfile(id) {
        if (confirm("Ba mẹ có chắc muốn xóa hồ sơ này không? Toàn bộ số sao và câu trả lời sẽ bị xóa.")) {
            this.profiles = this.profiles.filter(p => p.id !== id);
            if (this.activeProfileId === id) {
                this.activeProfileId = this.profiles[0].id;
            }
            this.saveProfiles();
            this.renderParentReports();
            this.applyActiveProfile(false);
        }
    },

    setEyeLimit(limit, btn) {
        SoundEngine.playPop();
        this.sessionLimit = limit;
        const allBtns = document.querySelectorAll('.limit-opt-btn');
        allBtns.forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        this.updateSessionCounterUI();
    },

    // ========================================================
    // ĐIỀU HƯỚNG PHÂN HỆ & CHUYỂN ĐỔI THIẾT BỊ
    // ========================================================
    openZone(zoneName) {
        this.currentZone = zoneName;
        SoundEngine.playPop();

        // Đồng bộ trạng thái active trên CẢ Sidebar (Desktop) VÀ Bottom Nav (Mobile)
        const sidebarBtns = document.querySelectorAll('.sidebar-nav-btn');
        sidebarBtns.forEach(btn => {
            if (btn.getAttribute('data-zone') === zoneName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const bnavBtns = document.querySelectorAll('.bnav-btn');
        bnavBtns.forEach(btn => {
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

    toggleDeviceMode() {
        SoundEngine.playPop();
        const isForce = document.body.classList.toggle('force-mobile-view');
        localStorage.setItem('ked_force_mobile_view', isForce ? 'true' : 'false');
        const btn = document.getElementById('btn-view-toggle');
        if (btn) {
            btn.textContent = isForce ? '💻' : '📱';
            btn.title = isForce ? 'Chuyển về giao diện Máy Tính' : 'Chuyển sang giao diện Điện Thoại';
        }
    },

    setLevel(level) {
        SoundEngine.playPop();
        this.currentLevel = level;
        const p = this.getActiveProfile();
        if (p) {
            p.level = level;
            this.saveProfiles();
        }
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
        const p = this.getActiveProfile();
        if (p) {
            p.stars = this.stars;
            this.saveProfiles();
        }
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
        const p = this.getActiveProfile();
        let count = 0;
        if (p && p.stickers) {
            count = p.stickers.length;
        } else {
            const saved = localStorage.getItem('ked_stickers_v2');
            if (saved) {
                try { count = JSON.parse(saved).length; } catch(e) {}
            }
        }
        this.stickersCount = count;
        const el = document.getElementById('sticker-count');
        if (el) el.textContent = count;
    },

    updateStickerCount(count) {
        this.updateStickersUI();
    },

    recordSessionQuestion() {
        this.sessionCount += 1;
        const p = this.getActiveProfile();
        if (p) {
            p.questionsCount = (p.questionsCount || 0) + 1;
            this.saveProfiles();
        }
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
