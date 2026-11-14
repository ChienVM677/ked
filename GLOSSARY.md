# Từ Điển Thuật Ngữ Miền - Dự Án KED (Bé Vui Học)

Tài liệu định nghĩa các khái niệm, quy ước nghiệp vụ sư phạm mầm non và kỹ thuật của hệ thống giáo dục sớm `KED`.

---

## 1. Thuật Ngữ Sư Phạm Mầm Non & Game Giáo Dục (Early Childhood Edutainment)

| Thuật ngữ | Tiếng Anh tương đương | Định nghĩa & Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- |
| **Giáo dục đa giác quan** | Multi-sensory Learning | Kích thích đồng thời thị giác (hình to sắc nét), thính giác (giọng đọc ấm, tiếng kêu động vật), và xúc giác (chạm, click, nổ bóng). |
| **Vườn Cổ Tích Tương Tác** | Interactive Storybook | Truyện tranh kỹ thuật số đa tương tác kết hợp giọng đọc truyền cảm, tranh minh họa lớn và các điểm chạm phát âm thanh/hiệu ứng hoặc câu đố theo cốt truyện. |
| **Nguyên âm kép & Vần ghép** | Compound Vowels & Diphthongs | Các tổ hợp nguyên âm đôi (ai, ao, au, eo, êu, ia, oa, oe, oi, ua, uê, ui, uy, ưa...) và vần ghép có âm cuối (an, ang, anh, ac, at...). |
| **Tiến trình ngữ âm đa cấp** | Multi-Syllable Progression | Lộ trình ghép vần 4 cấp: (1) 2 âm tiết đơn giản (BA, CA), (2) Có dấu thanh (BÁ, CÀ, MẸ), (3) Vần ghép/nguyên âm kép (MÈO, CHUỐI), (4) Từ ghép đời thường (XE ĐẠP, BÁNH MÌ). |
| **Sa bàn 3 môi trường sống** | Tri-Habitat Diorama | Trực quan hóa 3 không gian sinh thái đặc trưng: Bầu trời mây biếc (Air), Mặt đất rừng xanh (Land), và Lòng đại dương rạn san hô xanh thẳm (Water). |
| **Phòng thí nghiệm pha màu** | Color Mixing Lab | Trò chơi hòa màu tương tác (Đỏ + Vàng = Cam, Xanh lam + Vàng = Xanh lá, Đỏ + Lam = Tím) giúp bé hiểu bản chất màu sắc. |
| **Hình khối gắn với đời thực** | Real-World Shape Association | Dạy hình học qua đồ vật thân thuộc (đồng hồ tròn, bánh chưng vuông, cửa chữ nhật, pizza tam giác, cánh diều thoi). |
| **Đảo Kho Báu đa cấp độ** | Advanced Treasure Island | Hệ thống thử thách lên cấp độ tích hợp câu đố phủ định ("KHÔNG PHẢI"), so sánh tương đối, và suy luận nhân quả. |
| **Vùng an toàn nhận thức** | Cognitive Comfort Zone | Màn hình tập trung vào 1 nhiệm vụ duy nhất, không quảng cáo, nút bấm tối thiểu 75-80px để chạm chính xác, hình là chính - chữ là phụ. |
| **Củng cố tích cực** | Positive Reinforcement | Khi trẻ đúng: Pháo hoa, vỗ tay, sao vàng kèm giọng khen ngợi ấm áp. Khi chưa đúng: Âm thanh nhẹ nhàng, không báo lỗi đỏ làm trẻ sợ. |
| **Chế độ Đọc Truyện Cho Bé** | Story Reading Mode | Chế độ tranh truyện tập trung nghe kể và ngắm tranh, câu văn ngắn gọn, chữ to rõ, không bị xao nhãng bởi câu đố bài tập. |
| **Tương Tác & Thu Hoạch Kiến Thức** | Story Interactive & Harvest Mode | Chế độ sa bàn hành động và bộ câu hỏi tình huống thực tế đời sống rút ra từ câu chuyện. |
| **Bộ Chọn Truyện Thu Gọn 1 Chạm** | Popover Story Picker | Nút chọn truyện nhỏ gọn trên thanh subnav, mở modal bảng chọn truyện to bản trực quan rồi tự đóng. |
| **Huy Hiệu Bài Học Cuộc Sống** | Life-Skill Badges | Huy hiệu ghi nhận kỹ năng sống thu hoạch được sau mỗi câu chuyện (Đi mưa an toàn, Kiên trì cố gắng, Đoàn kết giúp đỡ). |

---

## 2. Thuật Ngữ Kỹ Thuật Kiến Trúc (Technical Architecture)

| Thuật ngữ | Thành phần kỹ thuật | Diễn giải |
| :--- | :--- | :--- |
| **Single-Screen Adaptive Viewport** | CSS Viewport Locking (`100vh`) | Thiết kế vừa vặn toàn màn hình không cuộn dọc, loại bỏ thanh cuộn gây phân tâm cho trẻ mầm non. |
| **Visual Category Grid** | Pure Icon Navigation | Dải menu chọn chủ đề thuần biểu tượng hoạt họa cực lớn (>44px), hiển thị trọn vẹn không cần thanh trượt (no-scrollbar). |
| **Vietnamese Neural Voice** | `vi-VN-HoaiMyNeural` (Edge-TTS) | Giọng đọc AI cô giáo tự nhiên, truyền cảm, ngắt nghỉ đúng ngữ điệu chuẩn tiếng Việt thay thế hoàn toàn giọng máy thô. |
| **Click-Only Audio Trigger** | Strict Event Discipline | Triệt tiêu 100% sự kiện `onmouseenter` khi lướt chuột qua thẻ; âm thanh chỉ phát khi trẻ chủ động bấm/chạm trực tiếp. |
| **Synthesized Audio Engine** | `js/sound.js` | Bộ tạo âm thanh hiệu ứng bằng Web Audio API (chuông mừng, tiếng vỗ tay, pháo hoa, bong bóng nổ) chạy 100% offline. |
| **Offline Voice Audio Store** | `audio/*.mp3` | Hệ thống file âm thanh thu âm giọng đọc cô giáo chuẩn tiếng Việt 100% cho từng vật phẩm, câu hỏi và lời kể chuyện. |
| **Shared Gamification State** | `localStorage` Persistence | Đồng bộ điểm sao tích lũy, cấp độ mở khóa, bộ sưu tập sticker và rương kho báu xuyên suốt mọi phân hệ học tập. |
