/**
 * KED - Stories Zone Module v6.4
 * Phân hệ Vườn Cổ Tích & Truyện Kể Tương Tác Đa Giác Quan
 */

const StoriesZone = {
    currentStoryId: "rainy_day",
    currentPageIndex: 1,

    init() {
        this.renderStorySelector();
        this.loadStory(this.currentStoryId, 1);
    },

    renderStorySelector() {
        const selectorEl = document.getElementById('stories-list-strip');
        if (!selectorEl) return;

        selectorEl.innerHTML = STORIES_DATA.map(st => `
            <button class="story-choice-card ${st.id === this.currentStoryId ? 'active' : ''}" onclick="StoriesZone.selectStory('${st.id}')">
                <span class="story-icon">${st.icon}</span>
                <div>
                    <div class="story-title">${st.title}</div>
                    <div class="story-badge">${st.badge}</div>
                </div>
            </button>
        `).join('');
    },

    selectStory(storyId) {
        SoundEngine.playPop();
        this.currentStoryId = storyId;
        this.currentPageIndex = 1;
        this.renderStorySelector();
        this.loadStory(storyId, 1);
    },

    loadStory(storyId, pageNum) {
        const story = STORIES_DATA.find(s => s.id === storyId) || STORIES_DATA[0];
        const page = story.pages.find(p => p.pageIndex === pageNum) || story.pages[0];
        this.currentPageIndex = page.pageIndex;

        // Cập nhật tiêu đề truyện & số trang
        const titleEl = document.getElementById('story-active-title');
        if (titleEl) titleEl.textContent = `${story.title} (Trang ${page.pageIndex}/${story.pages.length})`;

        // Cập nhật khung hình minh họa
        const stage = document.getElementById('story-canvas-box');
        if (stage) {
            stage.style.background = page.bgStyle || '#ffffff';
            stage.innerHTML = page.illustration;
        }

        // Cập nhật văn bản câu chuyện
        const textEl = document.getElementById('story-sentence-text');
        if (textEl) {
            textEl.textContent = page.text;
        }

        // Cập nhật gợi ý chạm
        const hintEl = document.getElementById('story-touch-hint');
        if (hintEl) {
            hintEl.textContent = `💡 ${page.touchHints || 'Bé chạm vào các hình trong tranh để nghe âm thanh nhé!'}`;
        }

        // Cập nhật Mini-Quest nếu có
        const questBox = document.getElementById('story-quest-container');
        if (questBox) {
            if (page.quest) {
                questBox.style.display = 'block';
                questBox.innerHTML = `
                    <div class="story-quest-card">
                        <div class="quest-prompt" onclick="StoriesZone.speakQuest()" style="cursor:pointer;" title="Bấm để nghe lại câu hỏi">
                            <span class="quest-audio-icon">🔊</span> ❓ ${page.quest.prompt}
                        </div>
                        <div class="quest-options-row">
                            ${page.quest.options.map((opt, idx) => `
                                <button class="quest-opt-btn" onclick="StoriesZone.answerQuest(${idx})">
                                    <span class="quest-opt-icon">${opt.icon}</span>
                                    <span class="quest-opt-name">${opt.name}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div id="story-quest-feedback" class="quest-feedback-line"></div>
                    </div>
                `;
            } else {
                questBox.style.display = 'none';
                questBox.innerHTML = '';
            }
        }

        // Cập nhật nút lật trang
        const btnPrev = document.getElementById('btn-story-prev');
        const btnNext = document.getElementById('btn-story-next');
        if (btnPrev) btnPrev.disabled = page.pageIndex <= 1;
        if (btnNext) {
            if (page.pageIndex >= story.pages.length) {
                btnNext.innerHTML = '<span>🎉 Đọc Xong</span>';
            } else {
                btnNext.innerHTML = '<span>Trang Tiếp ➔</span>';
            }
        }

        // Đọc câu chuyện & tự động hỏi câu đố sau khi đọc xong
        setTimeout(() => {
            this.speakCurrentPage();
        }, 400);
    },

    speakCurrentPage() {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const page = story.pages.find(p => p.pageIndex === this.currentPageIndex);
        if (page && page.voiceText) {
            const onAudioEnd = () => {
                if (page.quest) {
                    setTimeout(() => {
                        this.speakQuest();
                    }, 600);
                }
            };
            if (page.audioKey) {
                SoundEngine.playVoice(page.audioKey, onAudioEnd, page.voiceText);
            } else {
                SoundEngine.speakFallback(page.voiceText, onAudioEnd);
            }
        }
    },

    speakQuest() {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const page = story.pages.find(p => p.pageIndex === this.currentPageIndex);
        if (page && page.quest) {
            const promptText = page.quest.audioPrompt || page.quest.prompt;
            if (page.quest.audioKey) {
                SoundEngine.playVoice(page.quest.audioKey, null, promptText);
            } else {
                SoundEngine.speakFallback(promptText);
            }
        }
    },

    prevPage() {
        if (this.currentPageIndex > 1) {
            SoundEngine.playPop();
            this.loadStory(this.currentStoryId, this.currentPageIndex - 1);
        }
    },

    nextPage() {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        if (this.currentPageIndex < story.pages.length) {
            SoundEngine.playPop();
            this.loadStory(this.currentStoryId, this.currentPageIndex + 1);
        } else {
            // Hoàn thành truyện -> Tặng sao & vỗ tay
            SoundEngine.playSparkle();
            SoundEngine.speakFallback("Hoan hô bé yêu đã đọc xong câu chuyện thật chăm chỉ! Tặng bé 3 sao vàng!");
            App.addStar();
            App.addStar();
            App.addStar();
            setTimeout(() => {
                this.loadStory(this.currentStoryId, 1);
            }, 2500);
        }
    },

    tapElement(elemKey, textVoice, audioKey = null) {
        SoundEngine.playPop();
        const hintEl = document.getElementById('story-touch-hint');
        if (hintEl) {
            hintEl.textContent = `✨ ${textVoice}`;
        }
        if (audioKey) {
            SoundEngine.playVoice(audioKey, null, textVoice);
        } else {
            SoundEngine.speakFallback(textVoice);
        }
    },

    answerQuest(optIdx) {
        const story = STORIES_DATA.find(s => s.id === this.currentStoryId) || STORIES_DATA[0];
        const page = story.pages.find(p => p.pageIndex === this.currentPageIndex);
        if (!page || !page.quest) return;

        const selected = page.quest.options[optIdx];
        const fbEl = document.getElementById('story-quest-feedback');

        if (selected.isCorrect) {
            SoundEngine.playTing();
            App.addStar();
            if (fbEl) {
                fbEl.style.color = '#10b981';
                fbEl.innerHTML = `🎉 <strong>Chính xác!</strong> ${selected.praise || 'Bé làm rất tốt!'} ⭐ +1 Sao!`;
            }
            SoundEngine.speakFallback(selected.praise || 'Bé giỏi quá!');
        } else {
            SoundEngine.playSoftNotice();
            if (fbEl) {
                fbEl.style.color = '#ef4444';
                fbEl.innerHTML = `🌟 Bé hãy thử chọn lại một đồ vật khác nhé!`;
            }
            SoundEngine.speakFallback("Bé hãy thử lại một lần nữa nhé!");
        }
    }
};
