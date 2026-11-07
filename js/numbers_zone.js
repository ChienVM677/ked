/**
 * KED - Numbers Zone v3.5 (PHÂN HỆ 3: CON SỐ & TOÁN HỌC TRỰC QUAN)
 * Cập nhật chuẩn giáo dục mầm non:
 *   - Cấp 1: Đếm số cơ bản 0 - 10 với hình ảnh đếm chấm
 *   - Cấp 2: Bảng 100 Số Kì Diệu (1-100 Chart) kèm giọng đọc tiếng Việt 100% từng số
 *   - Cấp 3: Phép trừ trực quan tương tác (Bé bấm vào thì hình mới mờ đi, thấy rõ tổng và phần còn lại)
 *   - Cấp 4: Phép cộng trực quan (Thêm vào gộp chung)
 */

const NumbersZone = {
    currentLevel: 1,
    activeRange: [1, 100],
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

    // Cấp 3: Phép trừ trực quan tương tác (Bé bấm làm mờ đi)
    subIndex: 0,
    subFadedIndices: new Set(),
    subtractionProblems: [
        { total: 5, sub: 2, ans: 3, icon: "🍎", name: "Quả Táo", desc: "Ban đầu có 5 quả táo. Đố bé chạm vào 2 quả để bớt đi nào!", choices: [2, 3, 4] },
        { total: 6, sub: 3, ans: 3, icon: "🎈", name: "Bóng Bay", desc: "Ban đầu có 6 quả bóng bay. Đố bé chạm vào 3 quả để thả bay mất nào!", choices: [2, 3, 4] },
        { total: 4, sub: 1, ans: 3, icon: "🥕", name: "Củ Cà Rốt", desc: "Ban đầu có 4 củ cà rốt. Đố bé chạm vào 1 củ cho chú thỏ ăn nhé!", choices: [2, 3, 4] },
        { total: 7, sub: 3, ans: 4, icon: "🦆", name: "Chú Vịt", desc: "Ban đầu có 7 chú vịt. Đố bé chạm vào 3 chú để bơi đi chơi nào!", choices: [3, 4, 5] },
        { total: 8, sub: 4, ans: 4, icon: "🚗", name: "Xe Ô Tô", desc: "Ban đầu có 8 ô tô trong bãi. Đố bé chạm vào 4 ô tô để chạy đi nhé!", choices: [3, 4, 5] },
        { total: 9, sub: 5, ans: 4, icon: "🍓", name: "Quả Dâu", desc: "Ban đầu có 9 quả dâu. Đố bé chạm vào 5 quả dâu chín mọng nào!", choices: [3, 4, 5] },
        { total: 10, sub: 4, ans: 6, icon: "⭐", name: "Ngôi Sao", desc: "Ban đầu có 10 ngôi sao. Đố bé chạm vào 4 ngôi sao để cất đi nhé!", choices: [5, 6, 7] }
    ],

    // Cấp 4: Phép cộng trực quan
    addIndex: 0,
    additionProblems: [
        { a: 2, b: 1, ans: 3, icon: "🍎", itemA: ["🍎", "🍎"], itemB: ["🍎"], desc: "2 quả táo thêm 1 quả táo bằng mấy quả táo?", choices: [2, 3, 4] },
        { a: 3, b: 2, ans: 5, icon: "🦆", itemA: ["🦆", "🦆", "🦆"], itemB: ["🦆", "🦆"], desc: "3 chú vịt bơi thêm 2 chú vịt bằng mấy chú vịt?", choices: [4, 5, 6] },
        { a: 4, b: 3, ans: 7, icon: "🍓", itemA: ["🍓", "🍓", "🍓", "🍓"], itemB: ["🍓", "🍓", "🍓"], desc: "4 quả dâu thêm 3 quả dâu bằng mấy quả dâu?", choices: [6, 7, 8] },
        { a: 5, b: 4, ans: 9, icon: "🚗", itemA: ["🚗", "🚗", "🚗", "🚗", "🚗"], itemB: ["🚗", "🚗", "🚗", "🚗"], desc: "5 ô tô thêm 4 ô tô bằng mấy ô tô?", choices: [8, 9, 10] }
    ],

    init() {
        this.renderSubMenu();
        this.switchLevel(1);
    },

    renderSubMenu() {
        const subNav = document.getElementById('numbers-subnav');
        if (!subNav) return;
        subNav.innerHTML = `
            <button class="kid-pill active" onclick="NumbersZone.switchLevel(1)">🔢 Cấp 1: Đếm Số 0-10</button>
            <button class="kid-pill" onclick="NumbersZone.switchLevel(2)">💯 Cấp 2: Bảng 100 Số Kì Diệu</button>
            <button class="kid-pill" onclick="NumbersZone.switchLevel(3)">➖ Cấp 3: Trừ Trực Quan (Bấm Bớt Đi)</button>
            <button class="kid-pill" onclick="NumbersZone.switchLevel(4)">➕ Cấp 4: Phép Cộng Trực Quan</button>
        `;
    },

    switchLevel(level) {
        if (this.autoCountInterval) {
            clearInterval(this.autoCountInterval);
            this.autoCountInterval = null;
            this.isAutoCounting = false;
        }

        this.currentLevel = level;
        SoundEngine.playPop();

        const pills = document.querySelectorAll('#numbers-subnav .kid-pill');
        pills.forEach((p, idx) => p.classList.toggle('active', idx + 1 === level));

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
       CẤP 1: NHẬN DIỆN & TẬP ĐẾM 0 - 10
       ======================================================== */
    renderLevel1(container) {
        container.innerHTML = `
            <div class="level-intro">
                <h2>🔢 Cấp 1: Bé Học Đếm Số 0 Đến 10 Vui Nhộn</h2>
                <p>Bé chạm vào từng khối số để nghe cô giáo đọc tên số và chạm đếm số lượng nhé!</p>
            </div>

            <div class="numbers-selector-row">
                ${this.numbersList.map((item, idx) => `
                    <button class="num-digit-btn ${idx === 1 ? 'selected' : ''}" style="color:${item.color}" onclick="NumbersZone.inspectNumber(${idx}, this)">
                        ${item.num}
                    </button>
                `).join('')}
            </div>

            <div class="number-stage-box" id="num-stage"></div>
        `;
        this.inspectNumber(1, document.querySelector('.num-digit-btn.selected'));
    },

    inspectNumber(idx, btnEl) {
        const item = this.numbersList[idx];
        SoundEngine.playPop();
        SoundEngine.playVoice(item.audioKey);

        const allBtns = document.querySelectorAll('.num-digit-btn');
        allBtns.forEach(b => b.classList.remove('selected'));
        if (btnEl) btnEl.classList.add('selected');

        const stage = document.getElementById('num-stage');
        if (!stage) return;

        stage.innerHTML = `
            <div class="num-big-display" style="color:${item.color}">
                <span class="giant-num bounce-hover">${item.num}</span>
                <span class="giant-name">${item.name}</span>
            </div>

            <div class="num-items-cloud">
                ${item.items.length === 0 ? '<div class="empty-cloud">Số Không là không có gì cả bé nhé! ⭕</div>' : ''}
                ${item.items.map((it, i) => `
                    <span class="cloud-item pulse-hover" onclick="NumbersZone.tapCountItem(${i+1})">${it}</span>
                `).join('')}
            </div>

            <div class="num-count-tip">👉 Bé chạm vào từng hình vẽ để đếm nhé!</div>
        `;
    },

    tapCountItem(count) {
        SoundEngine.playPop();
        SoundEngine.playVoice(`num_${count}`);
    },

    /* ========================================================
       CẤP 2: BẢNG 100 SỐ KÌ DIỆU (1 - 100 CHART)
       ======================================================== */
    renderLevel2(container) {
        const start = this.activeRange[0];
        const end = this.activeRange[1];

        container.innerHTML = `
            <div class="level-intro">
                <h2>💯 Cấp 2: Bảng 100 Số Kì Diệu (Đếm Số 1 Đến 100)</h2>
                <p>Bé chạm vào bất kỳ ô số nào để nghe cô giáo đọc to rõ tên số bằng tiếng Việt nhé!</p>
            </div>

            <div class="chart-100-wrapper">
                <!-- Bộ lọc dải số thuận tiện cho mắt bé -->
                <div class="chart-range-bar">
                    <button class="chart-range-pill ${end === 20 ? 'active' : ''}" onclick="NumbersZone.setRange(1, 20)">1 - 20</button>
                    <button class="chart-range-pill ${start === 21 && end === 40 ? 'active' : ''}" onclick="NumbersZone.setRange(21, 40)">21 - 40</button>
                    <button class="chart-range-pill ${start === 41 && end === 60 ? 'active' : ''}" onclick="NumbersZone.setRange(41, 60)">41 - 60</button>
                    <button class="chart-range-pill ${start === 61 && end === 80 ? 'active' : ''}" onclick="NumbersZone.setRange(61, 80)">61 - 80</button>
                    <button class="chart-range-pill ${start === 81 && end === 100 ? 'active' : ''}" onclick="NumbersZone.setRange(81, 100)">81 - 100</button>
                    <button class="chart-range-pill ${start === 1 && end === 100 ? 'active' : ''}" onclick="NumbersZone.setRange(1, 100)">⭐ Toàn Bộ 1-100</button>
                    <button class="kid-pill" style="font-size:14px;padding:6px 14px;" onclick="NumbersZone.toggleAutoCount()">
                        ${this.isAutoCounting ? '⏹️ Dừng Đếm' : '▶️ Tự Động Đếm'}
                    </button>
                </div>

                <!-- Ô hiển thị số to nổi bật phía trên -->
                <div style="text-align:center;margin-bottom:12px;">
                    <span style="font-size:42px;font-weight:900;color:#0284c7;" id="display-100-num">${this.selected100Num}</span>
                    <button class="voice-btn" style="margin-left:12px;vertical-align:middle;" onclick="NumbersZone.speak100Num(${this.selected100Num})">🔊 Nghe Lại</button>
                </div>

                <!-- Lưới ô số 10x10 -->
                <div class="chart-100-grid">
                    ${this.generate100GridHTML(start, end)}
                </div>
            </div>
        `;
    },

    setRange(start, end) {
        this.activeRange = [start, end];
        SoundEngine.playPop();
        this.renderLevel2(document.getElementById('numbers-content'));
    },

    generate100GridHTML(start, end) {
        let html = '';
        for (let i = start; i <= end; i++) {
            const isActive = i === this.selected100Num ? 'active' : '';
            html += `<div class="num-cell-100 ${isActive}" id="cell-num-${i}" onclick="NumbersZone.click100Num(${i})">${i}</div>`;
        }
        return html;
    },

    click100Num(n) {
        this.selected100Num = n;
        SoundEngine.playPop();
        SoundEngine.playVoice(`num_${n}`);

        const disp = document.getElementById('display-100-num');
        if (disp) disp.textContent = n;

        document.querySelectorAll('.num-cell-100').forEach(c => c.classList.remove('active'));
        const cell = document.getElementById(`cell-num-${n}`);
        if (cell) cell.classList.add('active');
    },

    speak100Num(n) {
        SoundEngine.playVoice(`num_${n}`);
    },

    toggleAutoCount() {
        if (this.isAutoCounting) {
            clearInterval(this.autoCountInterval);
            this.autoCountInterval = null;
            this.isAutoCounting = false;
            this.renderLevel2(document.getElementById('numbers-content'));
        } else {
            this.isAutoCounting = true;
            this.renderLevel2(document.getElementById('numbers-content'));
            this.autoCountInterval = setInterval(() => {
                let next = this.selected100Num + 1;
                if (next > this.activeRange[1]) next = this.activeRange[0];
                this.click100Num(next);
            }, 1200);
        }
    },

    /* ========================================================
       CẤP 3: PHÉP TRỪ TRỰC QUAN (BÉ BẤM VÀO THÌ MỚI LÀM MỜ ĐI)
       ======================================================== */
    renderLevel3(container) {
        const cur = this.subtractionProblems[this.subIndex];

        container.innerHTML = `
            <div class="level-intro">
                <h2>➖ Cấp 3: Phép Trừ Trực Quan (Chạm Để Bớt Đi)</h2>
                <p>👉 ${cur.desc}</p>
            </div>

            <div class="sub-interactive-box">
                <!-- Nhãn trạng thái tiến trình -->
                <div class="sub-interactive-status" id="sub-status-text">
                    Ban đầu có tổng cộng: <strong>${cur.total} ${cur.name}</strong> • Hãy chạm vào <strong>${cur.sub}</strong> bạn để bớt đi!
                </div>

                <!-- Bể chứa toàn bộ các vật thể sáng rõ ban đầu -->
                <div class="sub-items-pool" id="sub-items-container">
                    ${this.generateSubItemsHTML(cur)}
                </div>

                <!-- Khung hiển thị phương trình và nút chọn kết quả -->
                <div id="sub-equation-area">
                    <div class="math-equation-text">${cur.total} ➖ ${cur.sub} 🟰 <span style="color:#e11d48;" id="sub-question-mark">❓</span></div>
                    <div style="font-size:15px;font-weight:800;color:#64748b;margin-bottom:12px;" id="sub-instruction-text">
                        Bé hãy bấm vào các hình để bớt đi trước nhé!
                    </div>
                    <div class="math-answer-buttons" id="sub-answer-buttons" style="opacity:0.4;pointer-events:none;">
                        ${cur.choices.map(choice => `
                            <button class="math-ans-btn" onclick="NumbersZone.answerSubtraction(${choice})">${choice}</button>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top:16px;">
                    <button class="kid-pill" style="font-size:14px;background:#f1f5f9;color:#475569;" onclick="NumbersZone.resetCurrentSub()">🔄 Đặt lại từ đầu</button>
                </div>
            </div>
        `;
    },

    generateSubItemsHTML(cur) {
        let html = '';
        for (let i = 0; i < cur.total; i++) {
            const isFaded = this.subFadedIndices.has(i);
            html += `
                <div class="sub-item-card ${isFaded ? 'faded-out' : ''}" onclick="NumbersZone.toggleSubItem(${i})">
                    <span>${cur.icon}</span>
                </div>
            `;
        }
        return html;
    },

    toggleSubItem(idx) {
        const cur = this.subtractionProblems[this.subIndex];

        if (this.subFadedIndices.has(idx)) {
            // Hủy bớt đi (phục hồi)
            this.subFadedIndices.delete(idx);
            SoundEngine.playPop();
        } else {
            // Chạm bớt đi
            if (this.subFadedIndices.size < cur.sub) {
                this.subFadedIndices.add(idx);
                SoundEngine.playPop();
            } else {
                // Đã đủ số lượng bớt
                SoundEngine.playTryAgain();
                return;
            }
        }

        // Cập nhật lại giao diện
        const container = document.getElementById('sub-items-container');
        if (container) container.innerHTML = this.generateSubItemsHTML(cur);

        const statusText = document.getElementById('sub-status-text');
        const countFaded = this.subFadedIndices.size;
        const remainCount = cur.total - countFaded;

        if (countFaded < cur.sub) {
            if (statusText) {
                statusText.innerHTML = `Đã bớt: <strong>${countFaded}/${cur.sub}</strong> bạn • Bé hãy chạm thêm <strong>${cur.sub - countFaded}</strong> bạn nữa nhé!`;
            }
            const ansBtns = document.getElementById('sub-answer-buttons');
            if (ansBtns) {
                ansBtns.style.opacity = '0.4';
                ansBtns.style.pointerEvents = 'none';
            }
            const instr = document.getElementById('sub-instruction-text');
            if (instr) instr.textContent = 'Bé hãy bấm vào các hình để bớt đi trước nhé!';
        } else {
            // ĐÃ BỚT ĐỦ SỐ LƯỢNG!
            SoundEngine.playCorrect();
            if (statusText) {
                statusText.innerHTML = `🎉 Tuyệt vời! Đã bớt <strong>${cur.sub}</strong> bạn (bị mờ). Bây giờ bé hãy đếm xem còn lại mấy bạn đang <strong>SÁNG</strong> nhé!`;
            }
            const ansBtns = document.getElementById('sub-answer-buttons');
            if (ansBtns) {
                ansBtns.style.opacity = '1';
                ansBtns.style.pointerEvents = 'auto';
            }
            const instr = document.getElementById('sub-instruction-text');
            if (instr) instr.innerHTML = `👉 Bé đếm xem còn lại bao nhiêu bạn đang sáng rõ và chạm chọn đáp án đúng bên dưới:`;
        }
    },

    resetCurrentSub() {
        this.subFadedIndices.clear();
        SoundEngine.playPop();
        this.renderLevel3(document.getElementById('numbers-content'));
    },

    answerSubtraction(val) {
        const cur = this.subtractionProblems[this.subIndex];
        if (val === cur.ans) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_1');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            const mark = document.getElementById('sub-question-mark');
            if (mark) {
                mark.textContent = cur.ans;
                mark.style.color = '#10b981';
            }

            setTimeout(() => {
                this.subIndex = (this.subIndex + 1) % this.subtractionProblems.length;
                this.subFadedIndices.clear();
                this.renderLevel3(document.getElementById('numbers-content'));
            }, 2200);
        } else {
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
        }
    },

    /* ========================================================
       CẤP 4: PHÉP CỘNG TRỰC QUAN (THÊM VÀO GỘP CHUNG)
       ======================================================== */
    renderLevel4(container) {
        const cur = this.additionProblems[this.addIndex];

        container.innerHTML = `
            <div class="level-intro">
                <h2>➕ Cấp 4: Phép Cộng Trực Quan (Gộp Lại Thêm Vào)</h2>
                <p>👉 ${cur.desc}</p>
            </div>

            <div class="math-problem-card">
                <div class="math-visual-stage">
                    <div class="items-group">
                        <span class="group-label">Nhóm 1 (${cur.a}):</span>
                        <div class="dish-items">${cur.itemA.map(it => `<span class="item-live pulse-hover">${it}</span>`).join('')}</div>
                    </div>
                    <div class="math-op-sign">➕</div>
                    <div class="items-group">
                        <span class="group-label">Nhóm 2 (${cur.b}):</span>
                        <div class="dish-items">${cur.itemB.map(it => `<span class="item-live pulse-hover">${it}</span>`).join('')}</div>
                    </div>
                </div>

                <div class="math-equation-text">${cur.a} ➕ ${cur.b} 🟰 ❓</div>

                <div class="math-answer-buttons">
                    ${cur.choices.map(choice => `
                        <button class="math-ans-btn" onclick="NumbersZone.answerAddition(${choice})">${choice}</button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    answerAddition(val) {
        const cur = this.additionProblems[this.addIndex];
        if (val === cur.ans) {
            SoundEngine.playCorrect();
            SoundEngine.playVoice('fb_correct_2');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            setTimeout(() => {
                this.addIndex = (this.addIndex + 1) % this.additionProblems.length;
                this.renderLevel4(document.getElementById('numbers-content'));
            }, 2000);
        } else {
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
        }
    }
};
