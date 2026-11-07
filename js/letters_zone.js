/**
 * KED - Letters Zone v6.1 (PHÂN HỆ 2: CHỮ, DẤU THANH & GHÉP VẦN TOÀN DIỆN)
 * Cập nhật chuẩn giáo dục mầm non:
 *   - Cấp 1: 29 Chữ Cái tiếng Việt chuẩn âm
 *   - Cấp 2: 5 Dấu thanh áp dụng trực quan cho 12 Nguyên Âm Đơn VÀ 12 Nguyên Âm Kép (AI, AO, AU, EO, OA, UA...)
 *   - Cấp 3: Ghép vần có hình ảnh với 4 cấp độ khó tăng tiến:
 *     * Cấp 1: Vần cơ bản 2 chữ cái không dấu (BA, CA, BÔ, ME, ĐI, XE, NƠ, TU...)
 *     * Cấp 2: Từ đơn 2-3 chữ cái kèm dấu thanh (CÁ, BÒ, GÀ, HỔ, DÊ, CỎ, MẸ, LÁ, BÉ...)
 *     * Cấp 3: Vần ghép & nguyên âm kép có hình ảnh (MÈO, CHUỐI, HOA, THÌA, SAO, KÉO...)
 *     * Cấp 4: Từ ghép đôi 2 tiếng & đa âm tiết đời thường (CÁ VÀNG, GÀ TRỐNG, XE ĐẠP, BÉ NGOAN TỚI TRƯỜNG...)
 *     * Hiện to rõ phần chữ, bé nhìn tự đọc trước, chạm vào mới phát tiếng đánh vần chuẩn!
 */

