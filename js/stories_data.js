/**
 * KED - Stories Data Module v7.0
 * Kho dữ liệu truyện tranh tương tác 2 phần:
 *   - Phần 1: Đọc truyện cho bé (Tranh minh họa SVG lớn, lời kể súc tích, giọng đọc truyền cảm)
 *   - Phần 2: Tương tác truyện & Thu hoạch kiến thức (Sa bàn hành động + Câu hỏi thực tế cuộc sống)
 */

const STORIES_DATA = [
    {
        id: "rainy_day",
        title: "Thỏ Con Đi Dạo Trời Mưa",
        icon: "🐰",
        badge: "Kỹ năng sống",
        lessonTitle: "Bé Biết Đi Mưa An Toàn",
        lessonSummary: "Bé biết tự bảo vệ khi trời mưa: luôn nhớ mang theo ô dù hoặc áo mưa, và nhanh chóng tìm nơi trú an toàn khi có sấm chớp!",
        badgeReward: {
            name: "Huy Hiệu Ô Che Mưa An Toàn",
            icon: "☂️",
            desc: "Bé đã thu hoạch kỹ năng tự bảo vệ bản thân khi trời đổ mưa!"
        },
        readingPages: [
            {
                pageIndex: 1,
                audioKey: "story_rainy_p1",
                title: "Thỏ Trắng Tung Tăng Hái Nấm",
                text: "Hôm nay là một ngày đẹp trời, Thỏ Trắng tung tăng vào rừng hái nấm.",
                voiceText: "Hôm nay là một ngày đẹp trời, Thỏ Trắng tung tăng vào rừng hái nấm.",
                bgStyle: "linear-gradient(135deg, #ecfccb 0%, #bae6fd 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 250 Q 150 200 300 240 Q 450 280 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <path d="M 0 280 Q 200 250 400 270 Q 500 280 600 260 L 600 350 L 0 350 Z" fill="#4ade80" />
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('sun', 'Mặt trời chiếu những tia nắng vàng ấm áp!')" style="cursor:pointer;">
                            <circle cx="500" cy="80" r="45" fill="#facc15" stroke="#eab308" stroke-width="4"/>
                            <circle cx="500" cy="80" r="38" fill="#fde047"/>
                            <circle cx="488" cy="74" r="5" fill="#1e293b"/>
                            <circle cx="512" cy="74" r="5" fill="#1e293b"/>
                            <path d="M 490 92 Q 500 102 510 92" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('mushroom', 'Cây nấm đỏ chấm bi thật xinh đẹp!')" style="cursor:pointer;">
                            <rect x="140" y="270" width="20" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                            <path d="M 115 275 C 115 230 185 230 185 275 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
                            <circle cx="135" cy="255" r="5" fill="#ffffff"/>
                            <circle cx="165" cy="255" r="6" fill="#ffffff"/>
                            <circle cx="150" cy="242" r="4" fill="#ffffff"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('rabbit', 'Thỏ Trắng chào bé yêu! Chúc bé một ngày vui vẻ!')" style="cursor:pointer;">
                            <ellipse cx="285" cy="150" rx="14" ry="45" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(-10 285 150)"/>
                            <ellipse cx="285" cy="150" rx="7" ry="32" fill="#fbcfe8" transform="rotate(-10 285 150)"/>
                            <ellipse cx="325" cy="150" rx="14" ry="45" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(10 325 150)"/>
                            <ellipse cx="325" cy="150" rx="7" ry="32" fill="#fbcfe8" transform="rotate(10 325 150)"/>
                            <circle cx="305" cy="205" r="42" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                            <ellipse cx="292" cy="198" rx="5" ry="7" fill="#1e293b"/>
                            <circle cx="294" cy="195" r="2" fill="#ffffff"/>
                            <ellipse cx="318" cy="198" rx="5" ry="7" fill="#1e293b"/>
                            <circle cx="320" cy="195" r="2" fill="#ffffff"/>
                            <polygon points="305,208 300,214 310,214" fill="#f43f5e"/>
                            <circle cx="280" cy="212" r="8" fill="#fda4af" opacity="0.6"/>
                            <circle cx="330" cy="212" r="8" fill="#fda4af" opacity="0.6"/>
                            <ellipse cx="305" cy="275" rx="45" ry="35" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                            <rect x="330" y="260" width="30" height="25" rx="5" fill="#d97706" stroke="#92400e" stroke-width="2"/>
                            <path d="M 335 260 C 335 245 355 245 355 260" stroke="#92400e" stroke-width="3" fill="none"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé hãy chạm vào Bạn Thỏ, Mặt Trời hoặc Cây Nấm nhé!"
            },
            {
                pageIndex: 2,
                audioKey: "story_rainy_p2",
                title: "Cơn Mưa Rào Kéo Đến",
                text: "Bất ngờ, những đám mây đen kéo tới, trời bắt đầu đổ cơn mưa rào tí tách!",
                voiceText: "Bất ngờ, những đám mây đen kéo tới, trời bắt đầu đổ cơn mưa rào tí tách!",
                bgStyle: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('raincloud', 'Mưa rơi tí tách tí tách!')" style="cursor:pointer;">
                            <path d="M 220 70 C 220 40 270 30 300 50 C 330 20 380 30 400 60 C 430 60 450 90 430 115 C 430 135 390 145 360 135 C 340 150 280 150 260 130 C 230 135 210 110 220 70 Z" fill="#64748b" stroke="#334155" stroke-width="3"/>
                            <line x1="250" y1="160" x2="240" y2="190" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="300" y1="165" x2="290" y2="195" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="350" y1="160" x2="340" y2="190" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="400" y1="165" x2="390" y2="195" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('rabbit_rain', 'Ôi trời mưa rồi, Thỏ con cần che ô để không ướt lông!')" style="cursor:pointer;">
                            <ellipse cx="285" cy="180" rx="14" ry="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(-15 285 180)"/>
                            <ellipse cx="325" cy="180" rx="14" ry="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(15 325 180)"/>
                            <circle cx="305" cy="225" r="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                            <ellipse cx="292" cy="220" rx="5" ry="7" fill="#1e293b"/>
                            <ellipse cx="318" cy="220" rx="5" ry="7" fill="#1e293b"/>
                            <polygon points="305,228 300,233 310,233" fill="#f43f5e"/>
                            <ellipse cx="305" cy="285" rx="42" ry="32" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé hãy chạm vào Đám Mây Mưa để nghe tiếng mưa rơi nhé!"
            },
            {
                pageIndex: 3,
                audioKey: "story_rainy_p3",
                title: "Thỏ Con Trở Về An Toàn",
                text: "Cảm ơn bé yêu! Thỏ con đã có chiếc ô che mưa và an toàn trở về nhà cùng mẹ!",
                voiceText: "Cảm ơn bé yêu! Thỏ con đã có chiếc ô che mưa và an toàn trở về nhà cùng mẹ!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #fed7aa 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="450,150 350,220 550,220" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
                        <rect x="370" y="220" width="160" height="90" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
                        <rect x="420" y="250" width="35" height="60" rx="3" fill="#b45309"/>
                        <path d="M 50 300 A 250 250 0 0 1 550 300" fill="none" stroke="#f43f5e" stroke-width="8" opacity="0.8"/>
                        <path d="M 60 300 A 240 240 0 0 1 540 300" fill="none" stroke="#facc15" stroke-width="8" opacity="0.8"/>
                        <path d="M 70 300 A 230 230 0 0 1 530 300" fill="none" stroke="#38bdf8" stroke-width="8" opacity="0.8"/>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('happy_rabbit', 'Hoan hô bé yêu! Bé thật là tốt bụng!')" style="cursor:pointer;">
                            <path d="M 170 190 C 170 130 270 130 270 190 Z" fill="#ec4899" stroke="#be185d" stroke-width="3"/>
                            <line x1="220" y1="190" x2="220" y2="240" stroke="#475569" stroke-width="4"/>
                            <circle cx="250" cy="240" r="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <ellipse cx="242" cy="205" rx="7" ry="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(-10 242 205)"/>
                            <ellipse cx="258" cy="205" rx="7" ry="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(10 258 205)"/>
                            <circle cx="245" cy="238" r="3" fill="#1e293b"/>
                            <circle cx="255" cy="238" r="3" fill="#1e293b"/>
                            <polygon points="250,242 247,246 253,246" fill="#f43f5e"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé hãy chạm vào Thỏ Con Cầm Ô để cùng bạn ấy ăn mừng nhé!"
            }
        ],
        actionQuest: {
            title: "Hành Động: Mở Ô Che Mưa Cho Thỏ Con!",
            instruction: "Trời đang mưa rào! Bé hãy chạm vào Chiếc Ô ☂️ để mở ô che mưa giúp bạn Thỏ không bị ướt nhé!",
            speech: "Trời đang mưa rào! Bé hãy chạm vào Chiếc Ô để mở ô che mưa giúp bạn Thỏ nào!",
            actionIcon: "☂️",
            actionLabel: "Chạm Mở Ô Che Mưa",
            targetName: "Bạn Thỏ Trắng",
            successPraise: "Hoan hô bé yêu! Chiếc ô xinh xắn đã mở ra che chở cho bạn Thỏ khô ráo rồi!"
        },
        lifeSkillQuizzes: [
            {
                question: "Trước khi ra khỏi nhà mà thấy mây đen sắp mưa to, bé cần mang theo đồ gì?",
                speech: "Trước khi ra khỏi nhà mà thấy mây đen sắp mưa to, bé cần mang theo đồ gì nào?",
                audioKey: "quest_rainy_prompt",
                options: [
                    { icon: "☂️", text: "Chiếc Ô Che Mưa / Áo Mưa", isCorrect: true, feedback: "Chính xác! Mang ô hoặc áo mưa giúp bé không bị ướt và không bị cảm lạnh nhé!" },
                    { icon: "🕶️", text: "Kính Râm Đi Nắng", isCorrect: false, feedback: "Kính râm chỉ dùng khi trời nắng thôi bé nhé!" },
                    { icon: "🪭", text: "Chiếc Quạt Giấy", isCorrect: false, feedback: "Quạt giấy không che được mưa đâu bé ơi!" }
                ]
            },
            {
                question: "Nếu đang đi ngoài đường mà gặp cơn mưa to có sấm chớp, bé nên làm gì?",
                speech: "Nếu đang đi ngoài đường mà gặp cơn mưa to có sấm sét, bé nên làm gì để an toàn?",
                options: [
                    { icon: "🏠", text: "Vào Nhà Trú Mưa An Toàn", isCorrect: true, feedback: "Bé rất thông minh! Trú mưa trong nhà là an toàn nhất, tuyệt đối không đứng dưới gốc cây to khi có sấm sét!" },
                    { icon: "🌳", text: "Đứng Dưới Gốc Cây To", isCorrect: false, feedback: "Không nên đứng dưới gốc cây to vì rất dễ bị sét đánh nguy hiểm bé nhé!" },
                    { icon: "🌧️", text: "Tiếp Tục Chạy Tắm Mưa", isCorrect: false, feedback: "Tắm mưa dễ bị ốm sốt và nguy hiểm khi có sấm sét bé nhé!" }
                ]
            }
        ]
    },
    {
        id: "tortoise_and_hare",
        title: "Rùa và Thỏ Chạy Thi",
        icon: "🐢",
        badge: "Đức tính tốt",
        lessonTitle: "Bé Kiên Trì Cố Gắng",
        lessonSummary: "Bé học đức tính kiên trì, chăm chỉ và khiêm tốn: kiên trì từng bước một sẽ giúp bé tiến bộ và đạt được thành công!",
        badgeReward: {
            name: "Huy Hiệu Kiên Trì Cố Gắng",
            icon: "🐢",
            desc: "Bé đã thu hoạch đức tính kiên trì và không chủ quan kiêu ngạo!"
        },
        readingPages: [
            {
                pageIndex: 1,
                audioKey: "story_hare_p1",
                title: "Vạch Xuất Phát Cuộc Đua",
                text: "Hôm nay tại khu rừng xanh, bạn Rùa và bạn Thỏ cùng chuẩn bị cho cuộc thi chạy thi đầy hào hứng!",
                voiceText: "Hôm nay tại khu rừng xanh, bạn Rùa và bạn Thỏ cùng chuẩn bị cho cuộc thi chạy thi đầy hào hứng!",
                bgStyle: "linear-gradient(135deg, #bae6fd 0%, #bbf7d0 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 240 Q 150 200 300 230 Q 450 260 600 220 L 600 350 L 0 350 Z" fill="#86efac" />
                        <rect x="0" y="270" width="600" height="80" fill="#fde68a"/>
                        <line x1="280" y1="270" x2="280" y2="350" stroke="#ffffff" stroke-width="12" stroke-dasharray="10 10"/>
                        <rect x="270" y="140" width="10" height="130" fill="#64748b"/>
                        <polygon points="280,140 350,165 280,190" fill="#ef4444"/>
                        <text x="290" y="172" fill="#ffffff" font-size="14" font-weight="bold">START</text>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('referee_bear', 'Bác Gấu hô to: Một, hai, ba, xuất phát!')" style="cursor:pointer;">
                            <circle cx="310" cy="190" r="32" fill="#92400e" stroke="#78350f" stroke-width="2"/>
                            <circle cx="290" cy="165" r="10" fill="#78350f"/>
                            <circle cx="330" cy="165" r="10" fill="#78350f"/>
                            <ellipse cx="310" cy="202" rx="10" ry="7" fill="#fef3c7"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('fast_hare', 'Thỏ con cười lớn: Tớ chạy nhanh như gió!')" style="cursor:pointer;">
                            <ellipse cx="430" cy="220" rx="14" ry="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" transform="rotate(15 430 220)"/>
                            <circle cx="435" cy="255" r="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <rect x="420" y="325" width="22" height="12" rx="5" fill="#ef4444"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('steady_turtle', 'Rùa con mỉm cười: Tớ sẽ cố gắng hết sức từng bước một!')" style="cursor:pointer;">
                            <ellipse cx="140" cy="285" rx="45" ry="32" fill="#15803d" stroke="#166534" stroke-width="3"/>
                            <ellipse cx="195" cy="275" rx="18" ry="14" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <rect x="180" y="263" width="24" height="6" fill="#ef4444" rx="2"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Bạn Thỏ, Bạn Rùa hoặc Bác Gấu nhé!"
            },
            {
                pageIndex: 2,
                audioKey: "story_hare_p2",
                title: "Thỏ Ngủ Quên Dưới Gốc Cây",
                text: "Thỏ con cậy mình chạy nhanh nên nằm ngủ say sưa dưới bóng cây. Bạn Rùa vẫn kiên trì từng bước tiến lên!",
                voiceText: "Thỏ con cậy mình chạy nhanh nên nằm ngủ say sưa dưới bóng cây. Bạn Rùa vẫn kiên trì từng bước tiến lên!",
                bgStyle: "linear-gradient(135deg, #dcfce7 0%, #fef9c3 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 250 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('big_tree', 'Cây đại thụ tỏa bóng mát rượi!')" style="cursor:pointer;">
                            <rect x="420" y="120" width="45" height="180" fill="#78350f" rx="8"/>
                            <circle cx="440" cy="110" r="85" fill="#15803d" opacity="0.95"/>
                            <circle cx="410" cy="90" r="9" fill="#ef4444"/>
                            <circle cx="470" cy="100" r="9" fill="#ef4444"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('sleepy_hare', 'Thỏ con ngáy khò khò: Còn sớm chán, ngủ thêm tí nữa!')" style="cursor:pointer;">
                            <text x="350" y="210" fill="#6366f1" font-size="24" font-weight="bold">Z</text>
                            <text x="370" y="195" fill="#818cf8" font-size="20" font-weight="bold">z</text>
                            <ellipse cx="360" cy="285" rx="38" ry="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <circle cx="330" cy="275" r="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('racing_turtle', 'Rùa con kiên trì: Từng bước, từng bước, tớ sắp vượt qua Thỏ rồi!')" style="cursor:pointer;">
                            <ellipse cx="180" cy="290" rx="42" ry="28" fill="#15803d" stroke="#166534" stroke-width="3"/>
                            <ellipse cx="230" cy="282" rx="16" ry="12" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <circle cx="234" cy="280" r="3" fill="#1e293b"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Thỏ đang ngủ hoặc Rùa đang chạy nhé!"
            },
            {
                pageIndex: 3,
                audioKey: "story_hare_p3",
                title: "Bạn Rùa Về Đích Chiến Thắng",
                text: "Hoan hô bạn Rùa kiên trì đã chạm vạch đích đầu tiên! Thỏ con xấu hổ và nhận ra bài học quý giá!",
                voiceText: "Hoan hô bạn Rùa kiên trì đã chạm vạch đích đầu tiên! Thỏ con xấu hổ và nhận ra bài học quý giá!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #fbcfe8 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="80" r="18" fill="#f43f5e"/>
                        <circle cx="500" cy="80" r="20" fill="#facc15"/>
                        <rect x="220" y="120" width="160" height="30" fill="#ef4444" rx="4"/>
                        <text x="250" y="142" fill="#ffffff" font-size="16" font-weight="bold">🏆 VỀ ĐÍCH 🏆</text>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('champion_turtle', 'Hoan hô bạn Rùa chăm chỉ đã xuất sắc giành chiến thắng!')" style="cursor:pointer;">
                            <rect x="260" y="270" width="80" height="50" fill="#fbbf24" stroke="#d97706" stroke-width="3" rx="5"/>
                            <text x="295" y="302" fill="#78350f" font-size="22" font-weight="bold">1</text>
                            <ellipse cx="300" cy="240" rx="35" ry="24" fill="#15803d" stroke="#166534" stroke-width="2.5"/>
                            <polygon points="290,192 295,182 300,188 305,182 310,192" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('ashamed_hare', 'Thỏ con xấu hổ: Từ nay tớ hứa sẽ không bao giờ kiêu ngạo nữa!')" style="cursor:pointer;">
                            <circle cx="130" cy="290" r="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
                            <circle cx="142" cy="296" r="3" fill="#38bdf8"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Bạn Rùa Chiến Thắng hoặc Cúp Vàng nhé!"
            }
        ],
        actionQuest: {
            title: "Hành Động: Cổ Vũ Bạn Rùa Về Đích!",
            instruction: "Bé hãy chạm 3 lần vào Bạn Rùa 🐢 để tiếp sức cho Rùa từng bước tiến về vạch đích nhé!",
            speech: "Bé hãy chạm ba lần vào Bạn Rùa để tiếp sức cho Rùa kiên trì tiến về vạch đích nào!",
            actionIcon: "🐢",
            actionLabel: "Chạm Cổ Vũ Bạn Rùa",
            stepsNeeded: 3,
            successPraise: "Hoan hô! Nhờ có sự cổ vũ nhiệt tình của bé, bạn Rùa kiên trì đã xuất sắc về đích và nhận Cúp Vàng!"
        },
        lifeSkillQuizzes: [
            {
                question: "Khi tham gia trò chơi hoặc học tập, thái độ nào sẽ giúp bé ngày càng tiến bộ?",
                speech: "Khi tham gia trò chơi hoặc học tập, thái độ nào sẽ giúp bé ngày càng tiến bộ?",
                audioKey: "quest_hare_q3",
                options: [
                    { icon: "🐢", text: "Kiên Trì Cố Gắng Từng Ngày", isCorrect: true, feedback: "Tuyệt vời! Chăm chỉ, kiên trì không bỏ cuộc sẽ giúp bé làm được mọi việc!" },
                    { icon: "🐰", text: "Chủ Quan Xem Thường Người Khác", isCorrect: false, feedback: "Chủ quan kiêu ngạo sẽ dễ bị thất bại như bạn Thỏ đấy bé!" }
                ]
            },
            {
                question: "Nếu gặp một bài tập hoặc việc khó chưa làm tốt, bé nên làm gì?",
                speech: "Nếu gặp một bài tập hoặc việc khó chưa làm tốt, bé yêu nên làm gì nào?",
                options: [
                    { icon: "💪", text: "Bình Tĩnh Thử Lại Nhiều Lần", isCorrect: true, feedback: "Đúng rồi! Cứ kiên trì từng bước nhỏ bé sẽ vượt qua được mọi khó khăn!" },
                    { icon: "😭", text: "Bỏ Cuộc Và Khóc Nhè", isCorrect: false, feedback: "Khóc nhè không giải quyết được vấn đề đâu bé nhé!" }
                ]
            }
        ]
    },
    {
        id: "pulling_turnip",
        title: "Nhổ Củ Cải Khổng Lồ",
        icon: "🥕",
        badge: "Tinh thần đoàn kết",
        lessonTitle: "Bé Biết Đoàn Kết",
        lessonSummary: "Bé hiểu sức mạnh của sự đoàn kết: cùng nhau chung tay giúp đỡ thì việc to lớn hay khó khăn mấy cũng sẽ thành công!",
        badgeReward: {
            name: "Huy Hiệu Đoàn Kết Giúp Đỡ",
            icon: "🤝",
            desc: "Bé đã thu hoạch tinh thần đoàn kết và biết giúp đỡ mọi người!"
        },
        readingPages: [
            {
                pageIndex: 1,
                audioKey: "story_turnip_p1",
                title: "Củ Cải Khổng Lồ Trong Vườn",
                text: "Trong khu vườn nhà, có một củ cải trắng khổng lồ to ơi là to. Ông lão ra sức kéo mà củ cải không hề nhúc nhích!",
                voiceText: "Trong khu vườn nhà, có một củ cải trắng khổng lồ to ơi là to. Ông lão ra sức kéo mà củ cải không hề nhúc nhích!",
                bgStyle: "linear-gradient(135deg, #fed7aa 0%, #dcfce7 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 240 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <rect x="0" y="270" width="600" height="80" fill="#92400e"/>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('giant_turnip', 'Củ cải trắng to lớn khổng lồ!')" style="cursor:pointer;">
                            <path d="M 190 190 C 170 120 220 100 220 180" stroke="#15803d" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <ellipse cx="220" cy="245" rx="65" ry="60" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('old_grandpa', 'Ông già: Nhổ cải lên! Nặng quá đi mất!')" style="cursor:pointer;">
                            <circle cx="360" cy="210" r="28" fill="#fed7aa" stroke="#fbd38d" stroke-width="2"/>
                            <path d="M 345 220 Q 360 255 375 220 Z" fill="#ffffff"/>
                            <line x1="340" y1="240" x2="270" y2="200" stroke="#fed7aa" stroke-width="10" stroke-linecap="round"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Củ Cải Khổng Lồ hoặc Ông Già nhé!"
            },
            {
                pageIndex: 2,
                audioKey: "story_turnip_p2",
                title: "Cả Nhà Cùng Chung Sức",
                text: "Ông lão gọi bà lão, bà lão gọi cháu gái, cháu gái gọi cún con. Mọi người cùng chung sức kéo củ cải!",
                voiceText: "Ông lão gọi bà lão, bà lão gọi cháu gái, cháu gái gọi cún con. Mọi người cùng chung sức kéo củ cải!",
                bgStyle: "linear-gradient(135deg, #e0e7ff 0%, #fef3c7 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 250 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <ellipse cx="90" cy="255" rx="50" ry="45" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_grandpa', 'Ông già: Dô ta nhổ cải lên!')" style="cursor:pointer;">
                            <circle cx="190" cy="220" r="22" fill="#fed7aa"/>
                            <ellipse cx="205" cy="275" rx="25" ry="22" fill="#b45309"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_grandma', 'Bà lão: Cố lên nào mọi người ơi!')" style="cursor:pointer;">
                            <circle cx="290" cy="220" r="22" fill="#fed7aa"/>
                            <ellipse cx="300" cy="275" rx="24" ry="22" fill="#0284c7"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_girl', 'Cháu gái: Kéo mãi, kéo mãi!')" style="cursor:pointer;">
                            <circle cx="390" cy="235" r="18" fill="#fed7aa"/>
                            <ellipse cx="395" cy="285" rx="18" ry="18" fill="#ec4899"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_dog', 'Cún con: Gâu gâu! Em cùng kéo nè!')" style="cursor:pointer;">
                            <circle cx="480" cy="275" r="16" fill="#f59e0b"/>
                            <ellipse cx="510" cy="295" rx="22" ry="14" fill="#f59e0b"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Ông, Bà, Cháu Gái hoặc Chú Cún Con nhé!"
            },
            {
                pageIndex: 3,
                audioKey: "story_turnip_p3",
                title: "Củ Cải Khổng Lồ Bật Lên",
                text: "Thêm mèo mướp và bé chuột nhắt cùng hợp sức kéo, củ cải khổng lồ đã bật lên khỏi mặt đất rồi!",
                voiceText: "Thêm mèo mướp và bé chuột nhắt cùng hợp sức kéo, củ cải khổng lồ đã bật lên khỏi mặt đất rồi!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #bbf7d0 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="40" r="7" fill="#3b82f6"/>
                        <circle cx="450" cy="50" r="8" fill="#eab308"/>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('pulled_turnip', 'Hoan hô! Củ cải khổng lồ bật lên rồi!')" style="cursor:pointer;">
                            <ellipse cx="220" cy="180" rx="60" ry="55" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('hero_mouse', 'Bé Chuột Nhắt nhỏ bé nhưng đoàn kết cùng mọi người!')" style="cursor:pointer;">
                            <ellipse cx="440" cy="285" rx="18" ry="12" fill="#94a3b8"/>
                            <circle cx="425" cy="280" r="10" fill="#94a3b8"/>
                        </g>
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('soup_pot', 'Nồi súp củ cải thơm lừng ngọt ngào!')" style="cursor:pointer;">
                            <rect x="310" y="270" width="55" height="35" rx="6" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Củ Cải Bật Lên, Bé Chuột Nhắt hoặc Nồi Súp nhé!"
            }
        ],
        actionQuest: {
            title: "Hành Động: Nối Vòng Tay Đoàn Kết!",
            instruction: "Bé hãy chạm lần lượt: Ông Lão 👴 ➔ Bà Lão 👵 ➔ Cháu Gái 👧 ➔ Cún Con 🐶 để cùng chung sức nhổ cải nhé!",
            speech: "Bé hãy chạm lần lượt: Ông Lão, Bà Lão, Cháu Gái và Cún Con để cùng chung sức nhổ cải nào!",
            chain: [
                { id: "grandpa", name: "Ông Lão", icon: "👴" },
                { id: "grandma", name: "Bà Lão", icon: "👵" },
                { id: "girl", name: "Cháu Gái", icon: "👧" },
                { id: "dog", name: "Cún Con", icon: "🐶" }
            ],
            successPraise: "Tuyệt đỉnh! Cả gia đình đoàn kết đã nhổ được củ cải khổng lồ lên rồi! Hoan hô bé yêu!"
        },
        lifeSkillQuizzes: [
            {
                question: "Khi gặp một công việc nặng hoặc khó khăn một mình không làm nổi, bé nên làm gì?",
                speech: "Khi gặp một công việc nặng hoặc khó khăn một mình không làm nổi, bé nên làm gì?",
                audioKey: "quest_turnip_q3",
                options: [
                    { icon: "🤝", text: "Kêu Gọi Mọi Người Cùng Chung Sức Giúp Đỡ", isCorrect: true, feedback: "Chính xác! Đoàn kết và giúp đỡ nhau sẽ biến việc khó thành việc dễ!" },
                    { icon: "😤", text: "Cố Làm Một Mình Rồi Cáu Gắt", isCorrect: false, feedback: "Cáu gắt chỉ làm bé thêm mệt mỏi thôi bé ơi!" }
                ]
            },
            {
                question: "Dù nhỏ bé như bạn Chuột Nhắt, bé yêu có thể giúp đỡ gia đình những việc gì?",
                speech: "Dù nhỏ bé như bạn Chuột Nhắt, bé yêu có thể giúp đỡ gia đình những việc gì nào?",
                options: [
                    { icon: "🧹", text: "Cất Đồ Chơi, Giúp Mẹ Quét Nhà", isCorrect: true, feedback: "Bé ngoan lắm! Bé làm việc nhỏ có ích mỗi ngày là đã góp sức cùng gia đình rồi!" },
                    { icon: "📺", text: "Chỉ Ngồi Xem Tivi Cả Ngày", isCorrect: false, feedback: "Xem tivi nhiều không tốt cho mắt và không giúp được ba mẹ đâu nhé!" }
                ]
            }
        ]
    }
];
