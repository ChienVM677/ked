/**
 * KED - Images Zone v6.3 (VƯƠNG QUỐC HÌNH ẢNH & KHÁM PHÁ THẾ GIỚI CHO BÉ 3-5 TUỔI)
 * 1. THƯ VIỆN THẺ TRANH (356 mục, 18 chủ đề icon lớn >44px, chạm để nghe tiếng)
 * 2. BÉ TÌM HÌNH (Trò chơi trắc nghiệm 6 hình theo giọng đọc cô giáo, xáo trộn liên tục)
 * 3. TRIỆT TIÊU 100% ÂM THANH RÊ CHUỘT: Chỉ phát âm thanh khi bé bấm/chạm trực tiếp vào thẻ.
 * 4. THIẾT KẾ MENU TINH GỌN: 2 chế độ độc lập, giao diện đơn màn hình không cuộn.
 */

const ImagesZone = {
    activeCategory: 'vehicles',
    viewMode: 'flashcards', // 'flashcards' | 'game'

    // Bé tìm hình
    mgTargetItem: null,
    mgOptions: [],
    extraPenaltyQuestions: 0,

    // Quản lý thời gian màn hình
    sessionAnsweredCount: 0,
    sessionLimit: 200,
    isLocked: false,
    parentGateAnswer: 0,

    init() {
        this.renderSubMenu();
        this.switchMode(this.viewMode || 'flashcards');
    },

    renderSubMenu() {
        const subNav = document.getElementById('images-subnav');
        if (!subNav) return;
        subNav.innerHTML = `
            <button class="kid-pill ${this.viewMode === 'flashcards' ? 'active' : ''}" onclick="ImagesZone.switchMode('flashcards')">
                📖 Thư Viện Thẻ Tranh (356 Mục)
            </button>
            <button class="kid-pill ${this.viewMode === 'game' ? 'active' : ''}" onclick="ImagesZone.switchMode('game')">
                🔍 Bé Tìm Hình (Trắc Nghiệm 6 Hình)
            </button>
        `;
        this.updateSessionCounterUI();
    },

    switchMode(mode) {
        if (this.isLocked) return;
        this.viewMode = mode;
        SoundEngine.playPop();

        const pills = document.querySelectorAll('#images-subnav .kid-pill');
        if (pills.length >= 2) {
            pills[0].classList.toggle('active', mode === 'flashcards');
            pills[1].classList.toggle('active', mode === 'game');
        }

        const container = document.getElementById('images-content');
        if (!container) return;

        this.render(container);
    },

    filterCategory(catId, btnEl) {
        this.activeCategory = catId;
        SoundEngine.playPop();

        const pills = document.querySelectorAll('.topic-icon-grid .topic-icon-btn');
        pills.forEach(p => p.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        this.renderStage();
    },

    render(container) {
        if (!container) container = document.getElementById('images-content');
        if (this.isLocked || !container) return;
        const cats = KED_IMAGES_DATA.CATEGORIES;

        container.innerHTML = `
            <div class="l1-control-bar">
                <!-- LƯỚI 18 BIỂU TƯỢNG CHỦ ĐỀ GỌN GÀNG KHÔNG CẦN CUỘN -->
                <div class="topic-icon-grid" title="Chọn chủ đề khám phá">
                    ${Object.values(cats).map(cat => `
                        <button class="topic-icon-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
                                onclick="ImagesZone.filterCategory('${cat.id}', this)" 
                                title="${cat.name}">
                            <span class="topic-btn-icon">${cat.icon}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div id="img-screen-stage" class="one-screen-stage"></div>
        `;

        this.renderStage();
    },

    renderStage() {
        const stage = document.getElementById('img-screen-stage');
        if (!stage) return;

        if (this.viewMode === 'game') {
            this.setupMiniGameRound(stage);
        } else {
            this.renderFlashcardsView(stage);
        }
    },

    setupMiniGameRound(stage) {
        if (!stage) stage = document.getElementById('img-screen-stage');
        if (!stage || this.isLocked) return;

        let pool = KED_IMAGES_DATA.ITEMS.filter(it => it.cat === this.activeCategory);
        if (pool.length < 6) {
            const others = KED_IMAGES_DATA.ITEMS.filter(it => it.cat !== this.activeCategory);
            pool = pool.concat(others);
        }

        // XÁO TRỘN ĐÁP ÁN MỖI LẦN NẠP VÒNG CHƠI MỚI
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        this.mgOptions = shuffled.slice(0, 6);
        this.mgTargetItem = this.mgOptions[Math.floor(Math.random() * this.mgOptions.length)];

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="ImagesZone.playMiniGamePrompt()" title="Bé bấm để nghe lại tên cần tìm">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>

                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">
                            🌟 Bé hãy lắng nghe và chọn đúng hình nhé! ${this.extraPenaltyQuestions > 0 ? `• <span class="challenge-pill">⚡ +${this.extraPenaltyQuestions} Câu thử thách rèn luyện</span>` : ''}
                        </div>
                        <h2 class="question-title-giant">
                            Bé hãy tìm: <span class="highlight-target-giant">${this.mgTargetItem.name}</span> ở đâu nào?
                        </h2>
                    </div>
                </div>

                <!-- 6 HÌNH XÁO TRỘN VỊ TRÍ LIÊN TỤC - CLICK ONLY -->
                <div class="giant-six-grid">
                    ${this.mgOptions.map((opt) => `
                        <button class="giant-choice-card bounce-hover" 
                                onclick="ImagesZone.chooseMiniGameItem('${opt.id}', this)"
                                title="Bé chạm vào: ${opt.name}">
                            <span class="giant-card-emoji">${opt.icon}</span>
                            <span class="giant-card-name">${opt.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div id="mg-feedback-bar" class="giant-feedback-bar">
                    <span class="fb-hint-text">💡 Bé hãy quan sát kỹ 6 hình trên và chạm vào hình đúng nhé!</span>
                </div>
            </div>
        `;

        this.playMiniGamePrompt();
    },

    playMiniGamePrompt() {
        if (!this.mgTargetItem) return;
        SoundEngine.playItemFind(this.mgTargetItem.id, this.mgTargetItem.name);
    },

    chooseMiniGameItem(chosenId, btnEl) {
        if (this.isLocked || !this.mgTargetItem) return;
        const fb = document.getElementById('mg-feedback-bar');

        if (chosenId === this.mgTargetItem.id) {
            SoundEngine.playCheer();
            SoundEngine.playItemName(this.mgTargetItem.id);
            if (btnEl) btnEl.classList.add('correct-glow');

            if (fb) {
                fb.innerHTML = `
                    <div class="fb-bubble-success bounce-in">
                        🎉 HOAN HÔ BÉ! ĐÚNG RỒI: <strong>${this.mgTargetItem.name}</strong>! Bé thật thông minh! ⭐
                    </div>
                `;
            }

            if (typeof App !== 'undefined' && App.addStar) {
                App.addStar();
            }

            if (this.extraPenaltyQuestions > 0) {
                this.extraPenaltyQuestions--;
            }

            const locked = this.recordAnswerAttempt();
            if (locked) return;

            setTimeout(() => {
                this.setupMiniGameRound();
            }, 1800);
        } else {
            SoundEngine.playBoing();
            if (btnEl) btnEl.classList.add('shake-wrong');

            this.extraPenaltyQuestions += 1;
            const chosen = KED_IMAGES_DATA.ITEMS.find(it => it.id === chosenId);
            const chosenName = chosen ? chosen.name : 'Hình này';

            if (fb) {
                fb.innerHTML = `
                    <div class="fb-bubble-retry shake-in">
                        🌱 Chưa đúng rồi, đây là <strong>${chosenName}</strong> cơ! Bé hãy bấm loa nghe lại và chọn tiếp nhé! (+1 Câu rèn luyện)
                    </div>
                `;
            }

            setTimeout(() => {
                if (btnEl) btnEl.classList.remove('shake-wrong');
            }, 700);
        }
    },

    renderFlashcardsView(stage) {
        const filtered = KED_IMAGES_DATA.ITEMS.filter(it => it.cat === this.activeCategory);
        const catInfo = KED_IMAGES_DATA.CATEGORIES[this.activeCategory] || { bg: '#ffffff', name: 'Đồ Vật' };

        stage.innerHTML = `
            <div class="flashcards-wrapper">
                <div class="fc-header">
                    <h3>📖 Thư Viện Thẻ Tranh: ${catInfo.name} (${filtered.length} hình)</h3>
                    <span class="fc-tip">Bé chạm vào từng thẻ để nghe phát âm và tiếng kêu đặc trưng nhé!</span>
                </div>
                <div class="flashcards-grid">
                    ${filtered.map(item => `
                        <div class="kid-card-interactive" style="background:${catInfo.bg}" onclick="ImagesZone.clickFlashcard('${item.id}')">
                            <span class="card-emoji bounce-hover">${item.icon}</span>
                            <span class="card-label">${item.name}</span>
                            <span class="sound-wave">🔊 Chạm để nghe</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    clickFlashcard(itemId) {
        const item = KED_IMAGES_DATA.ITEMS.find(it => it.id === itemId);
        if (!item) return;
        SoundEngine.playPop();
        SoundEngine.playVoice(`find_${itemId}`, null, `${item.name}! ${item.sound}`);
    },

    recordAnswerAttempt() {
        this.sessionAnsweredCount += 1;
        if (typeof App !== 'undefined' && App.recordSessionQuestion) {
            App.recordSessionQuestion();
        }
        this.updateSessionCounterUI();

        if (this.sessionAnsweredCount >= this.sessionLimit) {
            this.triggerScreenTimeLock();
            return true;
        }
        return false;
    },

    updateSessionCounterUI() {
        if (typeof App !== 'undefined' && App.updateSessionCounterUI) {
            App.updateSessionCounterUI();
        }
    },

    triggerScreenTimeLock() {
        this.isLocked = true;
        SoundEngine.playFanfare();
        SoundEngine.playVoice('fb_lockout');

        let modal = document.getElementById('screentime-lock-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'screentime-lock-modal';
            modal.className = 'screentime-lock-overlay';
            document.body.appendChild(modal);
        }

        const numA = Math.floor(Math.random() * 8) + 8;
        const numB = Math.floor(Math.random() * 8) + 7;
        this.parentGateAnswer = numA + numB;

        modal.innerHTML = `
            <div class="lock-modal-card">
                <div class="lock-mascot-animation">😴 🦉 💤</div>
                <h2 class="lock-title">ĐÃ ĐẾN GIỜ NGHỈ NGƠI RỒI BÉ ƠI!</h2>
                <div class="lock-subtitle">Bé đã xuất sắc hoàn thành <span class="highlight-200">200 / 200 CÂU HỎI</span>!</div>
                <p class="lock-message">
                    Đôi mắt bé cần được thư giãn ít nhất 15 phút để bảo vệ thị lực. Bé hãy tạm gác máy tính, đứng dậy uống nước mát, ngắm nhìn cây xanh và vui chơi cùng bố mẹ nhé!
                </p>

                <div class="parent-gate-box">
                    <div class="parent-gate-title">👨‍👩‍👧 Dành Cho Bố Mẹ (Mở khóa nếu muốn bé chơi tiếp)</div>
                    <div class="parent-math-display">${numA} + ${numB} = ?</div>
                    <div class="parent-input-row">
                        <input type="number" id="pg-images-input" class="parent-input" placeholder="Nhập đáp án...">
                        <button class="parent-unlock-btn" onclick="ImagesZone.verifyParentGate()">Mở Khóa</button>
                    </div>
                    <div id="pg-images-err" class="parent-error-msg"></div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    verifyParentGate() {
        const inp = document.getElementById('pg-images-input');
        const err = document.getElementById('pg-images-err');
        if (!inp) return;
        const val = parseInt(inp.value, 10);
        if (val === this.parentGateAnswer) {
            this.isLocked = false;
            this.sessionAnsweredCount = 0;
            this.updateSessionCounterUI();
            const modal = document.getElementById('screentime-lock-modal');
            if (modal) modal.style.display = 'none';
            SoundEngine.playCheer();
            this.switchMode(this.viewMode || 'flashcards');
        } else {
            if (err) err.textContent = 'Đáp án chưa chính xác, bố mẹ hãy thử lại nhé!';
        }
    }
};
