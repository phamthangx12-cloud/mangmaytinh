# MMT Lab – Học Mạng Máy Tính

Website học tương tác bám theo khung 5 chương môn Mạng máy tính. Toàn bộ nội dung nằm trong các file dữ liệu JS, không cần cài đặt hay build.

## Cách mở

1. Mở trực tiếp `index.html` bằng trình duyệt (double-click), hoặc
2. Trong VS Code: chuột phải `index.html` → **Open with Live Server** (nếu đã cài extension).

Không cần Node.js, không cần server; mọi thứ chạy offline (chỉ font Google cần Internet, nếu không có sẽ dùng font hệ thống).

## Nội dung

| Chương | Chủ đề | Số bài |
|---|---|---|
| 1 | Tổng quan: Internet, chuyển mạch, độ trễ, phân tầng, an ninh | 5 |
| 2 | Tầng ứng dụng: socket, HTTP, email, DNS, FTP/P2P, CDN, lập trình socket | 7 |
| 3 | Tầng giao vận: dồn kênh, UDP/checksum, rdt, GBN/SR, TCP, tắc nghẽn | 7 |
| 4 | Tầng mạng: router, IPv4, subnet/NAT/IPv6, định tuyến, OSPF/BGP, ICMP | 7 |
| 5 | Tầng liên kết: frame, CRC, đa truy nhập, Ethernet/ARP, switch/VLAN, Wi-Fi | 7 |

Tổng cộng **33 bài**, **40 câu trắc nghiệm** có giải thích, **44 thẻ ghi nhớ**.

## Tính năng

- **Lộ trình & tiến độ**: đánh dấu bài đã học, thanh tiến độ theo chương, lưu bằng `localStorage`.
- **Tìm kiếm**: tìm theo tên bài, từ khóa và thuật ngữ.
- **Luyện đề**: đề ngẫu nhiên 10/15/20 câu, lọc theo chương, chấm điểm và giải thích ngay.
- **Thẻ ghi nhớ**: lật thẻ, lọc theo chương, xáo trộn.
- **Mô phỏng tương tác**:
  - Máy tính độ trễ truyền / lan truyền (Chương 1)
  - Phân giải tên miền từng bước (Chương 2)
  - Checksum bù một 16-bit (Chương 3)
  - Mô phỏng cửa sổ trượt Stop-and-Wait / GBN / SR (Chương 3)
  - Bắt tay ba bước TCP (Chương 3)
  - Máy tính subnet CIDR (Chương 4)
  - Máy tính CRC modulo-2 (Chương 5)
- **Giao diện responsive**: desktop, tablet, mobile; sidebar thu gọn trên màn hình nhỏ.

## Cấu trúc file

```
index.html        Khung ứng dụng (sidebar, topbar, modal)
styles.css        Style nền tảng
app.css           Design system & style bổ sung
app.js            Điều hướng, tiến độ, tìm kiếm, quiz, luyện đề, thẻ nhớ
widgets.js        Các mô phỏng tương tác
data-ch1..5.js    Nội dung 33 bài học
quizzes.js        Ngân hàng 40 câu hỏi
flashcards.js     44 thẻ thuật ngữ
```

## Tùy chỉnh nội dung

- Thêm/sửa bài: chỉnh file `data-chX.js` (mỗi bài gồm `id`, `title`, `minutes`, `keywords`, `intro`, `body`, `keyPoints`).
- Thêm câu hỏi: thêm object vào `quizzes.js` với `ch`, `q`, `options`, `answer` (chỉ số 0-based), `explain`.
- Thêm thuật ngữ: thêm object vào `flashcards.js` với `ch`, `term`, `def`.
- Đổi màu/font: sửa biến CSS trong `app.css` (`:root`) và `styles.css`.

## Ghi chú

Nội dung được biên soạn theo khung kiến thức chuẩn của 5 chương Mạng máy tính (tổng quan, tầng ứng dụng, tầng giao vận, tầng mạng, tầng liên kết), bám sát các thuật ngữ và ví dụ thường gặp trong slide bài giảng. Nếu giảng viên có nhấn mạnh khác (ví dụ thứ tự trình bày hoặc ký hiệu công thức), bạn có thể chỉnh trực tiếp trong các file dữ liệu ở trên.

## Kiểm thử

Đã kiểm tra bằng Chrome headless: render 36 section (home + 33 bài + 2 trang công cụ), 19/19 kiểm thử tương tác đạt (điều hướng, đánh dấu tiến độ, quiz, luyện đề, thẻ nhớ, 6 widget, tìm kiếm). Bố cục không tràn ngang tại 360px, 390px và 760px.
