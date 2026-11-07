/**
 * KED - Stories Data Module v6.0
 * Kho dữ liệu truyện tranh tương tác cho bé 3-5 tuổi
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
                    options: [
                        { icon: "☂️", name: "Chiếc Ô Che Mưa", isCorrect: true, praise: "Bé thông minh quá! Chiếc ô che mưa giúp bạn Thỏ luôn khô ráo!" },
                        { icon: "🕶️", name: "Kính Râm", isCorrect: false },
                        { icon: "🪭", name: "Chiếc Quạt", isCorrect: false }
                    ]
                }
            },
            {
                pageIndex: 3,
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
                            <!-- Chiếc ô màu cầu vồng -->
                            <path d="M 170 190 C 170 130 270 130 270 190 Z" fill="#ec4899" stroke="#be185d" stroke-width="3"/>
                            <line x1="220" y1="190" x2="220" y2="240" stroke="#475569" stroke-width="4"/>
                            <!-- Thỏ con -->
                            <circle cx="250" cy="240" r="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                            <circle cx="242" cy="235" r="4" fill="#1e293b"/>
                            <circle cx="258" cy="235" r="4" fill="#1e293b"/>
                            <ellipse cx="250" cy="285" rx="32" ry="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
                        </g>
                    </svg>
                `,
                touchHints: "Bé chạm vào Bạn Thỏ và Ngôi Nhà để cùng chia vui nhé!"
            }
        ]
    }
];
