window.MMT_QUIZ = [
  /* ---------------- CHƯƠNG 1 ---------------- */
  {
    ch: "ch1",
    q: "Thiết bị nào chuyển tiếp gói tin dựa trên địa chỉ IP?",
    options: ["Hub", "Switch", "Router", "Repeater"],
    answer: 2,
    explain: "Router hoạt động ở tầng mạng (tầng 3), đọc địa chỉ IP để chọn cổng ra. Switch dùng MAC (tầng 2), hub chỉ lặp tín hiệu (tầng 1)."
  },
  {
    ch: "ch1",
    q: "Đơn vị dữ liệu (PDU) của tầng giao vận là gì?",
    options: ["Frame", "Segment", "Datagram", "Bit"],
    answer: 1,
    explain: "Tầng giao vận tạo segment; tầng mạng tạo datagram/packet; tầng liên kết tạo frame; tầng vật lý truyền bit."
  },
  {
    ch: "ch1",
    q: "Trễ truyền (transmission delay) của một gói L bit trên link tốc độ R bps là:",
    options: ["L / R", "R / L", "d / s", "L × R"],
    answer: 0,
    explain: "Thời gian đẩy toàn bộ L bit lên link là L/R. Còn d/s là trễ lan truyền, phụ thuộc khoảng cách và tốc độ sóng."
  },
  {
    ch: "ch1",
    q: "Đại lượng La/R trong mô hình hàng đợi được gọi là gì?",
    options: ["Thông lượng", "Cường độ lưu lượng", "Băng thông", "RTT"],
    answer: 1,
    explain: "La/R là cường độ lưu lượng (traffic intensity). Khi tiến gần 1, trễ hàng đợi tăng vọt; vượt 1 thì hàng đợi đầy và mất gói."
  },
  {
    ch: "ch1",
    q: "Ưu điểm chính của chuyển mạch gói so với chuyển mạch kênh là gì?",
    options: ["Đảm bảo băng thông tuyệt đối", "Không cần địa chỉ đích", "Tận dụng băng thông nhờ ghép kênh thống kê", "Không bao giờ mất gói"],
    answer: 2,
    explain: "Chuyển mạch gói chia sẻ đường truyền theo nhu cầu (statistical multiplexing), nên phục vụ được nhiều người hơn khi lưu lượng bùng nổ."
  },
  {
    ch: "ch1",
    q: "Trong mô hình OSI, tầng nào đóng frame và dùng địa chỉ MAC?",
    options: ["Network", "Data Link", "Transport", "Session"],
    answer: 1,
    explain: "Tầng liên kết dữ liệu (Data Link) đóng gói frame và dùng địa chỉ MAC để truyền trên một link."
  },
  {
    ch: "ch1",
    q: "Cổng 53412 thuộc nhóm cổng nào?",
    options: ["Well-known", "Registered", "Ephemeral", "System"],
    answer: 2,
    explain: "Cổng ephemeral (tạm thời) nằm trong khoảng 49152–65535, thường do client tự chọn cho kết nối ra."
  },
  {
    ch: "ch1",
    q: "Ba yếu tố cấu thành một giao thức mạng là:",
    options: ["Cú pháp, ngữ nghĩa, đồng bộ", "IP, MAC, port", "TCP, UDP, IP", "Client, server, socket"],
    answer: 0,
    explain: "Giao thức quy định cú pháp (định dạng), ngữ nghĩa (ý nghĩa trường) và đồng bộ (thời điểm gửi/nhận)."
  },

  /* ---------------- CHƯƠNG 2 ---------------- */
  {
    ch: "ch2",
    q: "HTTP mặc định dùng cổng nào?",
    options: ["21", "53", "80", "443"],
    answer: 2,
    explain: "HTTP dùng cổng 80; HTTPS (HTTP qua TLS) dùng cổng 443."
  },
  {
    ch: "ch2",
    q: "Bản ghi DNS nào xác định mail server của một miền?",
    options: ["A", "CNAME", "MX", "NS"],
    answer: 2,
    explain: "MX (Mail eXchange) chỉ ra mail server. A ánh xạ tên→IPv4, CNAME là bí danh, NS là name server của miền."
  },
  {
    ch: "ch2",
    q: "DNS thường chạy trên giao thức và cổng nào?",
    options: ["TCP cổng 80", "UDP cổng 53", "TCP cổng 25", "UDP cổng 67"],
    answer: 1,
    explain: "Truy vấn DNS thông thường dùng UDP cổng 53 để nhanh và nhẹ; TCP 53 dùng cho truy vấn lớn hoặc chuyển vùng."
  },
  {
    ch: "ch2",
    q: "SMTP là giao thức hoạt động theo mô hình nào?",
    options: ["Pull (kéo) từ server", "Push (đẩy) giữa các mail server", "Broadcast trong LAN", "Multicast theo nhóm"],
    answer: 1,
    explain: "SMTP đẩy thư từ client tới server và giữa các mail server. Người dùng nhận thư bằng POP3/IMAP (pull)."
  },
  {
    ch: "ch2",
    q: "Điểm khác biệt chính giữa IMAP và POP3 là gì?",
    options: ["IMAP mã hóa, POP3 không", "IMAP giữ thư trên server và đồng bộ nhiều thiết bị", "POP3 chỉ dùng cho webmail", "IMAP dùng UDP"],
    answer: 1,
    explain: "IMAP giữ thư trên server, đồng bộ trạng thái đọc/xóa giữa nhiều thiết bị. POP3 thường tải thư về máy và xóa trên server."
  },
  {
    ch: "ch2",
    q: "HTTP vốn không trạng thái. Cơ chế nào giúp duy trì phiên đăng nhập?",
    options: ["Cookie", "Checksum", "Fragment", "TTL"],
    answer: 0,
    explain: "Cookie được server gửi kèm Set-Cookie, trình duyệt lưu lại và gửi trong các request sau để server nhận ra phiên."
  },
  {
    ch: "ch2",
    q: "FTP dùng kết nối điều khiển ở cổng nào?",
    options: ["20", "21", "22", "25"],
    answer: 1,
    explain: "Cổng 21 là kết nối điều khiển (lệnh, trạng thái); cổng 20 là kết nối dữ liệu (chế độ active)."
  },
  {
    ch: "ch2",
    q: "Mục đích chính của CDN là gì?",
    options: ["Mã hóa nội dung", "Đưa bản sao nội dung tới gần người dùng để giảm trễ và tải server gốc", "Thay thế DNS", "Nén video"],
    answer: 1,
    explain: "CDN đặt bản sao nội dung ở nhiều điểm biên; DNS redirection/chọn server gần giúp giảm trễ và giảm tải cho server gốc."
  }
,

  /* ---------------- CHƯƠNG 3 ---------------- */
  {
    ch: "ch3",
    q: "Header của UDP có độ dài bao nhiêu?",
    options: ["4 byte", "8 byte", "16 byte", "20 byte"],
    answer: 1,
    explain: "Header UDP gồm 4 trường 16 bit: port nguồn, port đích, độ dài, checksum → 8 byte."
  },
  {
    ch: "ch3",
    q: "Checksum Internet (UDP/TCP) được tính theo phương pháp nào?",
    options: ["CRC-32", "Parity chẵn", "Bù một của tổng các từ 16 bit có wrap-around", "Mã Hamming"],
    answer: 2,
    explain: "Cộng các từ 16 bit, cộng phần tràn ngược lại, rồi đảo bit để được checksum. Bên nhận cộng cả checksum, kết quả 0 là không lỗi."
  },
  {
    ch: "ch3",
    q: "Trong Go-Back-N, khi bên nhận nhận được gói sai thứ tự thì làm gì?",
    options: ["Đệm lại và chờ", "Bỏ gói và gửi ACK cho gói cuối đúng thứ tự", "Yêu cầu gửi lại riêng gói đó", "Đóng kết nối"],
    answer: 1,
    explain: "GBN không đệm gói lệch thứ tự; nó bỏ gói đó và lặp lại ACK của gói cuối cùng đúng thứ tự, buộc bên gửi gửi lại cả cửa sổ."
  },
  {
    ch: "ch3",
    q: "Điểm mạnh của Selective Repeat so với Go-Back-N là gì?",
    options: ["Bên nhận đơn giản hơn", "Không cần số thứ tự", "Chỉ gửi lại đúng gói bị mất", "Không cần ACK"],
    answer: 2,
    explain: "SR đệm gói đến lệch thứ tự và dùng timer riêng từng gói, nên chỉ truyền lại gói mất — tiết kiệm băng thông."
  },
  {
    ch: "ch3",
    q: "Thứ tự đúng của bắt tay ba bước TCP là:",
    options: ["ACK → SYN → SYN+ACK", "SYN → SYN+ACK → ACK", "SYN → ACK → FIN", "FIN → ACK → SYN"],
    answer: 1,
    explain: "Client gửi SYN, server trả SYN+ACK, client trả ACK. Sau ba bước kết nối được thiết lập hai chiều."
  },
  {
    ch: "ch3",
    q: "Nếu TCP nhận được ACK với số xác nhận = 1000, điều đó nghĩa là:",
    options: ["Đã mất 1000 byte", "Đã nhận đủ 1000 byte đầu và đang chờ byte thứ 1000", "Cần gửi lại byte 1000", "Cửa sổ bằng 1000 byte"],
    answer: 1,
    explain: "Số ACK là byte kế tiếp mong đợi. ack = 1000 xác nhận mọi byte trước đó (0–999) đã nhận đúng."
  },
  {
    ch: "ch3",
    q: "TCP kích hoạt truyền lại nhanh (fast retransmit) khi nào?",
    options: ["Sau timeout đầu tiên", "Khi nhận 3 ACK trùng", "Khi nhận SYN", "Khi cửa sổ đầy"],
    answer: 1,
    explain: "Ba ACK trùng là dấu hiệu mạnh cho thấy một gói đã mất, nên TCP truyền lại ngay mà không đợi hết timeout."
  },
  {
    ch: "ch3",
    q: "Trong pha slow start, cwnd thay đổi thế nào?",
    options: ["Cộng 1 MSS mỗi RTT", "Nhân đôi mỗi RTT", "Giữ nguyên", "Giảm một nửa mỗi RTT"],
    answer: 1,
    explain: "Slow start tăng theo cấp số nhân: mỗi RTT cwnd tăng gấp đôi, đến khi đạt ssthresh thì chuyển sang congestion avoidance (cộng 1 MSS mỗi RTT)."
  },

  /* ---------------- CHƯƠNG 4 ---------------- */
  {
    ch: "ch4",
    q: "Chức năng 'forwarding' (chuyển tiếp) thuộc về:",
    options: ["Control plane", "Data plane", "Tầng ứng dụng", "Tầng vật lý"],
    answer: 1,
    explain: "Forwarding là hành động cục bộ tại router (data plane), tra bảng chuyển tiếp để đưa gói ra cổng phù hợp. Routing (tính đường) thuộc control plane."
  },
  {
    ch: "ch4",
    q: "Trường TTL trong header IPv4 thay đổi thế nào khi đi qua mỗi router?",
    options: ["Tăng 1", "Giữ nguyên", "Giảm 1", "Đặt lại bằng 0"],
    answer: 2,
    explain: "Mỗi router giảm TTL đi 1. Khi TTL về 0, gói bị hủy và router gửi ICMP time exceeded — cơ chế traceroute khai thác."
  },
  {
    ch: "ch4",
    q: "Địa chỉ nào sau đây là địa chỉ private?",
    options: ["8.8.8.8", "127.0.0.1", "192.168.1.1", "224.0.0.1"],
    answer: 2,
    explain: "192.168.0.0/16 thuộc dải private (cùng 10/8 và 172.16/12). 127.0.0.1 là loopback, 224.0.0.1 là multicast."
  },
  {
    ch: "ch4",
    q: "Một subnet /26 có bao nhiêu địa chỉ IP dùng được cho host?",
    options: ["64", "62", "32", "30"],
    answer: 1,
    explain: "/26 có 2^(32−26) = 64 địa chỉ; trừ địa chỉ mạng và broadcast còn 62 host dùng được."
  },
  {
    ch: "ch4",
    q: "Thứ tự đúng của quá trình DHCP (DORA) là:",
    options: ["Discover → Offer → Request → Ack", "Offer → Discover → Ack → Request", "Request → Ack → Discover → Offer", "Ack → Request → Offer → Discover"],
    answer: 0,
    explain: "Client broadcast Discover, server trả Offer, client gửi Request xin địa chỉ, server trả Ack xác nhận kèm thời hạn thuê."
  },
  {
    ch: "ch4",
    q: "Thuật toán nào được dùng trong giao thức định tuyến link-state?",
    options: ["Bellman-Ford", "Dijkstra", "Leaky bucket", "Token bucket"],
    answer: 1,
    explain: "Link-state (như OSPF) cho mỗi router có bản đồ đầy đủ rồi chạy Dijkstra. Distance-vector dùng Bellman-Ford."
  },
  {
    ch: "ch4",
    q: "Giao thức nào định tuyến giữa các hệ tự trị (AS) khác nhau?",
    options: ["OSPF", "RIP", "BGP", "ARP"],
    answer: 2,
    explain: "BGP là giao thức định tuyến liên miền (EGP), dùng AS-PATH và chính sách để chọn tuyến giữa các AS."
  },
  {
    ch: "ch4",
    q: "Công cụ traceroute/tracert hoạt động dựa trên cơ chế nào?",
    options: ["TTL tăng dần và ICMP time exceeded", "Phân mảnh gói tin", "NAT", "DHCP Discover"],
    answer: 0,
    explain: "Traceroute gửi gói với TTL lần lượt 1, 2, 3…; mỗi router hủy gói và trả ICMP time exceeded, nhờ đó lộ ra từng chặng."
  }
,

  /* ---------------- CHƯƠNG 5 ---------------- */
  {
    ch: "ch5",
    q: "Frame Ethernet dùng loại mã kiểm tra lỗi nào ở cuối frame?",
    options: ["Parity 1 bit", "CRC-32", "Checksum bù một", "Mã Hamming"],
    answer: 1,
    explain: "Trường FCS 4 byte ở cuối frame Ethernet chứa CRC-32, tính trên toàn bộ frame."
  },
  {
    ch: "ch5",
    q: "Địa chỉ MAC có độ dài bao nhiêu bit?",
    options: ["32 bit", "48 bit", "64 bit", "128 bit"],
    answer: 1,
    explain: "MAC là 48 bit, viết dạng 6 cặp hex. 24 bit đầu là OUI của nhà sản xuất, 24 bit sau do nhà sản xuất gán."
  },
  {
    ch: "ch5",
    q: "ARP request được gửi theo kiểu nào trong LAN?",
    options: ["Unicast tới gateway", "Broadcast tới mọi máy", "Multicast tới router", "Anycast tới DNS"],
    answer: 1,
    explain: "ARP request là broadcast (FF:FF:FF:FF:FF:FF) để hỏi “ai có IP này?”; máy đúng IP trả lời unicast kèm MAC của mình."
  },
  {
    ch: "ch5",
    q: "Khi switch nhận frame có MAC đích chưa có trong bảng chuyển tiếp, nó làm gì?",
    options: ["Hủy frame", "Gửi trả lại cổng nguồn", "Flood ra tất cả cổng trừ cổng nhận", "Gửi tới router"],
    answer: 2,
    explain: "Switch flood frame chưa biết đích ra mọi cổng (trừ cổng nhận). Khi nhận được phản hồi, nó học được MAC đích và các frame sau chỉ gửi đúng cổng."
  },
  {
    ch: "ch5",
    q: "Giao thức nào được Wi-Fi 802.11 sử dụng để giành quyền truyền?",
    options: ["CSMA/CD", "CSMA/CA", "Token passing", "TDMA"],
    answer: 1,
    explain: "Wi-Fi dùng CSMA/CA (tránh va chạm) vì thiết bị không thể vừa phát vừa nghe để phát hiện va chạm như CSMA/CD trên cáp."
  },
  {
    ch: "ch5",
    q: "Hiệu suất tối đa lý thuyết của ALOHA thuần là bao nhiêu?",
    options: ["37%", "18%", "50%", "100%"],
    answer: 1,
    explain: "ALOHA đạt tối đa khoảng 18%; Slotted ALOHA tăng lên khoảng 37% nhờ chia khe thời gian."
  },
  {
    ch: "ch5",
    q: "Thẻ VLAN 802.1Q được dùng trong trường hợp nào?",
    options: ["Cổng access", "Cổng trunk mang nhiều VLAN", "Kết nối Wi-Fi", "Địa chỉ MAC broadcast"],
    answer: 1,
    explain: "Cổng trunk gắn thẻ 802.1Q (4 byte) vào frame để phân biệt frame thuộc VLAN nào khi đi qua link dùng chung giữa các switch."
  },
  {
    ch: "ch5",
    q: "Cơ chế nào giúp giải quyết vấn đề trạm ẩn (hidden terminal) trong Wi-Fi?",
    options: ["CSMA/CD", "RTS/CTS", "DHCP", "NAT"],
    answer: 1,
    explain: "RTS/CTS: máy gửi RTS, AP trả CTS khiến mọi trạm khác trong vùng nghe thấy và im lặng, tránh va chạm tại AP."
  }
];
