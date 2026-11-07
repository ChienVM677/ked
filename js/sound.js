/**
 * KED - Sound Engine v3.0
 * Kết hợp bộ Audio chuẩn giọng cô giáo tiếng Việt 100% (gTTS / Hoài My Neural) + Web Audio API hiệu ứng đa giác quan
 * ĐÃ LOẠI BỎ TRIỆT ĐỂ LỖI GIỌNG NAM TIẾNG ANH (MICROSOFT DAVID / MARK) ĐÁNH VẦN SAI TIẾNG VIỆT
 */
const SoundEngine = {
    audioCtx: null,
    soundEnabled: true,
    audioCache: {},
    currentAudio: null,

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        } catch (e) {
            console.warn("Web Audio not supported:", e);
        }

        // Lấy danh sách voice nếu trình duyệt có hỗ trợ
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = () => {
                    window.speechSynthesis.getVoices();
                };
            }
        }
    },

    resumeContext() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    },

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        if (!this.soundEnabled) {
            this.stopAll();
        }
        return this.soundEnabled;
    },

    stopAll() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },

    /**
     * Phát tệp âm thanh giọng đọc chuẩn từ thư mục audio/<key>.mp3
     * @param {string} key - Tên khóa tệp âm thanh (vd: 'let_a', 'item_dog', 'find_cat', 'fb_correct_1')
     * @param {Function} onEnd - Callback khi phát xong
     * @param {string} fallbackText - Chuỗi đọc dự phòng nếu chưa có mp3
     */
    playVoice(key, onEnd = null, fallbackText = null) {
        if (!this.soundEnabled) {
            if (onEnd) onEnd();
            return;
        }

        this.stopAll();
        const src = `audio/${key}.mp3`;

        let audio = this.audioCache[key];
        if (!audio) {
            audio = new Audio(src);
            this.audioCache[key] = audio;
        } else {
            audio.currentTime = 0;
        }

        this.currentAudio = audio;

        audio.onended = () => {
            this.currentAudio = null;
            if (onEnd) onEnd();
        };

        audio.onerror = (e) => {
            this.currentAudio = null;
            if (fallbackText) {
                this.speakFallback(fallbackText, onEnd);
            } else if (onEnd) {
                onEnd();
            }
        };

        audio.play().catch(err => {
            this.currentAudio = null;
            if (fallbackText) {
                this.speakFallback(fallbackText, onEnd);
            } else if (onEnd) {
                onEnd();
            }
        });
    },

    /**
     * Phát tên món đồ vật / con vật từ kho item_<id>.mp3 (chuẩn tiếng Việt cô giáo)
     */
    playItemName(itemId, onEnd = null) {
        if (!this.soundEnabled || !itemId) {
            if (onEnd) onEnd();
            return;
        }
        this.playVoice(`item_${itemId}`, onEnd);
    },

    /**
     * Phát câu hỏi tìm đồ vật theo itemId từ kho audio find_<itemId>.mp3
     */
    playItemFind(itemId, itemName = null, onEnd = null) {
        this.playVoice(`find_${itemId}`, onEnd, itemName ? `Bé hãy tìm ${itemName} ở đâu nào?` : null);
    },

    /**
     * Phát âm thanh câu hỏi theo audioKey hoặc text dự phòng
     */
    playQuestion(audioKey, questionText = null, onEnd = null) {
        if (audioKey) {
            this.playVoice(audioKey, onEnd, questionText);
        } else if (questionText) {
            this.speakFallback(questionText, onEnd);
        }
    },

    /**
     * Dự phòng SpeechSynthesis: NẾU VÀ CHỈ NẾU máy có Voice Tiếng Việt chuẩn.
     * BẢO VỆ CHẶT CHẼ: Nếu không có Voice tiếng Việt, TUYỆT ĐỐI KHÔNG GỌI để chặn
     * giọng nam ngoại quốc (Microsoft David / Mark) đọc đánh vần sai bậy.
     */
    speakFallback(text, onEnd = null) {
        if (!this.soundEnabled || !('speechSynthesis' in window)) {
            if (onEnd) setTimeout(onEnd, 200);
            return;
        }

        let voices = window.speechSynthesis.getVoices();
        let viVoice = null;

        if (voices && voices.length > 0) {
            viVoice = voices.find(v => {
                const lang = (v.lang || '').toLowerCase().replace('_', '-');
                const name = (v.name || '').toLowerCase();
                return lang.startsWith('vi') || 
                       name.includes('vietnamese') || 
                       name.includes('tiếng việt') || 
                       name.includes('hoaimy') || 
                       name.includes('namminh');
            });
        }

        // BẢO VỆ CHẶT CHẼ: Không có giọng tiếng Việt chuẩn -> Hủy ngay lập tức!
        if (!viVoice) {
            console.warn("[SoundEngine Guard] Trình duyệt không có voice tiếng Việt chuẩn. Đã chặn giọng nam ngoại quốc (Microsoft David) đọc sai tiếng Việt.");
            if (onEnd) setTimeout(onEnd, 200);
            return;
        }

        this.stopAll();
        const utter = new SpeechSynthesisUtterance(text);
        utter.voice = viVoice;
        utter.lang = viVoice.lang || 'vi-VN';
        utter.rate = 0.82;
        utter.pitch = 1.05;

        if (onEnd) {
            utter.onend = onEnd;
            utter.onerror = onEnd;
        }

        window.speechSynthesis.speak(utter);
    },

    /* ========================================================
       CÁC HIỆU ỨNG ÂM THANH GAME ĐA GIÁC QUAN (WEB AUDIO API)
       ======================================================== */

    // 1. Tiếng Pop bong bóng / Chạm thẻ bài nhẹ nhàng
    playPop() {
        if (!this.soundEnabled || !this.audioCtx) return;
        this.resumeContext();
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    },

    // 2. Tiếng Ting-Ting sao bay khi bé trả lời đúng
    playCorrect() {
        if (!this.soundEnabled || !this.audioCtx) return;
        this.resumeContext();
        const now = this.audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // Đô - Mi - Sol - Đố (C5, E5, G5, C6)

        notes.forEach((freq, idx) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            gain.gain.setValueAtTime(0.18, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.38);
        });
    },

    // 3. Tiếng âm nhạc nhẹ nhàng khi cần thử lại
    playTryAgain() {
        if (!this.soundEnabled || !this.audioCtx) return;
        this.resumeContext();
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.25);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    },

    // 4. Tiếng pháo hoa chúc mừng hoàn thành bài học
    playFanfare() {
        if (!this.soundEnabled || !this.audioCtx) return;
        this.resumeContext();
        const now = this.audioCtx.currentTime;
        const chords = [
            [523.25, 659.25, 783.99], // C
            [587.33, 739.99, 880.00], // D
            [659.25, 830.61, 987.77], // E
            [1046.50, 1318.51, 1567.98] // High C
        ];

        chords.forEach((chord, step) => {
            chord.forEach(freq => {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + step * 0.16);

                gain.gain.setValueAtTime(0.12, now + step * 0.16);
                gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.16 + 0.45);

                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start(now + step * 0.16);
                osc.stop(now + step * 0.16 + 0.5);
            });
        });
    }
};
