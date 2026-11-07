/**
 * KED - Stories Data Module v6.4
 * Kho dữ liệu truyện tranh tương tác đa giác quan cho bé 3-5 tuổi
 */

const STORIES_DATA = [
    {
        id: "rainy_day",
        title: "Thỏ Con Đi Dạo Trời Mưa",
        icon: "🐰",
        description: "Bé cùng Thỏ Trắng khám phá các vật dụng cần thiết khi trời đổ mưa to nhé!",
        badge: "Kỹ năng sống",
        pages: [
            {
                pageIndex: 1,
                audioKey: "story_rainy_p1",
                text: "Hôm nay là một ngày đẹp trời, Thỏ Trắng tung tăng vào rừng hái nấm.",
                voiceText: "Hôm nay là một ngày đẹp trời, Thỏ Trắng tung tăng vào rừng hái nấm.",
                bgStyle: "linear-gradient(135deg, #ecfccb 0%, #bae6fd 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Bầu trời xanh & Đồi cỏ xanh -->
                        <path d="M 0 250 Q 150 200 300 240 Q 450 280 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <path d="M 0 280 Q 200 250 400 270 Q 500 280 600 260 L 600 350 L 0 350 Z" fill="#4ade80" />
                        <!-- Mặt trời tỏa nắng dịu dàng (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('sun', 'Mặt trời chiếu những tia nắng vàng ấm áp!')" style="cursor:pointer;">
                            <circle cx="500" cy="80" r="45" fill="#facc15" stroke="#eab308" stroke-width="4"/>
                            <circle cx="500" cy="80" r="38" fill="#fde047"/>
                            <circle cx="488" cy="74" r="5" fill="#1e293b"/>
                            <circle cx="512" cy="74" r="5" fill="#1e293b"/>
                            <path d="M 490 92 Q 500 102 510 92" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round"/>
                        </g>
                        <!-- Cây nấm xinh xắn (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('mushroom', 'Cây nấm đỏ chấm bi thật xinh đẹp!')" style="cursor:pointer;">
                            <rect x="140" y="270" width="20" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                            <path d="M 115 275 C 115 230 185 230 185 275 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
                            <circle cx="135" cy="255" r="5" fill="#ffffff"/>
                            <circle cx="165" cy="255" r="6" fill="#ffffff"/>
                            <circle cx="150" cy="242" r="4" fill="#ffffff"/>
                        </g>
                        <!-- Nhân vật Thỏ Trắng đáng yêu -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('rabbit', 'Thỏ Trắng chào bé yêu! Chúc bé một ngày vui vẻ!')" style="cursor:pointer;">
                            <!-- Đôi tai thỏ dài -->
                            <ellipse cx="285" cy="150" rx="14" ry="45" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(-10 285 150)"/>
                            <ellipse cx="285" cy="150" rx="7" ry="32" fill="#fbcfe8" transform="rotate(-10 285 150)"/>
                            <ellipse cx="325" cy="150" rx="14" ry="45" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" transform="rotate(10 325 150)"/>
                            <ellipse cx="325" cy="150" rx="7" ry="32" fill="#fbcfe8" transform="rotate(10 325 150)"/>
                            <!-- Đầu thỏ tròn -->
                            <circle cx="305" cy="205" r="42" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                            <!-- Mắt thỏ long lanh -->
                            <ellipse cx="292" cy="198" rx="5" ry="7" fill="#1e293b"/>
                            <circle cx="294" cy="195" r="2" fill="#ffffff"/>
                            <ellipse cx="318" cy="198" rx="5" ry="7" fill="#1e293b"/>
                            <circle cx="320" cy="195" r="2" fill="#ffffff"/>
                            <!-- Mũi hồng và miệng cười -->
                            <polygon points="305,208 300,214 310,214" fill="#f43f5e"/>
                            <path d="M 305 214 L 305 219 M 305 219 Q 299 224 294 220 M 305 219 Q 311 224 316 220" stroke="#475569" stroke-width="2" fill="none" stroke-linecap="round"/>
                            <!-- Má hồng -->
                            <circle cx="280" cy="212" r="8" fill="#fda4af" opacity="0.6"/>
                            <circle cx="330" cy="212" r="8" fill="#fda4af" opacity="0.6"/>
                            <!-- Thân thỏ -->
                            <ellipse cx="305" cy="275" rx="45" ry="35" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
                            <!-- Giỏ mây đựng nấm -->
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
                text: "Bất ngờ, những đám mây đen kéo tới, trời bắt đầu đổ cơn mưa rào tí tách!",
                voiceText: "Bất ngờ, những đám mây đen kéo tới, trời bắt đầu đổ cơn mưa rào tí tách!",
                bgStyle: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Mây mưa bồng bềnh -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('raincloud', 'Mưa rơi tí tách tí tách!')" style="cursor:pointer;">
                            <path d="M 220 70 C 220 40 270 30 300 50 C 330 20 380 30 400 60 C 430 60 450 90 430 115 C 430 135 390 145 360 135 C 340 150 280 150 260 130 C 230 135 210 110 220 70 Z" fill="#64748b" stroke="#334155" stroke-width="3"/>
                            <!-- Giọt mưa rơi -->
                            <line x1="250" y1="160" x2="240" y2="190" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="300" y1="165" x2="290" y2="195" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="350" y1="160" x2="340" y2="190" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                            <line x1="400" y1="165" x2="390" y2="195" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                        </g>
                        <!-- Thỏ con ngơ ngác cần giúp đỡ -->
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
                touchHints: "Bé hãy chạm vào Đám Mây Mưa để nghe tiếng mưa rơi nhé!",
                quest: {
                    prompt: "Bé hãy chọn đồ vật giúp Thỏ Con không bị ướt mưa nhé:",
                    audioPrompt: "Bé hãy chọn đồ vật giúp Thỏ Con không bị ướt mưa nào?",
                    audioKey: "quest_rainy_prompt",
                    options: [
                        { icon: "☂️", name: "Chiếc Ô Che Mưa", isCorrect: true, praise: "Bé thông minh quá! Chiếc ô che mưa giúp bạn Thỏ luôn khô ráo!" },
                        { icon: "🕶️", name: "Kính Râm", isCorrect: false },
                        { icon: "🪭", name: "Chiếc Quạt", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 3,
                audioKey: "story_rainy_p3",
                text: "Cảm ơn bé yêu! Thỏ con đã có chiếc ô xinh xắn che mưa và an toàn trở về nhà cùng mẹ!",
                voiceText: "Cảm ơn bé yêu! Thỏ con đã có chiếc ô xinh xắn che mưa và an toàn trở về nhà cùng mẹ!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #fed7aa 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Ngôi nhà ấm cúng -->
                        <polygon points="450,150 350,220 550,220" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
                        <rect x="370" y="220" width="160" height="90" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
                        <rect x="420" y="250" width="35" height="60" rx="3" fill="#b45309"/>
                        <!-- Cầu vồng rực rỡ sau mưa -->
                        <path d="M 50 300 A 250 250 0 0 1 550 300" fill="none" stroke="#f43f5e" stroke-width="8" opacity="0.8"/>
                        <path d="M 60 300 A 240 240 0 0 1 540 300" fill="none" stroke="#facc15" stroke-width="8" opacity="0.8"/>
                        <path d="M 70 300 A 230 230 0 0 1 530 300" fill="none" stroke="#38bdf8" stroke-width="8" opacity="0.8"/>
                        <!-- Thỏ con cầm ô cười hạnh phúc -->
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
        ]
    },
    {
        id: "tortoise_and_hare",
        title: "Rùa và Thỏ Chạy Thi",
        icon: "🐢",
        description: "Bé học bài học kiên trì, không kiêu ngạo qua cuộc thi chạy thi kinh điển của Rùa và Thỏ!",
        badge: "Đức tính tốt",
        pages: [
            {
                pageIndex: 1,
                audioKey: "story_hare_p1",
                text: "Hôm nay tại khu rừng xanh, bạn Rùa và bạn Thỏ cùng chuẩn bị cho cuộc thi chạy thi đầy hào hứng!",
                voiceText: "Hôm nay tại khu rừng xanh, bạn Rùa và bạn Thỏ cùng chuẩn bị cho cuộc thi chạy thi đầy hào hứng!",
                bgStyle: "linear-gradient(135deg, #bae6fd 0%, #bbf7d0 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Đường chạy & Đồi xanh -->
                        <path d="M 0 240 Q 150 200 300 230 Q 450 260 600 220 L 600 350 L 0 350 Z" fill="#86efac" />
                        <rect x="0" y="270" width="600" height="80" fill="#fde68a"/>
                        <!-- Vạch xuất phát kẻ carô -->
                        <line x1="280" y1="270" x2="280" y2="350" stroke="#ffffff" stroke-width="12" stroke-dasharray="10 10"/>
                        <!-- Cột cờ START -->
                        <rect x="270" y="140" width="10" height="130" fill="#64748b"/>
                        <polygon points="280,140 350,165 280,190" fill="#ef4444"/>
                        <text x="290" y="172" fill="#ffffff" font-size="14" font-weight="bold">START</text>
                        <!-- Bác Gấu trọng tài (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('referee_bear', 'Bác Gấu hô to: Các bạn chuẩn bị! Một, hai, ba, xuất phát!')" style="cursor:pointer;">
                            <circle cx="310" cy="190" r="32" fill="#92400e" stroke="#78350f" stroke-width="2"/>
                            <circle cx="290" cy="165" r="10" fill="#78350f"/>
                            <circle cx="330" cy="165" r="10" fill="#78350f"/>
                            <circle cx="302" cy="188" r="4" fill="#ffffff"/>
                            <circle cx="318" cy="188" r="4" fill="#ffffff"/>
                            <circle cx="302" cy="188" r="2" fill="#000000"/>
                            <circle cx="318" cy="188" r="2" fill="#000000"/>
                            <ellipse cx="310" cy="202" rx="10" ry="7" fill="#fef3c7"/>
                            <polygon points="310,198 306,203 314,203" fill="#1e293b"/>
                            <!-- Còi trọng tài -->
                            <rect x="306" y="208" width="16" height="8" rx="3" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
                        </g>
                        <!-- Bạn Thỏ kiêu ngạo (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('fast_hare', 'Thỏ con cười lớn: Tớ chạy nhanh như gió, Rùa chậm chạp sao thắng được tớ!')" style="cursor:pointer;">
                            <ellipse cx="430" cy="220" rx="14" ry="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" transform="rotate(15 430 220)"/>
                            <ellipse cx="455" cy="225" rx="14" ry="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" transform="rotate(30 455 225)"/>
                            <circle cx="435" cy="255" r="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <ellipse cx="425" cy="250" rx="4" ry="6" fill="#1e293b"/>
                            <ellipse cx="445" cy="250" rx="4" ry="6" fill="#1e293b"/>
                            <polygon points="435,257 430,262 440,262" fill="#f43f5e"/>
                            <path d="M 430 266 Q 435 272 440 266" stroke="#475569" stroke-width="2" fill="none"/>
                            <ellipse cx="435" cy="305" rx="32" ry="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <!-- Giày thể thao đỏ -->
                            <rect x="420" y="325" width="22" height="12" rx="5" fill="#ef4444"/>
                        </g>
                        <!-- Bạn Rùa chăm chỉ (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('steady_turtle', 'Rùa con mỉm cười: Tớ sẽ cố gắng hết sức từng bước một!')" style="cursor:pointer;">
                            <!-- Mai rùa xanh ngọc -->
                            <ellipse cx="140" cy="285" rx="45" ry="32" fill="#15803d" stroke="#166534" stroke-width="3"/>
                            <path d="M 115 285 Q 140 265 165 285" stroke="#86efac" stroke-width="3" fill="none"/>
                            <line x1="140" y1="255" x2="140" y2="315" stroke="#86efac" stroke-width="2.5"/>
                            <!-- Đầu rùa thò ra -->
                            <ellipse cx="195" cy="275" rx="18" ry="14" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <circle cx="198" cy="272" r="3" fill="#1e293b"/>
                            <path d="M 194 282 Q 200 286 206 282" stroke="#166534" stroke-width="2" fill="none"/>
                            <!-- Băng rôn đỏ quyết tâm trên trán rùa -->
                            <rect x="180" y="263" width="24" height="6" fill="#ef4444" rx="2"/>
                            <!-- 4 chân rùa tròn xoe -->
                            <ellipse cx="110" cy="315" rx="12" ry="8" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <ellipse cx="170" cy="315" rx="12" ry="8" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Bạn Thỏ, Bạn Rùa hoặc Bác Gấu nhé!",
                quest: {
                    prompt: "Ai là người thổi còi phát lệnh xuất phát cho cuộc thi chạy?",
                    audioPrompt: "Ai là người thổi còi phát lệnh xuất phát cho cuộc thi chạy vậy bé?",
                    audioKey: "quest_hare_q1",
                    options: [
                        { icon: "🐻", name: "Bác Gấu Trọng Tài", isCorrect: true, praise: "Bé giỏi quá! Bác Gấu cầm còi phát lệnh xuất phát!" },
                        { icon: "🦊", name: "Chú Cáo Đỏ", isCorrect: false },
                        { icon: "🐘", name: "Bác Voi Con", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 2,
                audioKey: "story_hare_p2",
                text: "Thỏ con cậy mình chạy nhanh nên nằm ngủ say sưa dưới bóng cây. Bạn Rùa vẫn kiên trì từng bước tiến lên!",
                voiceText: "Thỏ con cậy mình chạy nhanh nên nằm ngủ say sưa dưới bóng cây. Bạn Rùa vẫn kiên trì từng bước tiến lên!",
                bgStyle: "linear-gradient(135deg, #dcfce7 0%, #fef9c3 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Đồi cỏ hoa -->
                        <path d="M 0 250 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <!-- Cây cổ thụ bóng mát (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('big_tree', 'Cây đại thụ tỏa bóng mát rượi, xào xạc trong gió mát lành!')" style="cursor:pointer;">
                            <rect x="420" y="120" width="45" height="180" fill="#78350f" rx="8"/>
                            <circle cx="440" cy="110" r="85" fill="#15803d" opacity="0.95"/>
                            <circle cx="390" cy="130" r="60" fill="#16a34a"/>
                            <circle cx="490" cy="120" r="65" fill="#22c55e"/>
                            <!-- Trái táo đỏ trên cây -->
                            <circle cx="410" cy="90" r="9" fill="#ef4444"/>
                            <circle cx="470" cy="100" r="9" fill="#ef4444"/>
                        </g>
                        <!-- Thỏ con ngủ khò khò (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('sleepy_hare', 'Thỏ con ngáy khò khò: Khò... khò... Còn sớm chán, ngủ thêm tí nữa!')" style="cursor:pointer;">
                            <!-- Chữ Zzz ngủ -->
                            <text x="350" y="210" fill="#6366f1" font-size="24" font-weight="bold">Z</text>
                            <text x="370" y="195" fill="#818cf8" font-size="20" font-weight="bold">z</text>
                            <text x="385" y="180" fill="#a5b4fc" font-size="16" font-weight="bold">z</text>
                            <!-- Thỏ nằm nghiêng ngủ ngon -->
                            <ellipse cx="360" cy="285" rx="38" ry="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <circle cx="330" cy="275" r="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <!-- Mắt nhắm nghiền -->
                            <path d="M 320 275 Q 325 280 330 275" stroke="#475569" stroke-width="2.5" fill="none"/>
                            <!-- Đôi tai rũ xuống thoải mái -->
                            <ellipse cx="310" cy="255" rx="8" ry="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(-50 310 255)"/>
                        </g>
                        <!-- Bạn Rùa vượt qua cần mẫn (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('racing_turtle', 'Rùa con kiên trì: Từng bước, từng bước, tớ sắp vượt qua Thỏ rồi!')" style="cursor:pointer;">
                            <ellipse cx="180" cy="290" rx="42" ry="28" fill="#15803d" stroke="#166534" stroke-width="3"/>
                            <ellipse cx="230" cy="282" rx="16" ry="12" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <!-- Giọt mồ hôi cố gắng của rùa -->
                            <path d="M 235 265 C 235 260 240 260 240 265 A 3 3 0 0 1 235 265" fill="#38bdf8"/>
                            <circle cx="234" cy="280" r="3" fill="#1e293b"/>
                            <rect x="218" y="272" width="20" height="5" fill="#ef4444" rx="2"/>
                            <ellipse cx="155" cy="315" rx="10" ry="7" fill="#4ade80"/>
                            <ellipse cx="205" cy="315" rx="10" ry="7" fill="#4ade80"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Thỏ đang ngủ hoặc Rùa đang chạy nhé!",
                quest: {
                    prompt: "Thỏ con đã làm gì khi thấy mình chạy trước bạn Rùa rất xa?",
                    audioPrompt: "Thỏ con đã làm gì khi thấy mình chạy trước bạn Rùa rất xa?",
                    audioKey: "quest_hare_q2",
                    options: [
                        { icon: "💤", name: "Nằm Ngủ Dưới Cây", isCorrect: true, praise: "Chính xác! Thỏ con chủ quan và ngủ say dưới bóng cây!" },
                        { icon: "🏊", name: "Đi Tắm Sông", isCorrect: false },
                        { icon: "🍎", name: "Đi Hái Táo", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 3,
                audioKey: "story_hare_p3",
                text: "Hoan hô bạn Rùa kiên trì đã chạm vạch đích đầu tiên! Thỏ con xấu hổ và nhận ra bài học quý giá!",
                voiceText: "Hoan hô bạn Rùa kiên trì đã chạm vạch đích đầu tiên! Thỏ con xấu hổ và nhận ra bài học quý giá!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #fbcfe8 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Pháo hoa & Bóng bay ăn mừng -->
                        <circle cx="100" cy="80" r="18" fill="#f43f5e"/>
                        <circle cx="140" cy="65" r="16" fill="#38bdf8"/>
                        <circle cx="500" cy="80" r="20" fill="#facc15"/>
                        <circle cx="460" cy="65" r="16" fill="#a855f7"/>
                        <!-- Cổng về đích FINISH -->
                        <rect x="220" y="120" width="10" height="150" fill="#64748b"/>
                        <rect x="370" y="120" width="10" height="150" fill="#64748b"/>
                        <rect x="220" y="120" width="160" height="30" fill="#ef4444" rx="4"/>
                        <text x="250" y="142" fill="#ffffff" font-size="16" font-weight="bold">🏆 VỀ ĐÍCH 🏆</text>
                        <!-- Dải băng đỏ vắt qua ngực Rùa chiến thắng -->
                        <line x1="225" y1="250" x2="365" y2="250" stroke="#dc2626" stroke-width="8" stroke-dasharray="12 6"/>
                        <!-- Bạn Rùa đứng trên bục vinh quang (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('champion_turtle', 'Hoan hô bạn Rùa chăm chỉ đã xuất sắc giành chiến thắng!')" style="cursor:pointer;">
                            <rect x="260" y="270" width="80" height="50" fill="#fbbf24" stroke="#d97706" stroke-width="3" rx="5"/>
                            <text x="295" y="302" fill="#78350f" font-size="22" font-weight="bold">1</text>
                            <ellipse cx="300" cy="240" rx="35" ry="24" fill="#15803d" stroke="#166534" stroke-width="2.5"/>
                            <ellipse cx="300" cy="205" rx="16" ry="14" fill="#4ade80" stroke="#166534" stroke-width="2"/>
                            <circle cx="295" cy="202" r="3" fill="#1e293b"/>
                            <circle cx="305" cy="202" r="3" fill="#1e293b"/>
                            <!-- Vương miện vàng trên đầu Rùa -->
                            <polygon points="290,192 295,182 300,188 305,182 310,192" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
                        </g>
                        <!-- Thỏ con chạy đến sau xấu hổ (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('ashamed_hare', 'Thỏ con xấu hổ gãi tai: Từ nay tớ hứa sẽ không bao giờ kiêu ngạo nữa!')" style="cursor:pointer;">
                            <ellipse cx="120" cy="270" rx="12" ry="32" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(-25 120 270)"/>
                            <ellipse cx="140" cy="265" rx="12" ry="32" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(-10 140 265)"/>
                            <circle cx="130" cy="290" r="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
                            <ellipse cx="122" cy="288" rx="3" ry="5" fill="#1e293b"/>
                            <ellipse cx="138" cy="288" rx="3" ry="5" fill="#1e293b"/>
                            <polygon points="130,294 126,298 134,298" fill="#f43f5e"/>
                            <!-- Giọt nước mắt hối hận -->
                            <circle cx="142" cy="296" r="3" fill="#38bdf8"/>
                        </g>
                        <!-- Chiếc Cúp Vàng Lấp Lánh (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('gold_trophy', 'Chiếc Cúp Vàng danh giá dành cho người kiên trì và chăm chỉ nhất!')" style="cursor:pointer;">
                            <path d="M 460 230 L 500 230 L 490 270 L 470 270 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
                            <rect x="472" y="270" width="16" height="20" fill="#eab308"/>
                            <rect x="460" y="290" width="40" height="15" rx="3" fill="#78350f"/>
                            <circle cx="480" cy="245" r="8" fill="#fef08a"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Bạn Rùa Chiến Thắng hoặc Chiếc Cúp Vàng nhé!",
                quest: {
                    prompt: "Ai là người kiên trì và giành chiến thắng trong cuộc đua?",
                    audioPrompt: "Ai là người kiên trì và giành chiến thắng trong cuộc đua chạy thi?",
                    audioKey: "quest_hare_q3",
                    options: [
                        { icon: "🐢", name: "Bạn Rùa Kiên Trì", isCorrect: true, praise: "Tuyệt đỉnh! Bạn Rùa kiên trì từng bước đã chiến thắng vẻ vang!" },
                        { icon: "🐰", name: "Bạn Thỏ Kiêu Ngạo", isCorrect: false },
                        { icon: "🐿️", name: "Bạn Sóc Nhỏ", isCorrect: false }
                    ]
                }
            }
        ]
    },
    {
        id: "pulling_turnip",
        title: "Nhổ Củ Cải Khổng Lồ",
        icon: "🥕",
        description: "Bé học bài học đoàn kết và giúp đỡ nhau qua câu chuyện cả nhà cùng chung sức nhổ củ cải!",
        badge: "Tinh thần đoàn kết",
        pages: [
            {
                pageIndex: 1,
                audioKey: "story_turnip_p1",
                text: "Trong khu vườn nhà, có một củ cải trắng khổng lồ to ơi là to. Ông lão ra sức kéo mà củ cải không hề nhúc nhích!",
                voiceText: "Trong khu vườn nhà, có một củ cải trắng khổng lồ to ơi là to. Ông lão ra sức kéo mà củ cải không hề nhúc nhích!",
                bgStyle: "linear-gradient(135deg, #fed7aa 0%, #dcfce7 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Luống đất vườn màu mỡ -->
                        <path d="M 0 240 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <rect x="0" y="270" width="600" height="80" fill="#92400e"/>
                        <ellipse cx="220" cy="280" rx="90" ry="25" fill="#78350f"/>
                        <!-- Củ Cải Trắng Khổng Lồ (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('giant_turnip', 'Củ cải trắng to lớn khổng lồ, bám rễ sâu dưới lòng đất!')" style="cursor:pointer;">
                            <!-- Tán lá xanh xum xuê -->
                            <path d="M 190 190 C 170 120 220 100 220 180" stroke="#15803d" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <path d="M 220 180 C 230 110 270 110 235 180" stroke="#16a34a" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <path d="M 210 180 C 200 90 250 80 225 180" stroke="#22c55e" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <!-- Thân củ cải to tròn trắng muốt -->
                            <ellipse cx="220" cy="245" rx="65" ry="60" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
                            <path d="M 180 235 Q 220 245 260 235" stroke="#e2e8f0" stroke-width="3" fill="none"/>
                            <path d="M 190 260 Q 220 270 250 260" stroke="#e2e8f0" stroke-width="3" fill="none"/>
                        </g>
                        <!-- Ông già râu tóc bạc phơ kéo củ cải (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('old_grandpa', 'Ông già gắng hết sức: Nhổ cải lên! Nhổ cải lên! Nặng quá đi mất!')" style="cursor:pointer;">
                            <!-- Thân áo nâu -->
                            <ellipse cx="370" cy="275" rx="35" ry="30" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
                            <!-- Đầu ông già -->
                            <circle cx="360" cy="210" r="28" fill="#fed7aa" stroke="#fbd38d" stroke-width="2"/>
                            <!-- Tóc bạc và râu dài trắng -->
                            <circle cx="340" cy="195" r="12" fill="#f8fafc"/>
                            <circle cx="375" cy="195" r="12" fill="#f8fafc"/>
                            <path d="M 345 220 Q 360 255 375 220 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
                            <circle cx="352" cy="208" r="3" fill="#1e293b"/>
                            <circle cx="368" cy="208" r="3" fill="#1e293b"/>
                            <!-- Hai tay nắm chặt lá cải -->
                            <line x1="340" y1="240" x2="270" y2="200" stroke="#fed7aa" stroke-width="10" stroke-linecap="round"/>
                        </g>
                        <!-- Mặt trời ấm áp -->
                        <circle cx="520" cy="70" r="35" fill="#facc15" stroke="#eab308" stroke-width="3"/>
                    </svg>
                `,
                touchHints: "Bé chạm vào Củ Cải Khổng Lồ hoặc Ông Già nhé!",
                quest: {
                    prompt: "Ai là người đầu tiên ra vườn cố gắng nhổ củ cải?",
                    audioPrompt: "Ai là người đầu tiên ra vườn cố gắng nhổ củ cải vậy bé?",
                    audioKey: "quest_turnip_q1",
                    options: [
                        { icon: "👴", name: "Ông Lão Trồng Cây", isCorrect: true, praise: "Đúng rồi! Ông già ra vườn gieo hạt và nhổ củ cải đầu tiên!" },
                        { icon: "👵", name: "Bà Lão Nấu Cơm", isCorrect: false },
                        { icon: "🐶", name: "Chú Cún Con", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 2,
                audioKey: "story_turnip_p2",
                text: "Ông lão gọi bà lão, bà lão gọi cháu gái, cháu gái gọi cún con. Mọi người cùng chung sức kéo củ cải!",
                voiceText: "Ông lão gọi bà lão, bà lão gọi cháu gái, cháu gái gọi cún con. Mọi người cùng chung sức kéo củ cải!",
                bgStyle: "linear-gradient(135deg, #e0e7ff 0%, #fef3c7 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0 250 Q 200 220 400 240 Q 500 250 600 230 L 600 350 L 0 350 Z" fill="#86efac" />
                        <rect x="0" y="270" width="600" height="80" fill="#92400e"/>
                        <!-- Củ cải khổng lồ -->
                        <ellipse cx="90" cy="255" rx="50" ry="45" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                        <path d="M 80 200 C 60 140 100 130 90 200" stroke="#15803d" stroke-width="10" fill="none" stroke-linecap="round"/>
                        <!-- Chuỗi đoàn kết: Ông -> Bà -> Cháu -> Cún -->
                        <!-- 1. Ông già nắm lá cải -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_grandpa', 'Ông già: Một, hai, ba, dô ta nhổ cải lên!')" style="cursor:pointer;">
                            <circle cx="190" cy="220" r="22" fill="#fed7aa"/>
                            <path d="M 180 228 Q 190 250 200 228 Z" fill="#ffffff"/>
                            <ellipse cx="205" cy="275" rx="25" ry="22" fill="#b45309"/>
                            <line x1="180" y1="240" x2="125" y2="210" stroke="#fed7aa" stroke-width="8" stroke-linecap="round"/>
                        </g>
                        <!-- 2. Bà lão túm áo Ông già -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_grandma', 'Bà lão: Cố lên nào ông nó ơi, cháu gái ơi mau lại giúp!')" style="cursor:pointer;">
                            <circle cx="290" cy="220" r="22" fill="#fed7aa"/>
                            <!-- Khăn trùm đầu hoa của bà -->
                            <path d="M 270 215 C 270 190 310 190 310 215 Z" fill="#f43f5e"/>
                            <ellipse cx="300" cy="275" rx="24" ry="22" fill="#0284c7"/>
                            <line x1="280" y1="250" x2="225" y2="260" stroke="#fed7aa" stroke-width="7" stroke-linecap="round"/>
                        </g>
                        <!-- 3. Cháu gái túm áo Bà lão -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_girl', 'Cháu gái: Kéo mãi, kéo mãi, củ cải sắp lên rồi!')" style="cursor:pointer;">
                            <circle cx="390" cy="235" r="18" fill="#fed7aa"/>
                            <!-- Bím tóc 2 bên -->
                            <circle cx="372" cy="230" r="7" fill="#b45309"/>
                            <circle cx="408" cy="230" r="7" fill="#b45309"/>
                            <ellipse cx="395" cy="285" rx="18" ry="18" fill="#ec4899"/>
                            <line x1="380" y1="260" x2="320" y2="265" stroke="#fed7aa" stroke-width="6" stroke-linecap="round"/>
                        </g>
                        <!-- 4. Cún con túm áo Cháu gái -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('chain_dog', 'Cún con: Gâu gâu! Em cắn đuôi áo chị kéo thật mạnh nè!')" style="cursor:pointer;">
                            <circle cx="480" cy="275" r="16" fill="#f59e0b"/>
                            <circle cx="470" cy="265" r="7" fill="#78350f"/>
                            <circle cx="478" cy="273" r="2.5" fill="#1e293b"/>
                            <ellipse cx="510" cy="295" rx="22" ry="14" fill="#f59e0b"/>
                            <!-- Đuôi ngoe nguẩy -->
                            <path d="M 530 290 Q 545 275 540 265" stroke="#f59e0b" stroke-width="4" fill="none"/>
                            <line x1="470" y1="280" x2="415" y2="285" stroke="#f59e0b" stroke-width="5"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Ông, Bà, Cháu Gái hoặc Chú Cún Con nhé!",
                quest: {
                    prompt: "Sau khi Ông già gọi, ai là người đầu tiên chạy ra giúp Ông?",
                    audioPrompt: "Sau khi Ông già gọi, ai là người đầu tiên chạy ra giúp Ông nhổ củ cải?",
                    audioKey: "quest_turnip_q2",
                    options: [
                        { icon: "👵", name: "Bà Lão Hiền Hậu", isCorrect: true, praise: "Chính xác! Bà lão chạy ngay ra túm áo Ông già cùng nhổ cải!" },
                        { icon: "🐱", name: "Mèo Mướp", isCorrect: false },
                        { icon: "🐭", name: "Chuột Nhắt", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 3,
                audioKey: "story_turnip_p3",
                text: "Thêm mèo mướp và bé chuột nhắt cùng hợp sức kéo, củ cải khổng lồ đã bật lên khỏi mặt đất rồi!",
                voiceText: "Thêm mèo mướp và bé chuột nhắt cùng hợp sức kéo, củ cải khổng lồ đã bật lên khỏi mặt đất rồi!",
                bgStyle: "linear-gradient(135deg, #fef08a 0%, #bbf7d0 100%)",
                illustration: `
                    <svg viewBox="0 0 600 350" class="story-svg-stage" xmlns="http://www.w3.org/2000/svg">
                        <!-- Pháo hoa giấy tung bay mừng thắng lợi -->
                        <polygon points="120,50 130,70 110,70" fill="#ef4444"/>
                        <circle cx="200" cy="40" r="7" fill="#3b82f6"/>
                        <circle cx="450" cy="50" r="8" fill="#eab308"/>
                        <polygon points="520,70 535,85 510,90" fill="#a855f7"/>
                        <!-- Củ Cải Bật Tung Lên Khỏi Mặt Đất (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('pulled_turnip', 'Hoan hô! Củ cải khổng lồ bật lên rồi! Cả nhà cùng vui sướng!')" style="cursor:pointer;">
                            <ellipse cx="220" cy="180" rx="60" ry="55" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                            <path d="M 210 125 C 190 70 230 60 220 125" stroke="#15803d" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <path d="M 230 125 C 245 70 280 80 240 125" stroke="#16a34a" stroke-width="12" fill="none" stroke-linecap="round"/>
                            <!-- Đất bắn tung tóe -->
                            <circle cx="160" cy="220" r="5" fill="#78350f"/>
                            <circle cx="280" cy="210" r="6" fill="#78350f"/>
                            <circle cx="210" cy="245" r="7" fill="#78350f"/>
                        </g>
                        <!-- Bé Chuột Nhắt góp sức anh hùng (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('hero_mouse', 'Bé Chuột Nhắt nhỏ xíu: Tuy em nhỏ bé nhưng đoàn kết cùng mọi người sẽ làm nên điều kỳ diệu!')" style="cursor:pointer;">
                            <!-- Thân chuột xám -->
                            <ellipse cx="440" cy="285" rx="18" ry="12" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
                            <circle cx="425" cy="280" r="10" fill="#94a3b8"/>
                            <circle cx="420" cy="272" r="5" fill="#f472b6"/>
                            <circle cx="423" cy="279" r="2" fill="#0f172a"/>
                            <polygon points="418,282 415,285 418,285" fill="#f43f5e"/>
                            <!-- Đuôi chuột uốn cong vui sướng -->
                            <path d="M 458 285 Q 480 270 475 255" stroke="#94a3b8" stroke-width="2.5" fill="none"/>
                        </g>
                        <!-- Cả nhà ngồi quanh nồi súp củ cải thơm lừng (Chạm tương tác) -->
                        <g class="interactive-elem" onclick="StoriesZone.tapElement('soup_pot', 'Nồi súp củ cải thơm lừng ngọt ngào cho cả gia đình!')" style="cursor:pointer;">
                            <!-- Nồi súp đồng -->
                            <rect x="310" y="270" width="55" height="35" rx="6" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
                            <!-- Hơi bốc nghi ngút -->
                            <path d="M 325 265 Q 320 250 330 240" stroke="#cbd5e1" stroke-width="3" fill="none" stroke-linecap="round"/>
                            <path d="M 345 265 Q 350 250 340 240" stroke="#cbd5e1" stroke-width="3" fill="none" stroke-linecap="round"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Củ Cải Bật Lên, Bé Chuột Nhắt hoặc Nồi Súp nhé!",
                quest: {
                    prompt: "Câu chuyện Nhổ Củ Cải dạy cho bé bài học gì quý giá?",
                    audioPrompt: "Câu chuyện Nhổ Củ Cải dạy cho bé yêu bài học gì quý giá?",
                    audioKey: "quest_turnip_q3",
                    options: [
                        { icon: "🤝", name: "Đoàn Kết Là Sức Mạnh", isCorrect: true, praise: "Tuyệt vời bé yêu! Cùng nhau đoàn kết giúp đỡ thì việc khó mấy cũng hoàn thành!" },
                        { icon: "🍬", name: "Ăn Thật Nhiều Kẹo", isCorrect: false },
                        { icon: "📺", name: "Xem Tivi Thật Nhiều", isCorrect: false }
                    ]
                }
            }
        ]
    }
];
