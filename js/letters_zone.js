/**
 * KED - Letters Zone v7.0 (VƯƠNG QUỐC CHỮ CÁI, ĐÁNH VẦN & DẤU THANH TIẾNG VIỆT)
 * Lộ trình sư phạm chuẩn giáo dục mầm non 3-5 tuổi (Giáo dục sớm Việt Nam):
 * 1. CẤP 1: BẢNG 29 CHỮ CÁI TIẾNG VIỆT (Chữ in hoa, in thường, icon & từ minh họa)
 * 2. CẤP 2: LUYỆN TỪNG VẦN & 5 DẤU THANH (Ma trận trực quan 6 thẻ chữ kết hợp thanh điệu to rõ)
 * 3. CẤP 3: 11 PHỤ ÂM GHÉP CĂN BẢN (CH, GH, GI, KH, NH, NG, NGH, PH, TH, TR, QU với bảng ghép âm sinh động)
 * 4. CẤP 4: BÉ TẬP GHÉP VẦN TĂNG TIẾN (4 cấp độ từ từ đơn đến từ ghép có nghĩa)
 */

const LettersZone = {
    currentLevel: 1, // 1: 29 Chữ Cái, 2: Dấu Thanh, 3: Phụ Âm Ghép, 4: Ghép Vần
    vowelType: 'single', // 'single' (12 nguyên âm đơn) | 'compound' (12 nguyên âm kép)
    selectedVowelKey: 'a',
    selectedCompoundCon: 'ch',
    spellingLevel: 1,
    currentSpellingIndex: 0,
    selectedLetters: [],

    // ========================================================
    // 1. BẢNG 29 CHỮ CÁI TIẾNG VIỆT CHUẨN ÂM
    // ========================================================
    alphabetList: [
        { char: "A", name: "Chữ A", audioKey: "let_a", icon: "🐟", word: "Con Cá", color: "#f43f5e" },
        { char: "Ă", name: "Chữ Á", audioKey: "let_aw", icon: "🌙", word: "Mặt Trăng", color: "#fb923c" },
        { char: "Â", name: "Chữ Ớ", audioKey: "let_aa", icon: "🍄", word: "Cây Nấm", color: "#f59e0b" },
        { char: "B", name: "Chữ Bê", audioKey: "let_b", icon: "⚽", word: "Quả Bóng", color: "#10b981" },
        { char: "C", name: "Chữ Cờ", audioKey: "let_c", icon: "🦉", word: "Con Cú", color: "#06b6d4" },
        { char: "D", name: "Chữ Dê", audioKey: "let_d", icon: "🍉", word: "Dưa Hấu", color: "#3b82f6" },
        { char: "Đ", name: "Chữ Đê", audioKey: "let_dd", icon: "💡", word: "Bóng Đèn", color: "#6366f1" },
        { char: "E", name: "Chữ E", audioKey: "let_e", icon: "👶", word: "Em Bé", color: "#8b5cf6" },
        { char: "Ê", name: "Chữ Ê", audioKey: "let_ee", icon: "🐸", word: "Con Ếch", color: "#ec4899" },
        { char: "G", name: "Chữ Giê", audioKey: "let_g", icon: "🐔", word: "Con Gà", color: "#f97316" },
        { char: "H", name: "Chữ Hát", audioKey: "let_h", icon: "🐅", word: "Con Hổ", color: "#eab308" },
        { char: "I", name: "Chữ I ngắn", audioKey: "let_i", icon: "🐜", word: "Con Kiến", color: "#14b8a6" },
        { char: "K", name: "Chữ Ca", audioKey: "let_k", icon: "✂️", word: "Cái Kéo", color: "#0ea5e9" },
        { char: "L", name: "Chữ E-lờ", audioKey: "let_l", icon: "🍐", word: "Quả Lê", color: "#22c55e" },
        { char: "M", name: "Chữ Em-mờ", audioKey: "let_m", icon: "🐱", word: "Con Mèo", color: "#a855f7" },
        { char: "N", name: "Chữ En-nờ", audioKey: "let_n", icon: "🍇", word: "Chùm Nho", color: "#d946ef" },
        { char: "O", name: "Chữ O", audioKey: "let_o", icon: "🦚", word: "Con Công", color: "#f43f5e" },
        { char: "Ô", name: "Chữ Ô", audioKey: "let_oo", icon: "🚗", word: "Ô Tô", color: "#ef4444" },
        { char: "Ơ", name: "Chữ Ơ", audioKey: "let_ow", icon: "🚩", word: "Lá Cờ", color: "#ea580c" },
        { char: "P", name: "Chữ Pê", audioKey: "let_p", icon: "🎈", word: "Bóng Bay", color: "#f59e0b" },
        { char: "Q", name: "Chữ Quy", audioKey: "let_q", icon: "🍊", word: "Quả Cam", color: "#84cc16" },
        { char: "R", name: "Chữ E-rờ", audioKey: "let_r", icon: "🐢", word: "Con Rùa", color: "#10b981" },
        { char: "S", name: "Chữ Ét-xì", audioKey: "let_s", icon: "🦁", word: "Sư Tử", color: "#06b6d4" },
        { char: "T", name: "Chữ Tê", audioKey: "let_t", icon: "🍎", word: "Quả Táo", color: "#3b82f6" },
        { char: "U", name: "Chữ U", audioKey: "let_u", icon: "🦉", word: "Con Cú", color: "#6366f1" },
        { char: "Ư", name: "Chữ Ư", audioKey: "let_uw", icon: "🦌", word: "Con Hươu", color: "#8b5cf6" },
        { char: "V", name: "Chữ Vê", audioKey: "let_v", icon: "🐘", word: "Con Voi", color: "#ec4899" },
        { char: "X", name: "Chữ Ít-xì", audioKey: "let_x", icon: "🚲", word: "Xe Đạp", color: "#10b981" },
        { char: "Y", name: "Chữ I dài", audioKey: "let_y", icon: "🩺", word: "Bác Sĩ Y Tá", color: "#f97316" }
    ],

    // ========================================================
    // 2. 12 NGUYÊN ÂM ĐƠN KẾT HỢP 5 DẤU THANH (MA TRẬN TRỰC QUAN)
    // ========================================================
    singleVowelsMatrix: {
        'a': {
            char: 'A', name: 'Nguyên âm A', audioKey: 'let_a',
            tones: [
                { name: "Thanh Ngang", symbol: "A", sample: "A", spell: "A (Không dấu)", word: "Chiếc Ca", icon: "🥛", audioKey: "tone_a_a", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "À", spell: "A - huyền - À", word: "Ngôi Nhà", icon: "🏠", audioKey: "tone_a_ah", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Á", spell: "A - sắc - Á", word: "Chiếc Lá", icon: "🍃", audioKey: "tone_a_as", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ả", spell: "A - hỏi - Ả", word: "Con Hổ", icon: "🐯", audioKey: "tone_a_ao", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ã", spell: "A - ngã - Ã", word: "Bị Ngã", icon: "🩹", audioKey: "tone_a_an", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ạ", spell: "A - nặng - Ạ", word: "Con Quạ", icon: "🦅", audioKey: "tone_a_at", color: "#8b5cf6" }
            ]
        },
        'aw': {
            char: 'Ă', name: 'Nguyên âm Ă (Á)', audioKey: 'let_aw',
            tones: [
                { name: "Thanh Ngang", symbol: "Ă", sample: "Ă", spell: "Ă (Không dấu)", word: "Mặt Trăng", icon: "🌙", audioKey: "tone_aw_aw", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ằ", spell: "Ă - huyền - Ằ", word: "Trắng Phau", icon: "🦢", audioKey: "tone_aw_awh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ắ", spell: "Ă - sắc - Ắ", word: "Cắt Bánh", icon: "✂️", audioKey: "tone_aw_aws", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ẳ", spell: "Ă - hỏi - Ẳ", word: "Gọt Giũa", icon: "🪚", audioKey: "tone_aw_awo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ẵ", spell: "Ă - ngã - Ẵ", word: "Bế Ẵm", icon: "👶", audioKey: "tone_aw_awn", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ặ", spell: "Ă - nặng - Ặ", word: "Nhặt Rau", icon: "🥬", audioKey: "tone_aw_awt", color: "#8b5cf6" }
            ]
        },
        'aa': {
            char: 'Â', name: 'Nguyên âm Â (Ớ)', audioKey: 'let_aa',
            tones: [
                { name: "Thanh Ngang", symbol: "Â", sample: "Â", spell: "Â (Không dấu)", word: "Cây Nấm", icon: "🍄", audioKey: "tone_aa_aa", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ầ", spell: "Â - huyền - Ầ", word: "Đầu Gối", icon: "🦵", audioKey: "tone_aa_aah", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ấ", spell: "Â - sắc - Ấ", word: "Ấm Trà", icon: "🫖", audioKey: "tone_aa_aas", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ẩ", spell: "Â - hỏi - Ẩ", word: "Ẩn Nấp", icon: "🙈", audioKey: "tone_aa_aao", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ẫ", spell: "Â - ngã - Ẫ", word: "Ngã Nhào", icon: "🎪", audioKey: "tone_aa_aan", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ậ", spell: "Â - nặng - Ậ", word: "Bập Bênh", icon: "🪵", audioKey: "tone_aa_aat", color: "#8b5cf6" }
            ]
        },
        'e': {
            char: 'E', name: 'Nguyên âm E', audioKey: 'let_e',
            tones: [
                { name: "Thanh Ngang", symbol: "E", sample: "E", spell: "E (Không dấu)", word: "Em Bé", icon: "👶", audioKey: "tone_e_e", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "È", spell: "E - huyền - È", word: "Con Ve", icon: "🦗", audioKey: "tone_e_eh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "É", spell: "E - sắc - É", word: "Hạt Dẻ", icon: "🌰", audioKey: "tone_e_es", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ẻ", spell: "E - hỏi - Ẻ", word: "Vui Vẻ", icon: "😄", audioKey: "tone_e_eo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ẽ", spell: "E - ngã - Ẽ", word: "Vẽ Tranh", icon: "🎨", audioKey: "tone_e_en", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ẹ", spell: "E - nặng - Ẹ", word: "Mẹ Yêu", icon: "👩‍👧", audioKey: "tone_e_et", color: "#8b5cf6" }
            ]
        },
        'ee': {
            char: 'Ê', name: 'Nguyên âm Ê', audioKey: 'let_ee',
            tones: [
                { name: "Thanh Ngang", symbol: "Ê", sample: "Ê", spell: "Ê (Không dấu)", word: "Con Bê", icon: "🐄", audioKey: "tone_ee_ee", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ề", spell: "Ê - huyền - Ề", word: "Cà Phê", icon: "☕", audioKey: "tone_ee_eeh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ế", spell: "Ê - sắc - Ế", word: "Con Ếch", icon: "🐸", audioKey: "tone_ee_ees", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ể", spell: "Ê - hỏi - Ể", word: "Kể Chuyện", icon: "📖", audioKey: "tone_ee_eeo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ễ", spell: "Ê - ngã - Ễ", word: "Lễ Hội", icon: "🏮", audioKey: "tone_ee_een", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ệ", spell: "Ê - nặng - Ệ", word: "Cơm Nếp", icon: "🍚", audioKey: "tone_ee_eet", color: "#8b5cf6" }
            ]
        },
        'i': {
            char: 'I', name: 'Nguyên âm I (ngắn)', audioKey: 'let_i',
            tones: [
                { name: "Thanh Ngang", symbol: "I", sample: "I", spell: "I (Không dấu)", word: "Bút Chì", icon: "✏️", audioKey: "tone_i_i", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ì", spell: "I - huyền - Ì", word: "Mì Tôm", icon: "🍜", audioKey: "tone_i_ih", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Í", spell: "I - sắc - Í", word: "Ý Chí", icon: "💪", audioKey: "tone_i_is", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ỉ", spell: "I - hỏi - Ỉ", word: "Con Khỉ", icon: "🐵", audioKey: "tone_i_io", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ĩ", spell: "I - ngã - Ĩ", word: "Suy Nghĩ", icon: "🧠", audioKey: "tone_i_in", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ị", spell: "I - nặng - Ị", word: "Chị Gái", icon: "👧", audioKey: "tone_i_it", color: "#8b5cf6" }
            ]
        },
        'o': {
            char: 'O', name: 'Nguyên âm O', audioKey: 'let_o',
            tones: [
                { name: "Thanh Ngang", symbol: "O", sample: "O", spell: "O (Không dấu)", word: "Con Ong", icon: "🐝", audioKey: "tone_o_o", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ò", spell: "O - huyền - Ò", word: "Bò Sữa", icon: "🐄", audioKey: "tone_o_oh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ó", spell: "O - sắc - Ó", word: "Chó Con", icon: "🐶", audioKey: "tone_o_os", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ỏ", spell: "O - hỏi - Ỏ", word: "Bãi Cỏ", icon: "🌱", audioKey: "tone_o_oo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Õ", spell: "O - ngã - Õ", word: "Gõ Cửa", icon: "🚪", audioKey: "tone_o_on", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ọ", spell: "O - nặng - Ọ", word: "Bọ Rùa", icon: "🐞", audioKey: "tone_o_ot", color: "#8b5cf6" }
            ]
        },
        'oo': {
            char: 'Ô', name: 'Nguyên âm Ô', audioKey: 'let_oo',
            tones: [
                { name: "Thanh Ngang", symbol: "Ô", sample: "Ô", spell: "Ô (Không dấu)", word: "Cái Ô", icon: "☂️", audioKey: "tone_oo_oo", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ồ", spell: "Ô - huyền - Ồ", word: "Đồng Hồ", icon: "⏰", audioKey: "tone_oo_ooh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ố", spell: "Ô - sắc - Ố", word: "Bố Yêu", icon: "👨", audioKey: "tone_oo_oos", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ổ", spell: "Ô - hỏi - Ổ", word: "Cửa Sổ", icon: "🪟", audioKey: "tone_oo_ooo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ỗ", spell: "Ô - ngã - Ỗ", word: "Chỗ Ngồi", icon: "🪑", audioKey: "tone_oo_oon", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ộ", spell: "Ô - nặng - Ộ", word: "Bộ Quần Áo", icon: "👕", audioKey: "tone_oo_oot", color: "#8b5cf6" }
            ]
        },
        'ow': {
            char: 'Ơ', name: 'Nguyên âm Ơ', audioKey: 'let_ow',
            tones: [
                { name: "Thanh Ngang", symbol: "Ơ", sample: "Ơ", spell: "Ơ (Không dấu)", word: "Lá Cờ", icon: "🚩", audioKey: "tone_ow_ow", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ờ", spell: "Ơ - huyền - Ờ", word: "Trời Mưa", icon: "🌧️", audioKey: "tone_ow_owh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ớ", spell: "Ơ - sắc - Ớ", word: "Quả Ớt", icon: "🌶️", audioKey: "tone_ow_ows", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ở", spell: "Ơ - hỏi - Ở", word: "Nhà Ở", icon: "🏠", audioKey: "tone_ow_owo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ỡ", spell: "Ơ - ngã - Ỡ", word: "Màu Mỡ", icon: "🧈", audioKey: "tone_ow_own", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ợ", spell: "Ơ - nặng - Ợ", word: "No Nê", icon: "🥪", audioKey: "tone_ow_owt", color: "#8b5cf6" }
            ]
        },
        'u': {
            char: 'U', name: 'Nguyên âm U', audioKey: 'let_u',
            tones: [
                { name: "Thanh Ngang", symbol: "U", sample: "U", spell: "U (Không dấu)", word: "Cái Lu", icon: "🏺", audioKey: "tone_u_u", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ù", spell: "U - huyền - Ù", word: "Xù Lông", icon: "🐕", audioKey: "tone_u_uh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ú", spell: "U - sắc - Ú", word: "Con Cú", icon: "🦉", audioKey: "tone_u_us", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ủ", spell: "U - hỏi - Ủ", word: "Ủ Ấm", icon: "🧤", audioKey: "tone_u_uo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ũ", spell: "U - ngã - Ũ", word: "Mũ Ấm", icon: "🧢", audioKey: "tone_u_un", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ụ", spell: "U - nặng - Ụ", word: "Bụi Cây", icon: "🌳", audioKey: "tone_u_ut", color: "#8b5cf6" }
            ]
        },
        'uw': {
            char: 'Ư', name: 'Nguyên âm Ư', audioKey: 'let_uw',
            tones: [
                { name: "Thanh Ngang", symbol: "Ư", sample: "Ư", spell: "Ư (Không dấu)", word: "Con Hươu", icon: "🦌", audioKey: "tone_uw_uw", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ừ", spell: "Ư - huyền - Ừ", word: "Lá Thư", icon: "✉️", audioKey: "tone_uw_uwh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ứ", spell: "Ư - sắc - Ứ", word: "Mực Nước", icon: "💧", audioKey: "tone_uw_uws", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ử", spell: "Ư - hỏi - Ử", word: "Cửa Mở", icon: "🚪", audioKey: "tone_uw_uwo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ữ", spell: "Ư - ngã - Ữ", word: "Chữ Cái", icon: "🔤", audioKey: "tone_uw_uwn", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ự", spell: "Ư - nặng - Ự", word: "Hoa Cúc", icon: "🌼", audioKey: "tone_uw_uwt", color: "#8b5cf6" }
            ]
        },
        'y': {
            char: 'Y', name: 'Nguyên âm Y (dài)', audioKey: 'let_y',
            tones: [
                { name: "Thanh Ngang", symbol: "Y", sample: "Y", spell: "Y (Không dấu)", word: "Y Tá", icon: "🩺", audioKey: "tone_y_y", color: "#0ea5e9" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "Ỳ", spell: "Y - huyền - Ỳ", word: "Kỳ Lân", icon: "🦄", audioKey: "tone_y_yh", color: "#3b82f6" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "Ý", spell: "Y - sắc - Ý", word: "Ý Nghĩ", icon: "💡", audioKey: "tone_y_ys", color: "#ef4444" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "Ỷ", spell: "Y - hỏi - Ỷ", word: "Ý Tứ", icon: "🐱", audioKey: "tone_y_yo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "Ỹ", spell: "Y - ngã - Ỹ", word: "Mỹ Thuật", icon: "🎨", audioKey: "tone_y_yn", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "Ỵ", spell: "Y - nặng - Ỵ", word: "Lưu Ý", icon: "📌", audioKey: "tone_y_yt", color: "#8b5cf6" }
            ]
        }
    },

    // 12 NGUYÊN ÂM KÉP
    compoundVowelsMatrix: {
        'ai': {
            char: 'AI', name: 'Vần AI', audioKey: 'vowel_ai', wordSample: 'Cái Tai 👂',
            tones: [
                { name: "Thanh Ngang", symbol: "AI", sample: "AI", spell: "AI (Không dấu)", word: "Cái Tai", icon: "👂", audioKey: "tone_ai_ai", color: "#0ea5e9" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "ÁI", spell: "AI - sắc - ÁI", word: "Bé Gái", icon: "👧", audioKey: "tone_ai_ais", color: "#ef4444" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "ÀI", spell: "AI - huyền - ÀI", word: "Hoa Nhài", icon: "🌼", audioKey: "tone_ai_aih", color: "#3b82f6" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "ẢI", spell: "AI - hỏi - ẢI", word: "Ải Chi Lăng", icon: "🏰", audioKey: "tone_ai_aio", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "ÃI", spell: "AI - ngã - ÃI", word: "Mãi Mãi", icon: "♾️", audioKey: "tone_ai_ain", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "ẠI", spell: "AI - nặng - ẠI", word: "Quay Lại", icon: "🔄", audioKey: "tone_ai_ait", color: "#8b5cf6" }
            ]
        },
        'ao': {
            char: 'AO', name: 'Vần AO', audioKey: 'vowel_ao', wordSample: 'Ngôi Sao ⭐',
            tones: [
                { name: "Thanh Ngang", symbol: "AO", sample: "AO", spell: "AO (Không dấu)", word: "Ngôi Sao", icon: "⭐", audioKey: "tone_ao_ao", color: "#0ea5e9" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "ÁO", spell: "AO - sắc - ÁO", word: "Cái Áo", icon: "👕", audioKey: "tone_ao_aos", color: "#ef4444" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "ÀO", spell: "AO - huyền - ÀO", word: "Hàng Rào", icon: "🏡", audioKey: "tone_ao_aoh", color: "#3b82f6" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "ẢO", spell: "AO - hỏi - ẢO", word: "Ảo Thuật", icon: "🎩", audioKey: "tone_ao_aoo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "ÃO", spell: "AO - ngã - ÃI", word: "Cơn Bão", icon: "🌪️", audioKey: "tone_ao_aon", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "ẠO", spell: "AO - nặng - ẠO", word: "Hạt Gạo", icon: "🍚", audioKey: "tone_ao_aot", color: "#8b5cf6" }
            ]
        },
        'eo': {
            char: 'EO', name: 'Vần EO', audioKey: 'vowel_eo', wordSample: 'Chú Mèo 🐱',
            tones: [
                { name: "Thanh Ngang", symbol: "EO", sample: "EO", spell: "EO (Không dấu)", word: "Chú Mèo", icon: "🐱", audioKey: "tone_eo_eo", color: "#0ea5e9" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "ÉO", spell: "EO - sắc - ÉO", word: "Kéo Co", icon: "🪢", audioKey: "tone_eo_eos", color: "#ef4444" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "ÈO", spell: "EO - huyền - ÈO", word: "Bánh Bèo", icon: "🍘", audioKey: "tone_eo_eoh", color: "#3b82f6" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "ẺO", spell: "EO - hỏi - ẺO", word: "Dẻo Dai", icon: "🤸", audioKey: "tone_eo_eoo", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "ẼO", spell: "EO - ngã - ẼO", word: "Uốn Éo", icon: "💃", audioKey: "tone_eo_eon", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "ẸO", spell: "EO - nặng - ẸO", word: "Kẹo Ngọt", icon: "🍬", audioKey: "tone_eo_eot", color: "#8b5cf6" }
            ]
        },
        'oa': {
            char: 'OA', name: 'Vần OA', audioKey: 'vowel_oa', wordSample: 'Bông Hoa 🌸',
            tones: [
                { name: "Thanh Ngang", symbol: "OA", sample: "OA", spell: "OA (Không dấu)", word: "Bông Hoa", icon: "🌸", audioKey: "tone_oa_oa", color: "#0ea5e9" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "OÁ", spell: "OA - sắc - OÁ", word: "Bánh Khoai", icon: "🍠", audioKey: "tone_oa_oas", color: "#ef4444" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "OÀ", spell: "OA - huyền - OÀ", word: "Òa Khóc", icon: "😭", audioKey: "tone_oa_oah", color: "#3b82f6" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "OẢ", spell: "OA - hỏi - OẢ", word: "Cái Oản", icon: "🧁", audioKey: "tone_oa_oao", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "OÃ", spell: "OA - ngã - OÃ", word: "Vỡ Oà", icon: "🎉", audioKey: "tone_oa_oan", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "OẠ", spell: "OA - nặng - OẠ", word: "Họa Sĩ", icon: "🎨", audioKey: "tone_oa_oat", color: "#8b5cf6" }
            ]
        },
        'oi': {
            char: 'OI', name: 'Vần OI', audioKey: 'vowel_oi', wordSample: 'Con Voi 🐘',
            tones: [
                { name: "Thanh Ngang", symbol: "OI", sample: "OI", spell: "OI (Không dấu)", word: "Con Voi", icon: "🐘", audioKey: "tone_oi_oi", color: "#0ea5e9" },
                { name: "Dấu Sắc (´ )", symbol: "ˊ", sample: "ÓI", spell: "OI - sắc - ÓI", word: "Cái Gói", icon: "📦", audioKey: "tone_oi_ois", color: "#ef4444" },
                { name: "Dấu Huyền (` )", symbol: "ˋ", sample: "ÒI", spell: "OI - huyền - ÒI", word: "Cái Còi", icon: "📢", audioKey: "tone_oi_oih", color: "#3b82f6" },
                { name: "Dấu Hỏi (? )", symbol: "ˀ", sample: "ỎI", spell: "OI - hỏi - ỎI", word: "Hỏi Bài", icon: "🙋", audioKey: "tone_oi_oio", color: "#10b981" },
                { name: "Dấu Ngã (~ )", symbol: "~", sample: "ÕI", spell: "OI - ngã - ÕI", word: "Dõi Theo", icon: "👀", audioKey: "tone_oi_oin", color: "#f59e0b" },
                { name: "Dấu Nặng (. )", symbol: "•", sample: "ỌI", spell: "OI - nặng - ỌI", word: "Tiếng Gọi", icon: "🗣️", audioKey: "tone_oi_oit", color: "#8b5cf6" }
            ]
        }
    },

    // ========================================================
    // 3. 11 PHỤ ÂM GHÉP CĂN BẢN & LƯỚI TỪ GHÉP TƯƠNG TÁC
    // ========================================================
    compoundConsonantsList: [
        {
            code: "ch",
            char: "CH",
            name: "Chữ Chờ",
            desc: "Ghép bởi chữ Cờ (C) và chữ Hát (H)",
            audioKey: "comp_con_ch",
            icon: "🐶",
            color: "#f43f5e",
            pairs: [
                { first: "CH", vowel: "A", tone: "", word: "CHA", icon: "👨‍👧", meaning: "Ba cha con", audioKey: "pair_ch_a", spellText: "CH + A = CHA" },
                { first: "CH", vowel: "O", tone: "ˊ", word: "CHÓ", icon: "🐶", meaning: "Chú cún con", audioKey: "pair_ch_o_s", spellText: "CH + O + SẮC = CHÓ" },
                { first: "CH", vowel: "E", tone: "", word: "CHE", icon: "☂️", meaning: "Chiếc ô che mưa", audioKey: "pair_ch_e", spellText: "CH + E = CHE" },
                { first: "CH", vowel: "I", tone: "ˊ", word: "CHÍ", icon: "💪", meaning: "Ý chí bé ngoan", audioKey: "pair_ch_i_s", spellText: "CH + I + SẮC = CHÍ" },
                { first: "CH", vowel: "U", tone: "ˊ", word: "CHÚ", icon: "👮", meaning: "Chú công an", audioKey: "pair_ch_u_s", spellText: "CH + U + SẮC = CHÚ" },
                { first: "CH", vowel: "Ô", tone: "ˀ", word: "CHỔI", icon: "🧹", meaning: "Cái chổi quét nhà", audioKey: "pair_ch_oo_h", spellText: "CH + Ô + HỎI = CHỔI" }
            ]
        },
        {
            code: "gh",
            char: "GH",
            name: "Chữ Ghê",
            desc: "Ghép bởi chữ Giê (G) và chữ Hát (H)",
            audioKey: "comp_con_gh",
            icon: "🪑",
            color: "#3b82f6",
            pairs: [
                { first: "GH", vowel: "Ê", tone: "ˊ", word: "GHẾ", icon: "🪑", meaning: "Chiếc ghế ngồi", audioKey: "pair_gh_ee_s", spellText: "GH + Ê + SẮC = GHẾ" },
                { first: "GH", vowel: "E", tone: "ˊ", word: "GHÉ", icon: "🏡", meaning: "Ghé thăm ông bà", audioKey: "pair_gh_e_s", spellText: "GH + E + SẮC = GHÉ" },
                { first: "GH", vowel: "I", tone: "", word: "GHI", icon: "📝", meaning: "Bé ghi bài vở", audioKey: "pair_gh_i", spellText: "GH + I = GHI" },
                { first: "GH", vowel: "E", tone: "•", word: "GHẸ", icon: "🦀", meaning: "Con ghẹ biển", audioKey: "pair_gh_e_n", spellText: "GH + E + NẶNG = GHẸ" }
            ]
        },
        {
            code: "gi",
            char: "GI",
            name: "Chữ Gi",
            desc: "Ghép bởi chữ Giê (G) và chữ I ngắn (I)",
            audioKey: "comp_con_gi",
            icon: "👟",
            color: "#10b981",
            pairs: [
                { first: "GI", vowel: "A", tone: "ˋ", word: "GIÀ", icon: "👴", meaning: "Cụ già râu bạc", audioKey: "pair_gi_a_h", spellText: "GI + A + HUYỀN = GIÀ" },
                { first: "GI", vowel: "O", tone: "ˀ", word: "GIỎ", icon: "🧺", meaning: "Cái giỏ hoa", audioKey: "pair_gi_o_h", spellText: "GI + O + HỎI = GIỎ" },
                { first: "GI", vowel: "AY", tone: "ˋ", word: "GIÀY", icon: "👟", meaning: "Đôi giày xinh", audioKey: "pair_gi_ay_h", spellText: "GI + AY + HUYỀN = GIÀY" },
                { first: "GI", vowel: "ƯƠNG", tone: "ˋ", word: "GIƯỜNG", icon: "🛏️", meaning: "Chiếc giường ngủ", audioKey: "pair_gi_uong_h", spellText: "GI + ƯƠNG + HUYỀN = GIƯỜNG" }
            ]
        },
        {
            code: "kh",
            char: "KH",
            name: "Chữ Khờ",
            desc: "Ghép bởi chữ Ca (K) và chữ Hát (H)",
            audioKey: "comp_con_kh",
            icon: "🐵",
            color: "#f59e0b",
            pairs: [
                { first: "KH", vowel: "I", tone: "ˀ", word: "KHỈ", icon: "🐵", meaning: "Chú khỉ con", audioKey: "pair_kh_i_h", spellText: "KH + I + HỎI = KHỈ" },
                { first: "KH", vowel: "A", tone: "ˊ", word: "KHÁ", icon: "⭐", meaning: "Bé học rất khá", audioKey: "pair_kh_a_s", spellText: "KH + A + SẮC = KHÁ" },
                { first: "KH", vowel: "ĂN", tone: "", word: "KHĂN", icon: "🧣", meaning: "Chiếc khăn quàng ấm", audioKey: "pair_kh_an", spellText: "KH + ĂN = KHĂN" },
                { first: "KH", vowel: "Ê", tone: "ˊ", word: "KHẾ", icon: "⭐", meaning: "Quả khế chín vàng", audioKey: "pair_kh_e_s", spellText: "KH + Ê + SẮC = KHẾ" }
            ]
        },
        {
            code: "nh",
            char: "NH",
            name: "Chữ Nhờ",
            desc: "Ghép bởi chữ En-nờ (N) và chữ Hát (H)",
            audioKey: "comp_con_nh",
            icon: "🏠",
            color: "#8b5cf6",
            pairs: [
                { first: "NH", vowel: "A", tone: "ˋ", word: "NHÀ", icon: "🏠", meaning: "Ngôi nhà của bé", audioKey: "pair_nh_a_h", spellText: "NH + A + HUYỀN = NHÀ" },
                { first: "NH", vowel: "O", tone: "", word: "NHO", icon: "🍇", meaning: "Chùm nho ngọt lịm", audioKey: "pair_nh_o", spellText: "NH + O = NHO" },
                { first: "NH", vowel: "E", tone: "ˊ", word: "NHÉ", icon: "👋", meaning: "Bé nhớ nhé", audioKey: "pair_nh_e_s", spellText: "NH + E + SẮC = NHÉ" },
                { first: "NH", vowel: "ÂN", tone: "ˊ", word: "NHẪN", icon: "💍", meaning: "Chiếc nhẫn vàng", audioKey: "pair_nh_an_s", spellText: "NH + ÂN + SẮC = NHẪN" }
            ]
        },
        {
            code: "ng",
            char: "NG",
            name: "Chữ Ngờ đơn",
            desc: "Ghép bởi chữ En-nờ (N) và chữ Giê (G)",
            audioKey: "comp_con_ng",
            icon: "🐴",
            color: "#ea580c",
            pairs: [
                { first: "NG", vowel: "Ư", tone: "•", word: "NGỰA", icon: "🐴", meaning: "Chú ngựa phi nhanh", audioKey: "pair_ng_u_n", spellText: "NG + Ư + NẶNG = NGỰA" },
                { first: "NG", vowel: "Ô", tone: "", word: "NGÔ", icon: "🌽", meaning: "Bắp ngô vàng ngọt", audioKey: "pair_ng_oo", spellText: "NG + Ô = NGÔ" },
                { first: "NG", vowel: "A", tone: "", word: "NGA", icon: "🦢", meaning: "Chú chim ngao du", audioKey: "pair_ng_a", spellText: "NG + A = NGA" },
                { first: "NG", vowel: "O", tone: "ˀ", word: "NGÕ", icon: "🏡", meaning: "Ngõ nhỏ nhà bé", audioKey: "pair_ng_o_h", spellText: "NG + O + NGÃ = NGÕ" }
            ]
        },
        {
            code: "ngh",
            char: "NGH",
            name: "Chữ Nghê kép",
            desc: "Ghép bởi 3 chữ: En-nờ (N), Giê (G) và Hát (H)",
            audioKey: "comp_con_ngh",
            icon: "🐃",
            color: "#059669",
            pairs: [
                { first: "NGH", vowel: "E", tone: "ˊ", word: "NGHÉ", icon: "🐃", meaning: "Chú nghé con", audioKey: "pair_ngh_e_s", spellText: "NGH + E + SẮC = NGHÉ" },
                { first: "NGH", vowel: "I", tone: "ˀ", word: "NGHỈ", icon: "🛌", meaning: "Giờ nghỉ trưa", audioKey: "pair_ngh_i_h", spellText: "NGH + I + HỎI = NGHỈ" },
                { first: "NGH", vowel: "IÊNG", tone: "", word: "NGHIÊNG", icon: "🙇", meaning: "Nghiêng đầu chào cô", audioKey: "pair_ngh_ieng", spellText: "NGH + IÊNG = NGHIÊNG" }
            ]
        },
        {
            code: "ph",
            char: "PH",
            name: "Chữ Phờ",
            desc: "Ghép bởi chữ Pê (P) và chữ Hát (H)",
            audioKey: "comp_con_ph",
            icon: "🍜",
            color: "#db2777",
            pairs: [
                { first: "PH", vowel: "Ơ", tone: "ˀ", word: "PHỞ", icon: "🍜", meaning: "Bát phở thơm ngon", audioKey: "pair_ph_o_h", spellText: "PH + Ơ + HỎI = PHỞ" },
                { first: "PH", vowel: "AO", tone: "", word: "PHAO", icon: "🛟", meaning: "Chiếc phao bơi cứu sinh", audioKey: "pair_ph_ao", spellText: "PH + AO = PHAO" },
                { first: "PH", vowel: "AO", tone: "ˊ", word: "PHÁO", icon: "🎆", meaning: "Cây pháo hoa rực rỡ", audioKey: "pair_ph_ao_s", spellText: "PH + AO + SẮC = PHÁO" }
            ]
        },
        {
            code: "th",
            char: "TH",
            name: "Chữ Thờ",
            desc: "Ghép bởi chữ Tê (T) và chữ Hát (H)",
            audioKey: "comp_con_th",
            icon: "🐰",
            color: "#d97706",
            pairs: [
                { first: "TH", vowel: "O", tone: "ˀ", word: "THỎ", icon: "🐰", meaning: "Chú thỏ trắng tai dài", audioKey: "pair_th_o_h", spellText: "TH + O + HỎI = THỎ" },
                { first: "TH", vowel: "UYÊN", tone: "ˋ", word: "THUYỀN", icon: "⛵", meaning: "Chiếc thuyền buồm", audioKey: "pair_th_uyen_h", spellText: "TH + UYÊN + HUYỀN = THUYỀN" },
                { first: "TH", vowel: "ƯỚC", tone: "ˊ", word: "THƯỚC", icon: "📏", meaning: "Chiếc thước kẻ thẳng", audioKey: "pair_th_uoc_s", spellText: "TH + ƯỚC + SẮC = THƯỚC" },
                { first: "TH", vowel: "I", tone: "ˋ", word: "THÌA", icon: "🥄", meaning: "Cái thìa xúc cơm", audioKey: "pair_th_i_h", spellText: "TH + I + HUYỀN = THÌA" }
            ]
        },
        {
            code: "tr",
            char: "TR",
            name: "Chữ Trờ",
            desc: "Ghép bởi chữ Tê (T) và chữ E-rờ (R)",
            audioKey: "comp_con_tr",
            icon: "🌕",
            color: "#0284c7",
            pairs: [
                { first: "TR", vowel: "ĂNG", tone: "", word: "TRĂNG", icon: "🌕", meaning: "Ánh trăng tròn đêm rằm", audioKey: "pair_tr_ang", spellText: "TR + ĂNG = TRĂNG" },
                { first: "TR", vowel: "ÔNG", tone: "ˊ", word: "TRỐNG", icon: "🥁", meaning: "Chiếc trống trường vang vang", audioKey: "pair_tr_ong_s", spellText: "TR + ÔNG + SẮC = TRỐNG" },
                { first: "TR", vowel: "ƯNG", tone: "ˊ", word: "TRỨNG", icon: "🥚", meaning: "Quả trứng gà tròn xinh", audioKey: "pair_tr_ung_s", spellText: "TR + ƯNG + SẮC = TRỨNG" },
                { first: "TR", vowel: "A", tone: "", word: "TRÀ", icon: "🍵", meaning: "Tách trà ấm thơm", audioKey: "pair_tr_a", spellText: "TR + A + HUYỀN = TRÀ" }
            ]
        },
        {
            code: "qu",
            char: "QU",
            name: "Chữ Quy",
            desc: "Ghép bởi chữ Quy (Q) và chữ U",
            audioKey: "comp_con_qu",
            icon: "🍎",
            color: "#16a34a",
            pairs: [
                { first: "QU", vowel: "A", tone: "ˀ", word: "QUẢ", icon: "🍎", meaning: "Quả táo chín đỏ", audioKey: "pair_qu_a_h", spellText: "QU + A + HỎI = QUẢ" },
                { first: "QU", vowel: "AT", tone: "•", word: "QUẠT", icon: "🪭", meaning: "Chiếc quạt mát lành", audioKey: "pair_qu_at_n", spellText: "QU + AT + NẶNG = QUẠT" },
                { first: "QU", vowel: "ĂN", tone: "ˋ", word: "QUẦN", icon: "👖", meaning: "Bộ quần áo mới", audioKey: "pair_qu_an_h", spellText: "QU + ĂN + HUYỀN = QUẦN" }
            ]
        }
    ],

    // ========================================================
    // 4. GHÉP VẦN TĂNG TIẾN (INTERACTIVE PHONICS 4 CẤP ĐỘ)
    // ========================================================
    progressiveSpelling: {
        1: [
            { word: "BA", illustration: "👨‍👧", meaning: "Ba dắt tay bé", parts: ["B", "A"], displaySpell: "B + A = BA", audioKey: "spell_ba_simple", bg: "#eff6ff" },
            { word: "CA", illustration: "🥛", meaning: "Chiếc ca đựng nước", parts: ["C", "A"], displaySpell: "C + A = CA", audioKey: "spell_ca_simple", bg: "#f0fdf4" },
            { word: "BÔ", illustration: "🚽", meaning: "Cái bô em bé", parts: ["B", "Ô"], displaySpell: "B + Ô = BÔ", audioKey: "spell_bo_simple", bg: "#fef3c7" },
            { word: "ME", illustration: "🍈", meaning: "Quả me chua ngọt", parts: ["M", "E"], displaySpell: "M + E = ME", audioKey: "spell_me_simple", bg: "#ecfdf5" },
            { word: "ĐI", illustration: "🚶", meaning: "Bé tung tăng đi dạo", parts: ["Đ", "I"], displaySpell: "Đ + I = ĐI", audioKey: "spell_di_simple", bg: "#fdf4ff" },
            { word: "XE", illustration: "🚗", meaning: "Xe cộ chạy bon bon", parts: ["X", "E"], displaySpell: "X + E = XE", audioKey: "spell_xe_simple", bg: "#f1f5f9" }
        ],
        2: [
            { word: "CÁ", illustration: "🐟", meaning: "Con cá bơi lội", parts: ["C", "A", "ˊ"], displaySpell: "C + A + SẮC = CÁ", audioKey: "spell_ca", bg: "#e0f2fe" },
            { word: "BÒ", illustration: "🐄", meaning: "Chú bò sữa hiền lành", parts: ["B", "O", "ˋ"], displaySpell: "B + O + HUYỀN = BÒ", audioKey: "spell_bo", bg: "#fef3c7" },
            { word: "GÀ", illustration: "🐔", meaning: "Chú gà trống gáy vang", parts: ["G", "A", "ˋ"], displaySpell: "G + A + HUYỀN = GÀ", audioKey: "spell_ga", bg: "#fee2e2" },
            { word: "CHÓ", illustration: "🐶", meaning: "Chú cún trung thành", parts: ["CH", "O", "ˊ"], displaySpell: "CH + O + SẮC = CHÓ", audioKey: "spell_cho", bg: "#ffedd5" },
            { word: "HỔ", illustration: "🐯", meaning: "Hổ con dũng cảm", parts: ["H", "Ô", "ˀ"], displaySpell: "H + Ô + HỎI = HỔ", audioKey: "spell_ho", bg: "#fed7aa" },
            { word: "MẸ", illustration: "👩‍👧", meaning: "Mẹ hiền yêu quý", parts: ["M", "E", "•"], displaySpell: "M + E + NẶNG = MẸ", audioKey: "spell_me", bg: "#ffe4e6" }
        ],
        3: [
            { word: "MÈO", illustration: "🐱", meaning: "Mèo con bắt chuột", parts: ["M", "EO", "ˋ"], displaySpell: "M + EO + HUYỀN = MÈO", audioKey: "spell_meo", bg: "#f3e8ff" },
            { word: "CHUỐI", illustration: "🍌", meaning: "Nải chuối chín vàng", parts: ["CH", "UÔI", "ˊ"], displaySpell: "CH + UÔI + SẮC = CHUỐI", audioKey: "spell_chuoi", bg: "#fef9c3" },
            { word: "HOA", illustration: "🌸", meaning: "Bông hoa tươi thắm", parts: ["H", "OA"], displaySpell: "H + OA = HOA", audioKey: "spell_bong_hoa", bg: "#fff1f2" },
            { word: "SAO", illustration: "⭐", meaning: "Ngôi sao lấp lánh", parts: ["S", "AO"], displaySpell: "S + AO = SAO", audioKey: "spell_mat_trang", bg: "#e0e7ff" }
        ],
        4: [
            { word: "CÁ VÀNG", illustration: "🐠", meaning: "Chú cá vàng múa lượn", parts: ["CÁ", "VÀNG"], displaySpell: "CÁ + VÀNG = CÁ VÀNG", audioKey: "spell_ca_vang", bg: "#fef9c3" },
            { word: "GÀ TRỐNG", illustration: "🐓", meaning: "Chú gà trống gáy ó o", parts: ["GÀ", "TRỐNG"], displaySpell: "GÀ + TRỐNG = GÀ TRỐNG", audioKey: "spell_ga_trong", bg: "#fee2e2" },
            { word: "XE ĐẠP", illustration: "🚲", meaning: "Bé tập đi xe đạp", parts: ["XE", "ĐẠP"], displaySpell: "XE + ĐẠP = XE ĐẠP", audioKey: "spell_xe_dap", bg: "#e0f2fe" },
            { word: "QUẢ TÁO", illustration: "🍎", meaning: "Quả táo đỏ thơm ngon", parts: ["QUẢ", "TÁO"], displaySpell: "QUẢ + TÁO = QUẢ TÁO", audioKey: "spell_qua_tao", bg: "#ffe4e6" }
        ]
    },

    // ========================================================
    // ORCHESTRATION & MENU NAVIGATION
    // ========================================================
    init() {
        this.renderSubMenu();
        this.switchLevel(this.currentLevel || 1);
    },

    renderSubMenu() {
        const subNav = document.getElementById('letters-subnav');
        if (!subNav) return;
        subNav.innerHTML = `
            <button class="kid-pill ${this.currentLevel === 1 ? 'active' : ''}" onclick="LettersZone.switchLevel(1)">
                🔤 Cấp 1: 29 Chữ Cái
            </button>
            <button class="kid-pill ${this.currentLevel === 2 ? 'active' : ''}" onclick="LettersZone.switchLevel(2)">
                🎵 Cấp 2: Luyện Vần & 5 Dấu
            </button>
            <button class="kid-pill ${this.currentLevel === 3 ? 'active' : ''}" onclick="LettersZone.switchLevel(3)">
                🧩 Cấp 3: 11 Phụ Âm Ghép
            </button>
            <button class="kid-pill ${this.currentLevel === 4 ? 'active' : ''}" onclick="LettersZone.switchLevel(4)">
                🚀 Cấp 4: Ghép Vần Tăng Tiến
            </button>
        `;
    },

    switchLevel(level) {
        this.currentLevel = level;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();

        const pills = document.querySelectorAll('#letters-subnav .kid-pill');
        pills.forEach((p, idx) => p.classList.toggle('active', idx + 1 === level));

        const container = document.getElementById('letters-content');
        if (!container) return;

        if (level === 1) {
            this.renderLevel1(container);
        } else if (level === 2) {
            this.renderLevel2(container);
        } else if (level === 3) {
            this.renderLevel3Compound(container);
        } else if (level === 4) {
            this.renderLevel4Spelling(container);
        }
    },

    // ========================================================
    // CẤP 1: BẢNG 29 CHỮ CÁI TIẾNG VIỆT
    // ========================================================
    renderLevel1(container) {
        container.innerHTML = `
            <div class="level-intro">
                <h2>🔤 Cấp 1: Bảng 29 Chữ Cái Tiếng Việt Chuẩn Âm</h2>
                <p>Bé chạm vào từng chữ cái để nghe cô giáo đọc chuẩn tên chữ và từ minh họa nhé!</p>
            </div>

            <div class="alphabet-kid-grid">
                ${this.alphabetList.map((item, idx) => `
                    <div class="alphabet-kid-card" style="border-bottom-color:${item.color}" onclick="LettersZone.clickLetter(${idx})">
                        <span class="char-symbol" style="color:${item.color}">${item.char}</span>
                        <span class="char-lower">${item.char.toLowerCase()}</span>
                        <div class="char-mini-word">
                            <span class="mini-icon">${item.icon}</span>
                            <span class="mini-name">${item.word}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    clickLetter(idx) {
        const item = this.alphabetList[idx];
        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.playVoice(item.audioKey, null, `${item.name}. ${item.word}`);
        }
    },

    // ========================================================
    // CẤP 2: LUYỆN TỪNG VẦN & MA TRẬN 5 DẤU THANH KẾT HỢP
    // ========================================================
    renderLevel2(container) {
        const isSingle = this.vowelType === 'single';
        const currentData = isSingle ? this.singleVowelsMatrix : this.compoundVowelsMatrix;
        const keys = Object.keys(currentData);
        if (!currentData[this.selectedVowelKey]) {
            this.selectedVowelKey = keys[0];
        }
        const curMatrix = currentData[this.selectedVowelKey];

        container.innerHTML = `
            <div class="level-intro">
                <h2>🎵 Cấp 2: Luyện Từng Vần Kết Hợp 5 Dấu Thanh</h2>
                <p>Bé chọn một nguyên âm bên dưới, sau đó chạm vào từng ô chữ để nghe đánh vần từng dấu thanh nhé!</p>
            </div>

            <!-- CHUYỂN ĐỔI: 12 NGUYÊN ÂM ĐƠN vs 12 NGUYÊN ÂM KÉP -->
            <div style="display:flex; justify-content:center; gap:10px; margin-bottom:12px; flex-wrap:wrap;">
                <button class="kid-pill ${isSingle ? 'active' : ''}" style="font-size:14px; padding:8px 18px;" onclick="LettersZone.switchVowelType('single')">
                    🔤 12 Nguyên Âm Đơn (A, Ă, Â, E, Ê...)
                </button>
                <button class="kid-pill ${!isSingle ? 'active' : ''}" style="font-size:14px; padding:8px 18px; background:linear-gradient(135deg, #ec4899, #db2777); color:#fff;" onclick="LettersZone.switchVowelType('compound')">
                    ✨ Nguyên Âm Kép (AI, AO, EO, OA...)
                </button>
            </div>

            <!-- THANH CHỌN NGUYÊN ÂM VUỐT NGANG -->
            <div class="vowel-selector-bar">
                ${keys.map(k => `
                    <button class="vowel-pill ${k === this.selectedVowelKey ? 'active' : ''}" onclick="LettersZone.selectVowel('${k}')">
                        ${currentData[k].char}
                    </button>
                `).join('')}
            </div>

            <!-- BANNER NGUYÊN ÂM ĐANG CHỌN -->
            <div class="vowel-spotlight-banner">
                <span class="vowel-spotlight-char">${curMatrix.char}</span>
                <div>
                    <div class="vowel-spotlight-title">${curMatrix.name}</div>
                    <div class="vowel-spotlight-subtitle">Bé hãy bấm vào từng chữ bên dưới để tập đọc 6 thanh điệu nhé!</div>
                </div>
            </div>

            <!-- MA TRẬN 6 THẺ CHỮ VÀ DẤU THANH KẾT HỢP -->
            <div class="vowel-tone-matrix-grid">
                ${curMatrix.tones.map((t, i) => `
                    <div class="vowel-tone-card" id="tone-card-${i}" style="border-top-color:${t.color};" onclick="LettersZone.applyTone(${i})">
                        <div class="tone-card-top">
                            <span class="tone-badge" style="background:${t.color}22; color:${t.color};">${t.name}</span>
                        </div>
                        <div class="tone-card-char-box">
                            <span class="tone-char-big" style="color:${t.color};">${t.sample}</span>
                            <span class="tone-char-small">${t.sample.toLowerCase()}</span>
                        </div>
                        <div class="tone-card-spell">${t.spell}</div>
                        <div class="tone-card-vocab">
                            <span class="vocab-icon">${t.icon || '🌟'}</span>
                            <span class="vocab-text">${t.word || ''}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    switchVowelType(type) {
        this.vowelType = type;
        this.selectedVowelKey = type === 'single' ? 'a' : 'ai';
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel2(document.getElementById('letters-content'));
    },

    selectVowel(vowelKey) {
        this.selectedVowelKey = vowelKey;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel2(document.getElementById('letters-content'));
        const currentData = this.vowelType === 'single' ? this.singleVowelsMatrix : this.compoundVowelsMatrix;
        const m = currentData[vowelKey];
        if (m && m.tones[0] && typeof SoundEngine !== 'undefined') {
            SoundEngine.playVoice(m.tones[0].audioKey, null, `${m.name}. ${m.tones[0].word}`);
        }
    },

    applyTone(toneIndex) {
        const currentData = this.vowelType === 'single' ? this.singleVowelsMatrix : this.compoundVowelsMatrix;
        const m = currentData[this.selectedVowelKey];
        if (!m || !m.tones[toneIndex]) return;
        const tone = m.tones[toneIndex];

        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            const voiceText = `${tone.spell}. ${tone.word ? tone.word : ''}`;
            SoundEngine.playVoice(tone.audioKey, null, voiceText);
        }

        // Hiệu ứng nảy sinh động trên thẻ
        const cardEl = document.getElementById(`tone-card-${toneIndex}`);
        if (cardEl) {
            cardEl.classList.add('jump-anim');
            setTimeout(() => cardEl.classList.remove('jump-anim'), 600);
        }
    },

    // ========================================================
    // CẤP 3: 11 PHỤ ÂM GHÉP CĂN BẢN (CH, GH, GI, KH, NH, NG...)
    // ========================================================
    renderLevel3Compound(container) {
        const conList = this.compoundConsonantsList;
        let cur = conList.find(c => c.code === this.selectedCompoundCon);
        if (!cur) {
            cur = conList[0];
            this.selectedCompoundCon = cur.code;
        }

        container.innerHTML = `
            <div class="level-intro">
                <h2>🧩 Cấp 3: 11 Phụ Âm Ghép Căn Bản</h2>
                <p>Bé chọn một phụ âm ghép để khám phá cách kết hợp với nguyên âm và dấu thanh nhé!</p>
            </div>

            <!-- THANH CHỌN 11 PHỤ ÂM GHÉP VUỐT NGANG -->
            <div class="compound-consonants-bar">
                ${conList.map(c => `
                    <button class="compound-con-btn ${c.code === cur.code ? 'active' : ''}" style="border-color:${c.color};" onclick="LettersZone.selectCompoundConsonant('${c.code}')">
                        <span class="con-char" style="color:${c.color};">${c.char}</span>
                        <span class="con-icon">${c.icon}</span>
                    </button>
                `).join('')}
            </div>

            <!-- THẺ SPOTLIGHT PHỤ ÂM GHÉP ĐANG CHỌN -->
            <div class="compound-spotlight-card" style="border-left-color:${cur.color};">
                <div class="spotlight-left">
                    <span class="spotlight-char" style="color:${cur.color};">${cur.char}</span>
                    <span class="spotlight-lower">${cur.char.toLowerCase()}</span>
                </div>
                <div class="spotlight-right">
                    <div class="spotlight-title">${cur.name}</div>
                    <div class="spotlight-desc">${cur.desc}</div>
                    <button class="voice-btn-pill" onclick="LettersZone.playCompoundCon('${cur.code}')">
                        🔊 Nghe cô phát âm chữ ${cur.char}
                    </button>
                </div>
            </div>

            <!-- LƯỚI TỪ GHÉP ÂM MINH HỌA -->
            <div class="compound-pairs-intro">
                ✨ Bé hãy chạm vào các từ ghép bên dưới để nghe cô giáo đánh vần nhé:
            </div>

            <div class="compound-pairs-grid">
                ${cur.pairs.map((p, idx) => `
                    <div class="compound-pair-card" id="pair-card-${idx}" onclick="LettersZone.clickCompoundPair('${cur.code}', ${idx})">
                        <div class="pair-formula-badge">${p.spellText}</div>
                        <div class="pair-main-row">
                            <span class="pair-icon">${p.icon}</span>
                            <div>
                                <div class="pair-word">${p.word}</div>
                                <div class="pair-meaning">${p.meaning}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    selectCompoundConsonant(code) {
        this.selectedCompoundCon = code;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel3Compound(document.getElementById('letters-content'));
        this.playCompoundCon(code);
    },

    playCompoundCon(code) {
        const cur = this.compoundConsonantsList.find(c => c.code === code);
        if (cur && typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            SoundEngine.playVoice(cur.audioKey, null, `${cur.name}. ${cur.desc}`);
        }
    },

    clickCompoundPair(conCode, pairIdx) {
        const cur = this.compoundConsonantsList.find(c => c.code === conCode);
        if (!cur || !cur.pairs[pairIdx]) return;
        const p = cur.pairs[pairIdx];

        if (typeof SoundEngine !== 'undefined') {
            SoundEngine.playPop();
            const voiceText = `${p.spellText}. ${p.meaning}.`;
            SoundEngine.playVoice(p.audioKey, null, voiceText);
        }

        const cardEl = document.getElementById(`pair-card-${pairIdx}`);
        if (cardEl) {
            cardEl.classList.add('jump-anim');
            setTimeout(() => cardEl.classList.remove('jump-anim'), 600);
        }
    },

    // ========================================================
    // CẤP 4: BÉ TẬP GHÉP VẦN TĂNG TIẾN (INTERACTIVE PHONICS)
    // ========================================================
    renderLevel4Spelling(container) {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        if (this.currentSpellingIndex >= wordPool.length) {
            this.currentSpellingIndex = 0;
        }
        const cur = wordPool[this.currentSpellingIndex];
        this.selectedLetters = [];

        container.innerHTML = `
            <div class="level-intro">
                <h2>🚀 Cấp 4: Bé Tập Ghép Vần Tăng Tiến</h2>
                <p>Bé hãy chọn cấp độ và chạm vào các chữ cái theo đúng thứ tự để tạo thành từ nhé!</p>
            </div>

            <!-- 4 CẤP ĐỘ ĐỘ KHÓ -->
            <div class="spelling-level-selector">
                <button class="spelling-lvl-btn ${this.spellingLevel === 1 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(1)">
                    🌱 Cấp 1: Vần Đơn 2 Chữ
                </button>
                <button class="spelling-lvl-btn ${this.spellingLevel === 2 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(2)">
                    🌿 Cấp 2: Kèm Dấu Thanh
                </button>
                <button class="spelling-lvl-btn ${this.spellingLevel === 3 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(3)">
                    🌳 Cấp 3: Vần Ghép Kép
                </button>
                <button class="spelling-lvl-btn ${this.spellingLevel === 4 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(4)">
                    ⭐ Cấp 4: Từ Ghép Đa Âm
                </button>
            </div>

            <div class="spelling-card-stage" style="background:${cur.bg};">
                <div class="spelling-mascot-box">
                    <span class="spelling-mascot-icon">${cur.illustration}</span>
                    <div class="spelling-meaning-text">${cur.meaning}</div>
                </div>

                <div class="spelling-formula-display">
                    ${cur.displaySpell}
                </div>

                <div class="spelling-slots-row" id="spelling-slots">
                    ${cur.parts.map(() => `<div class="spell-slot-box">?</div>`).join('')}
                </div>

                <div class="spelling-choices-row" id="spelling-choices">
                    ${this.shuffle([...cur.parts]).map(p => `
                        <button class="spell-choice-btn" onclick="LettersZone.clickSpellingLetter('${p}', this)">${p}</button>
                    `).join('')}
                </div>

                <div class="spelling-feedback-box" id="spelling-feedback" style="display:none;"></div>

                <div class="spelling-nav-row" style="margin-top:14px; display:flex; justify-content:center; gap:10px;">
                    <button class="voice-btn-pill" onclick="LettersZone.playSpellingAudio()">
                        🔊 Nghe cô đọc mẫu
                    </button>
                    <button class="kid-pill active" onclick="LettersZone.nextSpellingWord()">
                        Từ Tiếp Theo ➔
                    </button>
                </div>
            </div>
        `;

        // Tự động phát âm khi chuyển từ
        setTimeout(() => this.playSpellingAudio(), 300);
    },

    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    switchSpellingLevel(lvl) {
        this.spellingLevel = lvl;
        this.currentSpellingIndex = 0;
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        this.renderLevel4Spelling(document.getElementById('letters-content'));
    },

    clickSpellingLetter(char, btn) {
        if (typeof SoundEngine !== 'undefined') SoundEngine.playPop();
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        const cur = wordPool[this.currentSpellingIndex];

        this.selectedLetters.push(char);
        btn.disabled = true;
        btn.style.opacity = '0.3';

        // Cập nhật các ô slots
        const slotsContainer = document.getElementById('spelling-slots');
        if (slotsContainer) {
            slotsContainer.innerHTML = cur.parts.map((p, idx) => {
                const filled = this.selectedLetters[idx];
                return `<div class="spell-slot-box ${filled ? 'filled' : ''}">${filled || '?'}</div>`;
            }).join('');
        }

        if (this.selectedLetters.length === cur.parts.length) {
            this.checkSpellingWord();
        }
    },

    checkSpellingWord() {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        const cur = wordPool[this.currentSpellingIndex];
        const fb = document.getElementById('spelling-feedback');
        if (!fb) return;

        const isCorrect = this.selectedLetters.every((l, idx) => l === cur.parts[idx]);
        fb.style.display = 'block';

        if (isCorrect) {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCorrect();
                SoundEngine.playVoice(cur.audioKey, null, `Hoan hô bé! ${cur.displaySpell}!`);
            }
            if (typeof App !== 'undefined') App.addStar();
            fb.innerHTML = `🎉 Tuyệt vời! Bé đã đánh vần chính xác: <strong>${cur.word}</strong>!`;
            fb.style.color = '#15803d';
            fb.style.background = '#dcfce7';

            setTimeout(() => this.nextSpellingWord(), 2200);
        } else {
            if (typeof SoundEngine !== 'undefined') SoundEngine.playSoftNotice();
            fb.innerHTML = `Chưa đúng rồi! Bé chạm vào "Từ Tiếp Theo" hoặc thử lại nhé!`;
            fb.style.color = '#b91c1c';
            fb.style.background = '#fee2e2';

            setTimeout(() => {
                this.selectedLetters = [];
                const slotsContainer = document.getElementById('spelling-slots');
                if (slotsContainer) {
                    slotsContainer.innerHTML = cur.parts.map(() => `<div class="spell-slot-box">?</div>`).join('');
                }
                const choiceBtns = document.querySelectorAll('#spelling-choices .spell-choice-btn');
                choiceBtns.forEach(b => {
                    b.disabled = false;
                    b.style.opacity = '1';
                });
                fb.style.display = 'none';
            }, 1800);
        }
    },

    nextSpellingWord() {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        this.currentSpellingIndex = (this.currentSpellingIndex + 1) % wordPool.length;
        this.renderLevel4Spelling(document.getElementById('letters-content'));
    },

    playSpellingAudio() {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        const cur = wordPool[this.currentSpellingIndex];
        if (cur && typeof SoundEngine !== 'undefined') {
            SoundEngine.playVoice(cur.audioKey, null, `${cur.displaySpell}. ${cur.meaning}.`);
        }
    }
};
