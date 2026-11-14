/**
 * KED - Images Zone v7.0 (VƯƠNG QUỐC HÌNH ẢNH ZERO-SCROLL)
 * 1. ZERO-SCROLL CAROUSEL: 4 thẻ (2x2) trên điện thoại, 6 thẻ (3x2) trên máy tính.
 * 2. LẬT TRANG NHƯ SÁCH TRANH: Nút bấm ◀ ▶ to bản, trẻ không phải cuộn.
 * 3. BỘ CHỌN CHỦ ĐỀ POPOVER: Nút [ 🚗 Phương tiện ▾ ] mở modal chọn 1 chạm, trả 100% không gian cho màn chơi.
 * 4. BÉ TÌM HÌNH 1 MÀN HÌNH: 4 hình trắc nghiệm cực đại vừa khít màn hình.
 */

const ImagesZone = {
    activeCategory: 'vehicles',
    viewMode: 'flashcards', // 'flashcards' | 'game'
    flashcardPage: 0,

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

    getCardsPerPage() {
        return (window.innerWidth <= 768) ? 4 : 6;
    },

    renderSubMenu() {
        const subNav = document.getElementById('images-subnav');
        if (!subNav) return;
        const cat = (typeof KED_IMAGES_DATA !== 'undefined' && KED_IMAGES_DATA.CATEGORIES[this.activeCategory]) || { name: 'Chủ Đề', icon: '🎨' };
        subNav.innerHTML = `
            <div class="zero-scroll-subbar">
                <div class="mode-switch-group">
                    <button class="kid-pill-compact ${this.viewMode === 'flashcards' ? 'active' : ''}" onclick="ImagesZone.switchMode('flashcards')">
                        📖 Thư Viện
                    </button>
                    <button class="kid-pill-compact ${this.viewMode === 'game' ? 'active' : ''}" onclick="ImagesZone.switchMode('game')">
                        🔍 Tìm Hình
                    </button>
                </div>
                <button class="topic-picker-btn" onclick="ImagesZone.openTopicModal()" title="Chạm để đổi chủ đề">
                    <span>${cat.icon}</span> <span>${cat.name}</span> <span style="font-size:10px;">▾</span>
                </button>
            </div>
        `;
        this.updateSessionCounterUI();
    },

    switchMode(mode) {
        if (this.isLocked) return;
        this.viewMode = mode;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();

        const pills = document.querySelectorAll('#images-subnav .kid-pill-compact');
        if (pills.length >= 2) {
            pills[0].classList.toggle('active', mode === 'flashcards');
            pills[1].classList.toggle('active', mode === 'game');
        }

        const container = document.getElementById('images-content');
        if (!container) return;

        this.render(container);
    },

    openTopicModal() {
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        let modal = document.getElementById('images-topic-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'images-topic-modal';
            modal.className = 'zero-scroll-modal-overlay';
            document.body.appendChild(modal);
        }

        const cats = KED_IMAGES_DATA.CATEGORIES;
        modal.innerHTML = `
            <div class="zero-scroll-modal-card">
                <div class="modal-header-row">
                    <span class="modal-header-title">🎨 CHỌN CHỦ ĐỀ KHÁM PHÁ</span>
                    <button class="modal-close-btn" onclick="ImagesZone.closeTopicModal()">✕</button>
                </div>
                <div class="modal-grid-palette">
                    ${Object.values(cats).map(c => `
                        <button class="palette-item-btn ${this.activeCategory === c.id ? 'active' : ''}" onclick="ImagesZone.selectTopicAndClose('${c.id}')">
                            <span class="palette-icon">${c.icon}</span>
                            <span class="palette-label">${c.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    closeTopicModal() {
        const modal = document.getElementById('images-topic-modal');
        if (modal) modal.style.display = 'none';
    },

    selectTopicAndClose(catId) {
        this.activeCategory = catId;
        this.flashcardPage = 0;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.closeTopicModal();
        this.renderSubMenu();
        this.renderStage();
    },

    render(container) {
        if (!container) container = document.getElementById('images-content');
        if (this.isLocked || !container) return;
        container.innerHTML = `<div id="img-screen-stage" style="height:100%; display:flex; flex-direction:column; min-height:0; flex:1 1 auto; overflow:hidden;"></div>`;
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

    // ========================================================
    // 1. THƯ VIỆN THẺ TRANH LẬT TRANG (ZERO-SCROLL CAROUSEL)
    // ========================================================
    renderFlashcardsView(stage) {
        if (!stage) stage = document.getElementById('img-screen-stage');
        if (!stage) return;

        const allItems = KED_IMAGES_DATA.ITEMS.filter(it => it.cat === this.activeCategory);
        const cardsPerPage = this.getCardsPerPage();
        const totalPages = Math.ceil(allItems.length / cardsPerPage) || 1;

        if (this.flashcardPage >= totalPages) this.flashcardPage = 0;
        if (this.flashcardPage < 0) this.flashcardPage = 0;

        const pageItems = allItems.slice(this.flashcardPage * cardsPerPage, (this.flashcardPage + 1) * cardsPerPage);
        const catInfo = KED_IMAGES_DATA.CATEGORIES[this.activeCategory] || { name: 'Đồ Vật', bg: '#ffffff' };

        stage.innerHTML = `
            <!-- LƯỚI 4 THẺ CỰC ĐẠI (2x2) KHÔNG CUỘN -->
            <div class="paged-flashcards-grid">
                ${pageItems.map(item => `
                    <div class="paged-card-item" onclick="ImagesZone.clickFlashcard('${item.id}', this)" title="Chạm để nghe: ${item.name}">
                        <span class="paged-card-icon">${item.icon}</span>
                        <span class="paged-card-label">${item.name}</span>
                        <span class="paged-card-sound-hint">🔊 Chạm để nghe</span>
                    </div>
                `).join('')}
            </div>

            <!-- THANH LẬT TRANG TRÁI / PHẢI TO BẢN -->
            <div class="zero-scroll-pager">
                <button class="pager-btn btn-prev" onclick="ImagesZone.prevFlashcardPage()" ${this.flashcardPage === 0 ? 'disabled' : ''}>
                    ◀ Trang Trước
                </button>
                <span class="pager-status">Trang ${this.flashcardPage + 1} / ${totalPages} (${allItems.length} hình)</span>
                <button class="pager-btn btn-next" onclick="ImagesZone.nextFlashcardPage()" ${this.flashcardPage >= totalPages - 1 ? 'disabled' : ''}>
                    Trang Sau ▶
                </button>
            </div>
        `;
    },

    prevFlashcardPage() {
        if (this.flashcardPage > 0) {
            this.flashcardPage--;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderFlashcardsView();
        }
    },

    nextFlashcardPage() {
        const allItems = KED_IMAGES_DATA.ITEMS.filter(it => it.cat === this.activeCategory);
        const totalPages = Math.ceil(allItems.length / this.getCardsPerPage()) || 1;
        if (this.flashcardPage < totalPages - 1) {
            this.flashcardPage++;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderFlashcardsView();
        }
    },

    clickFlashcard(itemId, cardEl) {
        const item = KED_IMAGES_DATA.ITEMS.find(it => it.id === itemId);
        if (!item) return;
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.playItemName(item.id);
        }
        if (cardEl) {
            cardEl.classList.add('jump-anim');
            setTimeout(() => cardEl.classList.remove('jump-anim'), 600);
        }
    },

    // ========================================================
    // 2. BÉ TÌM HÌNH (TRẮC NGHIỆM 4 HÌNH VỪA KHÍT MÀN HÌNH)
    // ========================================================
    setupMiniGameRound(stage) {
        if (!stage) stage = document.getElementById('img-screen-stage');
        if (!stage || this.isLocked) return;

        let pool = KED_IMAGES_DATA.ITEMS.filter(it => it.cat === this.activeCategory);
        if (pool.length < 4) {
            const others = KED_IMAGES_DATA.ITEMS.filter(it => it.cat !== this.activeCategory);
            pool = pool.concat(others);
        }

        const count = 4; // Cố định đúng 4 đáp án lưới 2x2 cho cả điện thoại & máy tính
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        this.mgOptions = shuffled.slice(0, count);
        this.mgTargetItem = this.mgOptions[Math.floor(Math.random() * this.mgOptions.length)];

        stage.innerHTML = `
            <div style="flex:1 1 auto; min-height:0; height:100%; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
                <!-- ĐỀ BÀI VÀ NÚT LOA NGHE LẠI -->
                <div style="flex:0 0 auto; background:linear-gradient(135deg, #e0f2fe, #bae6fd); border:2px solid #0284c7; border-radius:18px; padding:8px 12px; display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;">
                    <div>
                        <div style="font-size:11px; font-weight:800; color:#0369a1;">🌟 BÉ HÃY TÌM HÌNH THEO TIẾNG CÔ ĐỌC:</div>
                        <div style="font-size:16px; font-weight:900; color:#0c4a6e;">${this.mgTargetItem.name} ở đâu nào?</div>
                    </div>
                    <button class="pager-btn" style="background:#0284c7; color:#fff; padding:6px 14px; font-size:12px; white-space:nowrap;" onclick="ImagesZone.playMiniGamePrompt()">
                        🔊 Nghe lại
                    </button>
                </div>

                <!-- LƯỚI 4 ĐÁP ÁN (2x2) CHIẾM TRỌN CHIỀU CAO CÒN LẠI -->
                <div class="paged-flashcards-grid" id="mg-choices-box">
                    ${this.mgOptions.map((opt, idx) => `
                        <div class="paged-card-item" id="mg-card-${idx}" onclick="ImagesZone.chooseMiniGameItem('${opt.id}', this)">
                            <span class="paged-card-icon">${opt.icon}</span>
                            <span class="paged-card-label">${opt.name}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- THANH PHẢN HỒI KẾT QUẢ -->
                <div id="mg-feedback-bar" style="flex:0 0 auto; height:32px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:#64748b; margin-top:4px;">
                    💡 Bé quan sát kỹ 4 hình trên và chạm vào hình đúng nhé!
                </div>
            </div>
        `;

        this.playMiniGamePrompt();
    },

    playMiniGamePrompt() {
        if (!this.mgTargetItem) return;
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playItemFind(this.mgTargetItem.id, this.mgTargetItem.name);
        }
    },

    chooseMiniGameItem(chosenId, btnEl) {
        if (this.isLocked || !this.mgTargetItem) return;
        const fb = document.getElementById('mg-feedback-bar');

        if (chosenId === this.mgTargetItem.id) {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCorrect();
                SoundEngine.playItemName(this.mgTargetItem.id);
            }
            if (btnEl) btnEl.style.borderColor = '#10b981';

            if (fb) {
                fb.innerHTML = `🎉 <span style="color:#15803d; font-weight:900;">Đúng rồi: ${this.mgTargetItem.name}! Bé giỏi quá! ⭐</span>`;
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
            }, 1600);
        } else {
            if (typeof SoundEngine !== 'undefined') SoundEngine.playSoftNotice();
            this.extraPenaltyQuestions += 1;
            const chosen = KED_IMAGES_DATA.ITEMS.find(it => it.id === chosenId);
            const chosenName = chosen ? chosen.name : 'Hình này';

            if (fb) {
                fb.innerHTML = `🌱 <span style="color:#b91c1c;">Đây là ${chosenName} cơ! Bé thử lại nhé!</span>`;
            }

            if (btnEl) {
                btnEl.classList.add('shake-anim');
                setTimeout(() => btnEl.classList.remove('shake-anim'), 600);
            }
        }
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
        const counterEl = document.getElementById('lbl-session-answered');
        if (counterEl) {
            counterEl.textContent = this.sessionAnsweredCount;
        }
    },

    triggerScreenTimeLock() {
        this.isLocked = true;
        const modal = document.getElementById('screentime-lock-modal');
        if (modal) modal.style.display = 'flex';
    }
};
