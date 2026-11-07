/**
 * KED - Mini Games (Trò Chơi Vận Động Não Bộ Cho Bé 3 Tuổi)
 * 1. Nổ bóng bay chữ cái & chữ số (Balloon Pop)
 * 2. Đoán bóng hình bí ẩn (Shadow Matching)
 */
const GamesEngine = {
    currentScore: 0,
    activeGame: null,
    balloonInterval: null,
    activeBalloons: [],

    init() {
        this.currentScore = parseInt(localStorage.getItem('ked_stars') || '0', 10);
    },

    addStar(count = 1) {
        this.currentScore += count;
        localStorage.setItem('ked_stars', this.currentScore);
        const starEl = document.getElementById('star-count');
        if (starEl) {
            starEl.textContent = this.currentScore;
            starEl.parentElement.classList.add('star-bounce');
            setTimeout(() => starEl.parentElement.classList.remove('star-bounce'), 600);
        }
    },

    // ==========================================
    // TRÒ CHƠI 1: NỔ BÓNG BAY (BALLOON POP)
    // ==========================================
    startBalloonGame(containerEl) {
        this.stopGames();
        this.activeGame = 'balloon';
        containerEl.innerHTML = '';

        // Tạo khung game
        const wrapper = document.createElement('div');
        wrapper.className = 'game-balloon-wrapper';

        const promptBox = document.createElement('div');
        promptBox.className = 'game-prompt-box';
        promptBox.id = 'balloon-prompt';
        wrapper.appendChild(promptBox);

        const sky = document.createElement('div');
        sky.className = 'game-balloon-sky';
        sky.id = 'balloon-sky';
        wrapper.appendChild(sky);

        containerEl.appendChild(wrapper);

        // Chuẩn bị mục tiêu câu đố
        const targets = [
            { type: 'letter', val: 'A', name: 'chữ A', icon: '🅰️' },
            { type: 'letter', val: 'B', name: 'chữ Bờ', icon: '🅱️' },
            { type: 'letter', val: 'C', name: 'chữ Cờ', icon: '©️' },
            { type: 'letter', val: 'O', name: 'chữ O', icon: '🅾️' },
            { type: 'number', val: '1', name: 'số 1', icon: '1️⃣' },
            { type: 'number', val: '2', name: 'số 2', icon: '2️⃣' },
            { type: 'number', val: '3', name: 'số 3', icon: '3️⃣' },
            { type: 'number', val: '5', name: 'số 5', icon: '5️⃣' }
        ];

        let currentTarget = targets[Math.floor(Math.random() * targets.length)];

        const updatePrompt = () => {
            promptBox.innerHTML = `
                <div class="prompt-icon">🎈</div>
                <div class="prompt-text">Bé hãy bấm vào quả bóng có <strong>${currentTarget.name}</strong> nhé!</div>
                <button class="btn-voice-prompt" onclick="SoundEngine.speak('Bé hãy bấm vào bóng bay có ${currentTarget.name} nhé!')">🔊 Nghe lại</button>
            `;
            SoundEngine.speak(`Bé hãy bấm vào bóng bay có ${currentTarget.name} nhé!`);
        };

        updatePrompt();

        const balloonColors = ['#FF5722', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FFC107', '#00BCD4'];
        const possibleValues = ['A', 'B', 'C', 'D', 'E', 'O', '1', '2', '3', '4', '5'];

        // Vòng lặp sinh bóng bay
        this.balloonInterval = setInterval(() => {
            if (this.activeGame !== 'balloon') return;

            const balloon = document.createElement('div');
            balloon.className = 'balloon-item';

            // 40% cơ hội xuất hiện mục tiêu đúng
            const isTarget = Math.random() < 0.45;
            const val = isTarget ? currentTarget.val : possibleValues[Math.floor(Math.random() * possibleValues.length)];
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

            balloon.style.backgroundColor = color;
            balloon.style.left = (Math.random() * 80 + 5) + '%';
            balloon.innerHTML = `<span class="balloon-val">${val}</span><div class="balloon-string"></div>`;

            const speedSeconds = (Math.random() * 2 + 5.5).toFixed(1); // 5.5 - 7.5 giây bay lên nhẹ nhàng
            balloon.style.animation = `balloonFloat ${speedSeconds}s linear forwards`;

            balloon.onclick = (e) => {
                e.stopPropagation();
                if (val === currentTarget.val) {
                    // Bé chọn đúng!
                    SoundEngine.playPop();
                    this.createPopParticles(e.clientX, e.clientY, color);
                    balloon.remove();

                    this.addStar(1);
                    SoundEngine.playSuccess();
                    SoundEngine.speak(`Hoan hô bé! Đúng ${currentTarget.name} rồi! Bé giỏi quá!`);

                    // Đổi mục tiêu mới sau 1.2s
                    setTimeout(() => {
                        currentTarget = targets[Math.floor(Math.random() * targets.length)];
                        updatePrompt();
                    }, 1200);
                } else {
                    // Chọn chưa đúng: bóng rung rinh
                    SoundEngine.playTryAgain();
                    balloon.classList.add('wobble');
                    setTimeout(() => balloon.classList.remove('wobble'), 500);
                    SoundEngine.speak(`Chưa đúng rồi, bé tìm ${currentTarget.name} cơ mà!`);
                }
            };

            sky.appendChild(balloon);

            // Tự dọn khi bay hết màn hình
            setTimeout(() => {
                if (balloon.parentElement) balloon.remove();
            }, speedSeconds * 1000 + 100);

        }, 1200);
    },

    createPopParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const p = document.createElement('div');
            p.className = 'pop-particle';
            p.style.backgroundColor = color;
            p.style.left = x + 'px';
            p.style.top = y + 'px';

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 80 + 30;
            p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 700);
        }
    },

    // ==========================================
    // TRÒ CHƠI 2: ĐOÁN BÓNG HÌNH (SHADOW MATCH)
    // ==========================================
    startShadowGame(containerEl) {
        this.stopGames();
        this.activeGame = 'shadow';
        containerEl.innerHTML = '';

        const allCandidates = [
            { id: 'dog', name: 'Con Chó', icon: '🐶', soundType: 'dog' },
            { id: 'cat', name: 'Con Mèo', icon: '🐱', soundType: 'cat' },
            { id: 'duck', name: 'Con Vịt', icon: '🦆', soundType: 'duck' },
            { id: 'cow', name: 'Con Bò', icon: '🐮', soundType: 'cow' },
            { id: 'car', name: 'Xe Ô Tô', icon: '🚗', soundType: 'car' },
            { id: 'apple', name: 'Quả Táo', icon: '🍎', soundType: 'pop' },
            { id: 'banana', name: 'Quả Chuối', icon: '🍌', soundType: 'pop' },
            { id: 'elephant', name: 'Chú Voi', icon: '🐘', soundType: 'cow' }
        ];

        // Lấy ngẫu nhiên 3 con, chọn 1 con làm bóng
        const shuffled = [...allCandidates].sort(() => 0.5 - Math.random());
        const target = shuffled[0];
        const choices = shuffled.slice(0, 3).sort(() => 0.5 - Math.random());

        const wrapper = document.createElement('div');
        wrapper.className = 'shadow-game-wrapper';

        wrapper.innerHTML = `
            <div class="shadow-header">
                <h2>🔍 Đoán Bóng Bí Ẩn</h2>
                <p>Bé nhìn bóng đen này là của bạn nào dưới đây?</p>
            </div>
            <div class="shadow-mystery-box">
                <div class="mystery-silhouette">${target.icon}</div>
            </div>
            <div class="shadow-choices-row" id="shadow-choices"></div>
        `;

        containerEl.appendChild(wrapper);

        SoundEngine.speak('Bé nhìn xem, bóng đen bí ẩn này là của bạn nào dưới đây?');

        const choicesBox = wrapper.querySelector('#shadow-choices');
        choices.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'shadow-choice-card';
            btn.innerHTML = `
                <div class="card-icon">${item.icon}</div>
                <div class="card-title">${item.name}</div>
            `;

            btn.onclick = () => {
                if (item.id === target.id) {
                    btn.classList.add('correct-choice');
                    const silhouette = wrapper.querySelector('.mystery-silhouette');
                    silhouette.classList.add('revealed');

                    SoundEngine.playSuccess();
                    SoundEngine.playAnimalSound(item.soundType);
                    this.addStar(2);

                    SoundEngine.speak(`Chính xác! Đó chính là ${target.name}! Hoan hô bé!`, 0.85, 1.1, () => {
                        setTimeout(() => this.startShadowGame(containerEl), 1600);
                    });
                } else {
                    btn.classList.add('wrong-choice');
                    SoundEngine.playTryAgain();
                    setTimeout(() => btn.classList.remove('wrong-choice'), 600);
                    SoundEngine.speak('Chưa đúng rồi, bé nhìn kỹ lại hình bóng nhé!');
                }
            };

            choicesBox.appendChild(btn);
        });
    },

    stopGames() {
        if (this.balloonInterval) {
            clearInterval(this.balloonInterval);
            this.balloonInterval = null;
        }
        this.activeGame = null;
    }
};

window.GamesEngine = GamesEngine;
