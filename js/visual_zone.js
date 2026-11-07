/**
 * KED - Visual Thinking Zone v1.0 (VƯƠNG QUỐC TƯ DUY THỊ GIÁC & LOGIC SỚM)
 * Phân hệ độc lập chuyên sâu về phát triển tư duy hình học và logic cho bé 3-5 tuổi:
 * 1. SO SÁNH TRỰC QUAN (110 câu hỏi đa dạng: To-Nhỏ, Cao-Thấp, Dài-Ngắn, Nặng-Nhẹ)
 * 2. TÌM ĐIỂM KHÁC BIỆT & THAM CHIẾU (Odd One Out & Match Reference)
 * 3. SA BÀN 3 MÔI TRƯỜNG SVG (Bầu trời - Mặt đất - Lòng đại dương luân phiên cân bằng)
 * 4. PHÒNG THÍ NGHIỆM HÌNH KHỐI & PHA MÀU MA THUẬT (Hình khối đời thực, Đa thuộc tính, Pha màu)
 */

const VisualZone = {
    activeMode: 'compare', // 'compare' | 'odd' | 'habitat' | 'color_shapes'

    // Cấp 2: So sánh (110 câu)
    compareRound: 0,
    currentCompareOptions: [],

    // Cấp 3: Phân loại & Điểm khác biệt
    activeClassMode: 'odd', // 'odd' | 'match_ref' | 'color_shapes' | 'edible' | 'habitat'
    oddRound: 0,
    currentOddItems: [],
    matchRefRound: 0,
    currentMatchRefOptions: [],
    threeBinRound: 0,

    // Cấp 3: Hình khối & Màu sắc nâng cao
    colorShapesSubMode: 'real_shapes', // 'real_shapes' | 'multi_attr' | 'color_mix'
    realShapesRound: 0,
    multiAttrRound: 0,
    currentRealShapeTarget: null,
    currentRealShapeOptions: [],
    currentMultiAttrTarget: null,
    currentMultiAttrOptions: [],
    mixSelectedColors: [], // [color1, color2]

    // Cấp 3: Sa bàn môi trường sống luân phiên cân bằng
    habitatCycle: ['air', 'land', 'water'],
    habitatIndex: 0,
    currentHabitatTarget: null,
    habitatPools: { air: [], land: [], water: [] },

    // BẢO VỆ MẮT TRẺ EM: KHÓA MÀN HÌNH SAU 200 CÂU
    sessionAnsweredCount: 0,
    sessionLimit: 200,
    isLocked: false,
    parentGateAnswer: 0,

    // CƠ CHẾ THỬ THÁCH: TĂNG CÂU HỎI KHI CHỌN SAI
    extraPenaltyQuestions: 0,

    realShapesData: [
        {
            shapeId: 'circle',
            shapeName: 'Hình Tròn',
            shapeSvg: '<svg viewBox="0 0 64 64" width="72" height="72"><circle cx="32" cy="32" r="28" fill="#f43f5e" stroke="#be123c" stroke-width="3"/><circle cx="23" cy="23" r="6" fill="#ffffff" opacity="0.4"/></svg>',
            question: 'Hình Tròn lăn tròn giống đồ vật nào dưới đây bé ơi?',
            speech: 'Hình tròn giống đồ vật nào dưới đây vậy bé?',
            audioKey: 'shape_circle',
            correctItem: { icon: '⏰', name: 'Chiếc Đồng Hồ', reason: 'Đồng hồ có mặt tròn xoe!' },
            wrongItems: [
                { icon: '🟩', name: 'Bánh Chưng Vuông', reason: 'Bánh chưng là hình vuông' },
                { icon: '🍕', name: 'Miếng Pizza', reason: 'Miếng pizza là hình tam giác' }
            ]
        },
        {
            shapeId: 'square',
            shapeName: 'Hình Vuông',
            shapeSvg: '<svg viewBox="0 0 64 64" width="72" height="72"><rect x="6" y="6" width="52" height="52" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/><rect x="12" y="12" width="16" height="16" rx="2" fill="#ffffff" opacity="0.3"/></svg>',
            question: 'Hình Vuông có 4 cạnh bằng nhau giống đồ vật nào vậy bé?',
            speech: 'Hình vuông giống đồ vật nào vậy bé?',
            audioKey: 'shape_square',
            correctItem: { icon: '🟩', name: 'Bánh Chưng Xanh', reason: 'Bánh chưng vuông vắn thơm ngon!' },
            wrongItems: [
                { icon: '⚽', name: 'Quả Bóng', reason: 'Quả bóng là hình tròn' },
                { icon: '🪁', name: 'Cánh Diều', reason: 'Cánh diều là hình thoi' }
            ]
        },
        {
            shapeId: 'triangle',
            shapeName: 'Hình Tam Giác',
            shapeSvg: '<svg viewBox="0 0 64 64" width="80" height="80"><path d="M 32 6 L 58 54 L 6 54 Z" fill="#e11d48" stroke="#9f1239" stroke-width="3.5"/><path d="M 32 14 L 16 50 Q 18 46 24 46 L 32 24 Z" fill="#ffffff" opacity="0.45"/></svg>',
            question: 'Hình Tam Giác có 3 góc nhọn giống món ăn nào dưới đây?',
            speech: 'Hình tam giác giống món ăn nào dưới đây vậy bé?',
            audioKey: 'shape_triangle',
            correctItem: { icon: '🍕', name: 'Miếng Pizza', reason: 'Miếng bánh pizza có hình tam giác!' },
            wrongItems: [
                { icon: '🛞', name: 'Bánh Xe Tròn', reason: 'Bánh xe là hình tròn' },
                { icon: '📖', name: 'Quyển Sách', reason: 'Quyển sách là hình chữ nhật' }
            ]
        },
        {
            shapeId: 'rectangle',
            shapeName: 'Hình Chữ Nhật',
            shapeSvg: '<svg viewBox="0 0 64 64" width="80" height="72"><rect x="4" y="12" width="56" height="40" rx="4" fill="#eab308" stroke="#ca8a04" stroke-width="3"/><rect x="8" y="16" width="20" height="12" rx="2" fill="#ffffff" opacity="0.3"/></svg>',
            question: 'Hình Chữ Nhật dài hơn hình vuông giống đồ vật nào trong nhà?',
            speech: 'Hình chữ nhật giống đồ vật nào trong nhà vậy bé?',
            audioKey: 'shape_rectangle',
            correctItem: { icon: '🚪', name: 'Cánh Cửa Ra Vào', reason: 'Cánh cửa nhà có hình chữ nhật cao!' },
            wrongItems: [
                { icon: '⚽', name: 'Quả Bóng Tròn', reason: 'Quả bóng là hình tròn' },
                { icon: '🌟', name: 'Ngôi Sao Sáng', reason: 'Ngôi sao có 5 cánh nhọn' }
            ]
        },
        {
            shapeId: 'star',
            shapeName: 'Hình Ngôi Sao',
            shapeSvg: '<svg viewBox="0 0 64 64" width="72" height="72"><polygon points="32,4 40,22 60,24 45,38 49,58 32,48 15,58 19,38 4,24 24,22" fill="#facc15" stroke="#d97706" stroke-width="2.5"/></svg>',
            question: 'Hình Ngôi Sao lấp lánh giống bạn nhỏ nào dưới biển?',
            speech: 'Hình ngôi sao giống bạn nhỏ nào dưới biển vậy bé?',
            audioKey: 'shape_star',
            correctItem: { icon: '🪸', name: 'Bạn Sao Biển', reason: 'Sao biển có 5 cánh hệt như ngôi sao!' },
            wrongItems: [
                { icon: '🍊', name: 'Quả Cam Tròn', reason: 'Quả cam là hình tròn' },
                { icon: '🍞', name: 'Bánh Mì Ống', reason: 'Bánh mì có hình dài' }
            ]
        },
        {
            shapeId: 'heart',
            shapeName: 'Hình Trái Tim',
            shapeSvg: '<svg viewBox="0 0 64 64" width="72" height="72"><path d="M 32 56 C 12 40 4 28 4 16 C 4 8 10 2 18 2 C 24 2 29 6 32 11 C 35 6 40 2 46 2 C 54 2 60 8 60 16 C 60 28 52 40 32 56 Z" fill="#ec4899" stroke="#be185d" stroke-width="2.5"/><circle cx="18" cy="14" r="4" fill="#ffffff" opacity="0.4"/></svg>',
            question: 'Hình Trái Tim yêu thương giống loại quả ngọt nào bé ơi?',
            speech: 'Hình trái tim yêu thương giống quả ngọt nào vậy bé?',
            audioKey: 'shape_heart',
            correctItem: { icon: '🍓', name: 'Quả Dâu Tây', reason: 'Quả dâu tây đỏ mọng hình trái tim xinh xắn!' },
            wrongItems: [
                { icon: '🪑', name: 'Chiếc Ghế Gỗ', reason: 'Ghế ngồi có chân và lưng tựa' },
                { icon: '☂️', name: 'Chiếc Ô Che Mưa', reason: 'Chiếc ô mở ra hình vòm tròn' }
            ]
        }
    ],

    // DỮ LIỆU ĐA THUỘC TÍNH (HÌNH + MÀU)
    multiAttrData: [
        {
            title: 'Bé hãy tìm: HÌNH TAM GIÁC MÀU VÀNG 🔺',
            speech: 'Bé hãy tìm hình tam giác màu vàng ở đâu nào?',
            target: { shape: 'triangle', color: '#fbbf24', border: '#d97706', name: 'Tam Giác Vàng' },
            options: [
                { shape: 'triangle', color: '#fbbf24', border: '#d97706', name: 'Tam Giác Vàng', isCorrect: true },
                { shape: 'triangle', color: '#ef4444', border: '#b91c1c', name: 'Tam Giác Đỏ', isCorrect: false },
                { shape: 'circle', color: '#fbbf24', border: '#d97706', name: 'Hình Tròn Vàng', isCorrect: false },
                { shape: 'square', color: '#3b82f6', border: '#1d4ed8', name: 'Hình Vuông Lam', isCorrect: false }
            ]
        },
        {
            title: 'Bé hãy tìm: HÌNH TRÒN MÀU ĐỎ 🔴',
            speech: 'Bé hãy tìm hình tròn màu đỏ ở đâu nào?',
            target: { shape: 'circle', color: '#ef4444', border: '#b91c1c', name: 'Hình Tròn Đỏ' },
            options: [
                { shape: 'circle', color: '#ef4444', border: '#b91c1c', name: 'Hình Tròn Đỏ', isCorrect: true },
                { shape: 'circle', color: '#3b82f6', border: '#1d4ed8', name: 'Hình Tròn Lam', isCorrect: false },
                { shape: 'square', color: '#ef4444', border: '#b91c1c', name: 'Hình Vuông Đỏ', isCorrect: false },
                { shape: 'triangle', color: '#22c55e', border: '#15803d', name: 'Tam Giác Xanh Lá', isCorrect: false }
            ]
        },
        {
            title: 'Bé hãy tìm: HÌNH VUÔNG MÀU XANH LAM 🟦',
            speech: 'Bé hãy tìm hình vuông màu xanh lam ở đâu nào?',
            target: { shape: 'square', color: '#3b82f6', border: '#1d4ed8', name: 'Hình Vuông Lam' },
            options: [
                { shape: 'square', color: '#3b82f6', border: '#1d4ed8', name: 'Hình Vuông Lam', isCorrect: true },
                { shape: 'square', color: '#fbbf24', border: '#d97706', name: 'Hình Vuông Vàng', isCorrect: false },
                { shape: 'circle', color: '#3b82f6', border: '#1d4ed8', name: 'Hình Tròn Lam', isCorrect: false },
                { shape: 'triangle', color: '#a855f7', border: '#7e22ce', name: 'Tam Giác Tím', isCorrect: false }
            ]
        },
        {
            title: 'Bé hãy tìm: HÌNH NGÔI SAO MÀU HỒNG ⭐',
            speech: 'Bé hãy tìm hình ngôi sao màu hồng ở đâu nào?',
            target: { shape: 'star', color: '#ec4899', border: '#be185d', name: 'Ngôi Sao Hồng' },
            options: [
                { shape: 'star', color: '#ec4899', border: '#be185d', name: 'Ngôi Sao Hồng', isCorrect: true },
                { shape: 'star', color: '#facc15', border: '#d97706', name: 'Ngôi Sao Vàng', isCorrect: false },
                { shape: 'circle', color: '#ec4899', border: '#be185d', name: 'Hình Tròn Hồng', isCorrect: false },
                { shape: 'triangle', color: '#ec4899', border: '#be185d', name: 'Tam Giác Hồng', isCorrect: false }
            ]
        }
    ],

    init() {
        this.initHabitatPools();
        this.renderSubMenu();
        this.switchMode(this.activeMode || 'compare');
    },

    initHabitatPools() {
        if (typeof KED_IMAGES_DATA !== 'undefined' && KED_IMAGES_DATA.ITEMS) {
            this.habitatPools.air = KED_IMAGES_DATA.ITEMS.filter(it => it.habitat === 'air');
            this.habitatPools.land = KED_IMAGES_DATA.ITEMS.filter(it => it.habitat === 'land');
            this.habitatPools.water = KED_IMAGES_DATA.ITEMS.filter(it => it.habitat === 'water');
        }
    },

    renderSubMenu() {
        const subNav = document.getElementById('visual-subnav');
        if (!subNav) return;
        subNav.innerHTML = `
            <button class="kid-pill ${this.activeMode === 'compare' ? 'active' : ''}" onclick="VisualZone.switchMode('compare')">
                ⚖️ So Sánh Trực Quan (110 Câu)
            </button>
            <button class="kid-pill ${this.activeMode === 'odd' ? 'active' : ''}" onclick="VisualZone.switchMode('odd')">
                🧩 Tìm Điểm Khác Biệt
            </button>
            <button class="kid-pill ${this.activeMode === 'habitat' ? 'active' : ''}" onclick="VisualZone.switchMode('habitat')">
                🌍 Sa Bàn 3 Môi Trường
            </button>
            <button class="kid-pill ${this.activeMode === 'color_shapes' ? 'active' : ''}" onclick="VisualZone.switchMode('color_shapes')">
                🎨 Hình Khối & Pha Màu
            </button>
        `;
        this.updateSessionCounterUI();
    },

    switchMode(mode) {
        if (this.isLocked) return;
        this.activeMode = mode;
        SoundEngine.playPop();

        const pills = document.querySelectorAll('#visual-subnav .kid-pill');
        if (pills.length >= 4) {
            pills[0].classList.toggle('active', mode === 'compare');
            pills[1].classList.toggle('active', mode === 'odd');
            pills[2].classList.toggle('active', mode === 'habitat');
            pills[3].classList.toggle('active', mode === 'color_shapes');
        }

        const container = document.getElementById('visual-content');
        if (!container) return;

        if (mode === 'compare') {
            this.renderLevel2(container);
        } else if (mode === 'odd') {
            this.activeClassMode = 'odd';
            this.renderLevel3(container);
        } else if (mode === 'habitat') {
            this.activeClassMode = 'habitat';
            this.renderLevel3(container);
        } else if (mode === 'color_shapes') {
            this.activeClassMode = 'color_shapes';
            this.renderLevel3(container);
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
                        <input type="number" id="pg-visual-input" class="parent-input" placeholder="Nhập đáp án...">
                        <button class="parent-unlock-btn" onclick="VisualZone.verifyParentGate()">Mở Khóa</button>
                    </div>
                    <div id="pg-visual-err" class="parent-error-msg"></div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    verifyParentGate() {
        const inp = document.getElementById('pg-visual-input');
        const err = document.getElementById('pg-visual-err');
        if (!inp) return;
        const val = parseInt(inp.value, 10);
        if (val === this.parentGateAnswer) {
            this.isLocked = false;
            this.sessionAnsweredCount = 0;
            this.updateSessionCounterUI();
            const modal = document.getElementById('screentime-lock-modal');
            if (modal) modal.style.display = 'none';
            SoundEngine.playCheer();
            this.switchMode(this.activeMode || 'compare');
        } else {
            if (err) err.textContent = 'Đáp án chưa chính xác, bố mẹ hãy thử lại nhé!';
        }
    },

    /* ========================================================
       CẤP 2: SO SÁNH 4 VẬT & 2 VẬT (110 CÂU HỎI - CLICK ONLY)
       ======================================================== */
    renderLevel2(container) {
        if (this.isLocked) return;
        const questions = KED_IMAGES_DATA.COMPARISON_QUESTIONS;
        if (this.compareRound >= questions.length) this.compareRound = 0;
        const cur = questions[this.compareRound];

        this.currentCompareOptions = [...cur.options].sort(() => 0.5 - Math.random());

        container.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="VisualZone.playCompareQuestionAudio()" title="Bé bấm để nghe lại câu hỏi">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>

                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">
                            ⚖️ Thử Thách So Sánh • Câu ${this.compareRound + 1} / ${questions.length} ${this.extraPenaltyQuestions > 0 ? `• <span class="challenge-pill">⚡ +${this.extraPenaltyQuestions} Câu thử thách</span>` : ''}
                        </div>
                        <h2 class="question-title-giant">${cur.question}</h2>
                    </div>
                </div>

                ${cur.type === 'pairwise' ? `
                    <div class="giant-pairwise-grid">
                        ${this.currentCompareOptions.map((opt, idx) => `
                            <button class="giant-pairwise-card bounce-hover" 
                                    onclick="VisualZone.selectCompareOption(${idx}, this)"
                                    title="${opt.name}">
                                <span class="pairwise-badge">Lựa Chọn ${idx === 0 ? 'A' : 'B'}</span>
                                <span class="giant-pairwise-emoji">${opt.icon}</span>
                                <span class="giant-pairwise-name">${opt.name}</span>
                            </button>
                        `).join('')}
                    </div>
                ` : `
                    <div class="giant-four-grid">
                        ${this.currentCompareOptions.map((opt, idx) => `
                            <button class="giant-four-card bounce-hover" 
                                    onclick="VisualZone.selectCompareOption(${idx}, this)"
                                    title="${opt.name}">
                                <span class="giant-card-emoji">${opt.icon}</span>
                                <span class="giant-card-name">${opt.name}</span>
                                <span class="card-pick-tag">Đáp Án ${idx + 1}</span>
                            </button>
                        `).join('')}
                    </div>
                `}

                <div class="giant-footer-row">
                    <div id="compare-feedback-box" class="giant-feedback-bar">
                        <span class="fb-hint-text">👆 Bé hãy quan sát thật kỹ và bấm vào hình trả lời đúng nhé!</span>
                    </div>
                    <button class="pill-next-giant" onclick="VisualZone.nextCompareQuestion()">
                        Câu Tiếp Theo ➔
                    </button>
                </div>
            </div>
        `;

        this.playCompareQuestionAudio();
    },

    playCompareQuestionAudio() {
        const questions = KED_IMAGES_DATA.COMPARISON_QUESTIONS;
        const cur = questions[this.compareRound];
        if (cur) {
            SoundEngine.playQuestion(cur.audioKey, cur.speech || cur.question);
        }
    },

    selectCompareOption(optIdx, cardEl) {
        if (this.recordAnswerAttempt()) return;
        const cur = KED_IMAGES_DATA.COMPARISON_QUESTIONS[this.compareRound];
        const selected = this.currentCompareOptions[optIdx];
        const fb = document.getElementById('compare-feedback-box');

        if (selected.isCorrect) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_2', null, 'Hoan hô bé, chính xác!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            cardEl.classList.add('correct-glow');
            if (fb) {
                fb.innerHTML = `🎉 <strong class="fb-success">Chính xác!</strong> ${cur.reason} ⭐ +1 Ngôi Sao`;
            }

            setTimeout(() => {
                this.nextCompareQuestion();
            }, 2300);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            
            cardEl.classList.add('shake-card');
            setTimeout(() => cardEl.classList.remove('shake-card'), 600);
            if (fb) {
                fb.innerHTML = `❌ Chưa đúng rồi! Bé vừa chọn <strong>${selected.name}</strong>. ⚡ <strong>+1 Câu Thử Thách Mới!</strong>`;
            }
        }
    },

    nextCompareQuestion() {
        this.compareRound = (this.compareRound + 1) % KED_IMAGES_DATA.COMPARISON_QUESTIONS.length;
        this.renderLevel2(document.getElementById('visual-content'));
    },

    /* ========================================================
       CẤP 3: PHÂN NHÓM & TƯ DUY LOGIC (5 CHẾ ĐỘ NÂNG CAO)
       ======================================================== */
    renderLevel3(container) {
        if (this.isLocked) return;
        container.innerHTML = `
            <div class="class-modes-bar-compact">
                <button class="mode-tab-pill ${this.activeClassMode === 'odd' ? 'active' : ''}" onclick="VisualZone.switchClassMode('odd', this)">
                    🎯 1 Hình Khác Biệt
                </button>
                <button class="mode-tab-pill ${this.activeClassMode === 'match_ref' ? 'active' : ''}" onclick="VisualZone.switchClassMode('match_ref', this)">
                    🔍 Bạn Cùng Nhóm
                </button>
                <button class="mode-tab-pill ${this.activeClassMode === 'color' ? 'active' : ''}" onclick="VisualZone.switchClassMode('color', this)">
                    🎨 Màu Sắc & Hình Khối
                </button>
                <button class="mode-tab-pill ${this.activeClassMode === 'edible' ? 'active' : ''}" onclick="VisualZone.switchClassMode('edible', this)">
                    🍽️ Món Ăn Được/Không
                </button>
                <button class="mode-tab-pill ${this.activeClassMode === 'habitat' ? 'active' : ''}" onclick="VisualZone.switchClassMode('habitat', this)">
                    🏞️ Môi Trường Sống
                </button>
            </div>

            <div id="class-stage-container" class="one-screen-stage"></div>
        `;

        this.renderActiveClassificationMode();
    },

    switchClassMode(mode, btnEl) {
        this.activeClassMode = mode;
        SoundEngine.playPop();

        const btns = document.querySelectorAll('.class-modes-bar-compact .mode-tab-pill');
        btns.forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        this.renderActiveClassificationMode();
    },

    renderActiveClassificationMode() {
        const stage = document.getElementById('class-stage-container');
        if (!stage) return;

        if (this.activeClassMode === 'odd') {
            this.renderOddOneOut(stage);
        } else if (this.activeClassMode === 'match_ref') {
            this.renderMatchReference(stage);
        } else if (this.activeClassMode === 'color') {
            this.renderColorShapesMaster(stage);
        } else if (this.activeClassMode === 'edible') {
            this.renderEdibleSorting(stage);
        } else if (this.activeClassMode === 'habitat') {
            this.renderHabitatSorting(stage);
        }
    },

    /* 3.1 Chế độ Tìm 1 hình khác biệt */
    renderOddOneOut(stage) {
        const puzzles = KED_IMAGES_DATA.ODD_ONE_OUT_PUZZLES;
        if (this.oddRound >= puzzles.length) this.oddRound = 0;
        const cur = puzzles[this.oddRound];

        this.currentOddItems = [...cur.items].sort(() => 0.5 - Math.random());

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="VisualZone.playOddQuestionAudio()">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">
                            🎯 Tìm 1 Hình Khác Biệt • Câu ${this.oddRound + 1} / ${puzzles.length} ${this.extraPenaltyQuestions > 0 ? `• <span class="challenge-pill">⚡ +${this.extraPenaltyQuestions} Thử thách</span>` : ''}
                        </div>
                        <h2 class="question-title-giant">${cur.title}</h2>
                    </div>
                </div>

                <div class="giant-four-grid">
                    ${this.currentOddItems.map((item, idx) => `
                        <button class="giant-four-card bounce-hover" 
                                onclick="VisualZone.selectOddItem(${idx}, this)"
                                title="${item.name}">
                            <span class="giant-card-emoji">${item.icon}</span>
                            <span class="giant-card-name">${item.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="giant-footer-row">
                    <div id="odd-feedback-text" class="giant-feedback-bar">
                        <span class="fb-hint-text">👆 Trong 4 bạn trên, có 1 bạn không cùng đặc điểm, bé hãy tìm ra nhé!</span>
                    </div>
                    <button class="pill-next-giant" onclick="VisualZone.nextOddRound()">
                        Câu Tiếp Theo ➔
                    </button>
                </div>
            </div>
        `;
        this.playOddQuestionAudio();
    },

    playOddQuestionAudio() {
        const cur = KED_IMAGES_DATA.ODD_ONE_OUT_PUZZLES[this.oddRound];
        if (cur) {
            SoundEngine.playQuestion('cls_odd_prompt', cur.title);
        }
    },

    selectOddItem(itemIdx, cardEl) {
        if (this.recordAnswerAttempt()) return;
        const cur = KED_IMAGES_DATA.ODD_ONE_OUT_PUZZLES[this.oddRound];
        const selected = this.currentOddItems[itemIdx];
        const fb = document.getElementById('odd-feedback-text');

        if (selected.isOdd) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_3', null, 'Bé thông minh quá, tuyệt vời!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            cardEl.classList.add('correct-glow');
            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Chính xác!</strong> ${selected.reason} ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.nextOddRound();
            }, 2500);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            cardEl.classList.add('shake-card');
            setTimeout(() => cardEl.classList.remove('shake-card'), 600);
            if (fb) fb.innerHTML = `❌ ${selected.name} ${selected.reason}. ⚡ <strong>+1 Câu Thử Thách!</strong>`;
        }
    },

    nextOddRound() {
        this.oddRound = (this.oddRound + 1) % KED_IMAGES_DATA.ODD_ONE_OUT_PUZZLES.length;
        this.renderOddOneOut(document.getElementById('class-stage-container'));
    },

    /* 3.2 Tìm sự giống nhau: 1 Mẫu tham chiếu + 4 Lựa chọn */
    renderMatchReference(stage) {
        const puzzles = KED_IMAGES_DATA.MATCH_REFERENCE_PUZZLES;
        if (this.matchRefRound >= puzzles.length) this.matchRefRound = 0;
        const cur = puzzles[this.matchRefRound];

        this.currentMatchRefOptions = [...cur.options].sort(() => 0.5 - Math.random());

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="VisualZone.playMatchRefAudio()">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">
                            🔍 Tìm Bạn Cùng Nhóm • Câu ${this.matchRefRound + 1} / ${puzzles.length} ${this.extraPenaltyQuestions > 0 ? `• <span class="challenge-pill">⚡ +${this.extraPenaltyQuestions} Thử thách</span>` : ''}
                        </div>
                        <h2 class="question-title-giant">${cur.title}</h2>
                    </div>
                </div>

                <div class="giant-reference-stage">
                    <div class="giant-ref-card pulse-giant-card">
                        <span class="ref-badge-tag">🌟 HÌNH MẪU THAM CHIẾU 🌟</span>
                        <span class="giant-ref-emoji">${cur.ref.icon}</span>
                        <span class="giant-ref-name">${cur.ref.name}</span>
                    </div>
                </div>

                <div class="giant-four-grid ref-choices-grid">
                    ${this.currentMatchRefOptions.map((opt, idx) => `
                        <button class="giant-four-card bounce-hover" 
                                onclick="VisualZone.selectMatchRefOption(${idx}, this)"
                                title="${opt.name}">
                            <span class="giant-card-emoji">${opt.icon}</span>
                            <span class="giant-card-name">${opt.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="giant-footer-row">
                    <div id="match-ref-feedback" class="giant-feedback-bar">
                        <span class="fb-hint-text">👆 Bé hãy chọn bạn nào cùng loài hoặc cùng nhóm với hình mẫu ở trên nhé!</span>
                    </div>
                    <button class="pill-next-giant" onclick="VisualZone.nextMatchRefRound()">
                        Câu Tiếp Theo ➔
                    </button>
                </div>
            </div>
        `;
        this.playMatchRefAudio();
    },

    playMatchRefAudio() {
        const cur = KED_IMAGES_DATA.MATCH_REFERENCE_PUZZLES[this.matchRefRound];
        if (cur) {
            SoundEngine.playQuestion('cls_ref_prompt', cur.title);
        }
    },

    selectMatchRefOption(idx, cardEl) {
        if (this.recordAnswerAttempt()) return;
        const cur = KED_IMAGES_DATA.MATCH_REFERENCE_PUZZLES[this.matchRefRound];
        const selected = this.currentMatchRefOptions[idx];
        const fb = document.getElementById('match-ref-feedback');

        if (selected.isMatch) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_1', null, 'Bé giỏi quá, đúng rồi!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            cardEl.classList.add('correct-glow');
            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Chính xác!</strong> ${selected.reason} ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.nextMatchRefRound();
            }, 2400);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            cardEl.classList.add('shake-card');
            setTimeout(() => cardEl.classList.remove('shake-card'), 600);
            if (fb) fb.innerHTML = `❌ Bạn ${selected.name} không cùng nhóm với ${cur.ref.name}. ⚡ <strong>+1 Câu Thử Thách!</strong>`;
        }
    },

    nextMatchRefRound() {
        this.matchRefRound = (this.matchRefRound + 1) % KED_IMAGES_DATA.MATCH_REFERENCE_PUZZLES.length;
        this.renderMatchReference(document.getElementById('class-stage-container'));
    },

    /* ========================================================
       3.3 NÂNG CẤP: PHÂN HỆ MÀU SẮC & HÌNH KHỐI KỲ THÚ (3 CHẾ ĐỘ)
       ======================================================== */
    renderColorShapesMaster(stage) {
        stage.innerHTML = `
            <div class="color-shapes-subnav" style="display:flex; justify-content:center; gap:12px; margin-bottom:12px;">
                <button class="kid-pill ${this.colorShapesSubMode === 'real_shapes' ? 'active' : ''}" onclick="VisualZone.switchColorShapesSubMode('real_shapes')">
                    🔺 1. Hình Khối Đời Thực
                </button>
                <button class="kid-pill ${this.colorShapesSubMode === 'multi_attr' ? 'active' : ''}" onclick="VisualZone.switchColorShapesSubMode('multi_attr')">
                    🎨 2. Đố Vui Hình & Màu
                </button>
                <button class="kid-pill ${this.colorShapesSubMode === 'color_mix' ? 'active' : ''}" onclick="VisualZone.switchColorShapesSubMode('color_mix')">
                    🧪 3. Pha Màu Ma Thuật
                </button>
            </div>
            <div id="color-shapes-sub-stage"></div>
        `;

        const subStage = document.getElementById('color-shapes-sub-stage');
        if (this.colorShapesSubMode === 'real_shapes') {
            this.renderRealShapesGame(subStage);
        } else if (this.colorShapesSubMode === 'multi_attr') {
            this.renderMultiAttrGame(subStage);
        } else if (this.colorShapesSubMode === 'color_mix') {
            this.renderColorMixLab(subStage);
        }
    },

    switchColorShapesSubMode(mode) {
        this.colorShapesSubMode = mode;
        SoundEngine.playPop();
        const stage = document.getElementById('class-stage-container');
        if (stage) this.renderColorShapesMaster(stage);
    },

    // 3.3.A: HÌNH KHỐI ĐỜI THỰC
    renderRealShapesGame(stage) {
        if (!stage) stage = document.getElementById('color-shapes-sub-stage');
        if (!stage) return;

        if (this.realShapesRound >= this.realShapesData.length) this.realShapesRound = 0;
        const cur = this.realShapesData[this.realShapesRound];
        this.currentRealShapeTarget = cur;

        const options = [
            { ...cur.correctItem, isCorrect: true },
            { ...cur.wrongItems[0], isCorrect: false },
            { ...cur.wrongItems[1], isCorrect: false }
        ].sort(() => 0.5 - Math.random());
        this.currentRealShapeOptions = options;

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="SoundEngine.playQuestion('${cur.audioKey}', '${cur.speech}')">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">🔺 Nhận Diện Hình Khối Đời Thực</div>
                        <h2 class="question-title-giant">${cur.question}</h2>
                    </div>
                </div>

                <div class="giant-reference-stage" style="margin: 10px 0;">
                    <div class="giant-ref-card pulse-giant-card" style="padding: 12px 30px;">
                        <span class="ref-badge-tag">🌟 HÌNH KHỐI MẪU 🌟</span>
                        <div style="margin: 6px 0;">${cur.shapeSvg}</div>
                        <span class="giant-ref-name" style="font-size:24px; color:#be123c;">${cur.shapeName}</span>
                    </div>
                </div>

                <div class="giant-bins-row" style="grid-template-columns: repeat(3, 1fr);">
                    ${options.map((opt, idx) => `
                        <button class="giant-bin bounce-hover" style="border: 4px solid #cbd5e1; background: #ffffff;" onclick="VisualZone.selectRealShapeOption(${idx}, this)">
                            <span class="bin-emoji" style="font-size: 52px;">${opt.icon}</span>
                            <span class="bin-label" style="font-size: 18px; color: #1e293b; font-weight: 900;">${opt.name}</span>
                        </button>
                    `).join('')}
                </div>

                <div id="real-shape-feedback" class="giant-feedback-bar">
                    <span class="fb-hint-text">👆 Bé hãy chạm vào đồ vật có hình khối giống ở trên nhé!</span>
                </div>
            </div>
        `;

        SoundEngine.playQuestion(cur.audioKey, cur.speech);
    },

    selectRealShapeOption(idx, btnEl) {
        if (this.recordAnswerAttempt()) return;
        const cur = this.currentRealShapeTarget;
        const selected = this.currentRealShapeOptions[idx];
        const fb = document.getElementById('real-shape-feedback');

        if (selected.isCorrect) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_1', null, 'Bé giỏi quá, đúng rồi!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            btnEl.classList.add('correct-glow');
            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Đúng rồi!</strong> ${selected.reason} ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.realShapesRound = (this.realShapesRound + 1) % this.realShapesData.length;
                this.renderRealShapesGame();
            }, 2300);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            btnEl.classList.add('shake-card');
            setTimeout(() => btnEl.classList.remove('shake-card'), 600);
            if (fb) fb.innerHTML = `❌ ${selected.name} ${selected.reason}. ⚡ <strong>+1 Câu Thử Thách Mới!</strong>`;
        }
    },

    // 3.3.B: ĐỐ VUI ĐA THUỘC TÍNH (HÌNH + MÀU)
    renderMultiAttrGame(stage) {
        if (!stage) stage = document.getElementById('color-shapes-sub-stage');
        if (!stage) return;

        if (this.multiAttrRound >= this.multiAttrData.length) this.multiAttrRound = 0;
        const cur = this.multiAttrData[this.multiAttrRound];
        this.currentMultiAttrTarget = cur;

        const shuffledOpts = [...cur.options].sort(() => 0.5 - Math.random());
        this.currentMultiAttrOptions = shuffledOpts;

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="SoundEngine.playQuestion(null, '${cur.speech}')">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">🎨 Đố Vui Đa Thuộc Tính (Hình & Màu)</div>
                        <h2 class="question-title-giant">${cur.title}</h2>
                    </div>
                </div>

                <div class="giant-four-grid" style="margin-top: 20px;">
                    ${shuffledOpts.map((opt, idx) => {
                        let shapeSvg = '';
                        if (opt.shape === 'triangle') {
                            shapeSvg = `<svg viewBox="0 0 64 64" width="70" height="70"><path d="M 32 6 L 58 54 L 6 54 Z" fill="${opt.color}" stroke="${opt.border}" stroke-width="3"/></svg>`;
                        } else if (opt.shape === 'circle') {
                            shapeSvg = `<svg viewBox="0 0 64 64" width="70" height="70"><circle cx="32" cy="32" r="28" fill="${opt.color}" stroke="${opt.border}" stroke-width="3"/></svg>`;
                        } else if (opt.shape === 'square') {
                            shapeSvg = `<svg viewBox="0 0 64 64" width="70" height="70"><rect x="6" y="6" width="52" height="52" rx="4" fill="${opt.color}" stroke="${opt.border}" stroke-width="3"/></svg>`;
                        } else if (opt.shape === 'star') {
                            shapeSvg = `<svg viewBox="0 0 64 64" width="70" height="70"><polygon points="32,4 40,22 60,24 45,38 49,58 32,48 15,58 19,38 4,24 24,22" fill="${opt.color}" stroke="${opt.border}" stroke-width="2.5"/></svg>`;
                        }

                        return `
                            <button class="giant-four-card bounce-hover" onclick="VisualZone.selectMultiAttrOption(${idx}, this)">
                                <div>${shapeSvg}</div>
                                <span class="giant-card-name" style="margin-top:8px;">${opt.name}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                <div id="multi-attr-feedback" class="giant-feedback-bar">
                    <span class="fb-hint-text">👆 Bé hãy nhìn kỹ cả hình dạng và màu sắc để chọn đúng nhé!</span>
                </div>
            </div>
        `;

        SoundEngine.playQuestion(null, cur.speech);
    },

    selectMultiAttrOption(idx, btnEl) {
        if (this.recordAnswerAttempt()) return;
        const cur = this.currentMultiAttrTarget;
        const selected = this.currentMultiAttrOptions[idx];
        const fb = document.getElementById('multi-attr-feedback');

        if (selected.isCorrect) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_2', null, 'Hoan hô bé, chính xác!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            btnEl.classList.add('correct-glow');
            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Bé thông minh tuyệt vời!</strong> Đúng là ${selected.name} rồi! ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.multiAttrRound = (this.multiAttrRound + 1) % this.multiAttrData.length;
                this.renderMultiAttrGame();
            }, 2300);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            btnEl.classList.add('shake-card');
            setTimeout(() => btnEl.classList.remove('shake-card'), 600);
            if (fb) fb.innerHTML = `❌ Đây là <strong>${selected.name}</strong>. Bé hãy quan sát kỹ lại nhé!`;
        }
    },

    // 3.3.C: PHÒNG THÍ NGHIỆM PHA MÀU MA THUẬT
    renderColorMixLab(stage) {
        if (!stage) stage = document.getElementById('color-shapes-sub-stage');
        if (!stage) return;

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="SoundEngine.playVoice('color_mix_prompt', null, 'Bé hãy chọn hai màu để pha màu ma thuật nhé!')">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">🧪 Phòng Thí Nghiệm Pha Màu Ma Thuật</div>
                        <h2 class="question-title-giant">Bé hãy chọn 2 màu để rót vào bình pha màu nhé!</h2>
                    </div>
                </div>

                <div class="giant-sorting-center" style="margin: 14px 0;">
                    <div id="mix-cauldron" style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); border: 4px solid #94a3b8; border-radius: 28px; padding: 20px 40px; display: inline-flex; align-items: center; gap: 24px; box-shadow: 0 10px 24px rgba(0,0,0,0.1);">
                        <div id="mix-slot-1" style="width:70px; height:70px; border-radius:50%; border:3px dashed #94a3b8; display:flex; align-items:center; justify-content:center; font-size:32px;">?</div>
                        <span style="font-size:36px; font-weight:900; color:#64748b;">+</span>
                        <div id="mix-slot-2" style="width:70px; height:70px; border-radius:50%; border:3px dashed #94a3b8; display:flex; align-items:center; justify-content:center; font-size:32px;">?</div>
                        <span style="font-size:36px; font-weight:900; color:#64748b;">=</span>
                        <div id="mix-result-flask" style="width:85px; height:85px; border-radius:50%; border:4px solid #cbd5e1; background:#ffffff; display:flex; align-items:center; justify-content:center; font-size:40px; box-shadow: inset 0 4px 10px rgba(0,0,0,0.1);">
                            🧪
                        </div>
                    </div>
                </div>

                <!-- 3 MÀU GỐC ĐỂ BÉ RÓT PHA -->
                <div class="giant-bins-row" style="grid-template-columns: repeat(3, 1fr); gap:16px;">
                    <button class="giant-bin bounce-hover" style="border: 4px solid #ef4444; background: #fef2f2;" onclick="VisualZone.pickMixColor('red')">
                        <span class="bin-emoji" style="font-size: 50px;">🔴</span>
                        <span class="bin-label" style="color: #b91c1c;">Màu Đỏ</span>
                    </button>
                    <button class="giant-bin bounce-hover" style="border: 4px solid #eab308; background: #fefce8;" onclick="VisualZone.pickMixColor('yellow')">
                        <span class="bin-emoji" style="font-size: 50px;">🟡</span>
                        <span class="bin-label" style="color: #a16207;">Màu Vàng</span>
                    </button>
                    <button class="giant-bin bounce-hover" style="border: 4px solid #3b82f6; background: #eff6ff;" onclick="VisualZone.pickMixColor('blue')">
                        <span class="bin-emoji" style="font-size: 50px;">🔵</span>
                        <span class="bin-label" style="color: #1d4ed8;">Màu Lam</span>
                    </button>
                </div>

                <div id="color-mix-feedback" class="giant-feedback-bar">
                    <span class="fb-hint-text">👆 Bé hãy bấm chọn 2 màu để rót vào ống nghiệm xem biến đổi thành màu gì nhé!</span>
                </div>
            </div>
        `;

        SoundEngine.playVoice('color_mix_prompt', null, 'Bé hãy chọn hai màu để pha màu ma thuật nhé!');
        this.mixSelectedColors = [];
    },

    pickMixColor(colorKey) {
        SoundEngine.playPop();
        if (this.mixSelectedColors.length >= 2) {
            this.mixSelectedColors = [];
        }
        this.mixSelectedColors.push(colorKey);

        const slot1 = document.getElementById('mix-slot-1');
        const slot2 = document.getElementById('mix-slot-2');
        const flask = document.getElementById('mix-result-flask');
        const fb = document.getElementById('color-mix-feedback');

        const colorMap = {
            red: { emoji: '🔴', bg: '#ef4444', name: 'Đỏ' },
            yellow: { emoji: '🟡', bg: '#fbbf24', name: 'Vàng' },
            blue: { emoji: '🔵', bg: '#3b82f6', name: 'Lam' }
        };

        if (slot1 && this.mixSelectedColors[0]) {
            const c1 = colorMap[this.mixSelectedColors[0]];
            slot1.innerHTML = c1.emoji;
            slot1.style.background = c1.bg;
            slot1.style.borderStyle = 'solid';
        }
        if (slot2) {
            if (this.mixSelectedColors[1]) {
                const c2 = colorMap[this.mixSelectedColors[1]];
                slot2.innerHTML = c2.emoji;
                slot2.style.background = c2.bg;
                slot2.style.borderStyle = 'solid';
            } else {
                slot2.innerHTML = '?';
                slot2.style.background = 'transparent';
                slot2.style.borderStyle = 'dashed';
            }
        }

        if (this.mixSelectedColors.length === 2) {
            const pair = [...this.mixSelectedColors].sort().join('+');
            if (pair === 'red+yellow') {
                flask.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
                flask.innerHTML = '🟠';
                SoundEngine.playFanfare();
                SoundEngine.playVoice('mix_orange', null, 'Màu đỏ pha màu vàng tạo ra màu cam rực rỡ!');
                if (fb) fb.innerHTML = '🎉 <strong>Màu Đỏ + Màu Vàng = MÀU CAM</strong> rực rỡ như quả cam ngọt! ⭐ +1 Ngôi Sao';
                if (typeof App !== 'undefined' && App.addStar) App.addStar();
            } else if (pair === 'blue+yellow') {
                flask.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                flask.innerHTML = '🟢';
                SoundEngine.playFanfare();
                SoundEngine.playVoice('mix_green', null, 'Màu lam pha màu vàng tạo ra màu xanh lá cây!');
                if (fb) fb.innerHTML = '🎉 <strong>Màu Lam + Màu Vàng = MÀU XANH LÁ</strong> mát rượi như tán cây rừng! ⭐ +1 Ngôi Sao';
                if (typeof App !== 'undefined' && App.addStar) App.addStar();
            } else if (pair === 'blue+red') {
                flask.style.background = 'linear-gradient(135deg, #a855f7, #7e22ce)';
                flask.innerHTML = '🟣';
                SoundEngine.playFanfare();
                SoundEngine.playVoice('mix_purple', null, 'Màu đỏ pha màu lam tạo ra màu tím diệu kỳ!');
                if (fb) fb.innerHTML = '🎉 <strong>Màu Đỏ + Màu Lam = MÀU TÍM</strong> diệu kỳ như chùm nho chín! ⭐ +1 Ngôi Sao';
                if (typeof App !== 'undefined' && App.addStar) App.addStar();
            } else {
                flask.innerHTML = colorMap[this.mixSelectedColors[0]].emoji;
                if (fb) fb.innerHTML = 'Hai màu giống nhau thì màu vẫn không đổi bé nhé!';
            }
        }
    },

    /* 3.4 Phân loại: Ăn được vs Không ăn được */
    renderEdibleSorting(stage) {
        const candidates = KED_IMAGES_DATA.ITEMS.filter(it => it.edible !== undefined);
        if (this.threeBinRound >= candidates.length) this.threeBinRound = 0;
        const cur = candidates[this.threeBinRound];

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="SoundEngine.playQuestion('cls_edible_prompt', 'Món này ăn được hay không ăn được vậy bé?')">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">🍽️ Khám Phá Cuộc Sống</div>
                        <h2 class="question-title-giant"><span class="highlight-target-giant">${cur.name}</span> Ăn Được hay Không Ăn Được vậy bé?</h2>
                    </div>
                </div>

                <div class="giant-sorting-center">
                    <div class="giant-target-card pulse-giant-card">
                        <span class="giant-target-emoji">${cur.icon}</span>
                        <span class="giant-target-name">${cur.name}</span>
                    </div>
                </div>

                <div class="giant-bins-row two-bins">
                    <button class="giant-bin edible-bin bounce-hover" onclick="VisualZone.selectEdible(true)">
                        <span class="bin-emoji">😋</span>
                        <span class="bin-label">Món Ăn Được</span>
                    </button>
                    <button class="giant-bin non-edible-bin bounce-hover" onclick="VisualZone.selectEdible(false)">
                        <span class="bin-emoji">🚫</span>
                        <span class="bin-label">Không Ăn Được</span>
                    </button>
                </div>

                <div id="edible-feedback" class="giant-feedback-bar">
                    <span class="fb-hint-text">👆 Bé hãy chọn xem bạn này là món ăn ngon hay là đồ vật không được ăn nhé!</span>
                </div>
            </div>
        `;
        SoundEngine.playQuestion('cls_edible_prompt', `${cur.name} là món ăn được hay không ăn được vậy bé?`);
    },

    selectEdible(isEdibleChoice) {
        if (this.recordAnswerAttempt()) return;
        const candidates = KED_IMAGES_DATA.ITEMS.filter(it => it.edible !== undefined);
        const cur = candidates[this.threeBinRound];
        const fb = document.getElementById('edible-feedback');

        if (cur.edible === isEdibleChoice) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_1', null, 'Bé giỏi quá, đúng rồi!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Chính xác!</strong> ${cur.name} ${cur.edible ? 'là món ăn ngon lành' : 'là đồ vật, không được ăn'}! ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.threeBinRound = (this.threeBinRound + 1) % candidates.length;
                this.renderEdibleSorting(document.getElementById('class-stage-container'));
            }, 2000);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            if (fb) fb.innerHTML = `❌ Chưa đúng rồi! ⚡ <strong>+1 Câu Thử Thách!</strong>`;
        }
    },

    /* ========================================================
       3.5 SA BÀN 3 MÔI TRƯỜNG SVG SINH ĐỘNG & LUÂN PHIÊN CÂN BẰNG
       Bầu Trời - Mặt Đất - Lòng Đại Dương xoay vòng liên tục!
       ======================================================== */
    renderHabitatSorting(stage) {
        if (!stage) stage = document.getElementById('class-stage-container');
        if (!stage) return;

        if (!this.habitatPools.air.length) this.initHabitatPools();

        // LUÂN PHIÊN BUCKET: air -> land -> water -> air -> land -> water
        const targetHab = this.habitatCycle[this.habitatIndex % 3];
        this.habitatIndex++;

        const pool = this.habitatPools[targetHab];
        const cur = pool[Math.floor(Math.random() * pool.length)];
        this.currentHabitatTarget = { item: cur, habitat: targetHab };

        stage.innerHTML = `
            <div class="single-screen-question-box">
                <div class="giant-question-header">
                    <button class="voice-btn-giant pulse-giant" onclick="SoundEngine.playQuestion('cls_habitat_prompt', 'Bạn này sống ở đâu vậy bé? Trên trời, trên cạn hay dưới nước?')">
                        <span class="giant-speaker-icon">🔊</span>
                        <span class="giant-speaker-label">BÉ BẤM NGHE LẠI</span>
                    </button>
                    <div class="giant-question-text-box">
                        <div class="question-meta-tag">🏞️ Sa Bàn Môi Trường Sống Tự Nhiên</div>
                        <h2 class="question-title-giant">Bạn <span class="highlight-target-giant">${cur.name}</span> sống ở đâu vậy bé?</h2>
                    </div>
                </div>

                <div class="giant-sorting-center" style="margin: 10px 0;">
                    <div class="giant-target-card pulse-giant-card">
                        <span class="giant-target-emoji">${cur.icon}</span>
                        <span class="giant-target-name">${cur.name}</span>
                    </div>
                </div>

                <!-- 3 SA BÀN SVG SINH ĐỘNG: BẦU TRỜI, MẶT ĐẤT, ĐẠI DƯƠNG XANH THẮM -->
                <div class="habitat-diorama-grid">
                    <!-- SA BÀN 1: BẦU TRỜI -->
                    <button class="habitat-diorama-card bounce-hover" onclick="VisualZone.selectHabitat('air', this)">
                        <svg viewBox="0 0 200 120" class="habitat-svg-canvas" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#38bdf8"/>
                                    <stop offset="100%" stop-color="#bae6fd"/>
                                </linearGradient>
                            </defs>
                            <rect width="200" height="120" fill="url(#skyGrad)"/>
                            <circle cx="165" cy="30" r="16" fill="#facc15" opacity="0.9"/>
                            <circle cx="165" cy="30" r="22" fill="#fef08a" opacity="0.4"/>
                            <path d="M 30 55 Q 40 40 55 45 Q 70 35 85 45 Q 95 40 105 50 Q 115 55 105 65 L 30 65 Z" fill="#ffffff" opacity="0.95"/>
                            <path d="M 120 70 Q 130 60 145 65 Q 155 58 170 65 Q 180 70 170 80 L 120 80 Z" fill="#ffffff" opacity="0.85"/>
                            <path d="M 60 25 Q 65 20 70 25 Q 75 20 80 25" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M 100 20 Q 104 16 108 20 Q 112 16 116 20" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span class="habitat-diorama-label">🌤️ Trên Bầu Trời</span>
                    </button>

                    <!-- SA BÀN 2: MẶT ĐẤT -->
                    <button class="habitat-diorama-card bounce-hover" onclick="VisualZone.selectHabitat('land', this)">
                        <svg viewBox="0 0 200 120" class="habitat-svg-canvas" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#86efac"/>
                                    <stop offset="100%" stop-color="#22c55e"/>
                                </linearGradient>
                            </defs>
                            <rect width="200" height="70" fill="#e0f2fe"/>
                            <path d="M 0 65 Q 60 45 120 60 T 200 55 L 200 120 L 0 120 Z" fill="url(#landGrad)"/>
                            <rect x="42" y="55" width="8" height="25" fill="#78350f" rx="2"/>
                            <circle cx="46" cy="45" r="18" fill="#15803d"/>
                            <circle cx="36" cy="40" r="12" fill="#16a34a"/>
                            <circle cx="56" cy="40" r="12" fill="#16a34a"/>
                            <rect x="150" y="65" width="6" height="20" fill="#78350f" rx="1.5"/>
                            <circle cx="153" cy="55" r="14" fill="#16a34a"/>
                            <circle cx="90" cy="85" r="3" fill="#ef4444"/><circle cx="90" cy="85" r="1.5" fill="#facc15"/>
                            <circle cx="115" cy="95" r="3" fill="#fbbf24"/><circle cx="115" cy="95" r="1.5" fill="#ffffff"/>
                            <circle cx="135" cy="88" r="3" fill="#ec4899"/><circle cx="135" cy="88" r="1.5" fill="#ffffff"/>
                        </svg>
                        <span class="habitat-diorama-label">🌳 Trên Mặt Đất</span>
                    </button>

                    <!-- SA BÀN 3: ĐẠI DƯƠNG SÂU THẲM -->
                    <button class="habitat-diorama-card bounce-hover" onclick="VisualZone.selectHabitat('water', this)">
                        <svg viewBox="0 0 200 120" class="habitat-svg-canvas" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#0284c7"/>
                                    <stop offset="50%" stop-color="#0369a1"/>
                                    <stop offset="100%" stop-color="#0c4a6e"/>
                                </linearGradient>
                            </defs>
                            <rect width="200" height="120" fill="url(#oceanGrad)"/>
                            <path d="M 0 15 Q 25 5 50 15 T 100 15 T 150 15 T 200 15 L 200 0 L 0 0 Z" fill="#38bdf8" opacity="0.4"/>
                            <circle cx="35" cy="70" r="4" fill="#a5f3fc" opacity="0.8"/>
                            <circle cx="38" cy="45" r="2.5" fill="#a5f3fc" opacity="0.7"/>
                            <circle cx="33" cy="25" r="1.8" fill="#a5f3fc" opacity="0.6"/>
                            <circle cx="160" cy="65" r="4.5" fill="#a5f3fc" opacity="0.8"/>
                            <circle cx="163" cy="40" r="3" fill="#a5f3fc" opacity="0.7"/>
                            <path d="M 0 100 Q 50 95 100 102 T 200 98 L 200 120 L 0 120 Z" fill="#d97706" opacity="0.85"/>
                            <path d="M 15 110 C 15 90 25 85 20 75 C 15 85 5 90 15 110" fill="#22c55e" opacity="0.8"/>
                            <path d="M 75 115 C 75 100 85 95 80 85 C 75 95 65 100 75 115" fill="#10b981" opacity="0.85"/>
                            <path d="M 125 118 L 125 102 L 120 95 L 122 93 L 127 98 L 130 92 L 133 94 L 129 102 L 134 106 L 132 118 Z" fill="#f43f5e"/>
                            <polygon points="175,108 177,112 181,112 178,114 179,118 175,115 171,118 172,114 169,112 173,112" fill="#facc15"/>
                        </svg>
                        <span class="habitat-diorama-label">🌊 Dưới Làn Nước</span>
                    </button>
                </div>

                <div id="habitat-feedback" class="giant-feedback-bar">
                    <span class="fb-hint-text">👆 Bé hãy chọn nơi sống của bạn ấy nhé!</span>
                </div>
            </div>
        `;

        SoundEngine.playQuestion('cls_habitat_prompt', `Bạn ${cur.name} sống ở đâu vậy bé? Trên bầu trời, trên mặt đất hay dưới làn nước?`);
    },

    selectHabitat(habitatChoice, btnEl) {
        if (this.recordAnswerAttempt()) return;
        const curTarget = this.currentHabitatTarget;
        const fb = document.getElementById('habitat-feedback');

        if (curTarget.habitat === habitatChoice) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_3', null, 'Bé thông minh quá, tuyệt vời!');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            if (btnEl) btnEl.classList.add('active-choice');
            const habName = curTarget.habitat === 'air' ? 'trên bầu trời' : (curTarget.habitat === 'land' ? 'trên mặt đất' : 'dưới làn nước');
            if (fb) fb.innerHTML = `🎉 <strong class="fb-success">Đúng rồi!</strong> ${curTarget.item.name} sống ở ${habName}! ⭐ +1 Ngôi Sao`;

            setTimeout(() => {
                this.renderHabitatSorting(document.getElementById('class-stage-container'));
            }, 2000);
        } else {
            this.extraPenaltyQuestions += 1;
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
            if (btnEl) {
                btnEl.classList.add('shake-card');
                setTimeout(() => btnEl.classList.remove('shake-card'), 600);
            }
            if (fb) fb.innerHTML = `❌ Chưa đúng rồi! ⚡ <strong>+1 Câu Thử Thách Mới!</strong> Bé hãy quan sát bạn ấy có cánh, có chân hay có vây nhé!`;
        }
    }
};
