/**
 * KED - Numbers Zone v7.0 (PHÂN HỆ 3: CON SỐ & TOÁN HỌC TRỰC QUAN ZERO-SCROLL)
 * Chuẩn giáo dục mầm non 3-5 tuổi - Zero-Scroll Viewport Paradigm:
 *   - Cấp 1: Đếm số cơ bản 0 - 10 (Single Number Stage 1 số/trang kèm đếm chấm/quả)
 *   - Cấp 2: Bảng 100 Số Kì Diệu (Phân trang 20 số/chặng, lưới 4x5 vừa khít 100% màn hình)
 *   - Cấp 3: Phép trừ trực quan tương tác (Chạm bớt đi làm mờ, không tràn màn hình)
 *   - Cấp 4: Phép cộng trực quan (Thêm vào gộp chung)
 */

const NumbersZone = {
    currentLevel: 1,
    currentNumIdx: 1, // Default Số 1
    
    // Cấp 2: Phân trang 20 số/chặng
    page100: 0, // 0: 1-20, 1: 21-40, 2: 41-60, 3: 61-80, 4: 81-100
    selected100Num: 1,
    autoCountInterval: null,
    isAutoCounting: false,

    // Cấp 1: 0 - 10
    numbersList: [
        { num: 0, name: "Số Không", icon: "⭕", items: [], audioKey: "num_0", color: "#64748b" },
        { num: 1, name: "Số Một", icon: "☀️", items: ["☀️"], audioKey: "num_1", color: "#f59e0b" },
        { num: 2, name: "Số Hai", icon: "🐰", items: ["🐰", "🐰"], audioKey: "num_2", color: "#ec4899" },
        { num: 3, name: "Số Ba", icon: "🍓", items: ["🍓", "🍓", "🍓"], audioKey: "num_3", color: "#ef4444" },
        { num: 4, name: "Số Bốn", icon: "🚗", items: ["🚗", "🚗", "🚗", "🚗"], audioKey: "num_4", color: "#3b82f6" },
        { num: 5, name: "Số Năm", icon: "🖐️", items: ["🍎", "🍎", "🍎", "🍎", "🍎"], audioKey: "num_5", color: "#10b981" },
        { num: 6, name: "Số Sáu", icon: "🐥", items: ["🐥", "🐥", "🐥", "🐥", "🐥", "🐥"], audioKey: "num_6", color: "#8b5cf6" },
        { num: 7, name: "Số Bảy", icon: "🌈", items: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸"], audioKey: "num_7", color: "#06b6d4" },
        { num: 8, name: "Số Tám", icon: "🎈", items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], audioKey: "num_8", color: "#f97316" },
        { num: 9, name: "Số Chín", icon: "⭐", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], audioKey: "num_9", color: "#eab308" },
        { num: 10, name: "Số Mười", icon: "🌟", items: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], audioKey: "num_10", color: "#e11d48" }
    ],

    // Cấp 3: Phép trừ trực quan tương tác
    subIndex: 0,
    subFadedIndices: new Set(),
    subtractionProblems: [
        { total: 5, sub: 2, ans: 3, icon: "🍎", name: "Quả Táo", desc: "Có 5 quả táo. Chạm 2 quả bớt đi nhé!", choices: [2, 3, 4] },
        { total: 6, sub: 3, ans: 3, icon: "🎈", name: "Bóng Bay", desc: "Có 6 bóng bay. Chạm 3 quả thả bay nào!", choices: [2, 3, 4] },
        { total: 4, sub: 1, ans: 3, icon: "🥕", name: "Cà Rốt", desc: "Có 4 cà rốt. Chạm 1 củ cho thỏ ăn nhé!", choices: [2, 3, 4] },
        { total: 7, sub: 3, ans: 4, icon: "🦆", name: "Chú Vịt", desc: "Có 7 chú vịt. Chạm 3 chú bơi đi chơi nào!", choices: [3, 4, 5] },
        { total: 8, sub: 4, ans: 4, icon: "🚗", name: "Ô Tô", desc: "Có 8 ô tô. Chạm 4 xe chạy đi nhé!", choices: [3, 4, 5] },
        { total: 9, sub: 5, ans: 4, icon: "🍓", name: "Quả Dâu", desc: "Có 9 quả dâu. Chạm 5 quả hái ăn nào!", choices: [3, 4, 5] },
        { total: 10, sub: 4, ans: 6, icon: "⭐", name: "Ngôi Sao", desc: "Có 10 ngôi sao. Chạm 4 sao cất đi nhé!", choices: [5, 6, 7] }
    ],

    // Cấp 4: Phép cộng trực quan
    addIndex: 0,
    additionProblems: [
        { a: 2, b: 1, ans: 3, icon: "🍎", itemA: ["🍎", "🍎"], itemB: ["🍎"], desc: "2 quả táo thêm 1 quả táo bằng mấy quả?", choices: [2, 3, 4] },
        { a: 3, b: 2, ans: 5, icon: "🦆", itemA: ["🦆", "🦆", "🦆"], itemB: ["🦆", "🦆"], desc: "3 chú vịt thêm 2 chú vịt bằng mấy chú?", choices: [4, 5, 6] },
        { a: 4, b: 3, ans: 7, icon: "🍓", itemA: ["🍓", "🍓", "🍓", "🍓"], itemB: ["🍓", "🍓", "🍓"], desc: "4 quả dâu thêm 3 quả dâu bằng mấy quả?", choices: [6, 7, 8] },
        { a: 5, b: 4, ans: 9, icon: "🚗", itemA: ["🚗", "🚗", "🚗", "🚗", "🚗"], itemB: ["🚗", "🚗", "🚗", "🚗"], desc: "5 ô tô thêm 4 ô tô bằng mấy ô tô?", choices: [8, 9, 10] }
    ],

    init() {
        this.renderSubMenu();
        this.switchLevel(this.currentLevel || 1);
    },

    renderSubMenu() {
        const subNav = document.getElementById('numbers-subnav');
        if (!subNav) return;
        const curNum = this.numbersList[this.currentNumIdx];
        const start100 = this.page100 * 20 + 1;
        const end100 = (this.page100 + 1) * 20;

        subNav.innerHTML = `
            <div class="zero-scroll-subbar">
                <div class="mode-switch-group">
                    <button class="kid-pill-compact ${this.currentLevel === 1 ? 'active' : ''}" onclick="NumbersZone.switchLevel(1)">
                        🔢 0-10
                    </button>
                    <button class="kid-pill-compact ${this.currentLevel === 2 ? 'active' : ''}" onclick="NumbersZone.switchLevel(2)">
                        💯 1-100
                    </button>
                    <button class="kid-pill-compact ${this.currentLevel === 3 ? 'active' : ''}" onclick="NumbersZone.switchLevel(3)">
                        ➖ Trừ
                    </button>
                    <button class="kid-pill-compact ${this.currentLevel === 4 ? 'active' : ''}" onclick="NumbersZone.switchLevel(4)">
                        ➕ Cộng
                    </button>
                </div>

                ${this.currentLevel === 1 ? `
                    <button class="topic-picker-btn" onclick="NumbersZone.openNumberModal()">
                        <span>🔢 <strong>Số ${curNum.num}</strong></span> <span style="font-size:10px;">▾ Đổi</span>
                    </button>
                ` : ''}

                ${this.currentLevel === 2 ? `
                    <button class="topic-picker-btn" onclick="NumbersZone.openRangeModal()">
                        <span>💯 <strong>${start100}-${end100}</strong></span> <span style="font-size:10px;">▾ Chặng</span>
                    </button>
                ` : ''}
            </div>
        `;
    },

    switchLevel(level) {
        if (this.autoCountInterval) {
            clearInterval(this.autoCountInterval);
            this.autoCountInterval = null;
            this.isAutoCounting = false;
        }

        this.currentLevel = level;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();

        this.renderSubMenu();

        const container = document.getElementById('numbers-content');
        if (!container) return;

        if (level === 1) {
            this.renderLevel1(container);
        } else if (level === 2) {
            this.renderLevel2(container);
        } else if (level === 3) {
            this.renderLevel3(container);
        } else if (level === 4) {
            this.renderLevel4(container);
        }
    },

    /* ========================================================
       CẤP 1: ĐẾM SỐ 0 - 10 (SINGLE NUMBER STAGE ZERO-SCROLL)
       ======================================================== */
    renderLevel1(container) {
        if (!container) container = document.getElementById('numbers-content');
        if (!container) return;

        const item = this.numbersList[this.currentNumIdx];

        container.innerHTML = `
            <div style="flex:1 1 auto; min-height:0; height:100%; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
                <!-- SÂN CHƠI 1 SỐ CỰC ĐẠI -->
                <div class="single-number-stage" style="border-color:${item.color}40;">
                    <div class="single-num-giant" style="color:${item.color}; cursor:pointer;" onclick="NumbersZone.speakCurrentNumber()">
                        ${item.num}
                    </div>
                    <div class="single-num-name" style="cursor:pointer;" onclick="NumbersZone.speakCurrentNumber()">
                        ${item.name} 🔊
                    </div>

                    <div class="single-num-items-box">
                        ${item.items.length === 0 ? `
                            <div style="font-size:14px; font-weight:800; color:#64748b; padding:16px 8px;">
                                ⭕ Số Không là không có gì cả bé nhé!
                            </div>
                        ` : ''}
                        ${item.items.map((it, i) => `
                            <span class="single-num-dot pulse-hover" onclick="NumbersZone.tapCountItem(${i+1})">${it}</span>
                        `).join('')}
                    </div>

                    <div style="font-size:11px; font-weight:800; color:#0284c7; margin-top:8px;">
                        👉 Bé chạm vào số hoặc các hình để nghe cô giáo đếm nhé!
                    </div>
                </div>

                <!-- THANH LẬT SỐ DƯỚI ĐÁY -->
                <div class="zero-scroll-pager">
                    <button class="pager-btn btn-prev" onclick="NumbersZone.prevNumber()" ${this.currentNumIdx === 0 ? 'disabled' : ''}>
                        ◀ Số Trước
                    </button>
                    <span class="pager-status">Số ${item.num} / 10 (${item.name})</span>
                    <button class="pager-btn btn-next" onclick="NumbersZone.nextNumber()" ${this.currentNumIdx >= this.numbersList.length - 1 ? 'disabled' : ''}>
                        Số Sau ▶
                    </button>
                </div>
            </div>
        `;

        this.speakCurrentNumber();
    },

    prevNumber() {
        if (this.currentNumIdx > 0) {
            this.currentNumIdx--;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderSubMenu();
            this.renderLevel1();
        }
    },

    nextNumber() {
        if (this.currentNumIdx < this.numbersList.length - 1) {
            this.currentNumIdx++;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderSubMenu();
            this.renderLevel1();
        }
    },

    selectNumber(idx) {
        this.currentNumIdx = idx;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.closeNumberModal();
        this.renderSubMenu();
        this.renderLevel1();
    },

    speakCurrentNumber() {
        const item = this.numbersList[this.currentNumIdx];
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.playVoice(item.audioKey, null, item.name);
        }
    },

    tapCountItem(count) {
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.playVoice(`num_${count}`, null, `Số ${count}`);
        }
    },

    openNumberModal() {
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        let modal = document.getElementById('numbers-digit-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'numbers-digit-modal';
            modal.className = 'zero-scroll-modal-overlay';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="zero-scroll-modal-card">
                <div class="modal-header-row">
                    <span class="modal-header-title">🔢 CHỌN SỐ 0 ĐẾN 10</span>
                    <button class="modal-close-btn" onclick="NumbersZone.closeNumberModal()">✕</button>
                </div>
                <div class="modal-grid-palette" style="grid-template-columns:repeat(4, 1fr);">
                    ${this.numbersList.map((item, idx) => `
                        <button class="palette-item-btn ${this.currentNumIdx === idx ? 'active' : ''}" onclick="NumbersZone.selectNumber(${idx})">
                            <span style="font-size:26px; font-weight:900; color:${item.color};">${item.num}</span>
                            <span class="palette-label">${item.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    closeNumberModal() {
        const modal = document.getElementById('numbers-digit-modal');
        if (modal) modal.style.display = 'none';
    },

    /* ========================================================
       CẤP 2: BẢNG 100 SỐ KÌ DIỆU (PHÂN TRANG 20 SỐ / CHẶNG)
       ======================================================== */
    renderLevel2(container) {
        if (!container) container = document.getElementById('numbers-content');
        if (!container) return;

        const start = this.page100 * 20 + 1;
        const end = (this.page100 + 1) * 20;

        container.innerHTML = `
            <div style="flex:1 1 auto; min-height:0; height:100%; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
                <!-- HEADER CHỌN SỐ NỔI BẬT & TỰ ĐỘNG ĐẾM -->
                <div style="flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; padding:2px 4px; background:#f0f9ff; border-radius:14px; border:2px solid #bae6fd; margin-bottom:6px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:28px; font-weight:900; color:#0284c7;" id="display-100-num">${this.selected100Num}</span>
                        <button class="kid-pill-compact" style="background:#0284c7; color:#fff; border-color:#0284c7; padding:4px 10px;" onclick="NumbersZone.speak100Num(${this.selected100Num})">
                            🔊 Đọc Số
                        </button>
                    </div>
                    <button class="kid-pill-compact" style="background:${this.isAutoCounting ? '#fee2e2' : '#dcfce7'}; border-color:${this.isAutoCounting ? '#ef4444' : '#22c55e'}; color:${this.isAutoCounting ? '#b91c1c' : '#15803d'}; font-size:11px;" onclick="NumbersZone.toggleAutoCount()">
                        ${this.isAutoCounting ? '⏹️ Dừng' : '▶️ Tự Đếm'}
                    </button>
                </div>

                <!-- LƯỚI 20 Ô SỐ (5 HÀNG x 4 CỘT) VỪA KHÍT 100% KHUNG HÌNH -->
                <div style="flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows:repeat(5, 1fr); gap:6px; overflow:hidden;">
                    ${this.generate20GridHTML(start, end)}
                </div>

                <!-- THANH LẬT CHẶNG DƯỚI ĐÁY -->
                <div class="zero-scroll-pager">
                    <button class="pager-btn btn-prev" onclick="NumbersZone.prevPage100()" ${this.page100 === 0 ? 'disabled' : ''}>
                        ◀ Chặng Trước
                    </button>
                    <span class="pager-status">Chặng ${this.page100 + 1} / 5 (${start} - ${end})</span>
                    <button class="pager-btn btn-next" onclick="NumbersZone.nextPage100()" ${this.page100 >= 4 ? 'disabled' : ''}>
                        Chặng Sau ▶
                    </button>
                </div>
            </div>
        `;
    },

    generate20GridHTML(start, end) {
        let html = '';
        for (let i = start; i <= end; i++) {
            const isActive = (i === this.selected100Num) ? 'active' : '';
            html += `
                <div class="num-cell-100 ${isActive}" id="cell-num-${i}" style="display:flex; align-items:center; justify-content:center; font-size:clamp(16px, 3vh, 22px); font-weight:900; border-radius:12px; cursor:pointer;" onclick="NumbersZone.click100Num(${i})">
                    ${i}
                </div>
            `;
        }
        return html;
    },

    prevPage100() {
        if (this.page100 > 0) {
            this.page100--;
            this.selected100Num = this.page100 * 20 + 1;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderSubMenu();
            this.renderLevel2();
            this.speak100Num(this.selected100Num);
        }
    },

    nextPage100() {
        if (this.page100 < 4) {
            this.page100++;
            this.selected100Num = this.page100 * 20 + 1;
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            this.renderSubMenu();
            this.renderLevel2();
            this.speak100Num(this.selected100Num);
        }
    },

    setPage100(page) {
        this.page100 = page;
        this.selected100Num = page * 20 + 1;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.closeRangeModal();
        this.renderSubMenu();
        this.renderLevel2();
        this.speak100Num(this.selected100Num);
    },

    openRangeModal() {
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        let modal = document.getElementById('numbers-range-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'numbers-range-modal';
            modal.className = 'zero-scroll-modal-overlay';
            document.body.appendChild(modal);
        }

        const ranges = [
            { page: 0, label: "Số 1 - 20", icon: "🌱" },
            { page: 1, label: "Số 21 - 40", icon: "🌿" },
            { page: 2, label: "Số 41 - 60", icon: "🌳" },
            { page: 3, label: "Số 61 - 80", icon: "🌸" },
            { page: 4, label: "Số 81 - 100", icon: "⭐" }
        ];

        modal.innerHTML = `
            <div class="zero-scroll-modal-card">
                <div class="modal-header-row">
                    <span class="modal-header-title">💯 CHỌN CHẶNG ĐẾM 1 - 100</span>
                    <button class="modal-close-btn" onclick="NumbersZone.closeRangeModal()">✕</button>
                </div>
                <div class="modal-grid-palette" style="grid-template-columns:repeat(2, 1fr);">
                    ${ranges.map(r => `
                        <button class="palette-item-btn ${this.page100 === r.page ? 'active' : ''}" style="padding:14px 8px;" onclick="NumbersZone.setPage100(${r.page})">
                            <span style="font-size:28px;">${r.icon}</span>
                            <span class="palette-label" style="font-size:14px; font-weight:900; color:#0369a1; margin-top:4px;">${r.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    closeRangeModal() {
        const modal = document.getElementById('numbers-range-modal');
        if (modal) modal.style.display = 'none';
    },

    click100Num(n) {
        this.selected100Num = n;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.speak100Num(n);

        const disp = document.getElementById('display-100-num');
        if (disp) disp.textContent = n;

        document.querySelectorAll('.num-cell-100').forEach(c => c.classList.remove('active'));
        const cell = document.getElementById(`cell-num-${n}`);
        if (cell) cell.classList.add('active');
    },

    speak100Num(n) {
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playVoice(`num_${n}`, null, `Số ${n}`);
        }
    },

    toggleAutoCount() {
        if (this.isAutoCounting) {
            clearInterval(this.autoCountInterval);
            this.autoCountInterval = null;
            this.isAutoCounting = false;
            this.renderLevel2();
        } else {
            this.isAutoCounting = true;
            this.renderLevel2();
            this.autoCountInterval = setInterval(() => {
                const maxRange = (this.page100 + 1) * 20;
                const minRange = this.page100 * 20 + 1;
                let next = this.selected100Num + 1;
                if (next > maxRange) next = minRange;
                this.click100Num(next);
            }, 1200);
        }
    },

    /* ========================================================
       CẤP 3: PHÉP TRỪ TRỰC QUAN (CHẠM BỚT ĐI - ZERO-SCROLL)
       ======================================================== */
    renderLevel3(container) {
        if (!container) container = document.getElementById('numbers-content');
        if (!container) return;

        const cur = this.subtractionProblems[this.subIndex];

        container.innerHTML = `
            <div style="flex:1 1 auto; min-height:0; height:100%; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
                <!-- TRẠNG THÁI TIẾN TRÌNH GỌN GÀNG -->
                <div style="flex:0 0 auto; text-align:center; padding:4px 8px; background:#fff7ed; border-radius:12px; border:2px solid #fed7aa; font-size:12px; font-weight:800; color:#9a3412;" id="sub-status-text">
                    Ban đầu có <strong>${cur.total} ${cur.name}</strong> • Chạm <strong>${cur.sub}</strong> bạn để bớt đi!
                </div>

                <!-- BỂ CHỨA VẬT THỂ TƯƠNG TÁC (TỐI ĐA 10 VẬT THỂ VỪA KHÍT) -->
                <div style="flex:1 1 auto; min-height:0; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px; padding:6px; overflow:hidden;" id="sub-items-container">
                    ${this.generateSubItemsHTML(cur)}
                </div>

                <!-- KHUNG PHƯƠNG TRÌNH VÀ NÚT CHỌN ĐÁP ÁN -->
                <div style="flex:0 0 auto; background:#ffffff; border:3px solid #e2e8f0; border-radius:18px; padding:8px 12px; text-align:center;">
                    <div style="font-size:clamp(22px, 4vh, 32px); font-weight:900; color:#1e293b; margin-bottom:4px;">
                        ${cur.total} ➖ ${cur.sub} 🟰 <span style="color:#e11d48;" id="sub-question-mark">❓</span>
                    </div>

                    <div style="font-size:12px; font-weight:800; color:#64748b; margin-bottom:6px;" id="sub-instruction-text">
                        Bé hãy bấm vào các hình để bớt đi trước nhé!
                    </div>

                    <div style="display:flex; justify-content:center; gap:10px; opacity:0.4; pointer-events:none;" id="sub-answer-buttons">
                        ${cur.choices.map(choice => `
                            <button class="math-ans-btn" style="min-width:64px; height:46px; font-size:22px; font-weight:900; border-radius:14px;" onclick="NumbersZone.answerSubtraction(${choice})">${choice}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- ĐẶT LẠI HOẶC CHUYỂN CÂU -->
                <div style="flex:0 0 auto; display:flex; justify-content:center; gap:8px; margin-top:4px;">
                    <button class="kid-pill-compact" style="font-size:11px; background:#f1f5f9; color:#475569;" onclick="NumbersZone.resetCurrentSub()">
                        🔄 Đặt lại
                    </button>
                    <button class="kid-pill-compact" style="font-size:11px; background:#e0f2fe; color:#0369a1;" onclick="NumbersZone.nextSubProblem()">
                        Câu Tiếp ➔
                    </button>
                </div>
            </div>
        `;
    },

    generateSubItemsHTML(cur) {
        let html = '';
        for (let i = 0; i < cur.total; i++) {
            const isFaded = this.subFadedIndices.has(i);
            html += `
                <div class="sub-item-card ${isFaded ? 'faded-out' : ''}" style="width:clamp(46px, 9vw, 68px); height:clamp(46px, 9vw, 68px); font-size:clamp(28px, 6vw, 42px); display:flex; align-items:center; justify-content:center; border-radius:16px; cursor:pointer;" onclick="NumbersZone.toggleSubItem(${i})">
                    <span>${cur.icon}</span>
                </div>
            `;
        }
        return html;
    },

    toggleSubItem(idx) {
        const cur = this.subtractionProblems[this.subIndex];

        if (this.subFadedIndices.has(idx)) {
            this.subFadedIndices.delete(idx);
            if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        } else {
            if (this.subFadedIndices.size < cur.sub) {
                this.subFadedIndices.add(idx);
                if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
            } else {
                if (typeof SoundEngine !== 'undefined') SoundEngine.playTryAgain();
                return;
            }
        }

        const container = document.getElementById('sub-items-container');
        if (container) container.innerHTML = this.generateSubItemsHTML(cur);

        const statusText = document.getElementById('sub-status-text');
        const countFaded = this.subFadedIndices.size;

        if (countFaded < cur.sub) {
            if (statusText) {
                statusText.innerHTML = `Đã bớt: <strong>${countFaded}/${cur.sub}</strong> • Chạm thêm <strong>${cur.sub - countFaded}</strong> bạn nữa nhé!`;
            }
            const ansBtns = document.getElementById('sub-answer-buttons');
            if (ansBtns) {
                ansBtns.style.opacity = '0.4';
                ansBtns.style.pointerEvents = 'none';
            }
            const instr = document.getElementById('sub-instruction-text');
            if (instr) instr.textContent = 'Bé hãy bấm vào các hình để bớt đi trước nhé!';
        } else {
            if (typeof SoundEngine !== 'undefined') SoundEngine.playCorrect();
            if (statusText) {
                statusText.innerHTML = `🎉 Giỏi lắm! Đã bớt <strong>${cur.sub}</strong> bạn. Bé đếm xem còn mấy bạn đang <strong>SÁNG</strong>?`;
            }
            const ansBtns = document.getElementById('sub-answer-buttons');
            if (ansBtns) {
                ansBtns.style.opacity = '1';
                ansBtns.style.pointerEvents = 'auto';
            }
            const instr = document.getElementById('sub-instruction-text');
            if (instr) instr.innerHTML = `👉 Chạm vào số đáp án đúng bên dưới:`;
        }
    },

    resetCurrentSub() {
        this.subFadedIndices.clear();
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel3();
    },

    nextSubProblem() {
        this.subIndex = (this.subIndex + 1) % this.subtractionProblems.length;
        this.subFadedIndices.clear();
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel3();
    },

    answerSubtraction(val) {
        const cur = this.subtractionProblems[this.subIndex];
        if (val === cur.ans) {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCorrect();
                SoundEngine.playVoice('fb_correct_1', null, 'Hoan hô bé, chính xác!');
            }
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            const mark = document.getElementById('sub-question-mark');
            if (mark) {
                mark.textContent = cur.ans;
                mark.style.color = '#10b981';
            }

            setTimeout(() => {
                this.nextSubProblem();
            }, 2000);
        } else {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTryAgain();
                SoundEngine.playVoice('fb_retry', null, 'Bé thử lại nhé!');
            }
        }
    },

    /* ========================================================
       CẤP 4: PHÉP CỘNG TRỰC QUAN (GỘP THÊM VÀO - ZERO-SCROLL)
       ======================================================== */
    renderLevel4(container) {
        if (!container) container = document.getElementById('numbers-content');
        if (!container) return;

        const cur = this.additionProblems[this.addIndex];

        container.innerHTML = `
            <div style="flex:1 1 auto; min-height:0; height:100%; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
                <!-- HƯỚNG DẪN CÂU ĐỐ -->
                <div style="flex:0 0 auto; text-align:center; padding:4px 8px; background:#ecfdf5; border-radius:12px; border:2px solid #a7f3d0; font-size:12px; font-weight:800; color:#065f46;">
                    👉 ${cur.desc}
                </div>

                <!-- KHU VỰC MINH HỌA GỘP NHÓM TRỰC QUAN -->
                <div style="flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:space-around; gap:8px; padding:10px 4px; overflow:hidden;">
                    <!-- Nhóm A -->
                    <div style="flex:1; max-width:180px; background:#eff6ff; border:2px solid #bfdbfe; border-radius:18px; padding:8px 4px; text-align:center;">
                        <span style="font-size:11px; font-weight:800; color:#1d4ed8;">Nhóm 1 (${cur.a})</span>
                        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:4px; font-size:clamp(26px, 5vh, 38px); margin-top:4px;">
                            ${cur.itemA.map(it => `<span class="pulse-hover">${it}</span>`).join('')}
                        </div>
                    </div>

                    <!-- Dấu cộng to -->
                    <div style="font-size:26px; font-weight:900; color:#10b981;">➕</div>

                    <!-- Nhóm B -->
                    <div style="flex:1; max-width:180px; background:#fef3c7; border:2px solid #fde68a; border-radius:18px; padding:8px 4px; text-align:center;">
                        <span style="font-size:11px; font-weight:800; color:#b45309;">Nhóm 2 (${cur.b})</span>
                        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:4px; font-size:clamp(26px, 5vh, 38px); margin-top:4px;">
                            ${cur.itemB.map(it => `<span class="pulse-hover">${it}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- PHƯƠNG TRÌNH VÀ ĐÁP ÁN -->
                <div style="flex:0 0 auto; background:#ffffff; border:3px solid #e2e8f0; border-radius:18px; padding:8px 12px; text-align:center;">
                    <div style="font-size:clamp(22px, 4vh, 32px); font-weight:900; color:#1e293b; margin-bottom:8px;">
                        ${cur.a} ➕ ${cur.b} 🟰 <span style="color:#0284c7;">❓</span>
                    </div>

                    <div style="display:flex; justify-content:center; gap:10px;">
                        ${cur.choices.map(choice => `
                            <button class="math-ans-btn" style="min-width:64px; height:46px; font-size:22px; font-weight:900; border-radius:14px;" onclick="NumbersZone.answerAddition(${choice})">${choice}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- NÚT CHUYỂN CÂU -->
                <div style="flex:0 0 auto; display:flex; justify-content:center; margin-top:4px;">
                    <button class="kid-pill-compact" style="font-size:11px; background:#e0f2fe; color:#0369a1;" onclick="NumbersZone.nextAddProblem()">
                        Câu Tiếp ➔
                    </button>
                </div>
            </div>
        `;
    },

    nextAddProblem() {
        this.addIndex = (this.addIndex + 1) % this.additionProblems.length;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel4();
    },

    answerAddition(val) {
        const cur = this.additionProblems[this.addIndex];
        if (val === cur.ans) {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCorrect();
                SoundEngine.playVoice('fb_correct_2', null, 'Hoan hô bé, chính xác!');
            }
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            setTimeout(() => {
                this.nextAddProblem();
            }, 2000);
        } else {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playTryAgain();
                SoundEngine.playVoice('fb_retry', null, 'Bé thử lại nhé!');
            }
        }
    }
};
