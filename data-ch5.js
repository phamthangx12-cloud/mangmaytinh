window.MMT_CHAPTERS = window.MMT_CHAPTERS || [];
window.MMT_CHAPTERS.push({
  id: "ch5",
  label: "Chương 5",
  title: "Tầng liên kết",
  subtitle: "Frame, MAC, CRC, CSMA/CD, Ethernet, switch và Wi-Fi: chặng cuối đưa dữ liệu đến từng máy.",
  lessons: [
    {
      id: "ch5-1",
      title: "Dịch vụ tầng liên kết",
      minutes: 12,
      keywords: ["link layer", "tầng liên kết", "frame", "NIC", "framing", "error detection", "flow control", "reliable delivery", "node", "link"],
      intro: "Tầng liên kết đóng khung dữ liệu và đưa nó qua một link vật lý. Nó làm gì và không làm gì?",
      body: `
        <h2>Vị trí của tầng liên kết</h2>
        <p>Tầng liên kết nhận datagram từ tầng mạng, <b>đóng gói thành frame</b> để truyền qua một link, rồi bóc frame ở đầu bên kia và trao datagram lên tầng mạng. Nó nằm trong <b>card mạng (NIC)</b> hoặc chipset của thiết bị.</p>
        <div class="flow">
          <div class="flow-step"><b>TẦNG MẠNG</b>Datagram IP</div>
          <div class="flow-step"><b>TẦNG LIÊN KẾT</b>+ header + trailer → frame</div>
          <div class="flow-step"><b>VẬT LÝ</b>Bit trên dây/sóng</div>
          <div class="flow-step dark"><b>NÚT KẾ</b>Bóc frame, kiểm tra lỗi</div>
        </div>
        <h2>Năm dịch vụ chính</h2>
        <div class="grid-3">
          <article class="card"><h3>Framing</h3><p>Bọc dữ liệu thành frame, thêm header/trailer và đánh dấu ranh giới frame.</p></article>
          <article class="card"><h3>Link access</h3><p>Quy tắc giành quyền gửi trên link dùng chung (MAC).</p></article>
          <article class="card"><h3>Error detection</h3><p>Phát hiện lỗi bit bằng parity, checksum hoặc CRC.</p></article>
          <article class="card"><h3>Reliable delivery</h3><p>Gửi lại frame lỗi — cần cho link dễ lỗi (Wi-Fi), ít dùng cho cáp quang.</p></article>
          <article class="card"><h3>Flow control</h3><p>Ngăn bên gửi làm ngập bên nhận ở phạm vi một link.</p></article>
          <article class="card"><h3>Half/Full duplex</h3><p>Bán song công phải chia sẻ kênh; song công gửi/nhận đồng thời.</p></article>
        </div>
        <div class="callout"><b>Tầng liên kết vs tầng giao vận</b><p>Cả hai đều có thể đảm bảo tin cậy, nhưng phạm vi khác nhau: tầng liên kết chỉ đảm bảo <b>trên một link</b> (hop-by-hop), còn TCP đảm bảo <b>đầu cuối</b> (end-to-end). Một gói có thể đi qua nhiều link với nhiều giao thức liên kết khác nhau.</p></div>
        <h2>Tầng liên kết nằm ở đâu?</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Thiết bị</th><th>Xử lý tầng liên kết?</th><th>Ghi chú</th></tr></thead>
          <tbody>
            <tr><td>Host</td><td>Có</td><td>NIC đóng/mở frame, gắn địa chỉ MAC</td></tr>
            <tr><td>Switch</td><td>Có</td><td>Chuyển frame theo MAC, không mở IP</td></tr>
            <tr><td>Router</td><td>Có</td><td>Bóc frame, đọc IP, đóng frame mới cho link ra</td></tr>
            <tr><td>Hub</td><td>Không (chỉ vật lý)</td><td>Khuếch đại bit cho mọi cổng</td></tr>
          </tbody>
        </table></div>
      `,
      keyPoints: [
        "Tầng liên kết đóng gói datagram thành frame và truyền qua một link.",
        "Năm dịch vụ: framing, link access, phát hiện lỗi, tin cậy (tùy chọn), kiểm soát luồng.",
        "Tin cậy ở tầng liên kết là hop-by-hop; TCP là end-to-end.",
        "Host, switch, router đều xử lý tầng liên kết; hub thì không."
      ]
    }
,
    {
      id: "ch5-2",
      title: "Phát hiện & sửa lỗi",
      minutes: 15,
      keywords: ["parity", "checksum", "CRC", "cyclic redundancy check", "FEC", "hamming", "error detection", "phát hiện lỗi", "sửa lỗi", "ARQ"],
      intro: "Bit có thể bị lật do nhiễu. Parity, checksum và CRC giúp phát hiện lỗi; FEC và ARQ giúp khắc phục.",
      body: `
        <h2>Ba mức xử lý lỗi</h2>
        <div class="grid-3">
          <article class="card"><h3>Phát hiện</h3><p>Thêm bit dư để biết dữ liệu có lỗi hay không (parity, checksum, CRC).</p></article>
          <article class="card"><h3>Sửa (FEC)</h3><p>Thêm đủ dư để <b>tự sửa</b> một số lỗi mà không cần gửi lại (mã Hamming).</p></article>
          <article class="card"><h3>Gửi lại (ARQ)</h3><p>Phát hiện lỗi rồi yêu cầu truyền lại (dùng ở tầng liên kết/TCP).</p></article>
        </div>
        <h2>Parity đơn giản</h2>
        <p>Thêm một bit để tổng số bit 1 là chẵn (even parity) hoặc lẻ (odd parity). Ví dụ dữ liệu <code>1011001</code> có 4 bit 1 → thêm bit 0 để tổng chẵn.</p>
        <div class="callout warn"><b>Hạn chế</b><p>Parity 1 bit chỉ phát hiện được số lỗi <b>lẻ</b>. Nếu hai bit cùng lật, tổng bit 1 vẫn giữ tính chẵn lẻ và lỗi bị bỏ qua. Parity hai chiều (ma trận) phát hiện và có thể sửa được nhiều lỗi hơn.</p></div>
        <h2>Internet checksum</h2>
        <p>Chia dữ liệu thành các từ 16 bit, cộng bù một và đảo bit (đã học ở chương 3). Đơn giản, nhanh, nhưng khả năng phát hiện yếu hơn CRC.</p>
        <h2>CRC – Cyclic Redundancy Check</h2>
        <p>CRC coi chuỗi bit là đa thức nhị phân và thực hiện <b>phép chia modulo-2</b> (XOR, không mượn) cho một đa thức sinh G. Số dư chính là mã kiểm tra.</p>
        <div class="flow">
          <div class="flow-step"><b>1</b>Thêm r bit 0 vào cuối dữ liệu (r = bậc của G)</div>
          <div class="flow-step"><b>2</b>Chia modulo-2 cho G</div>
          <div class="flow-step"><b>3</b>Số dư r bit là CRC</div>
          <div class="flow-step dark"><b>4</b>Gửi dữ liệu + CRC; bên nhận chia lại, dư 0 là đúng</div>
        </div>
        <div class="widget" data-widget="crc">
          <div class="widget-head"><h3>Máy tính CRC</h3><span>Modulo-2 division</span></div>
          <div class="widget-row">
            <div class="field"><span>Dữ liệu (bit)</span><input data-crc-data value="1101011011" size="14"></div>
            <div class="field"><span>Đa thức sinh G</span><input data-crc-gen value="10011" size="9"></div>
            <button class="primary-button" data-crc-run>Tính</button>
          </div>
          <p class="hint">Ví dụ kinh điển: D = 1101011011, G = 10011 → số dư 1110. Thử đổi G để xem kết quả thay đổi.</p>
          <div class="widget-output" data-crc-out></div>
        </div>
        <div class="callout tip"><b>Vì sao CRC mạnh?</b><p>Chọn đa thức sinh tốt giúp phát hiện mọi lỗi 1 bit, mọi lỗi 2 bit, mọi chuỗi lỗi lẻ và phần lớn chuỗi lỗi dài. Ethernet dùng CRC-32, Wi-Fi dùng CRC-32; chi phí tính toán thấp nhờ mạch dịch bit.</p></div>
        <div class="callout"><b>FEC và Hamming</b><p>Mã Hamming thêm các bit kiểm tra ở vị trí lũy thừa 2 để xác định <b>vị trí bit lỗi</b> và sửa nó. FEC hữu ích khi gửi lại quá tốn kém (vệ tinh, livestream) hoặc không thể gửi lại (lưu trữ, truyền một chiều).</p></div>
      `,
      keyPoints: [
        "Parity 1 bit chỉ phát hiện lỗi lẻ; không phát hiện được 2 bit lật.",
        "CRC chia modulo-2 cho đa thức sinh, số dư là mã kiểm tra.",
        "Bên nhận chia lại toàn bộ chuỗi; dư 0 nghĩa là không lỗi.",
        "FEC tự sửa lỗi; ARQ yêu cầu gửi lại khi phát hiện lỗi."
      ]
    }
,
    {
      id: "ch5-3",
      title: "Đa truy nhập & CSMA/CD",
      minutes: 15,
      keywords: ["multiple access", "đa truy nhập", "ALOHA", "slotted ALOHA", "CSMA", "CSMA/CD", "CSMA/CA", "collision", "va chạm", "exponential backoff", "TDMA", "FDMA", "token"],
      intro: "Nhiều máy dùng chung một kênh thì phải có luật. Chia kênh, tranh ngẫu nhiên hay lần lượt?",
      body: `
        <h2>Vấn đề: va chạm</h2>
        <p>Nếu hai máy cùng gửi trên một kênh dùng chung, tín hiệu chồng lên nhau và <b>cả hai frame đều hỏng</b> — gọi là <b>va chạm (collision)</b>. Giao thức đa truy nhập quy định ai được gửi, khi nào và làm gì sau va chạm.</p>
        <div class="formula-box"><span>Hiệu suất lý thuyết</span><span class="eq">ALOHA ≈ 18% · Slotted ALOHA ≈ 37% · CSMA/CD cao hơn nhiều</span><small>Hiệu suất = tỉ lệ thời gian kênh truyền hữu ích. Càng ít va chạm, hiệu suất càng cao.</small></div>
        <h2>Ba họ giao thức</h2>
        <div class="grid-3">
          <article class="card"><h3>Chia kênh</h3><p><b>TDMA</b> chia khe thời gian, <b>FDMA</b> chia dải tần, <b>CDMA</b> chia bằng mã. Không va chạm nhưng lãng phí khi một máy im lặng.</p></article>
          <article class="card"><h3>Truy nhập ngẫu nhiên</h3><p>Không chia trước, ai có dữ liệu thì gửi, có thể va chạm rồi xử lý. ALOHA, CSMA, CSMA/CD, CSMA/CA.</p></article>
          <article class="card"><h3>Lần lượt</h3><p><b>Polling</b> (máy chủ hỏi từng máy), <b>token passing</b> (chỉ máy giữ token được gửi). Tránh va chạm nhưng có overhead.</p></article>
        </div>
        <h2>ALOHA và Slotted ALOHA</h2>
        <div class="grid-2">
          <article class="card"><h3>ALOHA (1970s)</h3><p>Gửi ngay khi có dữ liệu. Nếu va chạm, chờ ngẫu nhiên rồi gửi lại. Hiệu suất tối đa chỉ <b>18%</b> vì cửa sổ va chạm rộng (2 frame time).</p></article>
          <article class="card"><h3>Slotted ALOHA</h3><p>Chia thời gian thành khe, chỉ gửi ở đầu khe. Cửa sổ va chạm giảm một nửa, hiệu suất tăng lên <b>37%</b>.</p></article>
        </div>
        <h2>CSMA: nghe trước khi nói</h2>
        <p><b>Carrier Sense Multiple Access</b>: máy nghe kênh trước, nếu bận thì đợi. Tuy vậy vẫn có thể va chạm vì <b>trễ lan truyền</b> — hai máy có thể cùng thấy kênh trống rồi gửi cùng lúc.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Biến thể</th><th>Cơ chế</th><th>Dùng ở</th></tr></thead>
          <tbody>
            <tr><td>CSMA/CD</td><td>Nghe trong khi gửi; phát hiện va chạm thì dừng ngay, gửi tín hiệu jam, chờ backoff rồi thử lại</td><td>Ethernet có dây (half-duplex)</td></tr>
            <tr><td>CSMA/CA</td><td>Tránh va chạm: chờ khoảng DIFS, đếm lùi ngẫu nhiên, dùng ACK; có thể RTS/CTS</td><td>Wi-Fi 802.11</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Vì sao Wi-Fi dùng CA thay vì CD?</b><p>Thiết bị không dây không thể vừa phát vừa nghe tín hiệu của chính mình trên cùng anten, nên không phát hiện va chạm trực tiếp được. Vì vậy Wi-Fi <b>tránh</b> va chạm từ đầu bằng cách chờ ngẫu nhiên và xác nhận bằng ACK.</p></div>
        <h2>Exponential backoff</h2>
        <p>Sau va chạm thứ k, máy chọn ngẫu nhiên một số trong khoảng <code>[0, 2^k − 1]</code> và chờ bấy nhiêu khe thời gian. Va chạm càng nhiều, khoảng chờ càng rộng, giảm khả năng va chạm tiếp.</p>
        <div class="callout"><b>Hidden terminal</b><p>Trong Wi-Fi, hai máy có thể không nghe thấy nhau nhưng cùng nghe thấy AP, nên tưởng kênh trống và gửi đồng thời. Cơ chế <b>RTS/CTS</b> (yêu cầu gửi / sẵn sàng gửi) giúp AP thông báo cho các máy khác im lặng trong lúc truyền.</p></div>
      `,
      keyPoints: [
        "Va chạm xảy ra khi nhiều máy gửi đồng thời trên kênh chia sẻ.",
        "ALOHA hiệu suất 18%, Slotted ALOHA 37%.",
        "CSMA nghe trước khi gửi; CSMA/CD phát hiện va chạm khi đang gửi, CSMA/CA tránh từ đầu.",
        "Exponential backoff chờ ngẫu nhiên [0, 2^k − 1] khe sau va chạm thứ k."
      ]
    }
,
    {
      id: "ch5-4",
      title: "Ethernet, MAC & ARP",
      minutes: 15,
      keywords: ["ethernet", "MAC", "địa chỉ MAC", "ARP", "frame", "broadcast", "OUI", "switch", "hub", "CSMA/CD", "802.3"],
      intro: "Frame Ethernet có gì, địa chỉ MAC ra sao và ARP tìm MAC từ IP như thế nào?",
      body: `
        <h2>Frame Ethernet</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Trường</th><th>Độ dài</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>Preamble</td><td>7 byte</td><td>Đồng bộ xung nhịp giữa hai card mạng</td></tr>
            <tr><td>SFD</td><td>1 byte</td><td>Báo bắt đầu frame thật</td></tr>
            <tr><td>Destination MAC</td><td>6 byte</td><td>Địa chỉ MAC đích</td></tr>
            <tr><td>Source MAC</td><td>6 byte</td><td>Địa chỉ MAC nguồn</td></tr>
            <tr><td>Type / Length</td><td>2 byte</td><td>Loại giao thức tầng trên (0x0800 = IPv4, 0x0806 = ARP)</td></tr>
            <tr><td>Payload</td><td>46–1500 byte</td><td>Datagram IP hoặc dữ liệu khác</td></tr>
            <tr><td>FCS (CRC-32)</td><td>4 byte</td><td>Kiểm tra lỗi frame</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>MTU 1500 byte</b><p>Payload tối đa 1500 byte là lý do datagram IP lớn hơn phải bị <b>phân mảnh</b>. Frame Ethernet tối thiểu 64 byte để phát hiện va chạm kịp thời trên cáp cũ.</p></div>
        <h2>Địa chỉ MAC</h2>
        <p>MAC là địa chỉ <b>48 bit</b>, viết dạng 6 cặp hex: <code>00:1A:2B:3C:4D:5E</code>. 24 bit đầu là <b>OUI</b> (mã nhà sản xuất), 24 bit sau do nhà sản xuất gán. MAC được ghi cứng vào card mạng (có thể giả lập bằng phần mềm).</p>
        <div class="grid-3">
          <article class="card"><h3>Unicast</h3><p>Bit đầu của octet đầu = 0. Gửi cho một máy duy nhất.</p></article>
          <article class="card"><h3>Broadcast</h3><p><code>FF:FF:FF:FF:FF:FF</code>. Gửi cho mọi máy trong LAN.</p></article>
          <article class="card"><h3>Multicast</h3><p>Bit đầu = 1 (ví dụ <code>01:00:5E:…</code>). Gửi cho một nhóm máy đã đăng ký.</p></article>
        </div>
        <h2>ARP: từ IP tìm ra MAC</h2>
        <p>Khi gửi gói trong LAN, máy biết IP đích nhưng cần MAC đích để đóng frame. <b>ARP</b> giải quyết việc này:</p>
        <div class="flow">
          <div class="flow-step"><b>1 · KIỂM TRA</b>Tra bảng ARP xem đã có MAC chưa</div>
          <div class="flow-step"><b>2 · HỎI</b>Broadcast “Ai có IP 192.168.1.20?”</div>
          <div class="flow-step"><b>3 · ĐÁP</b>Máy đúng IP trả lời unicast kèm MAC của mình</div>
          <div class="flow-step dark"><b>4 · LƯU</b>Ghi vào bảng ARP (có thời hạn) rồi gửi frame</div>
        </div>
        <div class="callout"><b>Ví dụ</b><p>A (192.168.1.10) muốn gửi cho B (192.168.1.20). A broadcast ARP request; B trả lời “MAC của tôi là 00:1A:2B:3C:4D:5E”. A lưu vào bảng ARP và đóng frame với MAC đích đó. Nếu đích ở ngoài LAN, A dùng MAC của <b>gateway</b> thay vì MAC đích cuối.</p></div>
        <h2>Ethernet qua các thế hệ</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Chuẩn</th><th>Tốc độ</th><th>Ghi chú</th></tr></thead>
          <tbody>
            <tr><td>Ethernet</td><td>10 Mbps</td><td>Dùng CSMA/CD, cáp đồng trục</td></tr>
            <tr><td>Fast Ethernet</td><td>100 Mbps</td><td>Chuyển sang cáp xoắn, switch phổ biến</td></tr>
            <tr><td>Gigabit Ethernet</td><td>1 Gbps</td><td>Full-duplex, không cần CSMA/CD</td></tr>
            <tr><td>10G / 40G / 100G</td><td>10–100 Gbps</td><td>Dùng cáp quang, trung tâm dữ liệu</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Vì sao full-duplex bỏ CSMA/CD?</b><p>Khi mỗi chiều có một đường riêng (qua switch), máy không còn phải tranh kênh nên không xảy ra va chạm. Ethernet hiện đại chủ yếu chạy full-duplex, CSMA/CD chỉ còn trong các mạng half-duplex cũ.</p></div>
      `,
      keyPoints: [
        "Frame Ethernet: MAC đích/nguồn, type, payload 46–1500 byte, FCS CRC-32.",
        "MAC 48 bit: 24 bit OUI + 24 bit do nhà sản xuất gán.",
        "ARP broadcast hỏi “ai có IP này?”, nhận trả lời unicast kèm MAC.",
        "Nếu đích ngoài LAN, frame gửi tới MAC của gateway."
      ]
    }
,
    {
      id: "ch5-5",
      title: "Switch, VLAN & mạng LAN",
      minutes: 14,
      keywords: ["switch", "hub", "router", "self-learning", "forwarding table", "flooding", "collision domain", "broadcast domain", "STP", "VLAN", "802.1Q", "trunk"],
      intro: "Switch học địa chỉ MAC để chuyển frame đúng cổng. VLAN chia một switch vật lý thành nhiều mạng logic.",
      body: `
        <h2>Hub, switch, router</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Thiết bị</th><th>Tầng</th><th>Cách chuyển</th><th>Miền va chạm</th></tr></thead>
          <tbody>
            <tr><td>Hub</td><td>1</td><td>Phát lại bit ra mọi cổng</td><td>Một miền chung → dễ va chạm</td></tr>
            <tr><td>Switch</td><td>2</td><td>Chuyển frame theo MAC đích</td><td>Mỗi cổng một miền riêng</td></tr>
            <tr><td>Router</td><td>3</td><td>Chuyển packet theo IP, nối các mạng</td><td>Chia cả miền broadcast</td></tr>
          </tbody>
        </table></div>
        <h2>Switch tự học (self-learning)</h2>
        <p>Switch không cần cấu hình bảng thủ công. Nó học dần từ lưu lượng đi qua:</p>
        <div class="flow">
          <div class="flow-step"><b>1 · NHẬN</b>Frame đến cổng X, đọc MAC nguồn</div>
          <div class="flow-step"><b>2 · GHI</b>Ghi MAC nguồn ↔ cổng X vào bảng</div>
          <div class="flow-step"><b>3 · TRA</b>Tìm MAC đích trong bảng</div>
          <div class="flow-step dark"><b>4 · GỬI</b>Có thì gửi đúng cổng; không có thì <b>flood</b> mọi cổng</div>
        </div>
        <p>Mục ghi có <b>thời hạn (aging)</b>: nếu lâu không thấy MAC nguồn, switch xóa để bảng không phình mãi. Flooding chỉ xảy ra với frame chưa biết đích hoặc frame broadcast.</p>
        <div class="callout tip"><b>Miền va chạm vs miền broadcast</b><p>Mỗi cổng switch là một <b>miền va chạm</b> riêng (full-duplex nên hầu như không va chạm). Nhưng tất cả cổng trong cùng VLAN vẫn thuộc một <b>miền broadcast</b>: frame broadcast được flood ra toàn bộ. Router (hoặc VLAN) chia nhỏ miền broadcast.</p></div>
        <h2>STP: chống vòng lặp</h2>
        <p>Nếu nối các switch thành vòng để dự phòng, frame broadcast sẽ quay vòng vô hạn. <b>Spanning Tree Protocol</b> tự động khóa một số cổng để tạo cây không có vòng, đồng thời vẫn giữ đường dự phòng khi link chính hỏng.</p>
        <h2>VLAN: chia mạng logic</h2>
        <p><b>VLAN</b> cho phép tách một switch vật lý thành nhiều mạng logic độc lập, mỗi VLAN có miền broadcast riêng. Thiết bị ở VLAN khác nhau không nói chuyện trực tiếp được nếu không qua router.</p>
        <div class="grid-2">
          <article class="card"><h3>VLAN access</h3><p>Cổng access thuộc đúng một VLAN, thường nối tới máy người dùng. Frame ra khỏi cổng không có tag.</p></article>
          <article class="card"><h3>VLAN trunk</h3><p>Cổng trunk mang nhiều VLAN, gắn thẻ <b>802.1Q</b> (4 byte) vào frame để phân biệt VLAN. Thường nối giữa các switch.</p></article>
        </div>
        <div class="callout"><b>Inter-VLAN routing</b><p>Muốn VLAN 10 nói chuyện với VLAN 20 phải đi qua router (hoặc switch layer 3). Router nhận frame từ VLAN này, định tuyến IP rồi gửi sang VLAN kia — mỗi VLAN thường là một subnet riêng.</p></div>
        <div class="callout warn"><b>Rủi ro bảo mật LAN</b><p>ARP không có xác thực nên kẻ tấn công có thể gửi <b>ARP giả</b> để chen vào giữa (ARP spoofing). VLAN giúp cô lập lưu lượng, nhưng cần cấu hình đúng; lỗi <b>VLAN hopping</b> có thể cho phép nhảy VLAN. Bật port security và DHCP snooping để giảm rủi ro.</p></div>
      `,
      keyPoints: [
        "Switch chuyển frame theo MAC; hub phát mọi cổng; router nối các mạng IP.",
        "Self-learning: ghi MAC nguồn ↔ cổng, chưa biết đích thì flood.",
        "Mỗi cổng switch là một miền va chạm; VLAN chia miền broadcast.",
        "VLAN trunk dùng thẻ 802.1Q; inter-VLAN cần router/switch layer 3."
      ]
    }
,
    {
      id: "ch5-6",
      title: "Wi-Fi 802.11 & mạng không dây",
      minutes: 15,
      keywords: ["wifi", "802.11", "BSS", "AP", "SSID", "CSMA/CA", "RTS", "CTS", "hidden terminal", "2.4GHz", "5GHz", "6GHz", "WPA2", "WPA3", "bluetooth", "cellular"],
      intro: "Wi-Fi dùng CSMA/CA, ACK và RTS/CTS để tránh va chạm trong môi trường không dây đầy nhiễu và vật cản.",
      body: `
        <h2>Thành phần mạng Wi-Fi</h2>
        <div class="grid-2">
          <article class="card"><h3>BSS & AP</h3><p><b>BSS</b> (Basic Service Set) là một ô Wi-Fi do <b>AP</b> (Access Point) quản lý. Các máy trong BSS gửi dữ liệu qua AP, kể cả khi gửi cho nhau.</p></article>
          <article class="card"><h3>SSID & kênh</h3><p><b>SSID</b> là tên mạng. Wi-Fi chia dải tần thành các <b>kênh</b>; các AP gần nhau nên dùng kênh không chồng lấn (1, 6, 11 ở 2.4 GHz).</p></article>
        </div>
        <h2>CSMA/CA: tránh va chạm</h2>
        <div class="flow">
          <div class="flow-step"><b>1 · NGHE</b>Nghe kênh; bận thì chờ</div>
          <div class="flow-step"><b>2 · CHỜ DIFS</b>Kênh trống trong khoảng DIFS</div>
          <div class="flow-step"><b>3 · BACKOFF</b>Đếm lùi ngẫu nhiên thêm</div>
          <div class="flow-step dark"><b>4 · GỬI + ACK</b>Gửi frame; không nhận ACK thì gửi lại</div>
        </div>
        <p>Vì không phát hiện va chạm trực tiếp được, Wi-Fi dùng <b>ACK ở tầng liên kết</b>: mỗi frame gửi đi phải được AP xác nhận. Không có ACK nghĩa là frame mất hoặc hỏng, phải thử lại.</p>
        <h2>Vấn đề trạm ẩn & RTS/CTS</h2>
        <p><b>Hidden terminal</b>: hai máy không nghe thấy nhau nhưng cùng nghe thấy AP, nên cùng gửi và va chạm tại AP. Giải pháp là trao đổi <b>RTS/CTS</b>:</p>
        <div class="flow">
          <div class="flow-step"><b>RTS</b>Máy gửi yêu cầu gửi tới AP</div>
          <div class="flow-step"><b>CTS</b>AP trả lời “được gửi”, mọi máy khác nghe thấy và im lặng</div>
          <div class="flow-step"><b>DATA</b>Máy gửi dữ liệu</div>
          <div class="flow-step dark"><b>ACK</b>AP xác nhận</div>
        </div>
        <div class="callout tip"><b>Khi nào dùng RTS/CTS?</b><p>RTS/CTS tốn overhead nên chỉ bật khi frame lớn hoặc mạng đông đúc. Trong nhiều mạng gia đình, cơ chế backoff + ACK là đủ.</p></div>
        <h2>Các chuẩn Wi-Fi</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Chuẩn</th><th>Dải tần</th><th>Tốc độ lý thuyết</th><th>Ghi chú</th></tr></thead>
          <tbody>
            <tr><td>802.11b/g</td><td>2.4 GHz</td><td>11 / 54 Mbps</td><td>Phổ biến thời kỳ đầu, nhiều nhiễu</td></tr>
            <tr><td>802.11n (Wi-Fi 4)</td><td>2.4 / 5 GHz</td><td>600 Mbps</td><td>MIMO, băng thông rộng hơn</td></tr>
            <tr><td>802.11ac (Wi-Fi 5)</td><td>5 GHz</td><td>6.9 Gbps</td><td>MU-MIMO, kênh rộng</td></tr>
            <tr><td>802.11ax (Wi-Fi 6/6E)</td><td>2.4 / 5 / 6 GHz</td><td>9.6 Gbps</td><td>OFDMA, hiệu quả trong mạng đông</td></tr>
          </tbody>
        </table></div>
        <h2>Bảo mật Wi-Fi</h2>
        <table class="compare-table">
          <thead><tr><th>Chuẩn</th><th>Đánh giá</th></tr></thead>
          <tbody>
            <tr><td>WEP</td><td>Đã bị phá, tuyệt đối không dùng</td></tr>
            <tr><td>WPA / WPA2</td><td>WPA2-AES còn dùng được; WPA2 dễ bị tấn công offline nếu mật khẩu yếu</td></tr>
            <tr><td>WPA3</td><td>Hiện đại nhất: chống dò mật khẩu offline, mã hóa mạnh hơn</td></tr>
          </tbody>
        </table>
        <div class="callout warn"><b>Wi-Fi công cộng</b><p>Mạng Wi-Fi công cộng có thể bị nghe lén hoặc giả mạo AP (evil twin). Luôn dùng HTTPS, tránh đăng nhập tài khoản quan trọng, và cân nhắc VPN khi dùng Wi-Fi lạ.</p></div>
        <div class="callout"><b>Bluetooth & mạng di động</b><p><b>Bluetooth</b> dùng piconet, nhảy tần (FHSS), phạm vi ngắn, phù hợp tai nghe/thiết bị đeo. Mạng di động (<b>4G LTE, 5G</b>) dùng cấp phép tần số, quản lý kết nối và chuyển vùng (handover) giữa các trạm gốc — phức tạp hơn Wi-Fi nhiều.</p></div>
      `,
      keyPoints: [
        "Wi-Fi dùng CSMA/CA: nghe kênh, chờ DIFS, backoff, gửi và chờ ACK.",
        "Hidden terminal gây va chạm tại AP; RTS/CTS giải quyết.",
        "Wi-Fi 6/6E dùng 2.4/5/6 GHz, OFDMA cho mạng đông thiết bị.",
        "WEP đã bị phá; nên dùng WPA2-AES hoặc WPA3."
      ]
    }
,
    {
      id: "ch5-7",
      title: "Tổng kết: hành trình của một gói tin",
      minutes: 13,
      keywords: ["tổng kết", "end to end", "hành trình gói tin", "encapsulation thực tế", "tổng ôn", "review", "mô hình tổng thể"],
      intro: "Ghép toàn bộ 5 chương lại: chuyện gì xảy ra khi bạn gõ một địa chỉ web và nhấn Enter?",
      body: `
        <h2>Bài toán</h2>
        <p>Bạn ngồi ở máy A, gõ <code>http://www.example.com</code> và nhấn Enter. Máy A chỉ biết tên miền, chưa biết địa chỉ IP của server, chưa có kết nối TCP, và cũng chưa biết MAC của gateway. Hãy đi từng bước.</p>
        <div class="step-list">
          <div class="step-item"><div class="dot">1</div><div><b>Phân giải tên miền (Chương 2)</b><p>Trình duyệt hỏi DNS: “IP của www.example.com là gì?”. Qua resolver, root, TLD .com và máy chủ authoritative, nó nhận được IP, ví dụ 93.184.216.34. Kết quả được cache theo TTL.</p></div></div>
          <div class="step-item"><div class="dot">2</div><div><b>Quyết định đường đi (Chương 4)</b><p>Máy A so IP đích với mặt nạ mạng. Đích nằm ngoài LAN nên phải gửi cho <b>gateway</b>. Bảng định tuyến trên các router được dựng nhờ OSPF/BGP.</p></div></div>
          <div class="step-item"><div class="dot">3</div><div><b>Tìm MAC của gateway (Chương 5)</b><p>A tra bảng ARP. Chưa có thì broadcast “Ai có IP gateway?”. Gateway trả lời kèm MAC. A có đủ thông tin để đóng frame Ethernet.</p></div></div>
          <div class="step-item"><div class="dot">4</div><div><b>Bắt tay TCP (Chương 3)</b><p>A gửi SYN tới server:443/80, nhận SYN+ACK, gửi ACK. Kết nối tin cậy được thiết lập, sẵn sàng truyền byte.</p></div></div>
          <div class="step-item"><div class="dot">5</div><div><b>Yêu cầu HTTP (Chương 2)</b><p>A gửi <code>GET / HTTP/1.1</code>. Dữ liệu đi xuống: TCP gắn cổng và số thứ tự → IP gắn địa chỉ → Ethernet gắn MAC → bit ra cáp/Wi-Fi.</p></div></div>
          <div class="step-item"><div class="dot">6</div><div><b>Chuyển tiếp qua lõi mạng (Chương 1, 4)</b><p>Mỗi router bóc frame, đọc IP, tra bảng chuyển tiếp, giảm TTL, đóng frame mới cho link kế tiếp. Trễ gồm xử lý, hàng đợi, truyền và lan truyền.</p></div></div>
          <div class="step-item"><div class="dot">7</div><div><b>Server phản hồi (Chương 2, 3)</b><p>Server nhận đủ yêu cầu, trả 200 OK kèm HTML. TCP đảm bảo mọi byte đến đúng thứ tự nhờ ACK, cửa sổ và kiểm soát tắc nghẽn.</p></div></div>
          <div class="step-item"><div class="dot">8</div><div><b>Hiển thị & tải tiếp (Chương 2, 5)</b><p>Trình duyệt dựng trang, tải thêm ảnh/CSS qua kết nối persistent. CDN có thể phục vụ từ server biên gần bạn.</p></div></div>
        </div>
        <h2>Bảng tóm tắt theo tầng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Tầng</th><th>Đơn vị dữ liệu</th><th>Địa chỉ dùng</th><th>Câu hỏi cốt lõi</th></tr></thead>
          <tbody>
            <tr><td>Ứng dụng</td><td>Message</td><td>Tên miền, URL</td><td>Trao đổi nội dung gì?</td></tr>
            <tr><td>Giao vận</td><td>Segment</td><td>Cổng (port)</td><td>Tiến trình nào, có tin cậy không?</td></tr>
            <tr><td>Mạng</td><td>Datagram</td><td>Địa chỉ IP</td><td>Đi đường nào giữa các mạng?</td></tr>
            <tr><td>Liên kết</td><td>Frame</td><td>Địa chỉ MAC</td><td>Gửi qua link nào, đầu bên kia là ai?</td></tr>
            <tr><td>Vật lý</td><td>Bit</td><td>—</td><td>Tín hiệu truyền thế nào?</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Cách ôn tập hiệu quả</b><p>Với mỗi tầng, hãy tự hỏi: đơn vị dữ liệu là gì, địa chỉ dùng là gì, và cơ chế đảm bảo (nếu có) là gì. Nếu trả lời được ba câu này cho cả 5 tầng, bạn đã nắm được khung xương của môn Mạng máy tính.</p></div>
        <div class="callout"><b>Kiểm tra lại toàn khóa</b><p>Hãy vào mục <b>Luyện đề</b> để làm đề ngẫu nhiên 15–20 câu trải đều 5 chương, và dùng <b>Thẻ ghi nhớ</b> để ôn nhanh thuật ngữ trước khi thi.</p></div>
      `,
      keyPoints: [
        "Một lần mở web dùng cả 5 tầng: DNS, TCP, IP, Ethernet/Wi-Fi, vật lý.",
        "Mỗi tầng có đơn vị dữ liệu và địa chỉ riêng: message, segment, datagram, frame, bit.",
        "Router xử lý hop-by-hop; TCP đảm bảo end-to-end.",
        "Ôn tập: với mỗi tầng nhớ đơn vị dữ liệu, địa chỉ và cơ chế đảm bảo."
      ]
    }
  ]
});
