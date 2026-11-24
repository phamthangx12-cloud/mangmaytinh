window.MMT_CHAPTERS = window.MMT_CHAPTERS || [];
window.MMT_CHAPTERS.push({
  id: "ch4",
  label: "Chương 4",
  title: "Tầng mạng",
  subtitle: "Địa chỉ IP, chuyển tiếp và định tuyến: đưa gói tin từ máy này đến máy khác trên toàn cầu.",
  lessons: [
    {
      id: "ch4-1",
      title: "Data plane & control plane",
      minutes: 12,
      keywords: ["data plane", "control plane", "forwarding", "routing", "chuyển tiếp", "định tuyến", "SDN", "match plus action", "FIB", "best effort"],
      intro: "Tầng mạng có hai chức năng: chuyển tiếp gói tin nhanh (data plane) và tính toán đường đi (control plane).",
      body: `
        <div class="grid-2">
          <article class="card">
            <span class="mini-label">DATA PLANE</span>
            <h2>Chuyển tiếp (forwarding)</h2>
            <p>Việc <b>cục bộ</b> tại mỗi router: nhìn gói tin đến, tra bảng để chọn cổng ra, chuyển đi ngay. Diễn ra trong phần cứng, cỡ nano giây.</p>
            <div class="pill-row"><span class="pill">Tra bảng FIB</span><span class="pill green">Match + action</span><span class="pill grey">Rất nhanh</span></div>
          </article>
          <article class="card tint">
            <span class="mini-label">CONTROL PLANE</span>
            <h2>Định tuyến (routing)</h2>
            <p>Việc <b>toàn cục</b>: xác định đường đi tốt nhất từ nguồn đến đích và điền vào bảng chuyển tiếp. Chạy bằng phần mềm, thời gian giây đến phút.</p>
            <div class="pill-row"><span class="pill">Thuật toán Dijkstra</span><span class="pill green">Bellman-Ford</span><span class="pill amber">BGP</span></div>
          </article>
        </div>
        <div class="callout tip"><b>Phép loại suy</b><p>Data plane giống người soát vé ở ngã ba chỉ đường cho từng xe dựa trên bản đồ sẵn có; control plane giống người vẽ bản đồ quyết định nên chỉ đi đâu. Hai việc tách bạch giúp chuyển tiếp nhanh mà vẫn linh hoạt.</p></div>
        <h2>Hai cách tổ chức control plane</h2>
        <div class="grid-2">
          <article class="card"><h3>Truyền thống (per-router)</h3><p>Mỗi router tự chạy thuật toán định tuyến, <b>trao đổi thông tin với router láng giềng</b>, rồi tự điền bảng của mình. Ví dụ OSPF, BGP.</p></article>
          <article class="card"><h3>SDN (điều khiển tập trung)</h3><p>Một <b>bộ điều khiển trung tâm</b> tính toán và cài đặt bảng chuyển tiếp cho mọi switch qua giao thức như OpenFlow. Tách biệt hoàn toàn điều khiển khỏi chuyển tiếp.</p></article>
        </div>
        <h2>Mô hình dịch vụ của IP</h2>
        <p>Tầng mạng Internet (IP) cung cấp dịch vụ <b>best-effort</b>: cố gắng hết sức nhưng <b>không đảm bảo</b> băng thông, độ trễ, thứ tự hay không mất gói. Mọi đảm bảo (nếu cần) phải do tầng giao vận (TCP) hoặc ứng dụng lo.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Đảm bảo</th><th>IP best-effort</th><th>Ví dụ dịch vụ lý thuyết khác</th></tr></thead>
          <tbody>
            <tr><td>Băng thông</td><td>Không</td><td>CBR (constant bit rate)</td></tr>
            <tr><td>Mất gói</td><td>Không</td><td>Đảm bảo 0 mất gói</td></tr>
            <tr><td>Thứ tự</td><td>Không</td><td>Đảm bảo đúng thứ tự</td></tr>
            <tr><td>Độ trễ</td><td>Không</td><td>Giới hạn trễ tối đa</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><b>Vì sao IP đơn giản?</b><p>Giữ tầng mạng tối giản giúp Internet mở rộng được toàn cầu với chi phí thấp; những gì cần đảm bảo được đẩy lên tầng trên. Đây là triết lý “smart edge, dumb core”.</p></div>
      `,
      keyPoints: [
        "Forwarding (data plane) là chuyển tiếp cục bộ; routing (control plane) là tính đường đi toàn cục.",
        "Control plane truyền thống chạy trên từng router; SDN tập trung ở bộ điều khiển.",
        "IP là dịch vụ best-effort, không đảm bảo băng thông, trễ, thứ tự hay mất gói.",
        "Match + action: so khớp trường header rồi thực hiện hành động chuyển tiếp."
      ]
    }
,
    {
      id: "ch4-2",
      title: "Bên trong router",
      minutes: 13,
      keywords: ["router", "switching fabric", "input port", "output port", "HOL blocking", "queueing", "scheduling", "FIFO", "priority", "round robin", "WFQ", "crossbar"],
      intro: "Một router gồm những gì? Cổng vào, cổng ra, kết cấu chuyển mạch và cách xử lý hàng đợi, lập lịch gửi gói.",
      body: `
        <h2>Bốn bộ phận của router</h2>
        <div class="grid-2">
          <article class="card"><h3>Cổng vào (input port)</h3><p>Nhận gói, kết thúc tầng vật lý và liên kết, <b>tra bảng chuyển tiếp</b> để biết gói sẽ đi ra cổng nào, rồi đưa vào kết cấu chuyển mạch.</p></article>
          <article class="card"><h3>Kết cấu chuyển mạch</h3><p>Nối các cổng vào với cổng ra. Tốc độ ở đây quyết định thông lượng của cả router.</p></article>
          <article class="card"><h3>Cổng ra (output port)</h3><p>Xếp gói vào hàng đợi, <b>lập lịch</b> gửi lên link ra.</p></article>
          <article class="card"><h3>Bộ xử lý định tuyến</h3><p>Chạy giao thức định tuyến, duy trì bảng định tuyến, điền bảng chuyển tiếp.</p></article>
        </div>
        <h2>Ba kiểu kết cấu chuyển mạch</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Kiểu</th><th>Cách hoạt động</th><th>Đặc điểm</th></tr></thead>
          <tbody>
            <tr><td>Memory (bộ nhớ)</td><td>Gói chép qua bộ nhớ dùng chung</td><td>Chậm, mỗi gói đọc/ghi 2 lần</td></tr>
            <tr><td>Bus</td><td>Gói đi trên bus dùng chung</td><td>Mỗi lần chỉ 1 gói, tốc độ bus là nút cổ chai</td></tr>
            <tr><td>Crossbar</td><td>Ma trận điểm nối, bật đường riêng</td><td>Có thể truyền song song nhiều gói, nhanh nhất</td></tr>
          </tbody>
        </table></div>
        <h2>Hàng đợi và nghẽn HOL</h2>
        <div class="grid-2">
          <article class="card"><h3>Hàng đợi ở cổng vào</h3><p>Nếu nhiều gói cùng muốn ra một cổng, gói đầu hàng chặn các gói sau — <b>Head-of-Line (HOL) blocking</b>. Một gói nghẽn làm cả hàng đợi phía sau trì trệ.</p></article>
          <article class="card"><h3>Hàng đợi ở cổng ra</h3><p>Khi gói đến nhanh hơn link ra xử lý được. Bộ đệm đầy thì gói bị <b>drop</b> (tail drop) hoặc loại bỏ sớm ngẫu nhiên (RED).</p></article>
        </div>
        <h2>Lập lịch gửi gói</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Thuật toán</th><th>Quy tắc</th><th>Ưu điểm</th></tr></thead>
          <tbody>
            <tr><td>FIFO</td><td>Đến trước gửi trước</td><td>Đơn giản, công bằng theo thời gian đến</td></tr>
            <tr><td>Priority</td><td>Hàng đợi ưu tiên cao gửi trước</td><td>Đảm bảo lưu lượng quan trọng (thoại) được ưu tiên</td></tr>
            <tr><td>Round Robin</td><td>Lần lượt phục vụ từng lớp</td><td>Công bằng, không bỏ đói lớp nào</td></tr>
            <tr><td>WFQ</td><td>Cân theo trọng số</td><td>Vừa ưu tiên vừa đảm bảo mỗi lớp được một phần</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><b>Kích thước bộ đệm</b><p>Quy tắc kinh điển: bộ đệm = RTT × tốc độ link (bandwidth-delay product). Bộ đệm quá lớn gây hiện tượng <b>bufferbloat</b> — trễ cao nhưng không lỗi, làm hỏng trải nghiệm thời gian thực. Các thiết kế mới dùng bộ đệm nhỏ hơn kết hợp AQM.</p></div>
      `,
      keyPoints: [
        "Router gồm cổng vào, kết cấu chuyển mạch, cổng ra và bộ xử lý định tuyến.",
        "Crossbar cho phép nhiều gói truyền song song, nhanh hơn memory và bus.",
        "HOL blocking: gói đầu hàng chặn các gói sau khi cùng đích ra.",
        "Lập lịch: FIFO, priority, round robin, WFQ (cân theo trọng số)."
      ]
    }
,
    {
      id: "ch4-3",
      title: "IPv4 datagram & địa chỉ IP",
      minutes: 15,
      keywords: ["ipv4", "datagram", "header", "TTL", "protocol", "fragmentation", "địa chỉ IP", "classful", "private", "loopback", "CIDR", "subnet mask"],
      intro: "Gói IP có cấu trúc gì, địa chỉ IPv4 được viết ra sao và các dải địa chỉ đặc biệt cần nhớ.",
      body: `
        <h2>Header IPv4 (20 byte tối thiểu)</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Trường</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>Version</td><td>Phiên bản IP (4 với IPv4)</td></tr>
            <tr><td>Header length</td><td>Độ dài header tính theo đơn vị 4 byte</td></tr>
            <tr><td>Total length</td><td>Độ dài cả datagram (header + dữ liệu)</td></tr>
            <tr><td>Identification / Flags / Fragment offset</td><td>Phục vụ phân mảnh và ghép lại datagram</td></tr>
            <tr><td>TTL</td><td>Số chặng còn lại; mỗi router giảm 1, về 0 thì hủy gói và gửi ICMP</td></tr>
            <tr><td>Protocol</td><td>Giao thức tầng trên: 6 = TCP, 17 = UDP, 1 = ICMP</td></tr>
            <tr><td>Header checksum</td><td>Kiểm tra lỗi header (mỗi router phải tính lại vì TTL đổi)</td></tr>
            <tr><td>Source / Destination IP</td><td>Địa chỉ nguồn và đích (32 bit mỗi trường)</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>TTL để làm gì?</b><p>TTL ngăn gói tin kẹt vô hạn khi bảng định tuyến có vòng lặp. <code>traceroute</code> lợi dụng cơ chế này: gửi gói với TTL tăng dần để phát hiện từng router trên đường.</p></div>
        <h2>Địa chỉ IPv4</h2>
        <p>IPv4 dùng <b>32 bit</b>, thường viết dạng <b>dotted decimal</b>: bốn số 0–255 cách nhau bởi dấu chấm, ví dụ <code>192.168.1.10</code>. Mỗi số là 8 bit (octet).</p>
        <div class="formula-box"><span>Một địa chỉ</span><span class="eq">192 . 168 . 1 . 10</span><small>Tương đương nhị phân: 11000000.10101000.00000001.00001010 → 32 bit.</small></div>
        <h2>Địa chỉ classful (kinh điển)</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Lớp</th><th>Bit đầu</th><th>Dải địa chỉ</th><th>Mặt nạ mặc định</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>0…</td><td>0.0.0.0 – 127.255.255.255</td><td>/8 (255.0.0.0)</td></tr>
            <tr><td>B</td><td>10…</td><td>128.0.0.0 – 191.255.255.255</td><td>/16 (255.255.0.0)</td></tr>
            <tr><td>C</td><td>110…</td><td>192.0.0.0 – 223.255.255.255</td><td>/24 (255.255.255.0)</td></tr>
            <tr><td>D</td><td>1110…</td><td>224.0.0.0 – 239.255.255.255</td><td>Multicast</td></tr>
            <tr><td>E</td><td>1111…</td><td>240.0.0.0 – 255.255.255.255</td><td>Dự phòng</td></tr>
          </tbody>
        </table></div>
        <h2>Địa chỉ đặc biệt cần nhớ</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Dải</th><th>Vai trò</th></tr></thead>
          <tbody>
            <tr><td>10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16</td><td><b>Private</b> — chỉ dùng trong mạng nội bộ, cần NAT để ra Internet</td></tr>
            <tr><td>127.0.0.0/8</td><td><b>Loopback</b> — 127.0.0.1 là “localhost”, gói không ra khỏi máy</td></tr>
            <tr><td>169.254.0.0/16</td><td><b>Link-local</b> (APIPA) khi DHCP không trả lời</td></tr>
            <tr><td>0.0.0.0</td><td>Địa chỉ “không xác định”, dùng khi chưa có IP hoặc làm tuyến mặc định</td></tr>
            <tr><td>255.255.255.255</td><td>Broadcast giới hạn trong mạng cục bộ</td></tr>
          </tbody>
        </table></div>
        <h2>CIDR & mặt nạ mạng</h2>
        <p><b>CIDR</b> (Classless Inter-Domain Routing) viết địa chỉ kèm số bit mạng, ví dụ <code>192.168.1.0/24</code>: 24 bit đầu là phần mạng, 8 bit còn lại là phần host.</p>
        <div class="grid-2">
          <article class="card"><h3>Mặt nạ mạng</h3><p>/24 ↔ <code>255.255.255.0</code>. Bit 1 ở phần mạng, bit 0 ở phần host. AND địa chỉ với mặt nạ cho ra địa chỉ mạng.</p></article>
          <article class="card"><h3>Vì sao cần CIDR?</h3><p>Cho phép chia nhỏ hoặc gộp dải địa chỉ linh hoạt, thay vì bị giới hạn bởi lớp A/B/C. Giúp tiết kiệm IPv4 và định tuyến gọn hơn.</p></article>
        </div>
        <div class="callout"><b>Địa chỉ mạng và broadcast</b><p>Trong một subnet, địa chỉ có phần host <b>toàn 0</b> là địa chỉ mạng (không gán cho máy), phần host <b>toàn 1</b> là địa chỉ broadcast. Vì vậy subnet /24 có 256 địa chỉ nhưng chỉ dùng được 254 cho host.</p></div>
      `,
      keyPoints: [
        "Header IPv4 tối thiểu 20 byte; TTL giảm 1 mỗi router, protocol 6 = TCP, 17 = UDP.",
        "IPv4 là 32 bit, viết dạng 4 octet thập phân.",
        "Private: 10/8, 172.16/12, 192.168/16; loopback 127/8.",
        "CIDR /n: n bit mạng; địa chỉ mạng có host toàn 0, broadcast có host toàn 1."
      ]
    }
,
    {
      id: "ch4-4",
      title: "Subnetting, DHCP, NAT & IPv6",
      minutes: 16,
      keywords: ["subnet", "subnetting", "chia mạng", "DHCP", "DORA", "NAT", "port forwarding", "IPv6", "dual stack", "tunneling", "SLAAC", "broadcast"],
      intro: "Chia một dải địa chỉ thành nhiều subnet, cấp phát tự động bằng DHCP, chia sẻ một IP công cộng bằng NAT và bước chuyển sang IPv6.",
      body: `
        <h2>Subnetting: chia mạng con</h2>
        <p>Mượn bit từ phần host để tạo thêm subnet. Ví dụ chia <code>192.168.1.0/24</code> thành 4 subnet bằng cách mượn 2 bit → prefix <b>/26</b>:</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Subnet /26</th><th>Dải địa chỉ</th><th>Host dùng được</th></tr></thead>
          <tbody>
            <tr><td>192.168.1.0</td><td>.0 – .63</td><td>.1 – .62 (62 host)</td></tr>
            <tr><td>192.168.1.64</td><td>.64 – .127</td><td>.65 – .126 (62 host)</td></tr>
            <tr><td>192.168.1.128</td><td>.128 – .191</td><td>.129 – .190 (62 host)</td></tr>
            <tr><td>192.168.1.192</td><td>.192 – .255</td><td>.193 – .254 (62 host)</td></tr>
          </tbody>
        </table></div>
        <div class="formula-box"><span>Số host dùng được</span><span class="eq">2<sup>(32 − prefix)</sup> − 2</span><small>Trừ 2 vì mất địa chỉ mạng (host toàn 0) và broadcast (host toàn 1). /26 → 2^6 − 2 = 62.</small></div>
        <div class="widget" data-widget="subnet">
          <div class="widget-head"><h3>Máy tính subnet IPv4</h3><span>CIDR Calculator</span></div>
          <div class="widget-row">
            <div class="field"><span>Địa chỉ IPv4</span><input data-subnet-ip value="192.168.1.130" size="18"></div>
            <div class="field"><span>Prefix (/n)</span><input data-subnet-prefix type="number" value="26" min="0" max="32" style="width:90px"></div>
            <button class="primary-button" data-subnet-run>Tính</button>
          </div>
          <p class="hint">Thử đổi prefix để xem địa chỉ mạng, broadcast và số host thay đổi thế nào.</p>
          <div class="widget-output" data-subnet-out></div>
        </div>
        <h2>DHCP: cấp phát địa chỉ tự động</h2>
        <p>Thay vì gán IP thủ công, DHCP cấp động IP, mặt nạ, gateway, DNS cho thiết bị khi tham gia mạng. Quá trình gồm bốn bước <b>DORA</b>:</p>
        <div class="flow">
          <div class="flow-step"><b>D · DISCOVER</b>Client phát broadcast “có DHCP nào không?”</div>
          <div class="flow-step"><b>O · OFFER</b>Server đề nghị một địa chỉ</div>
          <div class="flow-step"><b>R · REQUEST</b>Client xin chính thức địa chỉ đó</div>
          <div class="flow-step dark"><b>A · ACK</b>Server xác nhận, kèm thời hạn thuê (lease)</div>
        </div>
        <h2>NAT: nhiều máy dùng chung một IP công cộng</h2>
        <p>Router NAT thay <b>IP nguồn private</b> bằng IP công cộng của mình và đổi <b>cổng nguồn</b> để phân biệt các kết nối. Khi có phản hồi, router tra bảng NAT để trả về đúng máy.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Trước NAT</th><th>Sau NAT</th></tr></thead>
          <tbody>
            <tr><td>192.168.1.10:5000 → 8.8.8.8:53</td><td>203.0.113.5:61000 → 8.8.8.8:53</td></tr>
            <tr><td>192.168.1.11:5000 → 8.8.8.8:53</td><td>203.0.113.5:61001 → 8.8.8.8:53</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><b>Hạn chế của NAT</b><p>NAT che khuất máy bên trong nên các ứng dụng cần kết nối vào (server, game P2P, VoIP) phải cấu hình <b>port forwarding</b>. NAT cũng phá vỡ mô hình end-to-end và gây khó cho một số giao thức.</p></div>
        <h2>IPv6: 128 bit</h2>
        <div class="grid-2">
          <article class="card"><h3>Đặc điểm</h3><ul class="tick-list"><li>128 bit, không gian địa chỉ khổng lồ.</li><li>Viết dạng hex, ví dụ <code>2001:db8::1</code>.</li><li>Header đơn giản hơn, không checksum ở tầng mạng.</li><li>Không broadcast; dùng multicast và anycast.</li><li>Hỗ trợ SLAAC tự cấu hình địa chỉ.</li></ul></article>
          <article class="card tint"><h3>Chuyển đổi từ IPv4</h3><ul class="tick-list"><li><b>Dual stack</b>: thiết bị chạy cả hai giao thức.</li><li><b>Tunneling</b>: đóng gói gói IPv6 trong gói IPv4 để đi qua hạ tầng cũ.</li><li><b>NAT64/DNS64</b>: cho phép host IPv6 nói chuyện với server IPv4.</li></ul></article>
        </div>
        <div class="callout tip"><b>Ghi nhớ nhanh</b><p>NAT giúp “độ” thiếu IPv4 nhưng làm mất end-to-end. IPv6 giải quyết tận gốc vấn đề thiếu địa chỉ, nhưng việc chuyển đổi diễn ra chậm vì phải thay đổi toàn bộ hạ tầng.</p></div>
      `,
      keyPoints: [
        "Subnet /n có 2^(32−n) địa chỉ, dùng được 2^(32−n) − 2 host.",
        "DHCP DORA: Discover, Offer, Request, Ack; địa chỉ có thời hạn thuê.",
        "NAT đổi IP+cổng nguồn, cần port forwarding cho kết nối vào.",
        "IPv6 128 bit, không broadcast, header đơn giản, chuyển đổi bằng dual stack/tunneling."
      ]
    }
,
    {
      id: "ch4-5",
      title: "Thuật toán định tuyến: Link-State & Distance-Vector",
      minutes: 16,
      keywords: ["routing algorithm", "link state", "dijkstra", "distance vector", "bellman-ford", "count to infinity", "poisoned reverse", "shortest path", "định tuyến"],
      intro: "Hai họ thuật toán tìm đường đi ngắn nhất mà các router dùng: biết toàn bộ bản đồ (LS) hay chỉ nghe hàng xóm (DV).",
      body: `
        <h2>Mô hình đồ thị</h2>
        <p>Mạng được mô hình thành đồ thị: router là <b>nút</b>, link là <b>cạnh</b>, mỗi cạnh có <b>chi phí</b> (tỉ lệ nghịch với tốc độ, hoặc theo độ trễ, tải). Mục tiêu: tìm đường có tổng chi phí nhỏ nhất.</p>
        <h2>Link-State: biết cả bản đồ (Dijkstra)</h2>
        <p>Mỗi router <b>quảng bá chi phí các link của mình</b> cho toàn mạng. Khi mọi router có đủ bản đồ, mỗi router chạy Dijkstra để tìm đường ngắn nhất từ mình tới tất cả đích.</p>
        <div class="flow">
          <div class="flow-step"><b>1 · KHỞI TẠO</b>Chỉ biết chính mình, chi phí 0</div>
          <div class="flow-step"><b>2 · CHỌN</b>Chọn nút chưa chốt có chi phí nhỏ nhất</div>
          <div class="flow-step"><b>3 · CẬP NHẬT</b>Cập nhật chi phí các hàng xóm của nút đó</div>
          <div class="flow-step dark"><b>4 · LẶP</b>Lặp đến khi mọi nút được chốt</div>
        </div>
        <p>Ví dụ với nút nguồn u và các chi phí lần lượt chốt được: u(0) → v(2) → x(3) → y(4) → z(5). Sau đó router dựng <b>bản đồ chuyển tiếp</b>: đích nào thì đi qua hàng xóm nào.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Đích</th><th>Chi phí</th><th>Next hop</th></tr></thead>
          <tbody>
            <tr><td>v</td><td>2</td><td>v (đi trực tiếp)</td></tr>
            <tr><td>x</td><td>3</td><td>v</td></tr>
            <tr><td>y</td><td>4</td><td>v</td></tr>
            <tr><td>z</td><td>5</td><td>v</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Độ phức tạp</b><p>Dijkstra với n nút có độ phức tạp O(n²) với cài đặt đơn giản, hoặc O(n log n) khi dùng heap. Nhược điểm: mỗi lần chi phí link thay đổi đều phải tính lại toàn bộ.</p></div>
        <h2>Distance-Vector: nghe hàng xóm (Bellman-Ford)</h2>
        <p>Mỗi router chỉ biết chi phí link tới hàng xóm và <b>vector khoảng cách</b> mà hàng xóm báo. Nó cập nhật theo công thức Bellman-Ford:</p>
        <div class="formula-box"><span>Phương trình Bellman-Ford</span><span class="eq">D<sub>x</sub>(y) = min<sub>v</sub> { c(x,v) + D<sub>v</sub>(y) }</span><small>Chi phí từ x tới y = min trên mọi hàng xóm v của (chi phí x→v cộng chi phí v→y mà v báo). Router chỉ cần đổi khi hàng xóm đổi → tin tốt lan nhanh.</small></div>
        <div class="callout warn"><b>Vấn đề đếm tới vô cùng (count-to-infinity)</b><p>Nếu một link tăng chi phí hoặc hỏng, router có thể <b>học tin xấu từ chính người nó vừa cung cấp đường đi</b>, tạo vòng lặp và chi phí leo dần đến vô cùng. Ví dụ kinh điển: y vẫn nghĩ “z gần x lắm” trong khi thực ra z đi qua chính y.</p></div>
        <div class="callout tip"><b>Poisoned reverse</b><p>Nếu z đi qua y để tới x, z sẽ <b>báo cho y chi phí tới x bằng vô cùng</b>. Nhờ vậy y không nghe ngược lại thông tin sai. Cách này xử lý được vòng lặp 2 nút, nhưng vòng lặp 3 nút trở lên vẫn có thể xảy ra.</p></div>
        <h2>So sánh LS và DV</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Tiêu chí</th><th>Link-State</th><th>Distance-Vector</th></tr></thead>
          <tbody>
            <tr><td>Thông tin</td><td>Toàn mạng (bản đồ đầy đủ)</td><td>Chỉ hàng xóm (vector)</td></tr>
            <tr><td>Trao đổi</td><td>Quảng bá chi phí link</td><td>Gửi vector định kỳ/khi đổi</td></tr>
            <tr><td>Hội tụ</td><td>Nhanh, ổn định</td><td>Chậm hơn, nguy cơ count-to-infinity</td></tr>
            <tr><td>Bộ nhớ/Tính toán</td><td>Nặng hơn (giữ cả đồ thị)</td><td>Nhẹ hơn (chỉ giữ vector)</td></tr>
          </tbody>
        </table></div>
      `,
      keyPoints: [
        "Link-State: mỗi router có cả bản đồ rồi chạy Dijkstra, hội tụ nhanh.",
        "Distance-Vector: cập nhật theo Bellman-Ford D_x(y) = min{c(x,v)+D_v(y)}.",
        "DV dễ gặp count-to-infinity khi link hỏng hoặc tăng chi phí.",
        "Poisoned reverse báo chi phí vô cùng về hướng đã học để phá vòng lặp đơn giản."
      ]
    }
,
    {
      id: "ch4-6",
      title: "Giao thức định tuyến Internet: OSPF & BGP",
      minutes: 14,
      keywords: ["OSPF", "BGP", "AS", "autonomous system", "IGP", "EGP", "eBGP", "iBGP", "path vector", "policy", "hot potato", "anycast", "area"],
      intro: "Bên trong một tổ chức dùng OSPF; giữa các tổ chức với nhau dùng BGP — nơi chính sách quan trọng hơn đường ngắn nhất.",
      body: `
        <h2>Hai cấp định tuyến</h2>
        <p>Internet gồm hàng chục nghìn <b>hệ tự trị (Autonomous System – AS)</b>, mỗi AS do một tổ chức quản lý (ISP, đại học, công ty). Định tuyến chia hai cấp:</p>
        <div class="grid-2">
          <article class="card"><h3>Bên trong AS (IGP)</h3><p>Dùng giao thức <b>nội miền</b> như OSPF, IS-IS, RIP. Mục tiêu: tìm đường tốt nhất trong phạm vi một tổ chức.</p></article>
          <article class="card tint"><h3>Giữa các AS (EGP)</h3><p>Dùng <b>BGP</b>. Mục tiêu không chỉ là ngắn nhất mà còn tuân theo <b>chính sách</b> thương mại, bảo mật, hợp đồng.</p></article>
        </div>
        <h2>OSPF (Open Shortest Path First)</h2>
        <ul class="tick-list">
          <li>Là giao thức <b>link-state</b>: mỗi router quảng bá trạng thái link (LSA) cho toàn vùng.</li>
          <li>Chạy Dijkstra để tính đường ngắn nhất theo <b>chi phí</b> cấu hình (thường tỉ lệ nghịch băng thông).</li>
          <li>Hỗ trợ <b>phân vùng (area)</b> để giảm lượng thông tin phải lan truyền; area 0 là vùng xương sống.</li>
          <li>Gửi gói <b>Hello</b> định kỳ để phát hiện hàng xóm và kiểm tra link còn sống.</li>
          <li>Hội tụ nhanh, hỗ trợ cân bằng tải trên nhiều đường cùng chi phí.</li>
        </ul>
        <h2>BGP (Border Gateway Protocol)</h2>
        <p>BGP là giao thức <b>path-vector</b>: mỗi tuyến được quảng bá kèm danh sách các AS phải đi qua (<b>AS-PATH</b>). Router dùng thông tin này để phát hiện vòng lặp và chọn tuyến theo chính sách.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Khái niệm</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>eBGP</td><td>Trao đổi tuyến giữa <b>hai AS khác nhau</b></td></tr>
            <tr><td>iBGP</td><td>Phân phối tuyến <b>bên trong một AS</b></td></tr>
            <tr><td>AS-PATH</td><td>Danh sách AS trên đường đi, chống vòng lặp</td></tr>
            <tr><td>Next-hop</td><td>Địa chỉ IP của router kế tiếp</td></tr>
            <tr><td>Policy</td><td>Quy tắc ưu tiên/loại tuyến theo hợp đồng, chi phí, bảo mật</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><b>Vì sao BGP không chỉ chọn đường ngắn nhất?</b><p>Một ISP có thể thích đi qua đối tác trả phí thấp hơn dù đường dài hơn, hoặc từ chối quảng bá tuyến vì lý do chính trị. BGP cho phép áp <b>chính sách</b> lên từng tuyến, điều mà giao thức nội miền không cần.</p></div>
        <h2>Hot potato & anycast</h2>
        <div class="grid-2">
          <article class="card"><h3>Hot potato routing</h3><p>Router chọn cổng ra <b>gần nhất về chi phí nội bộ</b> để đẩy gói ra khỏi AS càng nhanh càng tốt, dù đường bên ngoài có thể dài hơn.</p></article>
          <article class="card"><h3>Anycast</h3><p>Nhiều server cùng quảng bá <b>một địa chỉ IP</b>. Gói tin được định tuyến tới server gần nhất theo BGP — nền tảng của DNS root và CDN.</p></article>
        </div>
      `,
      keyPoints: [
        "IGP (OSPF) định tuyến bên trong AS; BGP định tuyến giữa các AS.",
        "OSPF là link-state, dùng Dijkstra, hỗ trợ area và gói Hello.",
        "BGP là path-vector, dùng AS-PATH để chống vòng lặp và áp chính sách.",
        "Hot potato đẩy gói ra khỏi AS sớm; anycast cho nhiều server dùng chung một IP."
      ]
    }
,
    {
      id: "ch4-7",
      title: "ICMP & chẩn đoán mạng",
      minutes: 11,
      keywords: ["ICMP", "ping", "traceroute", "tracert", "echo request", "time exceeded", "dest unreachable", "chẩn đoán", "netstat", "nslookup", "wireshark"],
      intro: "ICMP báo lỗi và hỗ trợ chẩn đoán. Cùng với vài công cụ dòng lệnh, nó giúp bạn tìm ra mạng đang hỏng ở đâu.",
      body: `
        <h2>ICMP làm gì?</h2>
        <p>ICMP (Internet Control Message Protocol) là giao thức <b>đi kèm</b> tầng mạng, dùng để báo lỗi và trao đổi thông tin điều khiển. Nó không truyền dữ liệu người dùng, mà mang <b>loại (type) và mã (code)</b> mô tả vấn đề.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Type</th><th>Tên</th><th>Dùng khi nào</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>Echo reply</td><td>Trả lời ping</td></tr>
            <tr><td>3</td><td>Destination unreachable</td><td>Không tới được đích (code 0 mạng, 1 host, 3 cổng)</td></tr>
            <tr><td>8</td><td>Echo request</td><td>Gói ping gửi đi</td></tr>
            <tr><td>11</td><td>Time exceeded</td><td>TTL về 0, gói bị hủy</td></tr>
            <tr><td>5</td><td>Redirect</td><td>Chỉ cho host một gateway tốt hơn</td></tr>
          </tbody>
        </table></div>
        <h2>ping và traceroute</h2>
        <div class="grid-2">
          <article class="card"><h3>ping</h3><p>Gửi <b>echo request</b>, nhận <b>echo reply</b>, đo <b>RTT</b> và tỉ lệ mất gói. Nhanh chóng trả lời: đích có sống không, đường truyền có ổn không.</p></article>
          <article class="card"><h3>traceroute / tracert</h3><p>Gửi gói có <b>TTL tăng dần</b>. Router thứ i hủy gói và trả về ICMP <b>time exceeded</b>, nhờ vậy phát hiện từng chặng và RTT của nó.</p></article>
        </div>
        <div class="callout warn"><b>Không phải cứ “ping không được” là mạng hỏng</b><p>Nhiều tường lửa chặn ICMP có chủ ý. Một host có thể chặn ping nhưng vẫn phục vụ web bình thường. Vì vậy phải kết hợp nhiều công cụ trước khi kết luận.</p></div>
        <h2>Bộ công cụ chẩn đoán cơ bản</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Lệnh</th><th>Kiểm tra điều gì</th></tr></thead>
          <tbody>
            <tr><td><code>ipconfig</code> / <code>ifconfig</code></td><td>Địa chỉ IP, mặt nạ, gateway của máy</td></tr>
            <tr><td><code>ping</code></td><td>Kết nối và RTT tới một đích</td></tr>
            <tr><td><code>tracert</code> / <code>traceroute</code></td><td>Đường đi qua từng router, chặng nào chậm/mất</td></tr>
            <tr><td><code>nslookup</code> / <code>dig</code></td><td>Phân giải tên miền, kiểm tra bản ghi DNS</td></tr>
            <tr><td><code>arp -a</code></td><td>Bảng ánh xạ IP ↔ MAC trong mạng cục bộ</td></tr>
            <tr><td><code>netstat -ano</code></td><td>Các kết nối và cổng đang mở, tiến trình tương ứng</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Quy trình chẩn đoán từng lớp</b><p>1) <code>ipconfig</code> xem có IP/gateway chưa. 2) <code>ping 127.0.0.1</code> kiểm tra TCP/IP nội bộ. 3) <code>ping gateway</code> kiểm tra mạng LAN. 4) <code>ping 8.8.8.8</code> kiểm tra ra Internet. 5) <code>nslookup</code> kiểm tra DNS. Lần theo thứ tự này để khoanh vùng lỗi nhanh.</p></div>
      `,
      keyPoints: [
        "ICMP báo lỗi và hỗ trợ chẩn đoán, không mang dữ liệu người dùng.",
        "ping dùng echo request/reply (type 8/0); traceroute dùng time exceeded (type 11).",
        "Tường lửa có thể chặn ICMP nên đừng kết luận vội khi ping thất bại.",
        "Chẩn đoán theo thứ tự: IP → loopback → gateway → Internet → DNS."
      ]
    }
  ]
});
