# ADR 0001: Kiến Trúc Hợp Nhất Hệ Thống Giáo Dục Sớm KED v6.0

- **Trạng thái**: Đề xuất (Proposed - Chờ xác nhận Frontier R2)
- **Ngày**: 2026-11-07
- **Tác giả**: Antigravity AI Pair Programming System & KED Engineering Team

---

## Bối Cảnh (Context)

Hệ thống giáo dục sớm KED hiện đã phát triển qua 5 phiên bản, sở hữu kho 227 vật phẩm hình ảnh vector SVG, âm thanh chuẩn tiếng Việt, 29 chữ cái và phép tính cơ bản. Tuy nhiên, kiến trúc hiện tại gặp một số hạn chế:
1. **Phân mảnh giao diện**: `index.html` và `treasure_game.html` là hai tệp HTML riêng biệt, chuyển trang làm đứt gãy luồng tương tác và phân tán dữ liệu điểm sao / sticker.
2. **Nội dung còn tuyến tính & thiếu kịch tính**: Các câu hỏi chủ yếu dừng lại ở nhận diện vật thể đơn lẻ, trẻ 3-5 tuổi có nhận thức tốt nhanh chóng cảm thấy quá dễ và nhàm chán.
3. **Phân hệ chữ cái & con số còn khô khan**: Đánh vần chỉ hiển thị bảng tĩnh, con số chỉ loanh quanh 0-10 mà chưa có các cấp độ tăng tiến cao hơn (1-20, 1-50, 1-100, cân thăng bằng, quy luật).
4. **Thiếu vắng phương pháp học theo ngữ cảnh**: Trẻ tiếp thu tốt nhất qua truyện kể (Storytelling) và tình huống đời thường, hiện KED chưa có phân hệ truyện kể tương tác.

---

## Quyết Định Thiết Kế (Decisions)

### 1. Hợp nhất thành Kiến Trúc Dashboard SPA (Single-Page Hub)
- Chuyển toàn bộ ứng dụng về một trang duy nhất với Sidebar / Navigation Dock lớn bên hông hoặc dưới chân màn hình.
- Tích hợp trực tiếp màn hình Đảo Kho Báu và Sổ Dán Sticker thành một tab phân hệ nội bộ, sử dụng chung cơ chế điểm sao và trạng thái lưu trữ `localStorage`.

### 2. Bổ sung Phân Hệ Thứ 4: "Vườn Cổ Tích & Truyện Kể Tương Tác" (Interactive Storybook)
- Mỗi câu chuyện gồm các trang vẽ SVG/tranh lớn, có audio dẫn chuyện truyền cảm, các điểm chạm âm thanh (chạm vào nhân vật/đồ vật để nghe tiếng) và câu hỏi tương tác dọc mạch truyện.

### 3. Gamification Hóa Phân Hệ Chữ Cái (Phonics Gamification)
- Bổ sung: Chuyến Tàu Ghép Vần (đầu kéo phụ âm + toa nguyên âm), Bong Bóng Âm Thanh (bấm nổ bóng theo âm đọc), Bắt Chữ Rơi (điền chữ vào từ qua hình ảnh), và Biệt Đội Dấu Thanh (nhân hóa 5 dấu thanh).

### 4. Mở Rộng 4 Cấp Độ Toán Học & Tư Duy Con Số (Math Progression)
- Cấp 1: Đếm lượng 1-10 cơ bản.
- Cấp 2: Bảng 100 số kì diệu, đếm tròn chục và đếm theo nhóm.
- Cấp 3: Cân thăng bằng so sánh nhiều hơn/ít hơn và dãy số quy luật logic.
- Cấp 4: Phép tính cộng trừ tình huống thực tế có hoạt họa.

### 5. Chế Độ "Bé Thông Minh & Đồ Vật Quanh Em" (Daily Life Situations)
- Xây dựng các chuỗi câu hỏi tình huống đời thường (Đi ngủ, Đi mưa, Đồ dùng học tập, An toàn nhà bếp) để trẻ rèn luyện tư duy nhân quả và hiểu công năng của đồ vật.

---

## Đánh Đổi & Hệ Quả (Consequences & Trade-offs)

- **Ưu điểm**:
  - Trải nghiệm mượt mà, không giật lag chuyển trang, trẻ không bị lạc.
  - Tăng vọt độ gắn kết (retention) và chiều sâu giáo dục nhờ phương pháp kể chuyện và game hóa.
  - Phù hợp với nhiều mức độ nhận thức (từ cơ bản 3 tuổi đến nâng cao 5 tuổi).
- **Thách thức**:
  - Cần biên tập kịch bản truyện kể và thu âm thêm giọng đọc cho từng câu chuyện.
  - Khối lượng mã nguồn JavaScript tăng lên, đòi hỏi chia tách module chặt chẽ (`stories_zone.js`, `math_zone.js`, `phonics_zone.js`).
