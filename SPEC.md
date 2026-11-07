# KED v6.0 - Bản Đặc Tả Kỹ Thuật Hệ Thống Giáo Dục Sớm (Specification)

- **Mã dự án:** `KED`
- **Phiên bản:** `6.0.0`
- **Tình trạng:** Sẵn sàng triển khai (`ready-for-agent`)
- **Đối tượng:** Trẻ mầm non 3 – 5 tuổi (Đặc biệt phù hợp trẻ có nhận thức sớm, thích tương tác đa giác quan)
- **Tài liệu liên quan:**
  - [GLOSSARY.md](file:///C:/Users/Chien/Desktop/ATG/PRJ/KED/GLOSSARY.md) - Thư mục: [📂 Mở thư mục KED](file:///C:/Users/Chien/Desktop/ATG/PRJ/KED/) - `C:\Users\Chien\Desktop\ATG\PRJ\KED\GLOSSARY.md`
  - [0001-v6-unified-architecture.md](file:///C:/Users/Chien/Desktop/ATG/PRJ/KED/docs/adr/0001-v6-unified-architecture.md) - Thư mục: [📂 Mở thư mục ADR](file:///C:/Users/Chien/Desktop/ATG/PRJ/KED/docs/adr/) - `C:\Users\Chien\Desktop\ATG\PRJ\KED\docs\adr\0001-v6-unified-architecture.md`

---

## 1. Problem Statement (Bài Toán Cần Giải Quyết)

Hiện tại, ứng dụng KED phiên bản 5.x đã sở hữu 227 vật phẩm hình ảnh vector SVG và âm thanh tiếng Việt chuẩn. Tuy nhiên:
1. **Trải nghiệm phân mảnh:** Ứng dụng bị chia cắt giữa `index.html` và `treasure_game.html`. Việc chuyển đổi tệp HTML gây tải lại trang, làm mất trạng thái trò chơi tức thời và khiến trẻ nhỏ bối rối.
2. **Nội dung còn tuyến tính:** Các câu hỏi chủ yếu dừng lại ở việc nhận biết thẻ đơn lẻ. Trẻ 3 tuổi có nhận thức tốt nhanh chóng cảm thấy quá dễ và nhàm chán khi không có các thử thách tư duy sâu hơn.
3. **Phân hệ chữ cái và số học đơn điệu:** Đánh vần chỉ là các thẻ bấm nghe âm tĩnh; phân hệ con số chỉ loanh quanh 0–10, thiếu các cấp độ phát triển tư duy như so sánh lượng, cân bằng, quy luật và bảng số lớn.
4. **Thiếu vắng bối cảnh đời thường & kể chuyện:** Trẻ học tốt nhất qua ngữ cảnh. Thiếu phân hệ kể chuyện tương tác khiến việc tiếp thu từ vựng và hiểu công năng của đồ vật trong đời sống hàng ngày chưa đạt hiệu quả tối đa.

---

## 2. Solution (Giải Pháp Tổng Thể)

Xây dựng **KED v6.0 - Đại Bản Doanh Giáo Dục Sớm (Unified Pedagogical Command Hub)** với 5 trụ cột:
1. **Kiến trúc SPA Dashboard tập trung:** Hợp nhất 100% ứng dụng vào một giao diện duy nhất, có **Sidebar / Navigation Dock lớn (>75px)**, tích hợp sẵn Đảo Kho Báu và Sổ Dán Sticker, đồng bộ điểm sao ⭐ trong toàn hệ thống.
2. **Vườn Cổ Tích & Truyện Kể Tương Tác (Storybook Zone):** Tranh minh họa khổ lớn, giọng đọc truyền cảm chuẩn tiếng Việt, có các điểm chạm phát âm thanh/hiệu ứng động và câu hỏi tình huống lồng trong mạch truyện.
3. **Phonics Gamification (Chữ Cái Kỳ Thú):** 4 mini-game động (Chuyến tàu ghép vần, Bong bóng âm thanh, Bắt chữ rơi điền từ, Biệt đội 5 dấu thanh siêu nhân gắn với tranh minh họa).
4. **Toán Tư Duy & Con Số Tăng Tiến (Advanced Math & Logic):** 4 cấp độ tăng tiến từ đếm lượng 1–10, Bảng 100 số thần kỳ (đếm tròn chục, nhảy cách 2/5), Cân Thăng Bằng so sánh lượng trực quan, đến Dãy số quy luật logic và bài toán tình huống.
5. **Bé Thông Minh & Đồ Vật Quanh Em (Daily Life Scenarios):** Chuỗi câu đố tình huống đời thường (Đi ngủ, Đi mưa, Đồ dùng học tập, An toàn nhà bếp) giúp trẻ rèn luyện tư duy nhân quả.

---

## 3. User Stories (Danh Sách Câu Chuyện Người Dùng)

### Nhóm A: Điều Hướng & Trải Nghiệm Chung (Navigation & Hub Experience)
1. *Là một em bé 3 tuổi,* con muốn có thanh menu bên cạnh với các nút bấm thật to (>75px) và hình con vật/biểu tượng rực rỡ, để con có thể tự tay bấm chuyển vương quốc mình thích mà không cần bố mẹ bấm hộ.
2. *Là một em bé,* con muốn xem số sao ⭐ vàng mình tích lũy được hiển thị to rõ ở góc trên màn hình, để con cảm thấy tự hào về thành tích của mình.
3. *Là một em bé,* con muốn có thể mở Đảo Kho Báu và Sổ Dán Sticker ngay lập tức mà màn hình không bị giật hay tải lại, để con dán những hình dán rực rỡ mình vừa mở được.
4. *Là phụ huynh,* tôi muốn có công tắc chọn cấp độ phát triển (Bé Mầm 3t, Bé Chồi 4t, Bé Lá 5t), để nội dung tự động điều chỉnh độ sâu phù hợp với năng lực nhận thức của con.
5. *Là phụ huynh,* tôi muốn tính năng khóa nghỉ ngơi bảo vệ mắt tự động kích hoạt sau khi con chơi đủ số câu quy định, kèm mật mã người lớn (phép tính đơn giản) để mở lại.

### Nhóm B: Vườn Cổ Tích Tương Tác (Storybook Zone)
6. *Là một em bé,* con muốn được nghe giọng cô giáo kể chuyện thật truyền cảm và xem tranh vẽ to rõ sắc nét, để con hiểu câu chuyện như đang xem sách tranh sinh động.
7. *Là một em bé,* con muốn chạm tay vào chú cún, chiếc ô, hoặc bông hoa trong tranh để chúng phát ra tiếng kêu và động đậy vui nhộn, giúp con khám phá thế giới trong tranh.
8. *Là một em bé,* con muốn được tham gia giải cứu hoặc giúp đỡ các bạn thú trong truyện bằng cách bấm vào đồ vật phù hợp (ví dụ: bấm cái ô để che mưa cho thỏ), để con cảm thấy mình là người hùng trong truyện.

### Nhóm C: Chữ Cái & Ghép Vần Kỳ Thú (Phonics Gamification)
9. *Là một em bé,* con muốn nhìn thấy đoàn tàu hỏa chạy tới mang theo chữ B và chữ A ghép lại với nhau tạo thành tiếng "BA", để con hào hứng tập đọc theo.
10. *Là một em bé,* con muốn bấm nổ các quả bóng bay mang chữ cái theo lời cô giáo gọi, để con vừa luyện phản xạ vừa thuộc mặt chữ.
11. *Là một em bé,* con muốn nhìn thấy từ còn thiếu một chữ cái kèm tranh con mèo, và kéo thả hoặc chạm vào chữ cái đúng để từ hoàn chỉnh phát ra tiếng vỗ tay khen ngợi.
12. *Là một em bé,* con muốn khám phá 5 nhân vật dấu thanh (Tên lửa Sắc, Cầu trượt Huyền, Móc câu Hỏi, Làn sóng Ngã, Giọt nước Nặng) biến hóa từ ngữ như thế nào qua các bức tranh hài hước.

### Nhóm D: Con Số & Toán Tư Duy (Advanced Math & Logic)
13. *Là một em bé,* con muốn nhìn thấy một chiếc cân đĩa bập bênh: khi đặt nhiều đồ vật lên một bên thì bên đó chìm xuống, để con hiểu ngay bên nào nhiều hơn mà không cần đếm trừu tượng.
14. *Là một em bé,* con muốn chạm vào bảng 100 số để xem các số tròn chục (10, 20, 30...) phát sáng như đèn lồng, giúp con làm quen với các con số lớn.
15. *Là một em bé,* con muốn giúp chú ếch nhảy qua các lá sen bằng cách tìm số còn thiếu trong dãy số (ví dụ: `2, 4, [?], 8`), để con phát triển tư duy suy luận quy luật.
16. *Là một em bé,* con muốn giải bài toán cộng trừ thông qua tình huống hoạt họa sinh động (chú chim bay đi, thả thêm cá vào bể), để con hiểu bản chất thêm vào - bớt đi.

### Nhóm E: Đồ Vật Quanh Em & Tình Huống Kỹ Năng Sống (Everyday Scenarios)
17. *Là một em bé,* con muốn trả lời câu đố chọn đồ vật giúp bé ngủ ngon (gối ôm, chăn ấm, đèn ngủ), để con biết chăm sóc giấc ngủ của mình.
18. *Là một em bé,* con muốn biết đâu là đồ vật an toàn và đâu là đồ vật nguy hiểm trong nhà bếp (dao, bếp lửa, phích nước sôi), để con biết tự bảo vệ bản thân.
19. *Là một em bé,* con muốn chọn đúng đồ dùng học tập để xếp vào chiếc ba lô xinh xắn trước khi đến trường mầm non.

---

## 4. Implementation Decisions (Quyết Định Triển Khai Kiến Trúc)

### Deep Modules & Phân Rã Thành Phần:
1. **`App` Core Hub (`js/app.js`):**
   - Quản trị trạng thái toàn cục: `currentZone` ('home', 'images', 'letters', 'numbers', 'stories', 'treasure'), `stars`, `stickers`, `currentLevel` (1-3).
   - Cơ chế điều hướng chuyển đổi mượt mà bằng CSS transitions, không reload trang.
2. **`SoundEngine` (`js/sound.js`):**
   - Hợp nhất Web Audio API (âm thanh hiệu ứng ting, pop, sparkle, pháo hoa) và bộ đệm phát file MP3 thu âm tiếng Việt chuẩn (`audio/item_<id>.mp3`, `audio/find_<id>.mp3`).
   - Cung cấp Seam kiểm thử: `SoundEngine.playItemAudio(id)`, `SoundEngine.playEffect(name)`.
3. **`ImagesZone` & `DailyLifeZone` (`js/images_zone.js`):**
   - Quản lý kho 227 vật phẩm SVG, 4 cấp độ tư duy hình ảnh và chế độ "Tình huống kỹ năng sống".
4. **`StoriesZone` (`js/stories_zone.js` & `js/stories_data.js`):**
   - Module mới quản lý trình diễn truyện tranh tương tác: lật trang, quản lý âm thanh dẫn chuyện, render các điểm chạm SVG và xử lý câu hỏi tương tác.
5. **`LettersZone` (`js/letters_zone.js`):**
   - Nâng cấp: Tích hợp 4 mini-game (Chuyến tàu ghép vần, Bong bóng âm thanh, Điền chữ thiếu, Biệt đội dấu thanh).
6. **`NumbersZone` (`js/numbers_zone.js`):**
   - Nâng cấp: 4 cấp độ tăng tiến (1-10 cơ bản, Bảng 100 số, Cân thăng bằng so sánh lượng, Dãy quy luật logic).
7. **`TreasureZone` (Chuyển đổi từ `treasure_game.html` vào SPA):**
   - Đảo kho báu, mở rương nhận sticker sau mỗi 3 câu đúng, Sổ dán sticker trang trí canvas.

---

## 5. Testing Decisions & Seams (Quy Chuẩn Kiểm Thử)

* **Seam 1 (Navigation & State Seam):** `App.openZone(zoneId)` chuyển đổi chính xác vùng hiển thị DOM, cập nhật class `.active-zone` và kích hoạt âm thanh chuyển cảnh.
* **Seam 2 (Gamification Persistence Seam):** `App.addStars(count)` và `App.unlockSticker(stickerId)` cập nhật đúng trên UI và ghi bền vững vào `localStorage`.
* **Seam 3 (Interactive Storybook Seam):** `StoriesZone.goToPage(storyId, pageIndex)` tải đúng nội dung trang, điểm chạm SVG và kích hoạt audio tương ứng.
* **Seam 4 (Balance Scale Math Seam):** `NumbersZone.evaluateBalance(leftQty, rightQty)` tính toán chính xác độ nghiêng trực quan của đĩa cân và xác thực câu trả lời của trẻ.
* **Quy tắc kiểm thử:** Chạy kiểm tra cú pháp JS tự động sau mỗi lát cắt, kiểm tra không có lỗi console rác, không có broken SVG.

---

## 6. Out of Scope (Ngoài Phạm Vi)

* Không kết nối server backend, cơ sở dữ liệu cloud hay mạng xã hội (đảm bảo 100% offline an toàn tuyệt đối cho trẻ em).
* Không có quảng cáo, in-app purchases, hoặc thu thập thông tin cá nhân của trẻ.
* Không có màn hình thua hoặc âm thanh báo lỗi gắt gỏng gây ức chế tâm lý cho trẻ.

---

## 7. Further Notes (Ghi Chú Thêm)

* Các nút bấm, thẻ bài và điểm chạm luôn duy trì kích thước tối thiểu $75 \times 75$px.
* Mọi thay đổi đều được phản ánh vào `manifest.json` và đồng bộ lên Google Sheet APP tab khi bàn giao.