const LettersZone = {
    currentLevel: 1,
    vowelType: 'single', // 'single' (12 nguyên âm đơn) | 'compound' (12 nguyên âm kép)
    selectedVowelKey: 'a',
    spellingLevel: 1, // 1: 2 chữ không dấu, 2: Có dấu thanh, 3: Vần kép/phức, 4: Từ ghép đôi
    currentSpellingIndex: 0,
    selectedLetters: [],

    // 29 Chữ cái tiếng Việt chuẩn âm
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

    // 12 NGUYÊN ÂM ĐƠN TIẾNG VIỆT
    singleVowelsMatrix: {
        'a': {
            char: 'A', name: 'Nguyên âm A', audioKey: 'let_a',
            tones: [
                { name: "Thanh Ngang", symbol: "A", sample: "A", spell: "A (Không dấu)", audioKey: "tone_a_a", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Á", spell: "A - sắc - Á", audioKey: "tone_a_as", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "À", spell: "A - huyền - À", audioKey: "tone_a_ah", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ả", spell: "A - hỏi - Ả", audioKey: "tone_a_ao", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ã", spell: "A - ngã - Ã", audioKey: "tone_a_an", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ạ", spell: "A - nặng - Ạ", audioKey: "tone_a_at", color: "#8b5cf6" }
            ]
        },
        'aw': {
            char: 'Ă', name: 'Nguyên âm Ă', audioKey: 'let_aw',
            tones: [
                { name: "Thanh Ngang", symbol: "Ă", sample: "Ă", spell: "Ă (Không dấu)", audioKey: "tone_aw_aw", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ắ", spell: "Ă - sắc - Ắ", audioKey: "tone_aw_aws", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ằ", spell: "Ă - huyền - Ằ", audioKey: "tone_aw_awh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ẳ", spell: "Ă - hỏi - Ẳ", audioKey: "tone_aw_awo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ẵ", spell: "Ă - ngã - Ẵ", audioKey: "tone_aw_awn", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ặ", spell: "Ă - nặng - Ặ", audioKey: "tone_aw_awt", color: "#8b5cf6" }
            ]
        },
        'aa': {
            char: 'Â', name: 'Nguyên âm Â', audioKey: 'let_aa',
            tones: [
                { name: "Thanh Ngang", symbol: "Â", sample: "Â", spell: "Â (Không dấu)", audioKey: "tone_aa_aa", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ấ", spell: "Â - sắc - Ấ", audioKey: "tone_aa_aas", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ầ", spell: "Â - huyền - Ầ", audioKey: "tone_aa_aah", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ẩ", spell: "Â - hỏi - Ẩ", audioKey: "tone_aa_aao", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ẫ", spell: "Â - ngã - Ẫ", audioKey: "tone_aa_aan", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ậ", spell: "Â - nặng - Ậ", audioKey: "tone_aa_aat", color: "#8b5cf6" }
            ]
        },
        'e': {
            char: 'E', name: 'Nguyên âm E', audioKey: 'let_e',
            tones: [
                { name: "Thanh Ngang", symbol: "E", sample: "E", spell: "E (Không dấu)", audioKey: "tone_e_e", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "É", spell: "E - sắc - É", audioKey: "tone_e_es", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "È", spell: "E - huyền - È", audioKey: "tone_e_eh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ẻ", spell: "E - hỏi - Ẻ", audioKey: "tone_e_eo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ẽ", spell: "E - ngã - Ẽ", audioKey: "tone_e_en", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ẹ", spell: "E - nặng - Ẹ", audioKey: "tone_e_et", color: "#8b5cf6" }
            ]
        },
        'ee': {
            char: 'Ê', name: 'Nguyên âm Ê', audioKey: 'let_ee',
            tones: [
                { name: "Thanh Ngang", symbol: "Ê", sample: "Ê", spell: "Ê (Không dấu)", audioKey: "tone_ee_ee", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ế", spell: "Ê - sắc - Ế", audioKey: "tone_ee_ees", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ề", spell: "Ê - huyền - Ề", audioKey: "tone_ee_eeh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ể", spell: "Ê - hỏi - Ể", audioKey: "tone_ee_eeo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ễ", spell: "Ê - ngã - Ễ", audioKey: "tone_ee_een", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ệ", spell: "Ê - nặng - Ệ", audioKey: "tone_ee_eet", color: "#8b5cf6" }
            ]
        },
        'i': {
            char: 'I', name: 'Nguyên âm I', audioKey: 'let_i',
            tones: [
                { name: "Thanh Ngang", symbol: "I", sample: "I", spell: "I (Không dấu)", audioKey: "tone_i_i", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Í", spell: "I - sắc - Í", audioKey: "tone_i_is", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ì", spell: "I - huyền - Ì", audioKey: "tone_i_ih", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ỉ", spell: "I - hỏi - Ỉ", audioKey: "tone_i_io", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ĩ", spell: "I - ngã - Ĩ", audioKey: "tone_i_in", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ị", spell: "I - nặng - Ị", audioKey: "tone_i_it", color: "#8b5cf6" }
            ]
        },
        'o': {
            char: 'O', name: 'Nguyên âm O', audioKey: 'let_o',
            tones: [
                { name: "Thanh Ngang", symbol: "O", sample: "O", spell: "O (Không dấu)", audioKey: "tone_o_o", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ó", spell: "O - sắc - Ó", audioKey: "tone_o_os", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ò", spell: "O - huyền - Ò", audioKey: "tone_o_oh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ỏ", spell: "O - hỏi - Ỏ", audioKey: "tone_o_oo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Õ", spell: "O - ngã - Õ", audioKey: "tone_o_on", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ọ", spell: "O - nặng - Ọ", audioKey: "tone_o_ot", color: "#8b5cf6" }
            ]
        },
        'oo': {
            char: 'Ô', name: 'Nguyên âm Ô', audioKey: 'let_oo',
            tones: [
                { name: "Thanh Ngang", symbol: "Ô", sample: "Ô", spell: "Ô (Không dấu)", audioKey: "tone_oo_oo", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ố", spell: "Ô - sắc - Ố", audioKey: "tone_oo_oos", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ồ", spell: "Ô - huyền - Ồ", audioKey: "tone_oo_ooh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ổ", spell: "Ô - hỏi - Ổ", audioKey: "tone_oo_ooo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ỗ", spell: "Ô - ngã - Ỗ", audioKey: "tone_oo_oon", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ộ", spell: "Ô - nặng - Ộ", audioKey: "tone_oo_oot", color: "#8b5cf6" }
            ]
        },
        'ow': {
            char: 'Ơ', name: 'Nguyên âm Ơ', audioKey: 'let_ow',
            tones: [
                { name: "Thanh Ngang", symbol: "Ơ", sample: "Ơ", spell: "Ơ (Không dấu)", audioKey: "tone_ow_ow", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ớ", spell: "Ơ - sắc - Ớ", audioKey: "tone_ow_ows", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ờ", spell: "Ơ - huyền - Ờ", audioKey: "tone_ow_owh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ở", spell: "Ơ - hỏi - Ở", audioKey: "tone_ow_owo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ỡ", spell: "Ơ - ngã - Ỡ", audioKey: "tone_ow_own", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ợ", spell: "Ơ - nặng - Ợ", audioKey: "tone_ow_owt", color: "#8b5cf6" }
            ]
        },
        'u': {
            char: 'U', name: 'Nguyên âm U', audioKey: 'let_u',
            tones: [
                { name: "Thanh Ngang", symbol: "U", sample: "U", spell: "U (Không dấu)", audioKey: "tone_u_u", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ú", spell: "U - sắc - Ú", audioKey: "tone_u_us", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ù", spell: "U - huyền - Ù", audioKey: "tone_u_uh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ủ", spell: "U - hỏi - Ủ", audioKey: "tone_u_uo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ũ", spell: "U - ngã - Ũ", audioKey: "tone_u_un", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ụ", spell: "U - nặng - Ụ", audioKey: "tone_u_ut", color: "#8b5cf6" }
            ]
        },
        'uw': {
            char: 'Ư', name: 'Nguyên âm Ư', audioKey: 'let_uw',
            tones: [
                { name: "Thanh Ngang", symbol: "Ư", sample: "Ư", spell: "Ư (Không dấu)", audioKey: "tone_uw_uw", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ứ", spell: "Ư - sắc - Ứ", audioKey: "tone_uw_uws", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ừ", spell: "Ư - huyền - Ừ", audioKey: "tone_uw_uwh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ử", spell: "Ư - hỏi - Ử", audioKey: "tone_uw_uwo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ữ", spell: "Ư - ngã - Ữ", audioKey: "tone_uw_uwn", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ự", spell: "Ư - nặng - Ự", audioKey: "tone_uw_uwt", color: "#8b5cf6" }
            ]
        },
        'y': {
            char: 'Y', name: 'Nguyên âm Y', audioKey: 'let_y',
            tones: [
                { name: "Thanh Ngang", symbol: "Y", sample: "Y", spell: "Y (Không dấu)", audioKey: "tone_y_y", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "Ý", spell: "Y - sắc - Ý", audioKey: "tone_y_ys", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "Ỳ", spell: "Y - huyền - Ỳ", audioKey: "tone_y_yh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "Ỷ", spell: "Y - hỏi - Ỷ", audioKey: "tone_y_yo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "Ỹ", spell: "Y - ngã - Ỹ", audioKey: "tone_y_yn", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "Ỵ", spell: "Y - nặng - Ỵ", audioKey: "tone_y_yt", color: "#8b5cf6" }
            ]
        }
    },

    // 12 NGUYÊN ÂM KÉP TIẾNG VIỆT
    compoundVowelsMatrix: {
        'ai': {
            char: 'AI', name: 'Vần AI', audioKey: 'vowel_ai', wordSample: 'Con Nai 🦌',
            tones: [
                { name: "Thanh Ngang", symbol: "AI", sample: "AI", spell: "AI (Không dấu)", audioKey: "tone_ai_ai", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÁI", spell: "AI - sắc - ÁI", audioKey: "tone_ai_ais", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÀI", spell: "AI - huyền - ÀI", audioKey: "tone_ai_aih", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ẢI", spell: "AI - hỏi - ẢI", audioKey: "tone_ai_aio", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ÃI", spell: "AI - ngã - ÃI", audioKey: "tone_ai_ain", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ẠI", spell: "AI - nặng - ẠI", audioKey: "tone_ai_ait", color: "#8b5cf6" }
            ]
        },
        'ao': {
            char: 'AO', name: 'Vần AO', audioKey: 'vowel_ao', wordSample: 'Ngôi Sao ⭐',
            tones: [
                { name: "Thanh Ngang", symbol: "AO", sample: "AO", spell: "AO (Không dấu)", audioKey: "tone_ao_ao", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÁO", spell: "AO - sắc - ÁO", audioKey: "tone_ao_aos", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÀO", spell: "AO - huyền - ÀO", audioKey: "tone_ao_aoh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ẢO", spell: "AO - hỏi - ẢO", audioKey: "tone_ao_aoo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ÃO", spell: "AO - ngã - ÃO", audioKey: "tone_ao_aon", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ẠO", spell: "AO - nặng - ẠO", audioKey: "tone_ao_aot", color: "#8b5cf6" }
            ]
        },
        'au': {
            char: 'AU', name: 'Vần AU', audioKey: 'vowel_au', wordSample: 'Cây Cau 🌴',
            tones: [
                { name: "Thanh Ngang", symbol: "AU", sample: "AU", spell: "AU (Không dấu)", audioKey: "vowel_au", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÁU", spell: "AU - sắc - ÁU", audioKey: "vowel_au", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÀU", spell: "AU - huyền - ÀU", audioKey: "vowel_au", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ẢU", spell: "AU - hỏi - ẢU", audioKey: "vowel_au", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ÃU", spell: "AU - ngã - ÃU", audioKey: "vowel_au", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ẠU", spell: "AU - nặng - ẠU", audioKey: "vowel_au", color: "#8b5cf6" }
            ]
        },
        'ay': {
            char: 'AY', name: 'Vần AY', audioKey: 'vowel_ay', wordSample: 'Bàn Tay ✋',
            tones: [
                { name: "Thanh Ngang", symbol: "AY", sample: "AY", spell: "AY (Không dấu)", audioKey: "vowel_ay", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÁY", spell: "AY - sắc - ÁY", audioKey: "vowel_ay", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÀY", spell: "AY - huyền - ÀY", audioKey: "vowel_ay", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ẢY", spell: "AY - hỏi - ẢY", audioKey: "vowel_ay", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ÃY", spell: "AY - ngã - ÃY", audioKey: "vowel_ay", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ẠY", spell: "AY - nặng - ẠY", audioKey: "vowel_ay", color: "#8b5cf6" }
            ]
        },
        'eo': {
            char: 'EO', name: 'Vần EO', audioKey: 'vowel_eo', wordSample: 'Chú Mèo 🐱',
            tones: [
                { name: "Thanh Ngang", symbol: "EO", sample: "EO", spell: "EO (Không dấu)", audioKey: "tone_eo_eo", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÉO", spell: "EO - sắc - ÉO", audioKey: "tone_eo_eos", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÈO", spell: "EO - huyền - ÈO", audioKey: "tone_eo_eoh", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ẺO", spell: "EO - hỏi - ẺO", audioKey: "tone_eo_eoo", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ẼO", spell: "EO - ngã - ẼO", audioKey: "tone_eo_eon", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ẸO", spell: "EO - nặng - ẸO", audioKey: "tone_eo_eot", color: "#8b5cf6" }
            ]
        },
        'ia': {
            char: 'IA', name: 'Vần IA', audioKey: 'vowel_ia', wordSample: 'Cái Thìa 🥄',
            tones: [
                { name: "Thanh Ngang", symbol: "IA", sample: "IA", spell: "IA (Không dấu)", audioKey: "vowel_ia", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÍA", spell: "IA - sắc - ÍA", audioKey: "vowel_ia", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÌA", spell: "IA - huyền - ÌA", audioKey: "vowel_ia", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ỈA", spell: "IA - hỏi - ỈA", audioKey: "vowel_ia", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ĨA", spell: "IA - ngã - ĨA", audioKey: "vowel_ia", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ỊA", spell: "IA - nặng - ỊA", audioKey: "vowel_ia", color: "#8b5cf6" }
            ]
        },
        'oa': {
            char: 'OA', name: 'Vần OA', audioKey: 'vowel_oa', wordSample: 'Bông Hoa 🌸',
            tones: [
                { name: "Thanh Ngang", symbol: "OA", sample: "OA", spell: "OA (Không dấu)", audioKey: "tone_oa_oa", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "OÁ", spell: "OA - sắc - OÁ", audioKey: "tone_oa_oas", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "OÀ", spell: "OA - huyền - OÀ", audioKey: "tone_oa_oah", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "OẢ", spell: "OA - hỏi - OẢ", audioKey: "tone_oa_oao", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "OÃ", spell: "OA - ngã - OÃ", audioKey: "tone_oa_oan", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "OẠ", spell: "OA - nặng - OẠ", audioKey: "tone_oa_oat", color: "#8b5cf6" }
            ]
        },
        'oi': {
            char: 'OI', name: 'Vần OI', audioKey: 'vowel_oi', wordSample: 'Con Voi 🐘',
            tones: [
                { name: "Thanh Ngang", symbol: "OI", sample: "OI", spell: "OI (Không dấu)", audioKey: "tone_oi_oi", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÓI", spell: "OI - sắc - ÓI", audioKey: "tone_oi_ois", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÒI", spell: "OI - huyền - ÒI", audioKey: "tone_oi_oih", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ỎI", spell: "OI - hỏi - ỎI", audioKey: "tone_oi_oio", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ÕI", spell: "OI - ngã - ÕI", audioKey: "tone_oi_oin", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ỌI", spell: "OI - nặng - ỌI", audioKey: "tone_oi_oit", color: "#8b5cf6" }
            ]
        },
        'ua': {
            char: 'UA', name: 'Vần UA', audioKey: 'vowel_ua', wordSample: 'Con Rùa 🐢',
            tones: [
                { name: "Thanh Ngang", symbol: "UA", sample: "UA", spell: "UA (Không dấu)", audioKey: "vowel_ua", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÚA", spell: "UA - sắc - ÚA", audioKey: "vowel_ua", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÙA", spell: "UA - huyền - ÙA", audioKey: "vowel_ua", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ỦA", spell: "UA - hỏi - ỦA", audioKey: "vowel_ua", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ŨA", spell: "UA - ngã - ŨA", audioKey: "vowel_ua", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ỤA", spell: "UA - nặng - ỤA", audioKey: "vowel_ua", color: "#8b5cf6" }
            ]
        },
        'ui': {
            char: 'UI', name: 'Vần UI', audioKey: 'vowel_ui', wordSample: 'Túi Xách 👜',
            tones: [
                { name: "Thanh Ngang", symbol: "UI", sample: "UI", spell: "UI (Không dấu)", audioKey: "vowel_ui", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ÚI", spell: "UI - sắc - ÚI", audioKey: "vowel_ui", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ÙI", spell: "UI - huyền - ÙI", audioKey: "vowel_ui", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ỦI", spell: "UI - hỏi - ỦI", audioKey: "vowel_ui", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ŨI", spell: "UI - ngã - ŨI", audioKey: "vowel_ui", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ỤI", spell: "UI - nặng - ỤI", audioKey: "vowel_ui", color: "#8b5cf6" }
            ]
        },
        'uy': {
            char: 'UY', name: 'Vần UY', audioKey: 'vowel_uy', wordSample: 'Tàu Thủy 🚢',
            tones: [
                { name: "Thanh Ngang", symbol: "UY", sample: "UY", spell: "UY (Không dấu)", audioKey: "vowel_uy", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "UÝ", spell: "UY - sắc - UÝ", audioKey: "vowel_uy", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "UỲ", spell: "UY - huyền - UỲ", audioKey: "vowel_uy", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "UỶ", spell: "UY - hỏi - UỶ", audioKey: "vowel_uy", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "UỸ", spell: "UY - ngã - UỸ", audioKey: "vowel_uy", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "UỴ", spell: "UY - nặng - UỴ", audioKey: "vowel_uy", color: "#8b5cf6" }
            ]
        },
        'uwa': {
            char: 'ƯA', name: 'Vần ƯA', audioKey: 'vowel_uwa', wordSample: 'Cơn Mưa 🌧️',
            tones: [
                { name: "Thanh Ngang", symbol: "ƯA", sample: "ƯA", spell: "ƯA (Không dấu)", audioKey: "vowel_uwa", color: "#64748b" },
                { name: "Dấu Sắc (´)", symbol: "ˊ", sample: "ỨA", spell: "ƯA - sắc - ỨA", audioKey: "vowel_uwa", color: "#ef4444" },
                { name: "Dấu Huyền (`)", symbol: "ˋ", sample: "ỪA", spell: "ƯA - huyền - ỪA", audioKey: "vowel_uwa", color: "#3b82f6" },
                { name: "Dấu Hỏi (ˀ)", symbol: "ˀ", sample: "ỬA", spell: "ƯA - hỏi - ỬA", audioKey: "vowel_uwa", color: "#10b981" },
                { name: "Dấu Ngã (~)", symbol: "~", sample: "ỮA", spell: "ƯA - ngã - ỮA", audioKey: "vowel_uwa", color: "#f59e0b" },
                { name: "Dấu Nặng (.)", symbol: "•", sample: "ỰA", spell: "ƯA - nặng - ỰA", audioKey: "vowel_uwa", color: "#8b5cf6" }
            ]
        }
    },

    // 4 CẤP ĐỘ GHÉP VẦN TIẾNG VIỆT TĂNG TIẾN
    progressiveSpelling: {
        // CẤP 1: VẦN CƠ BẢN 2 CHỮ CÁI KHÔNG DẤU
        1: [
            { word: "BA", illustration: "👨‍👧", meaning: "Ba dắt tay bé", parts: ["B", "A"], displaySpell: "B + A = BA", audioKey: "spell_ba_simple", bg: "#eff6ff" },
            { word: "CA", illustration: "🥛", meaning: "Chiếc ca đựng nước", parts: ["C", "A"], displaySpell: "C + A = CA", audioKey: "spell_ca_simple", bg: "#f0fdf4" },
            { word: "BÔ", illustration: "🚽", meaning: "Cái bô em bé", parts: ["B", "Ô"], displaySpell: "B + Ô = BÔ", audioKey: "spell_bo_simple", bg: "#fef3c7" },
            { word: "ME", illustration: "🍈", meaning: "Quả me chua ngọt", parts: ["M", "E"], displaySpell: "M + E = ME", audioKey: "spell_me_simple", bg: "#ecfdf5" },
            { word: "ĐI", illustration: "🚶", meaning: "Bé tung tăng đi dạo", parts: ["Đ", "I"], displaySpell: "Đ + I = ĐI", audioKey: "spell_di_simple", bg: "#fdf4ff" },
            { word: "XE", illustration: "🚗", meaning: "Xe cộ chạy bon bon", parts: ["X", "E"], displaySpell: "X + E = XE", audioKey: "spell_xe_simple", bg: "#f1f5f9" },
            { word: "NƠ", illustration: "🎀", meaning: "Chiếc nơ màu hồng", parts: ["N", "Ơ"], displaySpell: "N + Ơ = NƠ", audioKey: "spell_no_simple", bg: "#fce7f3" },
            { word: "TU", illustration: "🪈", meaning: "Tiếng còi tu tu", parts: ["T", "U"], displaySpell: "T + U = TU", audioKey: "spell_tu_simple", bg: "#fffbeb" }
        ],

        // CẤP 2: TỪ ĐƠN KÈM DẤU THANH (2-3 KÝ TỰ)
        2: [
            { word: "CÁ", illustration: "🐟", meaning: "Con cá bơi lội", parts: ["C", "A", "ˊ"], displaySpell: "C + A + SẮC = CÁ", audioKey: "spell_ca", bg: "#e0f2fe" },
            { word: "BÒ", illustration: "🐄", meaning: "Chú bò sữa hiền lành", parts: ["B", "O", "ˋ"], displaySpell: "B + O + HUYỀN = BÒ", audioKey: "spell_bo", bg: "#fef3c7" },
            { word: "GÀ", illustration: "🐔", meaning: "Chú gà trống gáy vang", parts: ["G", "A", "ˋ"], displaySpell: "G + A + HUYỀN = GÀ", audioKey: "spell_ga", bg: "#fee2e2" },
            { word: "CHÓ", illustration: "🐶", meaning: "Chú cún trung thành", parts: ["CH", "O", "ˊ"], displaySpell: "CH + O + SẮC = CHÓ", audioKey: "spell_cho", bg: "#ffedd5" },
            { word: "HỔ", illustration: "🐯", meaning: "Hổ con dũng cảm", parts: ["H", "Ô", "ˀ"], displaySpell: "H + Ô + HỎI = HỔ", audioKey: "spell_ho", bg: "#fed7aa" },
            { word: "DÊ", illustration: "🐐", meaning: "Chú dê kêu be be", parts: ["D", "Ê"], displaySpell: "D + Ê = DÊ", audioKey: "spell_de", bg: "#dcfce7" },
            { word: "CỎ", illustration: "🌱", meaning: "Bãi cỏ xanh rờn", parts: ["C", "O", "ˀ"], displaySpell: "C + O + HỎI = CỎ", audioKey: "spell_co", bg: "#ecfdf5" },
            { word: "MẸ", illustration: "👩‍👧", meaning: "Mẹ hiền yêu quý", parts: ["M", "E", "•"], displaySpell: "M + E + NẶNG = MẸ", audioKey: "spell_me", bg: "#ffe4e6" },
            { word: "LÁ", illustration: "🍃", meaning: "Chiếc lá biếc xanh", parts: ["L", "A", "ˊ"], displaySpell: "L + A + SẮC = LÁ", audioKey: "spell_la", bg: "#f0fdf4" },
            { word: "BÉ", illustration: "👶", meaning: "Em bé ngoan ngoãn", parts: ["B", "E", "ˊ"], displaySpell: "B + E + SẮC = BÉ", audioKey: "spell_be", bg: "#fffbeb" }
        ],

        // CẤP 3: VẦN GHÉP & NGUYÊN ÂM KÉP (CÓ HÌNH HOẠT HỌA)
        3: [
            { word: "MÈO", illustration: "🐱", meaning: "Mèo con bắt chuột", parts: ["M", "EO", "ˋ"], displaySpell: "M + EO + HUYỀN = MÈO", audioKey: "spell_meo", bg: "#f3e8ff" },
            { word: "CHUỐI", illustration: "🍌", meaning: "Nải chuối chín vàng", parts: ["CH", "UÔI", "ˊ"], displaySpell: "CH + UÔI + SẮC = CHUỐI", audioKey: "spell_chuoi", bg: "#fef9c3" },
            { word: "HOA", illustration: "🌸", meaning: "Bông hoa tươi thắm", parts: ["H", "OA"], displaySpell: "H + OA = HOA", audioKey: "spell_bong_hoa", bg: "#fff1f2" },
            { word: "THÌA", illustration: "🥄", meaning: "Cái thìa xúc cơm", parts: ["TH", "IA", "ˋ"], displaySpell: "TH + IA + HUYỀN = THÌA", audioKey: "spell_ca", bg: "#e0f2fe" },
            { word: "SAO", illustration: "⭐", meaning: "Ngôi sao lấp lánh", parts: ["S", "AO"], displaySpell: "S + AO = SAO", audioKey: "spell_mat_trang", bg: "#e0e7ff" }
        ],

        // CẤP 4: TỪ GHÉP ĐÔI 2 TIẾNG & ĐA ÂM TIẾT
        4: [
            { word: "CÁ VÀNG", illustration: "🐠", meaning: "Chú cá vàng múa lượn", parts: ["CÁ", "VÀNG"], displaySpell: "CÁ + VÀNG = CÁ VÀNG", audioKey: "spell_ca_vang", bg: "#fef9c3" },
            { word: "GÀ TRỐNG", illustration: "🐓", meaning: "Chú gà trống gáy ó o", parts: ["GÀ", "TRỐNG"], displaySpell: "GÀ + TRỐNG = GÀ TRỐNG", audioKey: "spell_ga_trong", bg: "#fee2e2" },
            { word: "XE ĐẠP", illustration: "🚲", meaning: "Bé tập đi xe đạp", parts: ["XE", "ĐẠP"], displaySpell: "XE + ĐẠP = XE ĐẠP", audioKey: "spell_xe_dap", bg: "#e0f2fe" },
            { word: "QUẢ TÁO", illustration: "🍎", meaning: "Quả táo đỏ thơm ngon", parts: ["QUẢ", "TÁO"], displaySpell: "QUẢ + TÁO = QUẢ TÁO", audioKey: "spell_qua_tao", bg: "#ffe4e6" },
            { word: "NGÔI NHÀ", illustration: "🏠", meaning: "Ngôi nhà tổ ấm của bé", parts: ["NGÔI", "NHÀ"], displaySpell: "NGÔI + NHÀ = NGÔI NHÀ", audioKey: "spell_ngoi_nha", bg: "#f1f5f9" },
            { word: "ĐỒNG HỒ", illustration: "⏰", meaning: "Đồng hồ tích tắc báo giờ", parts: ["ĐỒNG", "HỒ"], displaySpell: "ĐỒNG + HỒ = ĐỒNG HỒ", audioKey: "spell_dong_ho", bg: "#fef3c7" },
            { word: "BÚP BÊ", illustration: "🪆", meaning: "Bạn búp bê xinh đẹp", parts: ["BÚP", "BÊ"], displaySpell: "BÚP + BÊ = BÚP BÊ", audioKey: "spell_bup_be", bg: "#fce7f3" },
            { word: "BÓNG BAY", illustration: "🎈", meaning: "Chùm bóng bay sắc màu", parts: ["BÓNG", "BAY"], displaySpell: "BÓNG + BAY = BÓNG BAY", audioKey: "spell_bong_bay", bg: "#f3e8ff" },
            { word: "BÉ NGOAN TỚI TRƯỜNG", illustration: "👧🎒", meaning: "Bé hớn hở bước vào lớp", parts: ["BÉ", "NGOAN", "TỚI", "TRƯỜNG"], displaySpell: "BÉ + NGOAN + TỚI + TRƯỜNG", audioKey: "spell_be_ngoan_toi_truong", bg: "#f0fdf4" }
        ]
    },

    init() {
        this.renderSubMenu();
        this.switchLevel(1);
    },

    renderSubMenu() {
        const subNav = document.getElementById('letters-subnav');
        if (!subNav) return;
        subNav.innerHTML = `
            <button class="kid-pill active" onclick="LettersZone.switchLevel(1)">🔤 Cấp 1: 29 Chữ Cái</button>
            <button class="kid-pill" onclick="LettersZone.switchLevel(2)">🎵 Cấp 2: Dấu Thanh & Nguyên Âm Đơn / Kép</button>
            <button class="kid-pill" onclick="LettersZone.switchLevel(3)">🧩 Cấp 3: Ghép Vần 4 Cấp Độ</button>
        `;
    },

    switchLevel(level) {
        this.currentLevel = level;
        SoundEngine.playPop();

        const pills = document.querySelectorAll('#letters-subnav .kid-pill');
        pills.forEach((p, idx) => p.classList.toggle('active', idx + 1 === level));

        const container = document.getElementById('letters-content');
        if (!container) return;

        if (level === 1) {
            this.renderLevel1(container);
        } else if (level === 2) {
            this.renderLevel2(container);
        } else if (level === 3) {
            this.renderLevel3(container);
        }
    },

    /* ========================================================
       CẤP 1: 29 CHỮ CÁI TIẾNG VIỆT
       ======================================================== */
    renderLevel1(container) {
        container.innerHTML = `
            <div class="level-intro">
                <h2>🔤 Cấp 1: Bảng 29 Chữ Cái Tiếng Việt Chuẩn Âm</h2>
                <p>Bé chạm vào từng chữ cái để nghe cô giáo đọc chuẩn tên chữ và phát âm nhé!</p>
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
        SoundEngine.playPop();
        SoundEngine.playVoice(item.audioKey);
    },

    /* ========================================================
       CẤP 2: DẤU THANH ÁP DỤNG CHO NGUYÊN ÂM ĐƠN VÀ NGUYÊN ÂM KÉP
       ======================================================== */
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
                <h2>🎵 Cấp 2: Khám Phá 5 Dấu Thanh & Nguyên Âm Đơn / Kép</h2>
                <p>Bé chọn học Nguyên Âm Đơn hoặc Nguyên Âm Kép, sau đó bấm vào từng dấu thanh để nghe biến hóa kỳ diệu nhé!</p>
            </div>

            <!-- NÚT CHUYỂN ĐỔI: NGUYÊN ÂM ĐƠN vs NGUYÊN ÂM KÉP -->
            <div style="display:flex; justify-content:center; gap:16px; margin-bottom:14px;">
                <button class="kid-pill ${isSingle ? 'active' : ''}" style="font-size:16px; padding:10px 22px;" onclick="LettersZone.switchVowelType('single')">
                    🔤 12 Nguyên Âm Đơn (A, Ă, Â, E, Ê...)
                </button>
                <button class="kid-pill ${!isSingle ? 'active' : ''}" style="font-size:16px; padding:10px 22px; background:linear-gradient(135deg, #ec4899, #db2777); color:#fff;" onclick="LettersZone.switchVowelType('compound')">
                    ✨ 12 Nguyên Âm Kép (AI, AO, AU, EO, OA...)
                </button>
            </div>

            <!-- Thanh chọn Nguyên âm -->
            <div class="vowel-selector-bar">
                ${keys.map(k => `
                    <button class="vowel-pill ${k === this.selectedVowelKey ? 'active' : ''}" onclick="LettersZone.selectVowel('${k}')">
                        ${currentData[k].char}
                    </button>
                `).join('')}
            </div>

            <div class="tones-stage">
                <!-- Hộp hiển thị chữ đang tập phát âm -->
                <div class="base-letter-box">
                    <span class="base-letter" id="tone-target-letter">${curMatrix.char}</span>
                    <span class="base-sub" id="tone-target-sub">${curMatrix.wordSample ? curMatrix.wordSample : 'Thanh Ngang'}</span>
                </div>

                <!-- Lưới 6 dấu thanh -->
                <div class="tones-buttons-grid">
                    ${curMatrix.tones.map((t, i) => `
                        <button class="tone-card-btn" style="border-color:${t.color}" onclick="LettersZone.applyTone(${i})">
                            <span class="tone-symbol" style="color:${t.color}">${t.symbol}</span>
                            <span class="tone-title">${t.name}</span>
                            <span class="tone-sample">${t.sample} (${t.spell})</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    switchVowelType(type) {
        this.vowelType = type;
        this.selectedVowelKey = type === 'single' ? 'a' : 'ai';
        SoundEngine.playPop();
        this.renderLevel2(document.getElementById('letters-content'));
    },

    selectVowel(vowelKey) {
        this.selectedVowelKey = vowelKey;
        SoundEngine.playPop();
        this.renderLevel2(document.getElementById('letters-content'));
        const currentData = this.vowelType === 'single' ? this.singleVowelsMatrix : this.compoundVowelsMatrix;
        const m = currentData[vowelKey];
        if (m && m.tones[0]) {
            SoundEngine.playVoice(m.tones[0].audioKey, null, m.name);
        }
    },

    applyTone(toneIndex) {
        const currentData = this.vowelType === 'single' ? this.singleVowelsMatrix : this.compoundVowelsMatrix;
        const m = currentData[this.selectedVowelKey];
        if (!m) return;
        const tone = m.tones[toneIndex];
        SoundEngine.playPop();

        const targetLetter = document.getElementById('tone-target-letter');
        const targetSub = document.getElementById('tone-target-sub');
        if (targetLetter) {
            targetLetter.textContent = tone.sample;
            targetLetter.classList.add('jump-anim');
            setTimeout(() => targetLetter.classList.remove('jump-anim'), 600);
        }
        if (targetSub) {
            targetSub.textContent = tone.spell;
        }

        SoundEngine.playVoice(tone.audioKey, null, tone.spell);
    },

    /* ========================================================
       CẤP 3: GHÉP VẦN CÓ HÌNH ẢNH (4 CẤP ĐỘ KHÓ & TỰ ĐỌC TRƯỚC)
       ======================================================== */
    renderLevel3(container) {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        if (this.currentSpellingIndex >= wordPool.length) {
            this.currentSpellingIndex = 0;
        }
        const cur = wordPool[this.currentSpellingIndex];
        this.selectedLetters = [];

        const shuffledParts = [...cur.parts].sort(() => 0.5 - Math.random());

        container.innerHTML = `
            <div class="level-intro">
                <h2>🧩 Cấp 3: Ghép Vần Kỳ Thú (4 Cấp Độ Nâng Tiến)</h2>
                <p>Bé hãy nhìn mặt chữ to rõ và tự đánh vần trước nhé! Bấm vào chữ để nghe cô giáo hướng dẫn và ghép đúng thứ tự.</p>
            </div>

            <!-- THANH CHỌN 4 CẤP ĐỘ KHÓ -->
            <div class="spell-difficulty-bar">
                <button class="spell-diff-pill ${this.spellingLevel === 1 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(1)">
                    🟢 Cấp 1: 2 Chữ Không Dấu
                </button>
                <button class="spell-diff-pill ${this.spellingLevel === 2 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(2)">
                    🟡 Cấp 2: Có Dấu Thanh
                </button>
                <button class="spell-diff-pill ${this.spellingLevel === 3 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(3)">
                    🟣 Cấp 3: Vần Ghép & Kép
                </button>
                <button class="spell-diff-pill ${this.spellingLevel === 4 ? 'active' : ''}" onclick="LettersZone.switchSpellingLevel(4)">
                    👑 Cấp 4: Từ Ghép Đôi & Câu
                </button>
            </div>

            <div class="spelling-game-card" style="background:${cur.bg}">
                <div class="spelling-visual-box">
                    <span class="spelling-emoji bounce-hover" id="spell-mascot">${cur.illustration}</span>
                    <h3 class="spelling-meaning">${cur.meaning}</h3>
                    
                    <!-- HIỆN TO RÕ PHẦN CHỮ: BÉ TỰ ĐÁNH VẦN TRƯỚC -->
                    <div>
                        <div class="spell-word-giant-display" onclick="LettersZone.speakWordSpell()" title="Bé chạm vào để nghe cô giáo đánh vần nhé!">
                            <span>${cur.word}</span>
                            <span style="font-size:32px;">🔊</span>
                        </div>
                    </div>
                    <div class="spell-click-hint">👉 Bé thử tự đánh vần trước nhé! Bấm vào chữ để nghe cô giáo hướng dẫn.</div>
                    <div class="spelling-hint-text">${cur.displaySpell}</div>
                </div>

                <!-- Các ô ghép chữ -->
                <div class="spelling-slots" id="spelling-slots">
                    ${cur.parts.map(() => `
                        <div class="spell-slot-box">?</div>
                    `).join('')}
                </div>

                <!-- Bàn phím các chữ cái/tiếng để bé bấm chọn -->
                <div class="spelling-letters-dock" id="spelling-dock">
                    ${shuffledParts.map((part) => `
                        <button class="spell-tile-btn" onclick="LettersZone.pickTile('${part}', this)">${part}</button>
                    `).join('')}
                </div>

                <div class="spelling-controls" style="margin-top:16px;">
                    <button class="voice-btn" onclick="LettersZone.speakWordSpell()">🔊 Nghe Đánh Vần Chuẩn</button>
                    <button class="kid-pill" onclick="LettersZone.nextSpellingWord()">Từ Tiếp Theo ➔</button>
                </div>
            </div>
        `;
    },

    switchSpellingLevel(lvl) {
        this.spellingLevel = lvl;
        this.currentSpellingIndex = 0;
        SoundEngine.playPop();
        this.renderLevel3(document.getElementById('letters-content'));
    },

    speakWordSpell() {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        const cur = wordPool[this.currentSpellingIndex];
        if (cur) {
            SoundEngine.playVoice(cur.audioKey, null, cur.word);
        }
    },

    pickTile(char, buttonEl) {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        const cur = wordPool[this.currentSpellingIndex];
        const nextSlotIndex = this.selectedLetters.length;

        if (nextSlotIndex >= cur.parts.length) return;

        if (cur.parts[nextSlotIndex] === char) {
            SoundEngine.playPop();
            this.selectedLetters.push(char);

            const slots = document.querySelectorAll('#spelling-slots .spell-slot-box');
            if (slots[nextSlotIndex]) {
                slots[nextSlotIndex].textContent = char;
                slots[nextSlotIndex].classList.add('filled');
            }

            buttonEl.disabled = true;
            buttonEl.classList.add('tile-used');

            if (this.selectedLetters.length === cur.parts.length) {
                SoundEngine.playCorrect();
                SoundEngine.playVoice(cur.audioKey, null, cur.word);
                if (typeof App !== 'undefined' && App.addStar) App.addStar();

                const mascot = document.getElementById('spell-mascot');
                if (mascot) mascot.classList.add('celebrate-jump');

                setTimeout(() => {
                    this.nextSpellingWord();
                }, 2800);
            }
        } else {
            SoundEngine.playTryAgain();
            SoundEngine.playVoice('fb_retry');
        }
    },

    nextSpellingWord() {
        const wordPool = this.progressiveSpelling[this.spellingLevel] || this.progressiveSpelling[1];
        this.currentSpellingIndex = (this.currentSpellingIndex + 1) % wordPool.length;
        this.renderLevel3(document.getElementById('letters-content'));
    }
};
