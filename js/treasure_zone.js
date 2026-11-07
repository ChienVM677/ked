/**
 * KED - Treasure Zone Module v6.1 (ĐẢO KHO BÁU & SỔ DÁN STICKER DIỆU KỲ)
 * Cập nhật nâng cấp toàn diện:
 * 1. 60+ CÂU HỎI ĐA DẠNG NÂNG TIẾN 4 CẤP ĐỘ: Từ trực quan nhận biết đến so sánh, phủ định ("KHÔNG PHẢI") và siêu thử thách logic.
 * 2. BỔ SUNG NÚT VỀ TRANG CHỦ: Dễ dàng quay về Hub trung tâm bất kỳ lúc nào.
 * 3. HÌNH ẢNH VECTOR SVG CHUẨN XÁC: Chuồn Chuồn & Cá Ngựa chuẩn xác 100%.
 * 4. TRIỆT TIÊU ÂM THANH RÊ CHUỘT: Click-only âm thanh giáo dục mầm non chuẩn tiếng Việt.
 */

const TreasureZone = {
    currentTheme: 'images',
    currentLevel: 1,
    questionPool: [],
    currentQuestionIndex: 0,
    consecutiveCorrect: 0,
    unlockedStickers: [],
    selectedStickerForPlacing: null,

    // Quản lý phiên và khóa bảo vệ mắt 200 câu
    sessionAnsweredCount: 0,
    sessionLimit: 200,
    extraPenaltyQuestions: 0,
    currentRenderedOptions: [],
    parentGateAnswer: null,

    // BIỂU TƯỢNG SVG CHUẨN XÁC DÙNG TRONG CÂU HỎI
    svgIcons: {
        dragonfly: '<svg viewBox="0 0 64 64" width="1.2em" height="1.2em" style="vertical-align:-0.15em;display:inline-block;" xmlns="http://www.w3.org/2000/svg"><path d="M32 14 L32 58" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="12" r="6" fill="#38bdf8"/><circle cx="29" cy="11" r="2" fill="#0f172a"/><circle cx="35" cy="11" r="2" fill="#0f172a"/><ellipse cx="18" cy="18" rx="15" ry="5" fill="#67e8f9" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(-20 18 18)"/><ellipse cx="46" cy="18" rx="15" ry="5" fill="#67e8f9" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(20 46 18)"/><ellipse cx="19" cy="27" rx="13" ry="4" fill="#a5f3fc" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(-10 19 27)"/><ellipse cx="45" cy="27" rx="13" ry="4" fill="#a5f3fc" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(10 45 27)"/></svg>',
        seahorse: '<svg viewBox="0 0 64 64" width="1.2em" height="1.2em" style="vertical-align:-0.15em;display:inline-block;" xmlns="http://www.w3.org/2000/svg"><path d="M34 10 C27 10 23 15 23 20 C23 24 26 27 29 28 L27 38 C25 43 28 49 33 50 C36 51 37 54 35 57 C32 60 28 58 27 55" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 19 L15 20 L15 23 L24 23 Z" fill="#f59e0b"/><circle cx="29" cy="16" r="2.5" fill="#1e293b"/><circle cx="30" cy="15.5" r="0.9" fill="#ffffff"/><path d="M38 31 C43 32 43 38 38 41 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/><path d="M34 9 Q36 5 33 3 Q30 6 30 9 Z" fill="#fbbf24"/></svg>'
    },

    // KHO 12 STICKER ĐỘC QUYỀN TẶNG BÉ
    stickersCollection: [
        { icon: "🦄", name: "Kỳ Lân Cầu Vồng" },
        { icon: "👑", name: "Vương Miện Vàng" },
        { icon: "🚀", name: "Tàu Vũ Trụ" },
        { icon: "🍦", name: "Kem Bảy Màu" },
        { icon: "⭐", name: "Ngôi Sao Lấp Lánh" },
        { icon: "🐬", name: "Cá Heo Nhảy Múa" },
        { icon: "🦖", name: "Khủng Long Con" },
        { icon: "🎈", name: "Bóng Bay Sắc Màu" },
        { icon: "🍓", name: "Dâu Tây Ngọt Ngào" },
        { icon: "🦁", name: "Sư Tử Tí Hon" },
        { icon: "💎", name: "Viên Kim Cương" },
        { icon: "🌈", name: "Cầu Vồng Diệu Kỳ" }
    ],

    // KHO 65+ CÂU HỎI ĐA DẠNG NÂNG TIẾN 4 CẤP ĐỘ
    questionDatabase: {
        images: [
            // CẤP 1: NHẬN BIẾT TRỰC QUAN
            {
                level: 1,
                question: "Bé hãy tìm bạn CHUỒN CHUỒN cánh mỏng chao liệng mặt nước hồ nào?",
                speech: "Bé hãy tìm bạn Chuồn Chuồn ở đâu nào?",
                audio: "tg_q1",
                highlight: "CHUỒN CHUỒN",
                options: [
                    { icon: 'dragonfly_svg', name: "Chuồn Chuồn", isCorrect: true },
                    { icon: "🐝", name: "Chú Ong Vàng", isCorrect: false },
                    { icon: "🦋", name: "Bươm Bướm", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Chuồn chuồn bay lượn bắt muỗi rất tài tình!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn CÁ NGỰA bơi đứng uốn lượn dưới đại dương nhé!",
                speech: "Bé hãy tìm bạn Cá Ngựa ở đâu nào?",
                audio: "tg_q2",
                highlight: "CÁ NGỰA",
                options: [
                    { icon: "🐙", name: "Bạch Tuộc", isCorrect: false },
                    { icon: 'seahorse_svg', name: "Cá Ngựa", isCorrect: true },
                    { icon: "🦀", name: "Cua Biển", isCorrect: false }
                ],
                praise: "Hoan hô bé yêu! Cá ngựa bé xinh có chiếc đuôi quấn rong biển rất khéo!"
            },
            {
                level: 1,
                question: "Bé hãy tìm chú XE Ô TÔ đỏ bon bon ở đâu nào?",
                speech: "Bé hãy tìm xe ô tô ở đâu nào?",
                audio: "tg_q3",
                highlight: "XE Ô TÔ",
                options: [
                    { icon: "🚗", name: "Xe Ô Tô", isCorrect: true },
                    { icon: "🐶", name: "Con Chó", isCorrect: false },
                    { icon: "🍎", name: "Quả Táo", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Xe ô tô chạy bíp bíp rất nhanh!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn CHÚ CÚN CON trung thành nhé!",
                speech: "Bé hãy tìm bạn cún con ở đâu nào?",
                audio: "tg_q4",
                highlight: "CHÚ CÚN CON",
                options: [
                    { icon: "🐱", name: "Mèo Con", isCorrect: false },
                    { icon: "🐶", name: "Cún Con", isCorrect: true },
                    { icon: "🍌", name: "Quả Chuối", isCorrect: false }
                ],
                praise: "Hoan hô bé! Chú cún sủa gâu gâu vẫy đuôi mừng bé!"
            },
            {
                level: 1,
                question: "Món TRÁI CÂY DƯA HẤU ngọt mát ở đâu vậy bé?",
                speech: "Bé hãy tìm quả dưa hấu ở đâu nào?",
                audio: "tg_q5",
                highlight: "QUẢ DƯA HẤU",
                options: [
                    { icon: "🍉", name: "Quả Dưa Hấu", isCorrect: true },
                    { icon: "🚌", name: "Xe Buýt", isCorrect: false },
                    { icon: "⚽", name: "Quả Bóng", isCorrect: false }
                ],
                praise: "Chính xác rồi! Dưa hấu ngọt lịm mọng nước bé thích mê!"
            },
            {
                level: 1,
                question: "Quả nào ngọt ngào CÓ MÀU VÀNG tươi thơm ngon vậy bé?",
                speech: "Quả nào có màu vàng ngọt ngào vậy bé?",
                audio: "tg_q20",
                highlight: "CÓ MÀU VÀNG",
                options: [
                    { icon: "🍌", name: "Quả Chuối Vàng", isCorrect: true },
                    { icon: "🍉", name: "Quả Dưa Hấu", isCorrect: false },
                    { icon: "🥕", name: "Củ Cà Rốt", isCorrect: false }
                ],
                praise: "Đúng rồi! Quả chuối chín vàng thơm ngọt cho bé nhiều năng lượng!"
            },
            {
                level: 1,
                question: "Đâu là CÂY BÚT XINH giúp bé tập vẽ và viết vào vở?",
                speech: "Đâu là cây bút viết vẽ vào vở của bé?",
                audio: "tg_q22",
                highlight: "CÂY BÚT XINH",
                options: [
                    { icon: "✏️", name: "Cây Bút Chì", isCorrect: true },
                    { icon: "🪑", name: "Chiếc Ghế", isCorrect: false },
                    { icon: "🥣", name: "Cái Bát Ăn", isCorrect: false }
                ],
                praise: "Hoan hô bé! Cây bút chì vẽ tranh bông hoa thật đẹp!"
            },
            {
                level: 1,
                question: "Bạn nào BIẾT BƠI VÀ CÓ CÁNH kêu cạp cạp dưới ao?",
                speech: "Bạn vịt có cánh kêu cạp cạp ở đâu vậy bé?",
                audio: "tg_q25",
                highlight: "KÊU CẠP CẠP",
                options: [
                    { icon: "🦆", name: "Chú Vịt Trắng", isCorrect: true },
                    { icon: "🐟", name: "Cá Nhỏ", isCorrect: false },
                    { icon: "🐒", name: "Bạn Khỉ", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Chú vịt lông trắng bơi lội cạp cạp rất vui tai!"
            },
            {
                level: 1,
                question: "Đồ vật nào giúp bé CHE MƯA CHE NẮNG khi đi ra ngoài?",
                speech: "Chiếc ô che mưa che nắng ở đâu vậy bé?",
                audio: "tg_q29",
                highlight: "CHE MƯA CHE NẮNG",
                options: [
                    { icon: "☂️", name: "Chiếc Ô Xinh", isCorrect: true },
                    { icon: "👟", name: "Đôi Giày", isCorrect: false },
                    { icon: "🛌", name: "Cái Giường", isCorrect: false }
                ],
                praise: "Chính xác rồi! Chiếc ô xòe rộng che mát cho bé yêu!"
            },
            {
                level: 1,
                question: "Bông HOA HỒNG rực rỡ sắc thắm có cánh mềm thơm ngát ở đâu?",
                speech: "Bông hoa hồng đỏ thắm ở đâu vậy bé?",
                audio: "tg_q31",
                highlight: "HOA HỒNG",
                options: [
                    { icon: "🌹", name: "Bông Hoa Hồng", isCorrect: true },
                    { icon: "🌲", name: "Cây Thông", isCorrect: false },
                    { icon: "🍐", name: "Quả Lê", isCorrect: false }
                ],
                praise: "Bé ngắm hoa tinh tế quá! Hoa hồng đỏ thắm ngát hương thơm!"
            },

            // CẤP 2: SO SÁNH & PHÂN LOẠI
            {
                level: 2,
                question: "Bé tìm xem bạn nào TO LỚN NHẤT trong 3 bạn nhỉ?",
                speech: "Bạn nào to lớn nhất vậy bé?",
                audio: "tg_q6",
                highlight: "TO LỚN NHẤT",
                options: [
                    { icon: "🐘", name: "Con Voi", isCorrect: true },
                    { icon: "🐱", name: "Mèo Con", isCorrect: false },
                    { icon: "🐭", name: "Chuột Nhắt", isCorrect: false }
                ],
                praise: "Bé quan sát tài tình quá! Con Voi khổng lồ to lớn nhất!"
            },
            {
                level: 2,
                question: "Phương tiện nào BAY CAO TRÊN TRỜI vậy bé?",
                speech: "Phương tiện nào bay trên trời vậy bé?",
                audio: "tg_q7",
                highlight: "BAY TRÊN TRỜI",
                options: [
                    { icon: "🚲", name: "Xe Đạp", isCorrect: false },
                    { icon: "✈️", name: "Máy Bay", isCorrect: true },
                    { icon: "🚢", name: "Tàu Thủy", isCorrect: false }
                ],
                praise: "Tuyệt vời bé yêu! Máy bay bay vút qua những đám mây trắng!"
            },
            {
                level: 2,
                question: "Bạn nào BƠI LẶN DƯỚI NƯỚC giỏi nhất?",
                speech: "Bạn nào bơi dưới nước vậy bé?",
                audio: "tg_q8",
                highlight: "BƠI DƯỚI NƯỚC",
                options: [
                    { icon: "🐟", name: "Cá Nhỏ", isCorrect: true },
                    { icon: "🐒", name: "Con Khỉ", isCorrect: false },
                    { icon: "🐔", name: "Gà Trống", isCorrect: false }
                ],
                praise: "Đúng rồi! Bạn cá tung tăng bơi lội dưới làn nước xanh!"
            },
            {
                level: 2,
                question: "Phương tiện nào CHẠY TRÊN ĐƯỜNG RAY xình xịch tu tu?",
                speech: "Phương tiện nào chạy trên đường ray vậy bé?",
                audio: "tg_q21",
                highlight: "ĐƯỜNG RAY",
                options: [
                    { icon: "🚂", name: "Đoàn Tàu Hỏa", isCorrect: true },
                    { icon: "🚚", name: "Xe Tải", isCorrect: false },
                    { icon: "✈️", name: "Máy Bay", isCorrect: false }
                ],
                praise: "Đúng rồi! Đoàn tàu hỏa chạy trên đường ray kéo nhiều toa hàng!"
            },
            {
                level: 2,
                question: "Bạn nhỏ nào KÊU MEO MEO bắt chuột rất tài tình?",
                speech: "Bạn nào kêu meo meo vậy bé?",
                audio: "tg_q23",
                highlight: "KÊU MEO MEO",
                options: [
                    { icon: "🐱", name: "Chú Mèo Con", isCorrect: true },
                    { icon: "🐄", name: "Bò Sữa", isCorrect: false },
                    { icon: "🐷", name: "Chú Heo", isCorrect: false }
                ],
                praise: "Hoan hô bé! Chú mèo meo meo đôi mắt tròn xoe bắt chuột!"
            },
            {
                level: 2,
                question: "Phương tiện nào CHỞ NHIỀU BẠN NHỎ ĐI HỌC to lớn màu vàng?",
                speech: "Xe buýt trường học ở đâu vậy bé?",
                audio: "tg_q27",
                highlight: "XE BUÝT TRƯỜNG HỌC",
                options: [
                    { icon: "🚌", name: "Xe Buýt Vàng", isCorrect: true },
                    { icon: "🚲", name: "Xe Đạp", isCorrect: false },
                    { icon: "🛶", name: "Thuyền Nan", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Bác tài lái xe buýt đưa các bạn đến trường vui vẻ!"
            },
            {
                level: 2,
                question: "Bạn động vật nào CÓ CHIẾC CỔ THẬT LÀ CAO để ăn lá cây?",
                speech: "Bạn hươu cao cổ ở đâu vậy bé?",
                audio: "tg_q28",
                highlight: "CỔ THẬT CAO",
                options: [
                    { icon: "🦒", name: "Hươu Cao Cổ", isCorrect: true },
                    { icon: "🐢", name: "Chú Rùa", isCorrect: false },
                    { icon: "🐸", name: "Chú Ếch", isCorrect: false }
                ],
                praise: "Đúng rồi! Chú hươu cao cổ vươn cổ hái lá non trên cành cao!"
            },
            {
                level: 2,
                question: "Bạn nào ĐẺ RA QUẢ TRỨNG tròn bổ dưỡng cho bé ăn sáng?",
                speech: "Bạn gà mái đẻ trứng ở đâu vậy bé?",
                audio: "tg_q30",
                highlight: "ĐẺ RA QUẢ TRỨNG",
                options: [
                    { icon: "🐔", name: "Bạn Gà Mái", isCorrect: true },
                    { icon: "🐿️", name: "Con Sóc", isCorrect: false },
                    { icon: "🦋", name: "Bươm Bướm", isCorrect: false }
                ],
                praise: "Chính xác! Gà mái cục ta cục tác đẻ ra những quả trứng vàng!"
            },
            {
                level: 2,
                question: "Phương tiện nào CỨU HỎA CÒI HÚ IN ỎI chạy nhanh chữa cháy?",
                speech: "Xe cứu hỏa chữa cháy ở đâu vậy bé?",
                audio: "tg_q32",
                highlight: "XE CỨU HỎA",
                options: [
                    { icon: "🚒", name: "Xe Cứu Hỏa", isCorrect: true },
                    { icon: "🚗", name: "Xe Ô Tô Con", isCorrect: false },
                    { icon: "🚲", name: "Xe Đạp", isCorrect: false }
                ],
                praise: "Hoan hô bé! Các chú lính cứu hỏa dũng cảm dập tắt đám cháy!"
            },

            // CẤP 3: SUY LUẬN & PHỦ ĐỊNH ("KHÔNG PHẢI")
            {
                level: 3,
                question: "Hình nào KHÁC BIỆT KHÔNG PHẢI ĐỒ ĂN ĐƯỢC?",
                speech: "Hình nào khác biệt không ăn được vậy bé?",
                audio: "tg_q9",
                highlight: "KHÔNG ĂN ĐƯỢC",
                options: [
                    { icon: "🍎", name: "Quả Táo", isCorrect: false },
                    { icon: "🍞", name: "Bánh Mì", isCorrect: false },
                    { icon: "✂️", name: "Cái Kéo", isCorrect: true }
                ],
                praise: "Bé thông minh tuyệt đỉnh! Cái kéo là đồ dùng, không được ăn!"
            },
            {
                level: 3,
                question: "Vật nào PHÁT SÁNG SOI ĐƯỜNG ban đêm trên trời?",
                speech: "Vật nào phát sáng ban đêm trên trời vậy bé?",
                audio: "tg_q10",
                highlight: "PHÁT SÁNG BAN ĐÊM",
                options: [
                    { icon: "🌙", name: "Mặt Trăng", isCorrect: true },
                    { icon: "🪨", name: "Tảng Đá", isCorrect: false },
                    { icon: "🪵", name: "Khúc Gỗ", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Mặt trăng soi sáng dịu dàng cả bầu trời đêm!"
            },
            {
                level: 3,
                question: "Bạn nào KHÔNG BIẾT BAY trong số các bạn dưới đây?",
                speech: "Bạn nào không biết bay vậy bé?",
                audio: "tg_q19",
                highlight: "KHÔNG BIẾT BAY",
                options: [
                    { icon: "🐢", name: "Chú Rùa Bò", isCorrect: true },
                    { icon: "🕊️", name: "Chim Bồ Câu", isCorrect: false },
                    { icon: "🦋", name: "Bươm Bướm", isCorrect: false }
                ],
                praise: "Bé suy luận quá chuẩn! Chú rùa bò chậm trên cạn chứ không biết bay!"
            },
            {
                level: 3,
                question: "Bạn nào KHÔNG PHẢI ĐỘNG VẬT SỐNG DƯỚI NƯỚC?",
                speech: "Bạn nào không sống dưới nước vậy bé?",
                audio: "tg_q24",
                highlight: "KHÔNG SỐNG DƯỚI NƯỚC",
                options: [
                    { icon: "🐔", name: "Chú Gà Trống", isCorrect: true },
                    { icon: "🦈", name: "Cá Mập", isCorrect: false },
                    { icon: "🐬", name: "Cá Heo", isCorrect: false }
                ],
                praise: "Đúng rồi bé ơi! Gà trống sống trên cạn gáy vang đón mặt trời!"
            },
            {
                level: 3,
                question: "Đồ vật nào DÙNG ĐỂ ĐO THỜI GIAN tích tắc tích tắc?",
                speech: "Chiếc đồng hồ tích tắc báo giờ ở đâu vậy bé?",
                audio: "tg_q33",
                highlight: "ĐO THỜI GIAN",
                options: [
                    { icon: "⏰", name: "Chiếc Đồng Hồ", isCorrect: true },
                    { icon: "🪭", name: "Cái Quạt", isCorrect: false },
                    { icon: "🪮", name: "Cái Lược", isCorrect: false }
                ],
                praise: "Chính xác! Đồng hồ chỉ giờ giúp bé ăn ngủ và học tập đúng giờ!"
            },

            // CẤP 4: SIÊU THỬ THÁCH LOGIC
            {
                level: 4,
                question: "Bạn nào là CHÚA TỂ RỪNG XANH có chiếc bờm dũng mãnh và tiếng gầm vang lừng?",
                speech: "Bạn sư tử chúa sơn lâm dũng mãnh ở đâu vậy bé?",
                audio: "tg_q34",
                highlight: "CHÚA TỂ RỪNG XANH",
                options: [
                    { icon: "🦁", name: "Sư Tử Dũng Mãnh", isCorrect: true },
                    { icon: "🐆", name: "Báo Đốm", isCorrect: false },
                    { icon: "🐈", name: "Mèo Mướp", isCorrect: false }
                ],
                praise: "Bé đạt đỉnh siêu trí tuệ! Sư tử oai phong là vua rừng xanh!"
            },
            {
                level: 4,
                question: "Quả nào VỎ NGOÀI XANH RUỘT TRONG ĐỎ THẮM có nhiều hạt ngọt mát?",
                speech: "Quả dưa hấu ruột đỏ ngọt mát ở đâu vậy bé?",
                audio: "tg_q35",
                highlight: "VỎ XANH RUỘT ĐỎ",
                options: [
                    { icon: "🍉", name: "Quả Dưa Hấu", isCorrect: true },
                    { icon: "🍋", name: "Quả Chanh Vàng", isCorrect: false },
                    { icon: "🥥", name: "Quả Dừa", isCorrect: false }
                ],
                praise: "Hoàn hảo! Dưa hấu vỏ xanh ruột đỏ mát lạnh giải khát ngày hè!"
            }
        ],

        spelling: [
            // CẤP 1: MẶT CHỮ TRỰC QUAN
            {
                level: 1,
                question: "Bé hãy tìm CHỮ A đáng yêu ở đâu nào?",
                speech: "Bé hãy tìm chữ A ở đâu nào?",
                audio: "tg_q11",
                highlight: "CHỮ A",
                options: [
                    { icon: "🅰️", name: "Chữ A (Con Cá)", isCorrect: true },
                    { icon: "🅱️", name: "Chữ B", isCorrect: false },
                    { icon: "🅾️", name: "Chữ O", isCorrect: false }
                ],
                praise: "Hoan hô bé! Chữ A trong từ Con Cá lội tung tăng!"
            },
            {
                level: 1,
                question: "Bé tìm CHỮ O tròn như quả trứng gà nhé!",
                speech: "Chữ O tròn như quả trứng gà ở đâu nào?",
                audio: "tg_q12",
                highlight: "CHỮ O TRÒN",
                options: [
                    { icon: "🅾️", name: "Chữ O (Quả Trứng)", isCorrect: true },
                    { icon: "🔤", name: "Chữ C", isCorrect: false },
                    { icon: "🅰️", name: "Chữ A", isCorrect: false }
                ],
                praise: "Bé yêu giỏi quá! O tròn như quả trứng gà thật đáng yêu!"
            },
            {
                level: 1,
                question: "Bé hãy tìm CHỮ CỜ trong từ CON CÁ nào!",
                speech: "Bé hãy tìm chữ Cờ trong từ con cá nào!",
                audio: "tg_q36",
                highlight: "CHỮ CỜ",
                options: [
                    { icon: "🔤", name: "Chữ C (Con Cá)", isCorrect: true },
                    { icon: "🅰️", name: "Chữ A", isCorrect: false },
                    { icon: "🅱️", name: "Chữ B", isCorrect: false }
                ],
                praise: "Đúng rồi! Cờ A Ca Sắc Cá bơi dưới làn nước!"
            },
            {
                level: 1,
                question: "Bé hãy tìm CHỮ E trong từ EM BÉ ngoan ngoãn nhé!",
                speech: "Bé hãy tìm chữ E trong từ em bé đáng yêu nào!",
                audio: "tg_q37",
                highlight: "CHỮ E",
                options: [
                    { icon: "🔤", name: "Chữ E (Em Bé)", isCorrect: true },
                    { icon: "🔤", name: "Chữ D", isCorrect: false },
                    { icon: "🔤", name: "Chữ H", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Chữ E trong từ Em Bé đáng yêu!"
            },
            {
                level: 1,
                question: "Bé tìm CHỮ DÊ trong từ QUẢ DƯA HẤU ngọt mát nào!",
                speech: "Bé tìm chữ Dê trong từ quả dưa hấu nào!",
                audio: "tg_q46",
                highlight: "CHỮ DÊ",
                options: [
                    { icon: "🔤", name: "Chữ D (Quả Dưa)", isCorrect: true },
                    { icon: "🔤", name: "Chữ G", isCorrect: false },
                    { icon: "🔤", name: "Chữ T", isCorrect: false }
                ],
                praise: "Hoan hô bé! Chữ Dê trong quả dưa hấu thơm ngon!"
            },

            // CẤP 2: TỪ ĐƠN & DẤU THANH
            {
                level: 2,
                question: "Chữ nào bắt đầu từ CON BÒ sữa ngoan ngoãn?",
                speech: "Chữ nào bắt đầu từ Con Bò vậy bé?",
                audio: "tg_q13",
                highlight: "CHỮ B (CON BÒ)",
                options: [
                    { icon: "🅱️", name: "Chữ B (Con Bò)", isCorrect: true },
                    { icon: "🅰️", name: "Chữ A", isCorrect: false },
                    { icon: "🔤", name: "Chữ D", isCorrect: false }
                ],
                praise: "Chính xác rồi! Bờ - O - Bo - Huyền - Bò cho nhiều sữa ngọt!"
            },
            {
                level: 2,
                question: "Chữ cái nào bắt đầu từ QUẢ TÁO đỏ thơm ngon vậy bé?",
                speech: "Chữ cái nào bắt đầu từ quả táo vậy bé?",
                audio: "tg_q38",
                highlight: "BẮT ĐẦU TỪ QUẢ TÁO",
                options: [
                    { icon: "🔤", name: "Chữ T (Táo)", isCorrect: true },
                    { icon: "🔤", name: "Chữ N", isCorrect: false },
                    { icon: "🔤", name: "Chữ M", isCorrect: false }
                ],
                praise: "Đúng rồi! Tê - Ao - Tao - Sắc - Táo đỏ thơm giòn!"
            },
            {
                level: 2,
                question: "Chữ cái nào bắt đầu từ MÁY BAY vút trên trời cao?",
                speech: "Chữ cái nào bắt đầu từ máy bay vậy bé?",
                audio: "tg_q42",
                highlight: "CHỮ M (MÁY BAY)",
                options: [
                    { icon: "🔤", name: "Chữ M (Máy Bay)", isCorrect: true },
                    { icon: "🔤", name: "Chữ L", isCorrect: false },
                    { icon: "🔤", name: "Chữ K", isCorrect: false }
                ],
                praise: "Bé nhớ mặt chữ siêu quá! Em-mờ trong máy bay bay vút!"
            },
            {
                level: 2,
                question: "DẤU THANH NÀO làm cho chữ A biến thành chữ Á sắc sảo?",
                speech: "Dấu nào làm cho chữ A biến thành chữ Á sắc sảo?",
                audio: "tg_q47",
                highlight: "DẤU SẮC (´)",
                options: [
                    { icon: "ˊ", name: "Dấu Sắc (´)", isCorrect: true },
                    { icon: "ˋ", name: "Dấu Huyền (`)", isCorrect: false },
                    { icon: "•", name: "Dấu Nặng (.)", isCorrect: false }
                ],
                praise: "Chính xác! Dấu Sắc vút lên làm chữ Á bay cao!"
            },
            {
                level: 2,
                question: "Chữ Ô thêm DẤU SẮC thành vật dụng gì che mưa che nắng?",
                speech: "Chữ Ô thêm dấu sắc thành cái gì che đầu khi trời mưa nắng?",
                audio: "tg_q48",
                highlight: "Ô + SẮC = CÁI Ô",
                options: [
                    { icon: "☂️", name: "Cái Ô (Dù)", isCorrect: true },
                    { icon: "🚗", name: "Xe Ô Tô", isCorrect: false },
                    { icon: "🥣", name: "Cái Bát", isCorrect: false }
                ],
                praise: "Bé ghép vần tài tình! Ô thêm Sắc thành Cái Ô che mát!"
            },

            // CẤP 3: GHÉP VẦN CƠ BẢN
            {
                level: 3,
                question: "C + A + SẮC ghép thành từ gì nhỉ bé ơi?",
                speech: "Cờ cộng A thêm dấu sắc thành con gì vậy bé?",
                audio: "tg_q14",
                highlight: "C + A + SẮC = CÁ",
                options: [
                    { icon: "🐟", name: "Con Cá", isCorrect: true },
                    { icon: "🐔", name: "Con Gà", isCorrect: false },
                    { icon: "🦆", name: "Con Vịt", isCorrect: false }
                ],
                praise: "Bé ghép vần xuất sắc! Cờ A Ca Sắc Cá bơi lội dưới hồ!"
            },
            {
                level: 3,
                question: "M + E + NẶNG ghép thành từ gì thân thương nhất với bé?",
                speech: "Mờ E nặng ghép thành từ gì thân thương của bé?",
                audio: "tg_q39",
                highlight: "M + E + NẶNG = MẸ",
                options: [
                    { icon: "👩‍👧", name: "Mẹ Yêu Quý", isCorrect: true },
                    { icon: "👧", name: "Bé Gái", isCorrect: false },
                    { icon: "👵", name: "Bà Ngoại", isCorrect: false }
                ],
                praise: "Hoan hô bé! Mờ E Me Nặng Mẹ hiền dịu thương yêu bé nhất!"
            },
            {
                level: 3,
                question: "B + O + HUYỀN ghép thành bạn nào kêu ò e cho sữa ngọt lành?",
                speech: "Bờ O huyền ghép thành bạn nào kêu ò e cho sữa ngọt?",
                audio: "tg_q40",
                highlight: "B + O + HUYỀN = BÒ",
                options: [
                    { icon: "🐄", name: "Chú Bò Sữa", isCorrect: true },
                    { icon: "🐎", name: "Con Ngựa", isCorrect: false },
                    { icon: "🐐", name: "Chú Dê", isCorrect: false }
                ],
                praise: "Đúng rồi! Bờ O Bo Huyền Bò sữa hiền lành ngoan ngoãn!"
            },
            {
                level: 3,
                question: "G + A + HUYỀN ghép thành bạn nào gáy ó o gọi ông mặt trời?",
                speech: "Gờ A huyền ghép thành bạn nào gáy vang buổi sáng?",
                audio: "tg_q41",
                highlight: "G + A + HUYỀN = GÀ",
                options: [
                    { icon: "🐔", name: "Chú Gà Trống", isCorrect: true },
                    { icon: "🦆", name: "Chú Vịt", isCorrect: false },
                    { icon: "🕊️", name: "Bồ Câu", isCorrect: false }
                ],
                praise: "Bé ghép chữ cừ khôi! Giê A Ga Huyền Gà trống oai vệ!"
            },
            {
                level: 3,
                question: "H + Ô + HỎI ghép thành bạn nào dũng cảm chúa sơn lâm?",
                speech: "Hát Ô hỏi ghép thành bạn nào dũng cảm chúa sơn lâm?",
                audio: "tg_q43",
                highlight: "H + Ô + HỎI = HỔ",
                options: [
                    { icon: "🐯", name: "Hổ Con Dũng Cảm", isCorrect: true },
                    { icon: "🐰", name: "Thỏ Con", isCorrect: false },
                    { icon: "🐻", name: "Gấu Béo", isCorrect: false }
                ],
                praise: "Tuyệt đỉnh! Hát Ô Hô Hỏi Hổ dũng cảm bước đi mạnh mẽ!"
            },
            {
                level: 3,
                question: "X + E ghép thành từ gì chạy bon bon trên phố?",
                speech: "Ít xì E ghép thành từ gì chạy bon bon trên phố?",
                audio: "tg_q44",
                highlight: "X + E = XE",
                options: [
                    { icon: "🚗", name: "Xe Cộ Bon Bon", isCorrect: true },
                    { icon: "🏠", name: "Ngôi Nhà", isCorrect: false },
                    { icon: "🌳", name: "Cây Xanh", isCorrect: false }
                ],
                praise: "Bé nhớ mặt chữ rất tài! Ít-xì E Xe chạy bíp bíp!"
            },
            {
                level: 3,
                question: "L + A + SẮC ghép thành bộ phận màu xanh mướt của cây?",
                speech: "Lờ A sắc ghép thành bộ phận gì xanh tươi của cây?",
                audio: "tg_q49",
                highlight: "L + A + SẮC = LÁ",
                options: [
                    { icon: "🍃", name: "Chiếc Lá Xanh", isCorrect: true },
                    { icon: "🪵", name: "Cành Cây", isCorrect: false },
                    { icon: "🍎", name: "Quả Chín", isCorrect: false }
                ],
                praise: "Chính xác rồi! E-lờ A La Sắc Lá biếc xanh rì rào!"
            },

            // CẤP 4: NGUYÊN ÂM KÉP & TỪ GHÉP ĐÔI
            {
                level: 4,
                question: "Đâu là NGUYÊN ÂM KÉP trong từ BÔNG HOA thơm ngát?",
                speech: "Đâu là nguyên âm kép trong từ bông hoa thơm ngát?",
                audio: "tg_q45",
                highlight: "VẦN OA (HOA)",
                options: [
                    { icon: "🌸", name: "Vần OA (H + OA)", isCorrect: true },
                    { icon: "🌼", name: "Vần AI", isCorrect: false },
                    { icon: "🌻", name: "Vần EO", isCorrect: false }
                ],
                praise: "Bé xuất sắc vô song! Hát cộng Vần OA thành Bông Hoa rực rỡ!"
            },
            {
                level: 4,
                question: "Từ CÁ VÀNG được ghép bởi hai tiếng nào dưới đây?",
                speech: "Bé tìm từ Cá Vàng ghép bởi hai tiếng nào?",
                audio: "tg_q50",
                highlight: "CÁ + VÀNG",
                options: [
                    { icon: "🐠", name: "CÁ + VÀNG", isCorrect: true },
                    { icon: "🐟", name: "CÁ + ĐEN", isCorrect: false },
                    { icon: "🦐", name: "TÔM + CÁ", isCorrect: false }
                ],
                praise: "Bé thông minh tuyệt vời! Tiếng Cá ghép tiếng Vàng thành Chú Cá Vàng múa lượn!"
            },
            {
                level: 4,
                question: "M + EO + HUYỀN ghép thành bạn nhỏ đáng yêu nào bắt chuột?",
                speech: "Mờ E O huyền ghép thành bạn nào kêu meo meo bắt chuột?",
                audio: "tg_q23",
                highlight: "M + EO + HUYỀN = MÈO",
                options: [
                    { icon: "🐱", name: "Chú Mèo Con", isCorrect: true },
                    { icon: "🐶", name: "Cún Con", isCorrect: false },
                    { icon: "🐹", name: "Chuột Hamster", isCorrect: false }
                ],
                praise: "Tuyệt đỉnh! Mờ Eo Meo Huyền Mèo tinh nghịch bắt chuột!"
            }
        ],

        math: [
            // CẤP 1: NHẬN DIỆN MẶT SỐ
            {
                level: 1,
                question: "Bé hãy tìm bạn SỐ 1 như que tính thẳng tắp!",
                speech: "Bé hãy tìm số 1 ở đâu nào?",
                audio: "tg_q15",
                highlight: "SỐ 1 (MỘT)",
                options: [
                    { icon: "1️⃣", name: "Số 1 (Một)", isCorrect: true },
                    { icon: "2️⃣", name: "Số 2", isCorrect: false },
                    { icon: "3️⃣", name: "Số 3", isCorrect: false }
                ],
                praise: "Bé giỏi quá! Số 1 như một ngón tay xinh xắn!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn SỐ 2 như chú vịt bơi dưới ao!",
                speech: "Bé hãy tìm số 2 ở đâu nào?",
                audio: "tg_q16",
                highlight: "SỐ 2 (HAI)",
                options: [
                    { icon: "2️⃣", name: "Số 2 (Hai)", isCorrect: true },
                    { icon: "4️⃣", name: "Số 4", isCorrect: false },
                    { icon: "5️⃣", name: "Số 5", isCorrect: false }
                ],
                praise: "Đúng rồi bé cưng! Số 2 uốn cong như chú vịt trắng bơi lội!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn SỐ 3 cong cong như cánh bướm chao liệng!",
                speech: "Bé hãy tìm bạn số 3 cong cong như cánh bướm nào!",
                audio: "tg_q51",
                highlight: "SỐ 3 (BA)",
                options: [
                    { icon: "3️⃣", name: "Số 3 (Ba)", isCorrect: true },
                    { icon: "1️⃣", name: "Số 1", isCorrect: false },
                    { icon: "5️⃣", name: "Số 5", isCorrect: false }
                ],
                praise: "Hoan hô bé yêu! Số 3 uốn lượn hai vòng như cánh bướm rực rỡ!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn SỐ 4 như chiếc ghế gập xinh xắn nhé!",
                speech: "Bé hãy tìm bạn số 4 như chiếc ghế gập xinh xắn nào!",
                audio: "tg_q52",
                highlight: "SỐ 4 (BỐN)",
                options: [
                    { icon: "4️⃣", name: "Số 4 (Bốn)", isCorrect: true },
                    { icon: "2️⃣", name: "Số 2", isCorrect: false },
                    { icon: "6️⃣", name: "Số 6", isCorrect: false }
                ],
                praise: "Bé nhớ mặt số giỏi quá! Số 4 vững chãi như chiếc ghế nhỏ!"
            },
            {
                level: 1,
                question: "Bé hãy tìm bạn SỐ 5 với chiếc mũ che đầu thật oai vệ!",
                speech: "Bé hãy tìm bạn số 5 với chiếc mũ che đầu thật oai nào!",
                audio: "tg_q53",
                highlight: "SỐ 5 (NĂM)",
                options: [
                    { icon: "5️⃣", name: "Số 5 (Năm)", isCorrect: true },
                    { icon: "3️⃣", name: "Số 3", isCorrect: false },
                    { icon: "1️⃣", name: "Số 1", isCorrect: false }
                ],
                praise: "Đúng rồi! Số 5 như bàn tay có 5 ngón xòe rộng xinh xắn!"
            },

            // CẤP 2: ĐẾM SỐ LƯỢNG TRỰC QUAN
            {
                level: 2,
                question: "Đếm cùng cô: Có MẤY QUẢ TÁO 🍎 🍎 trên cành?",
                speech: "Có mấy quả táo đỏ vậy bé?",
                audio: "tg_q17",
                highlight: "2 QUẢ TÁO",
                options: [
                    { icon: "2️⃣", name: "2 Quả Táo", isCorrect: true },
                    { icon: "1️⃣", name: "1 Quả", isCorrect: false },
                    { icon: "3️⃣", name: "3 Quả", isCorrect: false }
                ],
                praise: "Hoan hô bé! Có 1, 2 quả táo đỏ ngọt lịm!"
            },
            {
                level: 2,
                question: "Đếm cùng cô: Có MẤY CHÚ CÁ 🐟 🐟 🐟 đang bơi lội?",
                speech: "Có mấy chú cá nhỏ đang tung tăng bơi lội vậy bé?",
                audio: "tg_q54",
                highlight: "3 CHÚ CÁ",
                options: [
                    { icon: "3️⃣", name: "3 Chú Cá", isCorrect: true },
                    { icon: "2️⃣", name: "2 Chú", isCorrect: false },
                    { icon: "4️⃣", name: "4 Chú", isCorrect: false }
                ],
                praise: "Bé đếm tài tình quá! Một, hai, ba chú cá bơi tung tăng!"
            },
            {
                level: 2,
                question: "Đếm cùng cô: Có MẤY BÔNG HOA 🌸 🌸 🌸 🌸 tươi thắm?",
                speech: "Có mấy bông hoa tươi thắm đang nở vậy bé?",
                audio: "tg_q55",
                highlight: "4 BÔNG HOA",
                options: [
                    { icon: "4️⃣", name: "4 Bông Hoa", isCorrect: true },
                    { icon: "3️⃣", name: "3 Bông", isCorrect: false },
                    { icon: "5️⃣", name: "5 Bông", isCorrect: false }
                ],
                praise: "Đúng rồi bé cưng! 1, 2, 3, 4 bông hoa tươi thắm tỏa hương thơm!"
            },
            {
                level: 2,
                question: "Số nào LỚN NHẤT trong các số 1, 3 và 5 vậy bé?",
                speech: "Số nào lớn nhất trong các số một, ba và năm vậy bé?",
                audio: "tg_q58",
                highlight: "LỚN NHẤT (SỐ 5)",
                options: [
                    { icon: "5️⃣", name: "Số 5 Lớn Nhất", isCorrect: true },
                    { icon: "3️⃣", name: "Số 3", isCorrect: false },
                    { icon: "1️⃣", name: "Số 1", isCorrect: false }
                ],
                praise: "Bé so sánh siêu đẳng! Số 5 có số lượng nhiều nhất!"
            },
            {
                level: 2,
                question: "Số nào BÉ NHẤT trong các số 2, 4 và 6 vậy bé?",
                speech: "Số nào bé nhất trong các số hai, bốn và sáu vậy bé?",
                audio: "tg_q59",
                highlight: "BÉ NHẤT (SỐ 2)",
                options: [
                    { icon: "2️⃣", name: "Số 2 Bé Nhất", isCorrect: true },
                    { icon: "4️⃣", name: "Số 4", isCorrect: false },
                    { icon: "6️⃣", name: "Số 6", isCorrect: false }
                ],
                praise: "Hoan hô bé! Số 2 là bạn nhỏ bé nhất trong 3 bạn!"
            },

            // CẤP 3: CỘNG TRỪ TRỰC QUAN & HÌNH HỌC
            {
                level: 3,
                question: "1 Quả Táo 🍎 thêm 1 Quả Táo 🍎 bằng mấy quả?",
                speech: "Một quả táo thêm một quả táo bằng mấy quả táo vậy bé?",
                audio: "tg_q18",
                highlight: "1 + 1 = 2 QUẢ",
                options: [
                    { icon: "2️⃣", name: "2 Quả Táo", isCorrect: true },
                    { icon: "3️⃣", name: "3 Quả", isCorrect: false },
                    { icon: "4️⃣", name: "4 Quả", isCorrect: false }
                ],
                praise: "Bé làm toán siêu đẳng! 1 cộng 1 bằng 2 quả táo thơm ngon!"
            },
            {
                level: 3,
                question: "2 Quả Táo 🍎🍎 thêm 1 Quả Táo 🍎 nữa bằng mấy quả táo?",
                speech: "Hai quả táo thêm một quả táo thì có tất cả mấy quả vậy bé?",
                audio: "tg_q56",
                highlight: "2 + 1 = 3 QUẢ",
                options: [
                    { icon: "3️⃣", name: "3 Quả Táo", isCorrect: true },
                    { icon: "2️⃣", name: "2 Quả", isCorrect: false },
                    { icon: "4️⃣", name: "4 Quả", isCorrect: false }
                ],
                praise: "Bé tính toán xuất sắc! 2 thêm 1 là có tất cả 3 quả táo đỏ!"
            },
            {
                level: 3,
                question: "Có 3 quả chuối 🍌🍌🍌, bé ăn bớt 1 quả thì CÒN LẠI MẤY QUẢ?",
                speech: "Có ba quả chuối, bé ăn bớt một quả thì còn lại mấy quả chuối?",
                audio: "tg_q57",
                highlight: "3 BỚT 1 CÒN 2",
                options: [
                    { icon: "2️⃣", name: "Còn 2 Quả Chuối", isCorrect: true },
                    { icon: "1️⃣", name: "Còn 1 Quả", isCorrect: false },
                    { icon: "3️⃣", name: "Còn 3 Quả", isCorrect: false }
                ],
                praise: "Phép trừ trực quan chuẩn xác! 3 bớt đi 1 thì còn lại 2 quả chuối!"
            },
            {
                level: 3,
                question: "Hình nào CÓ 3 GÓC NHỌN và 3 cạnh thẳng tắp bé ơi?",
                speech: "Hình nào có ba góc nhọn là hình gì vậy bé?",
                audio: "tg_q60",
                highlight: "HÌNH TAM GIÁC",
                options: [
                    { icon: "🔺", name: "Hình Tam Giác", isCorrect: true },
                    { icon: "🔴", name: "Hình Tròn", isCorrect: false },
                    { icon: "🟦", name: "Hình Vuông", isCorrect: false }
                ],
                praise: "Bé nhận diện hình học quá đỉnh! Hình tam giác có 3 góc nhọn!"
            },
            {
                level: 3,
                question: "Hình TRÒN lăn lông lốc giống đồ vật nào dưới đây bé ơi?",
                speech: "Hình tròn lăn lông lốc giống đồ vật nào dưới đây bé ơi?",
                audio: "tg_q61",
                highlight: "HÌNH TRÒN TRÒN",
                options: [
                    { icon: "⚽", name: "Quả Bóng Tròn", isCorrect: true },
                    { icon: "📦", name: "Hộp Quà Vuông", isCorrect: false },
                    { icon: "📐", name: "Thước Kẻ", isCorrect: false }
                ],
                praise: "Đúng rồi! Quả bóng tròn xoe lăn lông lốc trên sân cỏ!"
            },

            // CẤP 4: SIÊU TOÁN LOGIC
            {
                level: 4,
                question: "Bánh chưng ngày Tết của bé có HÌNH GÌ vuông vắn tượng trưng cho đất?",
                speech: "Bánh chưng ngày Tết của bé có hình gì vuông vắn?",
                audio: "tg_q62",
                highlight: "BÁNH CHƯNG VUÔNG",
                options: [
                    { icon: "🟦", name: "Hình Vuông Xanh", isCorrect: true },
                    { icon: "🔴", name: "Hình Tròn", isCorrect: false },
                    { icon: "🔺", name: "Hình Tam Giác", isCorrect: false }
                ],
                praise: "Bé hiểu văn hóa mầm non rất sâu! Bánh chưng vuông vắn thơm dẻo ngày Tết!"
            },
            {
                level: 4,
                question: "Có 4 chú chim trên cành, 2 chú vỗ cánh bay đi mất, CÒN LẠI MẤY CHÚ CHIM?",
                speech: "Có bốn chú chim, hai chú bay đi mất, còn lại mấy chú chim vậy bé?",
                audio: "tg_q63",
                highlight: "4 BỚT 2 CÒN 2",
                options: [
                    { icon: "2️⃣", name: "Còn 2 Chú Chim", isCorrect: true },
                    { icon: "1️⃣", name: "Còn 1 Chú", isCorrect: false },
                    { icon: "3️⃣", name: "Còn 3 Chú", isCorrect: false }
                ],
                praise: "Bé giải đố trừ thần sầu! 4 chú chim bớt đi 2 chú còn đúng 2 chú hót líu lo!"
            },
            {
                level: 4,
                question: "2 ngón tay xinh ✌️ cộng thêm 2 ngón tay xinh ✌️ bằng MẤY NGÓN TAY?",
                speech: "Hai cộng hai bằng mấy ngón tay bé xòe ra nào?",
                audio: "tg_q64",
                highlight: "2 + 2 = 4 NGÓN",
                options: [
                    { icon: "4️⃣", name: "4 Ngón Tay", isCorrect: true },
                    { icon: "3️⃣", name: "3 Ngón", isCorrect: false },
                    { icon: "5️⃣", name: "5 Ngón", isCorrect: false }
                ],
                praise: "Bé xòe tay làm toán siêu đẳng! 2 cộng 2 bằng 4 ngón tay ngoan!"
            },
            {
                level: 4,
                question: "3 cộng 2 bằng mấy vậy bé yêu thông thái?",
                speech: "Ba cộng hai bằng mấy vậy bé yêu thông thái?",
                audio: "tg_q65",
                highlight: "3 + 2 = 5",
                options: [
                    { icon: "5️⃣", name: "Bằng 5 (Năm)", isCorrect: true },
                    { icon: "4️⃣", name: "Bằng 4", isCorrect: false },
                    { icon: "6️⃣", name: "Bằng 6", isCorrect: false }
                ],
                praise: "Bé đạt danh hiệu Hiệp Sĩ Toán Học! 3 cộng 2 bằng trọn vẹn 5 ngón tay của một bàn tay!"
            }
        ]
    },

    init() {
        const savedStickers = localStorage.getItem('ked_stickers_v2');
        if (savedStickers) {
            try {
                this.unlockedStickers = JSON.parse(savedStickers);
            } catch (e) {
                this.unlockedStickers = [];
            }
        }
        this.updateStickerBadgeUI();
        this.loadThemeQuestions(this.currentTheme);
        this.renderQuestion();
        this.updateProgressionUI();
    },

    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    loadThemeQuestions(theme) {
        this.currentTheme = theme;
        const pool = this.questionDatabase[theme] || this.questionDatabase.images;
        this.questionPool = this.shuffle(pool);
        this.currentQuestionIndex = 0;
    },

    switchTheme(theme, btnEl) {
        SoundEngine.playPop();
        document.querySelectorAll('#view-treasure .theme-pill-btn').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        this.loadThemeQuestions(theme);
        this.renderQuestion();
    },

    renderQuestion() {
        if (this.currentQuestionIndex >= this.questionPool.length) {
            this.questionPool = this.shuffle(this.questionPool);
            this.currentQuestionIndex = 0;
        }

        const cur = this.questionPool[this.currentQuestionIndex];
        this.currentLevel = cur.level || 1;
        this.updateProgressionUI();

        const promptBox = document.getElementById('tg-question-text');
        if (promptBox) {
            promptBox.innerHTML = cur.question.replace(cur.highlight, `<span class="highlight-word">${cur.highlight}</span>`);
        }

        this.currentRenderedOptions = this.shuffle([...cur.options]);

        const container = document.getElementById('tg-choices-container');
        if (container) {
            container.innerHTML = this.currentRenderedOptions.map((opt, idx) => {
                let iconHtml = opt.icon;
                if (opt.icon === 'dragonfly_svg') iconHtml = this.svgIcons.dragonfly;
                if (opt.icon === 'seahorse_svg') iconHtml = this.svgIcons.seahorse;

                return `
                    <button class="choice-giant-btn" onclick="TreasureZone.handleChoice(${idx}, this)" title="${opt.name}">
                        <span class="btn-visual-emoji">${iconHtml}</span>
                        <span class="btn-visual-label">${opt.name}</span>
                    </button>
                `;
            }).join('');
        }

        const fb = document.getElementById('tg-feedback-banner');
        if (fb) {
            fb.className = 'feedback-banner';
            fb.innerHTML = '👆 Bé hãy lắng nghe và chạm vào bức tranh đúng nhé!';
        }

        setTimeout(() => {
            this.speakCurrentQuestion();
        }, 300);
    },

    speakCurrentQuestion() {
        const cur = this.questionPool[this.currentQuestionIndex];
        if (cur) {
            if (cur.audio) {
                SoundEngine.playVoice(cur.audio, null, cur.speech || cur.question);
            } else {
                SoundEngine.speakFallback(cur.speech || cur.question);
            }
        }
    },

    handleChoice(choiceIdx, btnEl) {
        this.sessionAnsweredCount += 1;
        if (typeof App !== 'undefined' && App.recordSessionQuestion) {
            App.recordSessionQuestion();
        }

        if (this.sessionAnsweredCount >= this.sessionLimit) {
            this.triggerScreenTimeLock();
            return;
        }

        const cur = this.questionPool[this.currentQuestionIndex];
        const selected = this.currentRenderedOptions[choiceIdx];
        const fb = document.getElementById('tg-feedback-banner');

        if (selected.isCorrect) {
            SoundEngine.playTing();
            const fbIdx = Math.floor(Math.random() * 3) + 1;
            SoundEngine.playVoice(`fb_correct_${fbIdx}`);

            if (btnEl) btnEl.classList.add('card-correct-glow');
            if (typeof App !== 'undefined' && App.addStar) App.addStar();

            if (fb) {
                fb.className = 'feedback-banner feedback-correct';
                fb.innerHTML = `🎉 <strong>Bé giỏi quá!</strong> ${cur.praise} ⭐ +1 Sao Vàng!`;
            }

            this.consecutiveCorrect += 1;
            this.updateProgressionUI();

            if (this.consecutiveCorrect % 3 === 0) {
                setTimeout(() => {
                    this.openTreasureChestReward();
                }, 1200);
            } else {
                setTimeout(() => {
                    this.nextQuestion();
                }, 2200);
            }
        } else {
            this.extraPenaltyQuestions += 1;
            this.consecutiveCorrect = 0;
            SoundEngine.playWobble();
            SoundEngine.playVoice('fb_retry');

            if (btnEl) {
                btnEl.classList.add('card-shake');
                setTimeout(() => btnEl.classList.remove('card-shake'), 600);
            }

            const pBadge = document.getElementById('tg-penalty-badge');
            const pVal = document.getElementById('tg-val-penalty-count');
            if (pBadge && pVal) {
                pVal.textContent = this.extraPenaltyQuestions;
                pBadge.style.display = 'inline-flex';
            }

            if (fb) {
                fb.className = 'feedback-banner feedback-wrong';
                fb.innerHTML = `❌ Chưa đúng rồi! Bé thử nghe lại và nhìn kỹ hơn nhé! ⚡ <strong>+1 Thử thách</strong>`;
            }
        }
    },

    nextQuestion() {
        this.currentQuestionIndex += 1;
        this.renderQuestion();
    },

    updateProgressionUI() {
        // Cập nhật 4 cấp độ
        for (let i = 1; i <= 4; i++) {
            const pill = document.getElementById(`tg-pill-lvl-${i}`);
            if (pill) {
                pill.classList.toggle('active', i === this.currentLevel);
            }
        }

        const streakProgress = (this.consecutiveCorrect % 3);
        const bar = document.getElementById('tg-progress-bar');
        if (bar) {
            bar.style.width = `${(streakProgress / 3) * 100}%`;
        }

        const remaining = 3 - streakProgress;
        const streakEl = document.getElementById('tg-streak-counter');
        if (streakEl) {
            streakEl.textContent = remaining;
        }
    },

    openTreasureChestReward() {
        SoundEngine.playFanfare();
        SoundEngine.playVoice('fb_chest_open');

        const uncollected = this.stickersCollection.filter(s => 
            !this.unlockedStickers.some(u => u.name === s.name)
        );

        let rewardedSticker;
        if (uncollected.length > 0) {
            rewardedSticker = uncollected[Math.floor(Math.random() * uncollected.length)];
        } else {
            rewardedSticker = this.stickersCollection[Math.floor(Math.random() * this.stickersCollection.length)];
        }

        this.unlockedStickers.push({
            ...rewardedSticker,
            placed: false,
            id: 'stk_' + Date.now()
        });

        localStorage.setItem('ked_stickers_v2', JSON.stringify(this.unlockedStickers));
        this.updateStickerBadgeUI();

        const modal = document.getElementById('tg-chest-modal');
        const iconEl = document.getElementById('tg-reward-icon');
        const nameEl = document.getElementById('tg-reward-name');

        if (iconEl) iconEl.textContent = rewardedSticker.icon;
        if (nameEl) nameEl.textContent = rewardedSticker.name;

        if (modal) {
            modal.style.display = 'flex';
        }
    },

    closeRewardModal() {
        SoundEngine.playPop();
        const modal = document.getElementById('tg-chest-modal');
        if (modal) modal.style.display = 'none';
        this.nextQuestion();
    },

    updateStickerBadgeUI() {
        const count = this.unlockedStickers.length;
        const total = this.stickersCollection.length;
        const badge = document.getElementById('tg-sticker-count-badge');
        if (badge) {
            badge.textContent = `${count}/${total}`;
        }
        if (typeof App !== 'undefined' && App.updateStickerCount) {
            App.updateStickerCount(count);
        }
    },

    openStickerBook() {
        SoundEngine.playPop();
        const modal = document.getElementById('tg-stickerbook-modal');
        if (!modal) return;

        this.renderStickerTray();
        modal.style.display = 'flex';
    },

    closeStickerBook() {
        SoundEngine.playPop();
        const modal = document.getElementById('tg-stickerbook-modal');
        if (modal) modal.style.display = 'none';
    },

    renderStickerTray() {
        const tray = document.getElementById('tg-stickers-tray');
        if (!tray) return;

        if (this.unlockedStickers.length === 0) {
            tray.innerHTML = `<div class="empty-tray-msg">🎁 Bé hãy trả lời đúng 3 câu liên tiếp để mở rương nhận Sticker đầu tiên nhé!</div>`;
            return;
        }

        tray.innerHTML = this.unlockedStickers.map(stk => `
            <button class="sticker-tray-item ${stk.placed ? 'placed-item' : ''} ${this.selectedStickerForPlacing === stk.id ? 'selected-stk' : ''}"
                    onclick="TreasureZone.selectStickerForPlacing('${stk.id}')"
                    title="${stk.name}">
                <span class="stk-icon">${stk.icon}</span>
                <span class="stk-name">${stk.name}</span>
            </button>
        `).join('');
    },

    selectStickerForPlacing(stkId) {
        SoundEngine.playPop();
        this.selectedStickerForPlacing = stkId;
        this.renderStickerTray();
    },

    placeStickerOnCanvas(e) {
        if (!this.selectedStickerForPlacing) return;

        const stk = this.unlockedStickers.find(s => s.id === this.selectedStickerForPlacing);
        if (!stk) return;

        const canvas = document.getElementById('tg-sticker-canvas');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 24;
        const y = e.clientY - rect.top - 24;

        SoundEngine.playPop();

        const el = document.createElement('div');
        el.className = 'placed-sticker-badge bounce-anim';
        el.style.left = `${Math.max(0, x)}px`;
        el.style.top = `${Math.max(0, y)}px`;
        el.innerHTML = `<span>${stk.icon}</span>`;
        canvas.appendChild(el);

        stk.placed = true;
        localStorage.setItem('ked_stickers_v2', JSON.stringify(this.unlockedStickers));

        this.selectedStickerForPlacing = null;
        this.renderStickerTray();
    },

    clearStickerCanvas() {
        SoundEngine.playPop();
        const canvas = document.getElementById('tg-sticker-canvas');
        if (canvas) canvas.innerHTML = '';
        this.unlockedStickers.forEach(s => s.placed = false);
        localStorage.setItem('ked_stickers_v2', JSON.stringify(this.unlockedStickers));
        this.renderStickerTray();
    },

    triggerScreenTimeLock() {
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
                    <div class="parent-gate-desc">Bố mẹ vui lòng giải phép tính sau để mở khóa:</div>
                    <div class="parent-math-problem">
                        <span>${numA} + ${numB} = </span>
                        <input type="number" id="parent-gate-input" class="parent-input" placeholder="?">
                        <button class="parent-unlock-btn" onclick="TreasureZone.verifyParentGate()">Mở Khóa Tiếp Tục</button>
                    </div>
                    <div id="parent-gate-feedback" class="parent-feedback"></div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    verifyParentGate() {
        const input = document.getElementById('parent-gate-input');
        const fb = document.getElementById('parent-gate-feedback');
        if (!input) return;

        if (parseInt(input.value) === this.parentGateAnswer) {
            SoundEngine.playCorrect();
            this.sessionAnsweredCount = 0;
            const modal = document.getElementById('screentime-lock-modal');
            if (modal) modal.style.display = 'none';
            SoundEngine.playVoice('fb_unlock_ok');
        } else {
            SoundEngine.playTryAgain();
            if (fb) fb.innerHTML = "❌ Kết quả chưa chính xác! Bố mẹ hãy tính lại nhé.";
        }
    }
};
