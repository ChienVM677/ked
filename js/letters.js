/**
 * KED - Letters & Phonics Data (Chữ Cái & Đánh Vần Tiếng Việt)
 * 29 Chữ cái chuẩn Việt Nam + Ghép vần 2 âm tiết cho bé 3 tuổi
 */
const LettersData = {
    // 29 chữ cái tiếng Việt
    alphabet: [
        { letter: 'A', lower: 'a', sound: 'A', name: 'Chữ A', word: 'Con Cá', icon: '🐟', audioName: 'a' },
        { letter: 'Ă', lower: 'ă', sound: 'Á', name: 'Chữ Ă', word: 'Mặt Trăng', icon: '🌙', audioName: 'á' },
        { letter: 'Â', lower: 'â', sound: 'Ớ', name: 'Chữ Â', word: 'Cái Ấm', icon: '🫖', audioName: 'ớ' },
        { letter: 'B', lower: 'b', sound: 'Bờ', name: 'Chữ Bờ', word: 'Quả Bóng', icon: '⚽', audioName: 'bờ' },
        { letter: 'C', lower: 'c', sound: 'Cờ', name: 'Chữ Cờ', word: 'Lá Cờ', icon: '🚩', audioName: 'cờ' },
        { letter: 'D', lower: 'd', sound: 'Dờ', name: 'Chữ Dờ', word: 'Quả Dưa', icon: '🍈', audioName: 'dờ' },
        { letter: 'Đ', lower: 'đ', sound: 'Đờ', name: 'Chữ Đờ', word: 'Đèn Lồng', icon: '🏮', audioName: 'đờ' },
        { letter: 'E', lower: 'e', sound: 'E', name: 'Chữ E', word: 'Em Bé', icon: '👶', audioName: 'e' },
        { letter: 'Ê', lower: 'ê', sound: 'Ê', name: 'Chữ Ê', word: 'Con Búp Bê', icon: '🪆', audioName: 'ê' },
        { letter: 'G', lower: 'g', sound: 'Gờ', name: 'Chữ Gờ', word: 'Con Gà', icon: '🐔', audioName: 'gờ' },
        { letter: 'H', lower: 'h', sound: 'Hờ', name: 'Chữ Hờ', word: 'Bông Hoa', icon: '🌸', audioName: 'hờ' },
        { letter: 'I', lower: 'i', sound: 'I', name: 'Chữ I', word: 'Viên Bi', icon: '🔮', audioName: 'i' },
        { letter: 'K', lower: 'k', sound: 'Ca', name: 'Chữ Ca', word: 'Cái Kẹo', icon: '🍬', audioName: 'ca' },
        { letter: 'L', lower: 'l', sound: 'Lờ', name: 'Chữ Lờ', word: 'Chiếc Lá', icon: '🍃', audioName: 'lờ' },
        { letter: 'M', lower: 'm', sound: 'Mờ', name: 'Chữ Mờ', word: 'Quả Mận', icon: '🫐', audioName: 'mờ' },
        { letter: 'N', lower: 'n', sound: 'Nờ', name: 'Chữ Nờ', word: 'Cái Nơ', icon: '🎀', audioName: 'nờ' },
        { letter: 'O', lower: 'o', sound: 'O', name: 'Chữ O', word: 'Con Ong', icon: '🐝', audioName: 'o' },
        { letter: 'Ô', lower: 'ô', sound: 'Ô', name: 'Chữ Ô', word: 'Chiếc Ô', icon: '☂️', audioName: 'ô' },
        { letter: 'Ơ', lower: 'ơ', sound: 'Ơ', name: 'Chữ Ơ', word: 'Lá Cờ', icon: '🎏', audioName: 'ơ' },
        { letter: 'P', lower: 'p', sound: 'Pờ', name: 'Chữ Pờ', word: 'Đèn Pin', icon: '🔦', audioName: 'pờ' },
        { letter: 'Q', lower: 'q', sound: 'Quy', name: 'Chữ Quy', word: 'Quạt Giấy', icon: '🪭', audioName: 'quy' },
        { letter: 'R', lower: 'r', sound: 'Rờ', name: 'Chữ Rờ', word: 'Con Rùa', icon: '🐢', audioName: 'rờ' },
        { letter: 'S', lower: 's', sound: 'Sờ', name: 'Chữ Sờ', word: 'Ngôi Sao', icon: '⭐', audioName: 'sờ' },
        { letter: 'T', lower: 't', sound: 'Tờ', name: 'Chữ Tờ', word: 'Tàu Thuyền', icon: '🚢', audioName: 'tờ' },
        { letter: 'U', lower: 'u', sound: 'U', name: 'Chữ U', word: 'Cái Mũ', icon: '🧢', audioName: 'u' },
        { letter: 'Ư', lower: 'ư', sound: 'Ư', name: 'Chữ Ư', word: 'Bức Thư', icon: '✉️', audioName: 'ư' },
        { letter: 'V', lower: 'v', sound: 'Vờ', name: 'Chữ Vờ', word: 'Con Vịt', icon: '🦆', audioName: 'vờ' },
        { letter: 'X', lower: 'x', sound: 'Xờ', name: 'Chữ Xờ', word: 'Chiếc Xe', icon: '🚗', audioName: 'xờ' },
        { letter: 'Y', lower: 'y', sound: 'I dài', name: 'Chữ Y', word: 'Yếm Xinh', icon: '🎽', audioName: 'i dài' }
    ],

    // Bộ ghép vần cơ bản 2 âm tiết (Onset + Nucleus) cho bé 3 tuổi
    spellingWords: [
        {
            word: 'BA',
            letters: ['B', 'A'],
            spellFormula: 'Bờ - A - Ba',
            fullWord: 'Ba yêu',
            meaning: 'Ba chăm sóc gia đình và yêu thương bé',
            icon: '👨‍🦰',
            color: '#42A5F5'
        },
        {
            word: 'ME',
            letters: ['M', 'E'],
            spellFormula: 'Mờ - E - Me',
            fullWord: 'Mẹ hiền',
            meaning: 'Mẹ dịu dàng ôm ấp ru bé ngủ',
            icon: '👩',
            color: '#EC407A'
        },
        {
            word: 'CA',
            letters: ['C', 'A'],
            spellFormula: 'Cờ - A - Ca',
            fullWord: 'Con Cá',
            meaning: 'Chú cá tung tăng bơi lội dưới làn nước trong',
            icon: '🐟',
            color: '#26C6DA'
        },
        {
            word: 'GA',
            letters: ['G', 'A'],
            spellFormula: 'Gờ - A - Ga',
            fullWord: 'Con Gà',
            meaning: 'Chú gà gáy ò ó o gọi mặt trời thức giấc',
            icon: '🐔',
            color: '#FFA726'
        },
        {
            word: 'BO',
            letters: ['B', 'O'],
            spellFormula: 'Bờ - O - Bo',
            fullWord: 'Con Bò',
            meaning: 'Bò sữa gặm cỏ non xanh mướt trên đồi',
            icon: '🐮',
            color: '#8D6E63'
        },
        {
            word: 'BE',
            letters: ['B', 'E'],
            spellFormula: 'Bờ - E - Be',
            fullWord: 'Em Bé',
            meaning: 'Em bé cười tươi ngoan ngoãn được cả nhà yêu',
            icon: '👶',
            color: '#FFB300'
        },
        {
            word: 'CO',
            letters: ['C', 'O'],
            spellFormula: 'Cờ - O - Co',
            fullWord: 'Con Cò',
            meaning: 'Con cò trắng phau bay lả bay la',
            icon: '🕊️',
            color: '#78909C'
        },
        {
            word: 'HO',
            letters: ['H', 'O'],
            spellFormula: 'Hờ - O - Ho',
            fullWord: 'Con Hổ',
            meaning: 'Hổ dũng mãnh bảo vệ muông thú trong rừng xanh',
            icon: '🐯',
            color: '#FF7043'
        },
        {
            word: 'LA',
            letters: ['L', 'A'],
            spellFormula: 'Lờ - A - La',
            fullWord: 'Chiếc Lá',
            meaning: 'Chiếc lá xanh đón ánh nắng ban mai ấm áp',
            icon: '🍃',
            color: '#66BB6A'
        },
        {
            word: 'NO',
            letters: ['N', 'O'],
            spellFormula: 'Nờ - O - No',
            fullWord: 'Bé Ăn No',
            meaning: 'Bé ăn hết bát cháo ngon lành no bụng lớn nhanh',
            icon: '🥣',
            color: '#AB47BC'
        },
        {
            word: 'XE',
            letters: ['X', 'E'],
            spellFormula: 'Xờ - E - Xe',
            fullWord: 'Chiếc Xe',
            meaning: 'Chiếc xe bon bon đưa bé đi chơi phố vui vẻ',
            icon: '🚗',
            color: '#29B6F6'
        },
        {
            word: 'VI',
            letters: ['V', 'I'],
            spellFormula: 'Vờ - I - Vi',
            fullWord: 'Cái Ví',
            meaning: 'Chiếc ví nhỏ xinh ba mang theo bên mình',
            icon: '👛',
            color: '#FF7043'
        }
    ]
};

window.LettersData = LettersData;
