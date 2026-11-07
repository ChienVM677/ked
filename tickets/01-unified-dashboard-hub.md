# 01: Tái cấu trúc Dashboard SPA Hub & Hợp nhất Đảo Kho Báu

**What to build:** Giao diện điều hướng tập trung dạng Sidebar cảm ứng lớn (>75px) với 5 Vương quốc học tập (Hình Ảnh, Chữ Cái, Con Số, Truyện Kể, Đảo Kho Báu) trong một trang web duy nhất. Hợp nhất toàn bộ chế độ Đảo Kho Báu và Sổ Dán Sticker từ `treasure_game.html` vào chung SPA mà không cần chuyển trang, dùng chung bộ sao ⭐ tích lũy và mở khóa rương phần thưởng.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Cấu trúc lại `index.html` với Sidebar cố định và khu vực hiển thị Content mượt mà, chuyển đổi giữa các phân hệ không tải lại trang.
- [x] Chuyển toàn bộ logic game Đảo Kho Báu (lên cấp, mở rương nhận sticker sau mỗi 3 câu đúng) và Sổ Dán Sticker vào `js/treasure_zone.js`.
- [x] Tích hợp bộ chọn cấp độ năng lực (Bé Mầm 3t, Bé Chồi 4t, Bé Lá 5t) trên thanh Header/Sidebar.
- [x] Bảo lưu cơ chế bảo vệ mắt tự động khóa sau 200 câu hỏi kèm Cổng Phụ Huynh.
- [x] Điểm sao ⭐ và Sticker lưu trữ đồng bộ trong `localStorage`.
