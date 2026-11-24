window.MMT_FLASHCARDS = [
  /* CHƯƠNG 1 */
  { ch: "ch1", term: "Protocol (giao thức)", def: "Tập quy tắc quy định cú pháp, ngữ nghĩa và đồng bộ thời gian của việc trao đổi thông điệp giữa hai bên." },
  { ch: "ch1", term: "Packet switching", def: "Chia dữ liệu thành gói, chuyển tiếp độc lập qua router, dùng chung đường truyền theo nhu cầu (thống kê)." },
  { ch: "ch1", term: "Circuit switching", def: "Dành riêng một kênh từ nguồn đến đích trong suốt phiên, như cuộc gọi điện thoại; lãng phí khi không truyền." },
  { ch: "ch1", term: "FDM / TDM", def: "FDM chia kênh theo dải tần; TDM chia kênh theo khe thời gian." },
  { ch: "ch1", term: "Nodal delay", def: "Tổng trễ tại một nút = xử lý + hàng đợi + truyền (L/R) + lan truyền (d/s)." },
  { ch: "ch1", term: "Throughput", def: "Tốc độ dữ liệu thực tế truyền thành công; bị giới hạn bởi link chậm nhất trên đường đi." },
  { ch: "ch1", term: "Encapsulation", def: "Mỗi tầng bọc dữ liệu bằng header của mình: message → segment → packet → frame → bit." },
  { ch: "ch1", term: "DDoS", def: "Tấn công từ chối dịch vụ phân tán, dùng nhiều máy (botnet) đồng loạt làm quá tải mục tiêu." },

  /* CHƯƠNG 2 */
  { ch: "ch2", term: "HTTP", def: "Giao thức request–response không trạng thái, chạy trên TCP; dùng cho Web (cổng 80, HTTPS 443)." },
  { ch: "ch2", term: "Cookie", def: "Dữ liệu nhỏ server gửi qua Set-Cookie, trình duyệt lưu và gửi lại để duy trì phiên/trạng thái." },
  { ch: "ch2", term: "DNS", def: "Hệ cơ sở dữ liệu phân cấp ánh xạ tên miền thành địa chỉ IP, chạy trên UDP cổng 53." },
  { ch: "ch2", term: "Recursive query", def: "Resolver chịu trách nhiệm hỏi toàn bộ chuỗi root → TLD → authoritative và trả kết quả cuối cho client." },
  { ch: "ch2", term: "SMTP", def: "Giao thức đẩy email giữa các mail server, chạy trên TCP, nội dung 7-bit ASCII (cần MIME cho file/ảnh)." },
  { ch: "ch2", term: "IMAP", def: "Giao thức truy cập email giữ thư trên server và đồng bộ trạng thái giữa nhiều thiết bị." },
  { ch: "ch2", term: "Socket", def: "Giao diện để tiến trình gửi/nhận dữ liệu; TCP định danh bằng bộ 4 (IP/port nguồn và đích)." },
  { ch: "ch2", term: "CDN", def: "Mạng phân phối nội dung đặt bản sao ở nhiều điểm biên, giúp người dùng tải từ server gần nhất." },
  { ch: "ch2", term: "DASH", def: "Streaming thích ứng: video được chia đoạn ở nhiều mức bitrate, client chọn mức theo băng thông đo được." },

  /* CHƯƠNG 3 */
  { ch: "ch3", term: "Multiplexing / Demultiplexing", def: "Dồn kênh gắn cổng khi gửi; phân kênh đọc cổng đích để trao dữ liệu đúng socket khi nhận." },
  { ch: "ch3", term: "UDP", def: "Giao thức không kết nối, header 8 byte, không đảm bảo tin cậy, dùng cho DNS, thoại, game, QUIC." },
  { ch: "ch3", term: "Internet checksum", def: "Bù một của tổng các từ 16 bit (có wrap-around); dùng phát hiện lỗi header/dữ liệu." },
  { ch: "ch3", term: "Stop-and-Wait", def: "Gửi một gói rồi chờ ACK; hiệu suất = (L/R)/(RTT + L/R), rất thấp khi RTT lớn." },
  { ch: "ch3", term: "Go-Back-N", def: "ACK tích lũy, bỏ gói lệch thứ tự, timeout thì gửi lại cả cửa sổ; bên nhận đơn giản." },
  { ch: "ch3", term: "Selective Repeat", def: "ACK từng gói, đệm gói lệch thứ tự, timer riêng; chỉ gửi lại đúng gói mất." },
  { ch: "ch3", term: "Three-way handshake", def: "SYN → SYN+ACK → ACK, thiết lập kết nối TCP hai chiều và thống nhất số thứ tự khởi đầu." },
  { ch: "ch3", term: "rwnd", def: "Receive window — vùng đệm còn trống của bên nhận, dùng cho kiểm soát luồng (flow control)." },
  { ch: "ch3", term: "cwnd", def: "Congestion window — ước lượng sức chứa mạng, dùng cho kiểm soát tắc nghẽn; SendWindow = min(cwnd, rwnd)." },
  { ch: "ch3", term: "AIMD", def: "Additive Increase Multiplicative Decrease: mỗi RTT cộng 1 MSS, khi mất gói giảm một nửa — tạo đồ thị răng cưa." }
,

  /* CHƯƠNG 4 */
  { ch: "ch4", term: "Data plane", def: "Chức năng chuyển tiếp gói tin cục bộ tại router, tra bảng chuyển tiếp và đẩy gói ra cổng ra." },
  { ch: "ch4", term: "Control plane", def: "Chức năng tính toán đường đi toàn cục (OSPF, BGP) và điền bảng chuyển tiếp." },
  { ch: "ch4", term: "TTL", def: "Time To Live trong header IP, giảm 1 mỗi router; về 0 thì gói bị hủy, tránh vòng lặp vô hạn." },
  { ch: "ch4", term: "CIDR", def: "Ký hiệu địa chỉ kèm số bit mạng (ví dụ /24); cho phép chia/gộp dải linh hoạt thay vì theo lớp A/B/C." },
  { ch: "ch4", term: "NAT", def: "Thay IP nguồn private bằng IP công cộng và đổi cổng nguồn để nhiều máy dùng chung một IP ra Internet." },
  { ch: "ch4", term: "DHCP", def: "Cấp phát địa chỉ IP tự động theo DORA: Discover, Offer, Request, Ack; địa chỉ có thời hạn thuê." },
  { ch: "ch4", term: "Dijkstra", def: "Thuật toán tìm đường ngắn nhất trên đồ thị có trọng số, dùng trong định tuyến link-state (OSPF)." },
  { ch: "ch4", term: "BGP", def: "Giao thức định tuyến giữa các AS, dùng AS-PATH và chính sách; là xương sống định tuyến của Internet." },

  /* CHƯƠNG 5 */
  { ch: "ch5", term: "Frame", def: "Đơn vị dữ liệu tầng liên kết, gồm header (địa chỉ MAC), payload và trailer (FCS/CRC)." },
  { ch: "ch5", term: "MAC address", def: "Địa chỉ vật lý 48 bit của card mạng: 24 bit OUI nhà sản xuất + 24 bit do nhà sản xuất gán." },
  { ch: "ch5", term: "ARP", def: "Giao thức broadcast hỏi “ai có IP này?” để tìm địa chỉ MAC tương ứng trong LAN." },
  { ch: "ch5", term: "CRC", def: "Mã kiểm tra lỗi bằng phép chia modulo-2 cho đa thức sinh; Ethernet dùng CRC-32." },
  { ch: "ch5", term: "CSMA/CD", def: "Nghe trước khi gửi và phát hiện va chạm trong khi gửi; dùng cho Ethernet half-duplex có dây." },
  { ch: "ch5", term: "CSMA/CA", def: "Tránh va chạm bằng DIFS + backoff + ACK (và có thể RTS/CTS); dùng cho Wi-Fi 802.11." },
  { ch: "ch5", term: "VLAN", def: "Chia một switch vật lý thành nhiều mạng logic, mỗi VLAN có miền broadcast riêng; trunk dùng thẻ 802.1Q." },
  { ch: "ch5", term: "STP", def: "Spanning Tree Protocol khóa bớt cổng để loại vòng lặp trong mạng switch, vẫn giữ đường dự phòng." },
  { ch: "ch5", term: "Hidden terminal", def: "Hai trạm không nghe thấy nhau nhưng cùng gửi tới AP, gây va chạm; giải quyết bằng RTS/CTS." }
];
