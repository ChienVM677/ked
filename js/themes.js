/**
 * KED - Themes Data (Thế giới quanh bé)
 * Động vật, Trái cây, Phương tiện giao thông, Màu sắc & Hình khối
 */
const ThemesData = {
    categories: [
        {
            id: 'animals',
            title: 'Động Vật Đáng Yêu',
            icon: '🐶',
            color: '#FF7043',
            items: [
                { id: 'dog', name: 'Con Chó', soundText: 'Gâu gâu!', soundType: 'dog', icon: '🐶', fact: 'Chó giữ nhà và rất trung thành' },
                { id: 'cat', name: 'Con Mèo', soundText: 'Meo meo!', soundType: 'cat', icon: '🐱', fact: 'Mèo thích bắt chuột và phơi nắng' },
                { id: 'duck', name: 'Con Vịt', soundText: 'Cạp cạp!', soundType: 'duck', icon: '🦆', fact: 'Vịt bơi lội rất giỏi dưới nước' },
                { id: 'chick', name: 'Gà Con', soundText: 'Chiếp chiếp!', soundType: 'duck', icon: '🐥', fact: 'Gà con lông vàng ươm xinh xắn' },
                { id: 'cow', name: 'Con Bò', soundText: 'Ùm bò bò!', soundType: 'cow', icon: '🐮', fact: 'Bò cho sữa thơm ngon cho bé' },
                { id: 'pig', name: 'Con Lợn', soundText: 'Ủn ỉn!', soundType: 'cow', icon: '🐷', fact: 'Chú lợn con béo tròn thích ăn no' },
                { id: 'elephant', name: 'Chú Voi', soundText: 'Voi gầm vang!', soundType: 'cow', icon: '🐘', fact: 'Voi có chiếc vòi dài uống nước' },
                { id: 'lion', name: 'Sư Tử', soundText: 'Gầm gừ!', soundType: 'dog', icon: '🦁', fact: 'Sư tử dũng mãnh là chúa sơn lâm' },
                { id: 'rabbit', name: 'Chú Thỏ', soundText: 'Thỏ nhảy nhót!', soundType: 'cat', icon: '🐰', fact: 'Thỏ thích ăn củ cà rốt đỏ' },
                { id: 'monkey', name: 'Chú Khỉ', soundText: 'Khẹc khẹc!', soundType: 'cat', icon: '🐵', fact: 'Khỉ leo cây rất nhanh và thích chuối' },
                { id: 'sheep', name: 'Con Cừu', soundText: 'Bê bê!', soundType: 'cow', icon: '🐑', fact: 'Cừu có bộ lông xù êm ái như bông' },
                { id: 'dolphin', name: 'Cá Heo', soundText: 'Cá heo nhào lộn!', soundType: 'cat', icon: '🐬', fact: 'Cá heo thông minh bơi trong đại dương' }
            ]
        },
        {
            id: 'fruits',
            title: 'Trái Cây Thơm Ngon',
            icon: '🍎',
            color: '#4CAF50',
            items: [
                { id: 'apple', name: 'Quả Táo', soundText: 'Quả táo đỏ giòn ngọt', icon: '🍎', fact: 'Táo chứa nhiều vitamin tốt cho bé' },
                { id: 'banana', name: 'Quả Chuối', soundText: 'Quả chuối vàng thơm ngậy', icon: '🍌', fact: 'Chuối mềm thơm giúp bé cao lớn' },
                { id: 'orange', name: 'Quả Cam', soundText: 'Quả cam mọng nước giàu vitamin C', icon: '🍊', fact: 'Uống nước cam giúp tăng đề kháng' },
                { id: 'watermelon', name: 'Dưa Hấu', soundText: 'Dưa hấu vỏ xanh ruột đỏ mát lành', icon: '🍉', fact: 'Mùa hè ăn dưa hấu thật đã' },
                { id: 'strawberry', name: 'Dâu Tây', soundText: 'Quả dâu tây đỏ mọng chua ngọt', icon: '🍓', fact: 'Dâu tây thơm lừng bé nào cũng thích' },
                { id: 'grape', name: 'Chùm Nho', soundText: 'Chùm nho tím ngọt ngào', icon: '🍇', fact: 'Từng quả nho tròn xoe trĩu cành' },
                { id: 'mango', name: 'Quả Xoài', soundText: 'Quả xoài chín vàng rộm', icon: '🥭', fact: 'Xoài thơm ngọt ngào hương vị mùa hè' },
                { id: 'coconut', name: 'Trái Dừa', soundText: 'Trái dừa nước mát ngọt thanh', icon: '🥥', fact: 'Dừa mọc trên cây cao soi bóng' },
                { id: 'pineapple', name: 'Quả Dứa', soundText: 'Quả dứa mắt tròn thơm phức', icon: '🍍', fact: 'Dứa vàng thơm nhiều nước' },
                { id: 'avocado', name: 'Quả Bơ', soundText: 'Quả bơ béo ngậy thơm ngon', icon: '🥑', fact: 'Bơ xay sinh tố cho bé ăn dặm' }
            ]
        },
        {
            id: 'vehicles',
            title: 'Phương Tiện Giao Thông',
            icon: '🚗',
            color: '#29B6F6',
            items: [
                { id: 'car', name: 'Xe Ô Tô', soundText: 'Bíp bíp! Xe ô tô bon bon trên đường', soundType: 'car', icon: '🚗', fact: 'Ô tô chở cả gia đình đi chơi' },
                { id: 'motorbike', name: 'Xe Máy', soundText: 'Bíp bíp! Xe máy chạy bon bon', soundType: 'car', icon: '🛵', fact: 'Bé đi xe máy nhớ đội mũ bảo hiểm' },
                { id: 'airplane', name: 'Máy Bay', soundText: 'Vù vù! Máy bay lượn trên bầu trời xanh', soundType: 'car', icon: '✈️', fact: 'Máy bay bay cao trên tầng mây trắng' },
                { id: 'train', name: 'Tàu Hỏa', soundText: 'Tu tu xình xịch! Tàu hỏa dài chạy trên đường ray', soundType: 'car', icon: '🚂', fact: 'Tàu hỏa chở rất nhiều toa hàng và khách' },
                { id: 'bus', name: 'Xe Buýt', soundText: 'Bíp bíp! Xe buýt đưa đón mọi người', soundType: 'car', icon: '🚌', fact: 'Xe buýt màu sắc chở bạn bè đến trường' },
                { id: 'boat', name: 'Thuyền Buồm', soundText: 'Lướt sóng êm đềm trên biển cả', soundType: 'car', icon: '⛵', fact: 'Thuyền đón gió căng buồm ra khơi' },
                { id: 'ambulance', name: 'Xe Cứu Thương', soundText: 'I-ô i-ô! Xe cấp cứu nhường đường', soundType: 'car', icon: '🚑', fact: 'Xe cứu thương chở bác sĩ giúp đỡ mọi người' },
                { id: 'bicycle', name: 'Xe Đạp', soundText: 'Kính coong! Bé tập đạp xe thể dục', soundType: 'car', icon: '🚲', fact: 'Đạp xe ngoài công viên giúp bé khỏe mạnh' }
            ]
        },
        {
            id: 'colors_shapes',
            title: 'Màu Sắc & Hình Khối',
            icon: '🎨',
            color: '#AB47BC',
            items: [
                { id: 'red', name: 'Màu Đỏ', soundText: 'Màu đỏ rực rỡ như hoa phượng', icon: '🔴', colorCode: '#F44336', fact: 'Quả dâu tây và hoa hồng có màu đỏ' },
                { id: 'yellow', name: 'Màu Vàng', soundText: 'Màu vàng tươi sáng như ánh mặt trời', icon: '🟡', colorCode: '#FFEB3B', fact: 'Quả chuối và hoa hướng dương màu vàng' },
                { id: 'blue', name: 'Màu Xanh Dương', soundText: 'Màu xanh dương thăm thẳm như bầu trời và biển', icon: '🔵', colorCode: '#2196F3', fact: 'Nước biển trong xanh có màu xanh dương' },
                { id: 'green', name: 'Màu Xanh Lá', soundText: 'Màu xanh lá cây tươi mát của búp non', icon: '🟢', colorCode: '#4CAF50', fact: 'Cây cối và những chiếc lá màu xanh' },
                { id: 'orange', name: 'Màu Cam', soundText: 'Màu cam ngọt ngào của quả quýt', icon: '🟠', colorCode: '#FF9800', fact: 'Củ cà rốt và quả cam có màu cam' },
                { id: 'pink', name: 'Màu Hồng', soundText: 'Màu hồng phấn dễ thương như kẹo bông', icon: '🌸', colorCode: '#E91E63', fact: 'Búp bê và cánh hoa sen có màu hồng' },
                { id: 'circle', name: 'Hình Tròn', soundText: 'Hình tròn quay tròn như chiếc bánh xe', icon: '⭕', fact: 'Đồng hồ và quả bóng có hình tròn' },
                { id: 'square', name: 'Hình Vuông', soundText: 'Hình vuông có bốn cạnh bằng nhau', icon: '🟧', fact: 'Chiếc bánh chưng và hộp quà có hình vuông' },
                { id: 'triangle', name: 'Hình Tam Giác', soundText: 'Hình tam giác có ba góc nhọn', icon: '🔺', fact: 'Mái nhà và cánh buồm có hình tam giác' },
                { id: 'star', name: 'Ngôi Sao', soundText: 'Hình ngôi sao năm cánh lấp lánh trên trời cao', icon: '⭐', fact: 'Ngôi sao soi sáng cho màn đêm' },
                { id: 'heart', name: 'Trái Tim', soundText: 'Hình trái tim ấm áp yêu thương', icon: '❤️', fact: 'Bé gửi tặng trái tim yêu thương cho ba mẹ' }
            ]
        }
    ]
};

window.ThemesData = ThemesData;
