/**
 * KED - Stories Zone Module v7.2
 * Vườn Cổ Tích & Tương Tác Thu Hoạch Kiến Thức (Zero-Scroll Viewport Paradigm)
 * 2 Bậc Danh Mục Gộp 1 Dòng Duy Nhất (38px):
 *   - Bậc 1: Chọn Truyện Popover 1 Chạm [ 🐰 Thỏ Con Đi Mưa ▾ ]
 *   - Bậc 2: Phương Thức Segmented Toggle [ 📖 Đọc | 🎭 Tương Tác ]
 * Cơ Chế Tiến Triển Liên Tục (Seamless Continuous Progression):
 *   - Tự động đọc và tự động lật trang tiếp sau khi cô đọc xong 2s
 *   - Trang cuối tự động chuyển tiếp liền mạch sang Tương Tác & Câu Hỏi Thực Tế
 */

const StoriesZone = {
    currentStoryId: "rainy_day",
    currentMode: "read", // "read" | "interact"
    readPageIndex: 1,
    autoAdvanceTimer: null,

    // Trạng thái Phần 2
    interactStep: "action", // "action" | "quiz" | "reward"
    quizIndex: 0,
    actionState: {
        clicks: 0,
        chainIdx: 0,
        completed: false
    },

    init() {
        this.clearTimers();
        this.renderSubMenu();
        if (this.currentMode === "read") {
            this.renderReadMode();
        } else {
            this.renderInteractMode();
        }
    },

    clearTimers() {
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    },

    /* ========================================================
       2 BẬC DANH MỤC GỘP 1 DÒNG DUY NHẤT (SIÊU TINH GỌN 38px)
       ======================================================== */
    renderSubMenu() {
        const subNav = document.getElementById('stories-subnav');
        if (!subNav) return;
        const curStory = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];

        subNav.innerHTML = `
            <div class="story-top-control-bar">
                <!-- BẬC 1: Chọn Truyện Popover 1 Chạm -->
                <button class="topic-picker-btn" onclick="StoriesZone.openStoryPickerModal()" title="Chạm để đổi câu chuyện khác">
                    <span>${curStory.icon} <strong>${curStory.title}</strong></span> <span style="font-size:10px;">▾</span>
                </button>

                <!-- BẬC 2: Segmented Control [ 📖 Đọc | 🎭 Tương Tác ] -->
                <div class="story-segmented-mode" title="Chọn phương thức: Đọc truyện tranh hoặc Tương tác">
                    <button class="story-mode-toggle-btn ${this.currentMode === 'read' ? 'active' : ''}" onclick="StoriesZone.switchMode('read')">
                        📖 Đọc
                    </button>
                    <button class="story-mode-toggle-btn ${this.currentMode === 'interact' ? 'active' : ''}" onclick="StoriesZone.switchMode('interact')">
                        🎭 Tương Tác
                    </button>
                </div>
            </div>
        `;
    },

    switchMode(mode) {
        this.clearTimers();
        this.currentMode = mode;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderSubMenu();

        if (mode === 'read') {
            this.renderReadMode();
        } else {
            this.interactStep = 'action';
            this.actionState = { clicks: 0, chainIdx: 0, completed: false };
            this.quizIndex = 0;
            this.renderInteractMode();
        }
    },

    openStoryPickerModal() {
        this.clearTimers();
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        let modal = document.getElementById('stories-picker-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'stories-picker-modal';
            modal.className = 'zero-scroll-modal-overlay';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="zero-scroll-modal-card">
                <div class="modal-header-row">
                    <span class="modal-header-title">📖 CHỌN CÂU CHUYỆN CỔ TÍCH</span>
                    <button class="modal-close-btn" onclick="StoriesZone.closeStoryPickerModal()">✕</button>
                </div>
                <div class="modal-grid-palette" style="grid-template-columns: 1fr; gap: 10px;">
                    ${STORIES_DATA.map(st => `
                        <button class="palette-item-btn ${st.id === this.currentStoryId ? 'active' : ''}" 
                                style="flex-direction:row; justify-content:flex-start; gap:14px; padding:12px 14px; text-align:left;"
                                onclick="StoriesZone.selectStory('${st.id}')">
                            <span style="font-size:36px; line-height:1;">${st.icon}</span>
                            <div style="flex:1;">
                                <div style="font-size:15px; font-weight:900; color:#0369a1;">${st.title}</div>
                                <div style="display:flex; align-items:center; gap:6px; margin-top:3px;">
                                    <span style="font-size:10px; font-weight:800; background:#e0f2fe; color:#0284c7; padding:2px 8px; border-radius:9999px;">${st.badge}</span>
                                    <span style="font-size:11px; font-weight:800; color:#64748b;">${st.readingPages.length} trang</span>
                                </div>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    closeStoryPickerModal() {
        const modal = document.getElementById('stories-picker-modal');
        if (modal) modal.style.display = 'none';
    },

    selectStory(storyId) {
        this.clearTimers();
        this.currentStoryId = storyId;
        this.readPageIndex = 1;
        this.interactStep = 'action';
        this.actionState = { clicks: 0, chainIdx: 0, completed: false };
        this.quizIndex = 0;

        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.closeStoryPickerModal();
        this.renderSubMenu();

        if (this.currentMode === 'read') {
            this.renderReadMode();
        } else {
            this.renderInteractMode();
        }
    },

    /* ========================================================
       PHẦN 1: ĐỌC TRUYỆN CHO BÉ (TIẾN TRIỂN LIÊN TỤC TỪNG TRANG)
       ======================================================== */
    renderReadMode(container) {
        this.clearTimers();
        if (!container) container = document.getElementById('stories-content');
        if (!container) return;

        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const page = story.readingPages.find(p => p.pageIndex === this.readPageIndex) || story.readingPages[0];
        this.readPageIndex = page.pageIndex;
        const totalPages = story.readingPages.length;
        const isLastPage = this.readPageIndex >= totalPages;

        container.innerHTML = `
            <div class="story-stage-viewport">
                <!-- KHUNG TRANH MINH HỌA LỚN CÓ ĐIỂM CHẠM -->
                <div class="story-svg-container" style="background:${page.bgStyle || '#ffffff'};">
                    ${page.illustration}
                </div>

                <!-- LỜI KỂ TRUYỆN & NÚT NGHE LẠI -->
                <div class="story-narrative-bar">
                    <div class="story-text-line" id="story-read-text">
                        ${page.text}
                    </div>
                    <button class="kid-pill-compact" style="background:#0284c7; color:#fff; border-color:#0284c7; padding:4px 10px; flex-shrink:0;" onclick="StoriesZone.speakCurrentReadPage(true)">
                        🔊 Nghe Lại
                    </button>
                </div>

                <!-- THANH CHỈ BÁO ĐẾM LÙI TỰ ĐỘNG LẬT TRANG -->
                <div class="story-auto-advance-indicator" title="Tự động lật trang khi đọc xong">
                    <div class="story-auto-advance-bar" id="story-advance-bar"></div>
                </div>

                <!-- DÒNG GỢI Ý CHẠM HOẠT HỌA -->
                <div style="flex:0 0 auto; text-align:center; font-size:11px; font-weight:800; color:#0369a1; padding:2px 0;" id="story-touch-hint">
                    💡 ${page.touchHints || 'Bé chạm vào các hình trong tranh để nghe âm thanh nhé!'}
                </div>

                <!-- THANH LẬT TRANG DƯỚI ĐÁY (TIẾN TRIỂN THỦ CÔNG HOẶC TỰ ĐỘNG) -->
                <div class="zero-scroll-pager">
                    <button class="pager-btn btn-prev" onclick="StoriesZone.prevReadPage()" ${this.readPageIndex <= 1 ? 'disabled' : ''}>
                        ◀ Trang Trước
                    </button>
                    <span class="pager-status">Trang ${this.readPageIndex} / ${totalPages}</span>
                    ${isLastPage ? `
                        <button class="pager-btn" style="background:linear-gradient(135deg, #f59e0b, #ef4444); color:#fff; box-shadow:0 3px 10px rgba(239, 68, 68, 0.4);" onclick="StoriesZone.switchMode('interact')">
                            🎭 Sang Tương Tác ➔
                        </button>
                    ` : `
                        <button class="pager-btn btn-next" onclick="StoriesZone.nextReadPage()">
                            Trang Tiếp ▶
                        </button>
                    `}
                </div>
            </div>
        `;

        // Tự động phát âm thanh lời kể và kích hoạt tiến triển liên tục
        setTimeout(() => {
            this.speakCurrentReadPage(false);
        }, 300);
    },

    prevReadPage() {
        this.clearTimers();
        if (this.readPageIndex > 1) {
            this.readPageIndex--;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderReadMode();
        }
    },

    nextReadPage() {
        this.clearTimers();
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        if (this.readPageIndex < story.readingPages.length) {
            this.readPageIndex++;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderReadMode();
        } else {
            // Đã hết trang -> Tự động chuyển tiếp sang Tương Tác
            this.switchMode('interact');
        }
    },

    speakCurrentReadPage(isManualReplay = false) {
        this.clearTimers();
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const page = story.readingPages.find(p => p.pageIndex === this.readPageIndex);
        if (!page || !page.voiceText) return;

        const onAudioEnd = () => {
            // Khi âm thanh kết thúc: kích hoạt thanh đếm lùi 2s và tự động lật tiếp
            const bar = document.getElementById('story-advance-bar');
            if (bar) bar.style.width = '100%';

            this.autoAdvanceTimer = setTimeout(() => {
                if (this.currentMode === 'read') {
                    if (this.readPageIndex < story.readingPages.length) {
                        this.nextReadPage();
                    } else {
                        // Kết thúc trang cuối -> Tiến triển liền mạch sang Tương Tác
                        if (typeof SoundEngine !== 'undefined') {
                            SoundEngine.playCheer();
                            SoundEngine.speakFallback("Bé đã đọc xong câu chuyện thật tuyệt vời! Bây giờ chúng mình cùng sang phần tương tác nhé!");
                        }
                        this.switchMode('interact');
                    }
                }
            }, 2000);
        };

        if (typeof SoundEngine !== 'undefined') {
            if (page.audioKey) {
                SoundEngine.playVoice(page.audioKey, onAudioEnd, page.voiceText);
            } else {
                SoundEngine.speakFallback(page.voiceText, onAudioEnd);
            }
        }
    },

    tapElement(elemKey, textVoice) {
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.speakFallback(textVoice);
        }
        const hintEl = document.getElementById('story-touch-hint');
        if (hintEl) {
            hintEl.textContent = `✨ ${textVoice}`;
        }
    },

    /* ========================================================
       PHẦN 2: TƯƠNG TÁC TRUYỆN & THU HOẠCH KIẾN THỨC
       (TIẾN TRIỂN LIÊN TỤC: HÀNH ĐỘNG ➔ CÂU HỎI ➔ VINH DANH)
       ======================================================== */
    renderInteractMode(container) {
        this.clearTimers();
        if (!container) container = document.getElementById('stories-content');
        if (!container) return;

        if (this.interactStep === 'action') {
            this.renderActionQuest(container);
        } else if (this.interactStep === 'quiz') {
            this.renderLifeSkillQuiz(container);
        } else if (this.interactStep === 'reward') {
            this.renderHarvestReward(container);
        }
    },

    /* 2.1 Chặng 1: Sa bàn Hành động Thực tế */
    renderActionQuest(container) {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const quest = story.actionQuest;

        container.innerHTML = `
            <div class="story-interactive-card">
                <!-- TIÊU ĐỀ CHẶNG 1 -->
                <div style="flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; background:#e0f2fe; border:2px solid #38bdf8; border-radius:14px; padding:6px 12px; margin-bottom:6px;">
                    <div style="font-size:13px; font-weight:900; color:#0369a1;">
                        🎯 Chặng 1/2: Hành Động Cứu Giúp Nhân Vật
                    </div>
                    <button class="kid-pill-compact" style="background:#0284c7; color:#fff; border-color:#0284c7; padding:2px 8px; font-size:11px;" onclick="StoriesZone.speakActionQuest()">
                        🔊 Nghe Lại
                    </button>
                </div>

                <!-- HƯỚNG DẪN HÀNH ĐỘNG -->
                <div style="flex:0 0 auto; text-align:center; font-size:13px; font-weight:800; color:#1e293b; padding:4px 0;" id="action-instruction">
                    👉 ${quest.instruction}
                </div>

                <!-- KHUNG SA BÀN HÀNH ĐỘNG THỰC TẾ -->
                <div class="story-action-stage" id="story-action-stage">
                    ${this.generateActionStageHTML(story)}
                </div>

                <!-- PHẢN HỒI VÀ TIẾN TRIỂN TIẾP -->
                <div style="flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:6px; min-height:42px;">
                    <div id="action-feedback-line" style="font-size:12px; font-weight:800; color:#0369a1; flex:1;">
                        👆 Bé hãy thực hiện hành động trên sa bàn nhé!
                    </div>
                    <button id="btn-next-to-quiz" class="kid-pill-compact" style="background:#10b981; color:#fff; border-color:#10b981; font-size:13px; padding:8px 16px; display:${this.actionState.completed ? 'block' : 'none'};" onclick="StoriesZone.proceedToQuiz()">
                        Sang Câu Hỏi Thực Tế ➔
                    </button>
                </div>
            </div>
        `;

        this.speakActionQuest();
    },

    generateActionStageHTML(story) {
        if (story.id === 'rainy_day') {
            const isCompleted = this.actionState.completed;
            return `
                <div style="text-align:center; width:100%;">
                    <div style="font-size:clamp(48px, 12vh, 80px); line-height:1; margin-bottom:8px;" class="bounce-anim">
                        ${isCompleted ? '🐰☂️🌈' : '🐰🌧️'}
                    </div>
                    <div style="font-size:15px; font-weight:900; color:${isCompleted ? '#10b981' : '#b45309'}; margin-bottom:12px;">
                        ${isCompleted ? '🎉 Bạn Thỏ đã được che ô khô ráo và an toàn rồi!' : 'Ôi trời mưa rào! Thỏ con đang bị ướt lông kìa!'}
                    </div>
                    ${!isCompleted ? `
                        <button class="story-quiz-btn" style="margin:0 auto; max-width:280px; justify-content:center; background:#fef3c7; border-color:#f59e0b;" onclick="StoriesZone.triggerUmbrellaAction()">
                            <span style="font-size:32px;">☂️</span>
                            <span style="font-size:15px; font-weight:900; color:#b45309;">Chạm Mở Ô Che Mưa Cho Thỏ</span>
                        </button>
                    ` : ''}
                </div>
            `;
        } else if (story.id === 'tortoise_and_hare') {
            const clicks = this.actionState.clicks;
            const isCompleted = this.actionState.completed;
            return `
                <div style="text-align:center; width:100%;">
                    <div style="font-size:clamp(40px, 10vh, 64px); line-height:1; margin-bottom:8px;">
                        ${isCompleted ? '🏆🐢🥇' : '🐢💨 ... 🏁'}
                    </div>
                    <div style="font-size:14px; font-weight:900; color:#0369a1; margin-bottom:10px;">
                        ${isCompleted ? 'Hoan hô! Bạn Rùa đã chạm vạch đích và nhận Cúp Vàng!' : `Bé đã chạm cổ vũ: ${clicks}/3 lần!`}
                    </div>
                    ${!isCompleted ? `
                        <button class="story-quiz-btn" style="margin:0 auto; max-width:280px; justify-content:center; background:#ecfdf5; border-color:#10b981;" onclick="StoriesZone.triggerTurtleCheer()">
                            <span style="font-size:32px;" class="pulse-hover">🐢</span>
                            <span style="font-size:15px; font-weight:900; color:#047857;">Chạm Cổ Vũ Bạn Rùa Tiếp Bước (${clicks + 1}/3)</span>
                        </button>
                    ` : ''}
                </div>
            `;
        } else if (story.id === 'pulling_turnip') {
            const chain = story.actionQuest.chain;
            const chainIdx = this.actionState.chainIdx;
            const isCompleted = this.actionState.completed;
            return `
                <div style="text-align:center; width:100%;">
                    <div style="font-size:clamp(36px, 8vh, 56px); line-height:1; margin-bottom:6px;">
                        ${isCompleted ? '🥕✨🎉 CỦ CẢI BẬT LÊN RỒI!' : '🥕👨‍👩‍👧🐶'}
                    </div>
                    <div style="font-size:13px; font-weight:800; color:#475569; margin-bottom:10px;">
                        ${isCompleted ? 'Sức mạnh đoàn kết tuyệt vời!' : `Hãy chạm theo thứ tự: ${chain.map((c, i) => `${i <= chainIdx ? '✅' : '⏳'} ${c.icon} ${c.name}`).join(' ➔ ')}`}
                    </div>
                    ${!isCompleted ? `
                        <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap;">
                            ${chain.map((c, i) => `
                                <button class="palette-item-btn ${i === chainIdx ? 'active' : ''}" 
                                        style="padding:8px 12px; ${i < chainIdx ? 'opacity:0.5; border-color:#10b981;' : ''}"
                                        onclick="StoriesZone.triggerTurnipChain(${i})">
                                    <span style="font-size:28px;">${c.icon}</span>
                                    <span class="palette-label">${c.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
        return '';
    },

    speakActionQuest() {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        if (story.actionQuest && typeof SoundEngine !== 'undefined') {
            SoundEngine.speakFallback(story.actionQuest.speech);
        }
    },

    triggerUmbrellaAction() {
        this.actionState.completed = true;
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playTing();
            SoundEngine.playCheer();
            SoundEngine.speakFallback(STORIES_DATA.find(s => s.id === this.currentStoryId).actionQuest.successPraise);
        }
        if (typeof App !== 'undefined' && App.addStar) App.addStar();

        const stage = document.getElementById('story-action-stage');
        if (stage) stage.innerHTML = this.generateActionStageHTML(STORIES_DATA.find(s => s.id === this.currentStoryId));

        const fb = document.getElementById('action-feedback-line');
        if (fb) fb.innerHTML = '🎉 <strong>Tuyệt vời!</strong> Đang tự động chuyển sang câu hỏi thực tế...';

        // Tự động tiến triển sang câu hỏi thực tế sau 2.0s
        setTimeout(() => {
            this.proceedToQuiz();
        }, 2000);
    },

    triggerTurtleCheer() {
        this.actionState.clicks++;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();

        if (this.actionState.clicks >= 3) {
            this.actionState.completed = true;
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTing();
                SoundEngine.playCheer();
                SoundEngine.speakFallback(STORIES_DATA.find(s => s.id === this.currentStoryId).actionQuest.successPraise);
            }
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            const fb = document.getElementById('action-feedback-line');
            if (fb) fb.innerHTML = '🎉 <strong>Xuất sắc!</strong> Đang tự động chuyển sang câu hỏi thực tế...';

            setTimeout(() => {
                this.proceedToQuiz();
            }, 2000);
        } else {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.speakFallback(`Cố lên bạn Rùa! Bước thứ ${this.actionState.clicks}!`);
            }
        }

        const stage = document.getElementById('story-action-stage');
        if (stage) stage.innerHTML = this.generateActionStageHTML(STORIES_DATA.find(s => s.id === this.currentStoryId));
    },

    triggerTurnipChain(idx) {
        if (idx === this.actionState.chainIdx) {
            this.actionState.chainIdx++;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();

            const story = STORIES_DATA.find(s => s.id === this.currentStoryId);
            if (this.actionState.chainIdx >= story.actionQuest.chain.length) {
                this.actionState.completed = true;
                if (typeof SoundEngine !== 'undefined') {
                    SoundEngine.playTing();
                    SoundEngine.playCheer();
                    SoundEngine.speakFallback(story.actionQuest.successPraise);
                }
                if (typeof App !== 'undefined' && App.addStar) App.addStar();

                const fb = document.getElementById('action-feedback-line');
                if (fb) fb.innerHTML = '🎉 <strong>Hoan hô!</strong> Đang tự động chuyển sang câu hỏi thực tế...';

                setTimeout(() => {
                    this.proceedToQuiz();
                }, 2000);
            }

            const stage = document.getElementById('story-action-stage');
            if (stage) stage.innerHTML = this.generateActionStageHTML(story);
        } else {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTryAgain();
                SoundEngine.speakFallback('Bé hãy chạm lần lượt theo thứ tự người đứng trước nhé!');
            }
        }
    },

    proceedToQuiz() {
        this.interactStep = 'quiz';
        this.quizIndex = 0;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderInteractMode();
    },

    /* 2.2 Chặng 2: Bộ Câu Hỏi Thu Hoạch Kiến Thức Đời Sống */
    renderLifeSkillQuiz(container) {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const quizzes = story.lifeSkillQuizzes;
        if (this.quizIndex >= quizzes.length) {
            this.interactStep = 'reward';
            this.renderHarvestReward(container);
            return;
        }

        const curQuiz = quizzes[this.quizIndex];

        container.innerHTML = `
            <div class="story-interactive-card">
                <!-- TIÊU ĐỀ CHẶNG 2 -->
                <div style="flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; background:#fef3c7; border:2px solid #f59e0b; border-radius:14px; padding:6px 12px; margin-bottom:6px;">
                    <div style="font-size:13px; font-weight:900; color:#b45309;">
                        💡 Chặng 2/2: Bài Học Cuộc Sống Thực Tế (${this.quizIndex + 1}/${quizzes.length})
                    </div>
                    <button class="kid-pill-compact" style="background:#f59e0b; color:#fff; border-color:#f59e0b; padding:2px 8px; font-size:11px;" onclick="StoriesZone.speakCurrentQuiz()">
                        🔊 Nghe Câu Hỏi
                    </button>
                </div>

                <!-- CÂU HỎI TÌNH HUỐNG THỰC TẾ -->
                <div style="flex:0 0 auto; text-align:center; padding:6px 4px;">
                    <h3 style="font-size:clamp(14px, 2.8vh, 18px); font-weight:900; color:#0f172a; line-height:1.3; margin:0;" id="quiz-question-text">
                        ❓ ${curQuiz.question}
                    </h3>
                </div>

                <!-- LƯỚI NÚT LỰA CHỌN TO RÕ -->
                <div class="story-quiz-grid">
                    ${curQuiz.options.map((opt, idx) => `
                        <button class="story-quiz-btn" id="quiz-opt-btn-${idx}" onclick="StoriesZone.answerLifeSkillQuiz(${idx})">
                            <span style="font-size:28px;">${opt.icon}</span>
                            <span style="font-size:14px; font-weight:900; color:#1e293b;">${opt.text}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- DÒNG PHẢN HỒI THÂN THIỆN -->
                <div style="flex:0 0 auto; text-align:center; font-size:12px; font-weight:800; color:#64748b; padding:4px 0;" id="quiz-feedback-box">
                    👉 Bé hãy quan sát và chạm chọn câu trả lời đúng nhất nhé!
                </div>
            </div>
        `;

        this.speakCurrentQuiz();
    },

    speakCurrentQuiz() {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const curQuiz = story.lifeSkillQuizzes[this.quizIndex];
        if (curQuiz && typeof SoundEngine !== 'undefined') {
            if (curQuiz.audioKey) {
                SoundEngine.playVoice(curQuiz.audioKey, null, curQuiz.speech || curQuiz.question);
            } else {
                SoundEngine.speakFallback(curQuiz.speech || curQuiz.question);
            }
        }
    },

    answerLifeSkillQuiz(optIdx) {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const curQuiz = story.lifeSkillQuizzes[this.quizIndex];
        const opt = curQuiz.options[optIdx];
        const btnEl = document.getElementById(`quiz-opt-btn-${optIdx}`);
        const fb = document.getElementById('quiz-feedback-box');

        if (opt.isCorrect) {
            if (btnEl) btnEl.classList.add('correct-choice');
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTing();
                SoundEngine.speakFallback(opt.feedback);
            }
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            if (fb) {
                fb.innerHTML = `🎉 <strong style="color:#10b981;">Chính xác!</strong> ${opt.feedback} ⭐ +1 Sao`;
            }

            // Tự động tiến triển sang câu hỏi tiếp theo hoặc vinh danh sau 2.2s
            setTimeout(() => {
                this.quizIndex++;
                this.renderLifeSkillQuiz(document.getElementById('stories-content'));
            }, 2200);
        } else {
            if (btnEl) {
                btnEl.classList.add('wrong-choice');
                setTimeout(() => btnEl.classList.remove('wrong-choice'), 600);
            }
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTryAgain();
                SoundEngine.speakFallback(opt.feedback);
            }
            if (fb) {
                fb.innerHTML = `❌ <strong style="color:#ef4444;">Chưa đúng rồi!</strong> ${opt.feedback} Bé chạm chọn lại nhé!`;
            }
        }
    },

    /* 2.3 Chặng 3: Vinh Danh Thu Hoạch & Trao Huy Hiệu */
    renderHarvestReward(container) {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const badge = story.badgeReward;

        if (typeof App !== 'undefined' && App.addStar) {
            App.addStar();
            App.addStar();
            App.addStar();
        }
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playCheer();
            SoundEngine.playSparkle();
            SoundEngine.speakFallback(`Hoan hô bé yêu! Bé đã xuất sắc hoàn thành câu chuyện và thu hoạch được ${badge.name}! Tặng bé ba sao vàng!`);
        }

        container.innerHTML = `
            <div class="story-interactive-card" style="justify-content:center; align-items:center;">
                <div class="harvest-badge-box">
                    <div style="font-size:36px; margin-bottom:4px;">🎉🌟🎊</div>
                    <h2 style="font-size:18px; font-weight:900; color:#b45309; margin:4px 0;">CHÚC MỪNG BÉ THU HOẠCH KIẾN THỨC!</h2>
                    
                    <div style="font-size:60px; line-height:1; margin:12px 0;" class="bounce-anim">
                        ${badge.icon}
                    </div>

                    <div style="font-size:16px; font-weight:900; color:#0369a1; margin-bottom:4px;">
                        ${badge.name}
                    </div>

                    <div style="font-size:12px; font-weight:800; color:#475569; margin-bottom:12px; line-height:1.3;">
                        ${story.lessonSummary}
                    </div>

                    <div style="font-size:13px; font-weight:900; color:#f59e0b; margin-bottom:16px;">
                        ⭐⭐⭐ Bé được tặng +3 Ngôi Sao Vàng!
                    </div>

                    <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap;">
                        <button class="kid-pill-compact" style="background:#10b981; color:#fff; border-color:#10b981; padding:8px 14px;" onclick="StoriesZone.switchMode('read')">
                            📖 Đọc Lại Truyện
                        </button>
                        <button class="kid-pill-compact" style="background:#0284c7; color:#fff; border-color:#0284c7; padding:8px 14px;" onclick="StoriesZone.switchMode('interact')">
                            🔄 Chơi Lại Tương Tác
                        </button>
                        <button class="kid-pill-compact" style="background:#f59e0b; color:#fff; border-color:#f59e0b; padding:8px 14px;" onclick="StoriesZone.openStoryPickerModal()">
                            🌟 Đổi Truyện Khác
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
