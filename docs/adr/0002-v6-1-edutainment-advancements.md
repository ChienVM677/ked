# ADR 0002: Nâng Cấp Trải Nghiệm Giáo Dục Sớm & Tối Ưu Màn Hình Đơn KED v6.1

- **Trạng thái**: Đã chấp nhận & Hoàn thành triển khai (Accepted & Implemented)
- **Ngày**: 2026-11-07
- **Tác giả**: Antigravity AI Pair Programming System & KED Engineering Team

---

## Bối Cảnh (Context)

Sau khi hoàn thành Lát cắt 1 (Kiến trúc Dashboard SPA Hub), qua quá trình trải nghiệm thực tế cùng bé, người dùng đã phát hiện một số điểm cần cải tiến quan trọng:
1. **Lỗi âm thanh khi lướt chuột**: Ở một số màn hình tìm hình, chuột lướt qua thẻ vẫn phát ra âm thanh (sự kiện `onmouseenter`), gây ồn ào và khó chịu.
2. **Nhu cầu nâng cấp chất lượng giọng đọc**: Người dùng muốn chuyển sang giọng đọc tiếng Việt Neural tự nhiên (`vi-VN-HoaiMyNeural` / "vieneu"), thay vì giọng đọc máy cũ.
3. **Bố cục chưa tối ưu cho trẻ nhỏ**:
   - Menu chủ đề hình ảnh còn dùng chữ và có thanh kéo (scrollbar), trẻ 3 tuổi chưa biết đọc chữ khó nhìn thấy hết các chủ đề.
   - Số câu hỏi đã chơi nằm dưới hoặc rời rạc, chưa đặt ngang hàng với tiêu đề Vương Quốc Hình Ảnh.
   - Giao diện chưa khóa cứng trong 1 màn hình đơn (Single-Screen Viewport), bé phải cuộn lên xuống.
4. **Độ khó & Tính hấp dẫn ở các phân hệ**:
   - Hình khối & màu sắc còn quá đơn giản, chưa gắn với đồ vật thực tế hoặc pha màu tương tác.
   - Câu hỏi sa bàn 3 môi trường sống (Trời - Đất - Nước) minh họa chưa sinh động, đặc biệt dưới nước chưa trực quan và đáp án chưa được xáo trộn tối ưu.
   - Đảo Kho Báu câu hỏi còn quá dễ.
   - Ghép vần & Dấu thanh chưa có nguyên âm kép (ai, ao, au, ia, oa...) và chưa có lộ trình ghép vần đa cấp từ từ đơn đến từ ghép đa âm tiết.

---

## Quyết Định Thiết Kế (Decisions)

### 1. Triệt Tiêu 100% Âm Thanh Rê Chuột (Click-Only Audio Discipline)
- Gỡ bỏ hoàn toàn mọi thuộc tính `onmouseenter="SoundEngine.playItemName(...)"` trong toàn bộ codebase (`images_zone.js`, `treasure_zone.js`). Âm thanh chỉ phát khi trẻ bấm/chạm trực tiếp.

### 2. Chuyển Đổi Hệ Thống Giọng Đọc Sang `vi-VN Neural` (Hoài My Neural)
- Sử dụng thư viện `edge_tts` với voice `vi-VN-HoaiMyNeural` để sinh lại và bổ sung toàn bộ file âm thanh offline vào thư mục `audio/`. Giọng cô giáo ấm áp, ngữ điệu truyền cảm, phát âm chuẩn xác tiếng Việt 100%.

### 3. Tối Ưu Giao Diện Màn Hình Đơn (Single-Screen No-Scroll Viewport) & Dải Menu Biểu Tượng Cực Đại
- Thiết kế dải chọn chủ đề thuần icon lớn (>44px), hiển thị trọn vẹn 16 chủ đề (thêm 4 nhóm mới: Côn trùng, Nhạc cụ, Hiện tượng thiên nhiên, Món ăn dinh dưỡng) trên 1 hàng/lưới phẳng không cuộn.
- Đưa huy hiệu "Số câu đã chơi" lên đầu trang, đặt cạnh tiêu đề "Vương Quốc Hình Ảnh".
- Cố định chiều cao viewport `100vh` để bé quan sát toàn bộ câu hỏi và đáp án trên 1 màn hình duy nhất.

### 4. Nâng Cấp Phân Hệ Màu Sắc & Hình Khối Kỳ Thú
- Bổ sung 3 chế độ: (1) Nhận diện hình khối gắn với đồ vật đời thực (bánh chưng vuông, đồng hồ tròn, pizza tam giác, cánh diều thoi), (2) Đố vui đôi thuộc tính (hình + màu), (3) Phòng thí nghiệm pha màu ma thuật (Đỏ + Vàng = Cam...).

### 5. Sa Bàn 3 Môi Trường Sống SVG Sống Động & Cân Bằng Ngẫu Nhiên Đáp Án
- Vẽ lại 3 môi trường bằng tranh sa bàn SVG sinh động: Bầu trời mây biếc (Air), Rừng xanh đồng cỏ (Land), và Lòng đại dương san hô xanh thẳm có bọt nước (Water).
- Thuật toán xáo trộn Fisher-Yates cân bằng để không lặp lại cùng một đáp án nhiều lần liên tiếp.

### 6. Mở Rộng Đảo Kho Báu Cấp 4 (Siêu Thử Thách)
- Nâng cấp kho câu hỏi lên 60+ câu đa dạng với các thử thách logic, câu hỏi phủ định ("KHÔNG PHẢI"), so sánh tương đối và quy luật.

### 7. Tiến Trình Ngữ Âm Đa Cấp & Nguyên Âm Kép
- Mở rộng phân hệ Chữ cái:
  - Bổ sung tab **Nguyên Âm Kép** (AI, AO, AU, EO, ÊU, IA, OA, UÊ, UY, ƯA...) luyện tập cùng 5 dấu thanh biến hóa.
  - Lộ trình ghép vần 4 cấp độ: (1) 2 âm tiết đơn, (2) Có dấu thanh, (3) Vần ghép/nguyên âm kép có hình minh họa, (4) Từ ghép hai âm tiết đời thường.

---

## Đánh Đổi & Hệ Quả (Consequences)

- Giữ vững nguyên tắc 100% offline, an toàn cho trẻ, không làm chậm tốc độ tải trang.
- Trẻ mầm non 3 tuổi nhận thức tốt sẽ có không gian học tập phong phú, kích thích tư duy mà không bị nhàm chán.
