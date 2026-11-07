/**
 * KED - Math Data & Logic (Chữ Số & Phép Toán Trực Quan)
 * Đếm số từ 1 đến 10 + Phép cộng trừ trực quan cho bé 3 tuổi
 */
const MathData = {
    // 10 chữ số đầu đời kèm đối tượng đếm
    numbers: [
        { num: 1, name: 'Số Một', icon: '☀️', word: '1 Ông Mặt Trời', items: ['☀️'], color: '#FF9800' },
        { num: 2, name: 'Số Hai', icon: '🧸', word: '2 Chú Gấu Bông', items: ['🧸', '🧸'], color: '#8D6E63' },
        { num: 3, name: 'Số Ba', icon: '🍎', word: '3 Quả Táo Đỏ', items: ['🍎', '🍎', '🍎'], color: '#F44336' },
        { num: 4, name: 'Số Bốn', icon: '🌸', word: '4 Bông Hoa Xinh', items: ['🌸', '🌸', '🌸', '🌸'], color: '#E91E63' },
        { num: 5, name: 'Số Năm', icon: '⭐', word: '5 Ngôi Sao Vàng', items: ['⭐', '⭐', '⭐', '⭐', '⭐'], color: '#FFD700' },
        { num: 6, name: 'Số Sáu', icon: '🐥', word: '6 Chú Vịt Con', items: ['🐥', '🐥', '🐥', '🐥', '🐥', '🐥'], color: '#FFC107' },
        { num: 7, name: 'Số Bảy', icon: '🍓', word: '7 Quả Dâu Tây', items: ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓'], color: '#E53935' },
        { num: 8, name: 'Số Tám', icon: '🎈', word: '8 Quả Bóng Bay', items: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], color: '#29B6F6' },
        { num: 9, name: 'Số Chín', icon: '🐟', word: '9 Chú Cá Bơi', items: ['🐟', '🐟', '🐟', '🐟', '🐟', '🐟', '🐟', '🐟', '🐟'], color: '#00ACC1' },
        { num: 10, name: 'Số Mười', icon: '🍬', word: '10 Viên Kẹo Ngọt', items: ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'], color: '#AB47BC' }
    ],

    // Bộ câu hỏi phép cộng trực quan
    additionProblems: [
        {
            a: 1,
            b: 1,
            itemIcon: '🍎',
            itemName: 'quả táo',
            options: [1, 2, 3],
            correct: 2,
            voiceText: 'Một quả táo thêm một quả táo bằng hai quả táo!'
        },
        {
            a: 2,
            b: 1,
            itemIcon: '🐥',
            itemName: 'chú vịt con',
            options: [2, 3, 4],
            correct: 3,
            voiceText: 'Hai chú vịt con thêm một chú vịt con bằng ba chú vịt con!'
        },
        {
            a: 2,
            b: 2,
            itemIcon: '⭐',
            itemName: 'ngôi sao',
            options: [3, 4, 5],
            correct: 4,
            voiceText: 'Hai ngôi sao thêm hai ngôi sao bằng bốn ngôi sao!'
        },
        {
            a: 3,
            b: 1,
            itemIcon: '🎈',
            itemName: 'quả bóng',
            options: [3, 4, 5],
            correct: 4,
            voiceText: 'Ba quả bóng thêm một quả bóng bằng bốn quả bóng!'
        },
        {
            a: 3,
            b: 2,
            itemIcon: '🌸',
            itemName: 'bông hoa',
            options: [4, 5, 6],
            correct: 5,
            voiceText: 'Ba bông hoa thêm hai bông hoa bằng năm bông hoa!'
        },
        {
            a: 4,
            b: 1,
            itemIcon: '🍬',
            itemName: 'viên kẹo',
            options: [4, 5, 6],
            correct: 5,
            voiceText: 'Bốn viên kẹo thêm một viên kẹo bằng năm viên kẹo!'
        }
    ],

    // Bộ câu hỏi phép trừ trực quan
    subtractionProblems: [
        {
            a: 2,
            b: 1,
            itemIcon: '🎈',
            itemName: 'quả bóng',
            options: [1, 2, 3],
            correct: 1,
            voiceText: 'Hai quả bóng bớt đi một quả bóng, còn lại một quả bóng!'
        },
        {
            a: 3,
            b: 1,
            itemIcon: '🍎',
            itemName: 'quả táo',
            options: [1, 2, 3],
            correct: 2,
            voiceText: 'Ba quả táo bớt đi một quả táo, còn lại hai quả táo!'
        },
        {
            a: 3,
            b: 2,
            itemIcon: '🐥',
            itemName: 'chú vịt con',
            options: [1, 2, 3],
            correct: 1,
            voiceText: 'Ba chú vịt con bớt đi hai chú vịt con, còn lại một chú vịt con!'
        },
        {
            a: 4,
            b: 1,
            itemIcon: '⭐',
            itemName: 'ngôi sao',
            options: [2, 3, 4],
            correct: 3,
            voiceText: 'Bốn ngôi sao bớt đi một ngôi sao, còn lại ba ngôi sao!'
        },
        {
            a: 4,
            b: 2,
            itemIcon: '🍬',
            itemName: 'viên kẹo',
            options: [1, 2, 3],
            correct: 2,
            voiceText: 'Bốn viên kẹo bớt đi hai viên kẹo, còn lại hai viên kẹo!'
        },
        {
            a: 5,
            b: 1,
            itemIcon: '🌸',
            itemName: 'bông hoa',
            options: [3, 4, 5],
            correct: 4,
            voiceText: 'Năm bông hoa bớt đi một bông hoa, còn lại bốn bông hoa!'
        },
        {
            a: 5,
            b: 2,
            itemIcon: '🍓',
            itemName: 'quả dâu tây',
            options: [2, 3, 4],
            correct: 3,
            voiceText: 'Năm quả dâu tây bớt đi hai quả dâu tây, còn lại ba quả dâu tây!'
        }
    ]
};

window.MathData = MathData;
