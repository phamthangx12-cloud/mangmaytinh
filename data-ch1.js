window.MMT_CHAPTERS = window.MMT_CHAPTERS || [];
window.MMT_CHAPTERS.push({
  id: "ch1",
  label: "Chương 1",
  title: "Tổng quan về Mạng máy tính",
  subtitle: "Internet hoạt động thế nào, độ trễ đến từ đâu và vì sao phải chia tầng.",
  lessons: [
    {
      id: "ch1-1",
      title: "Internet & giao thức",
      minutes: 12,
      keywords: ["internet", "host", "router", "protocol", "giao thức", "ISP", "packet", "RFC", "IETF"],
      intro: "Internet là gì, giao thức là gì và một gói tin được đóng gói qua các tầng ra sao? Đây là nền tảng cho toàn bộ môn học.",
      body: `
        <div class="grid-2">
          <article class="card">
            <span class="mini-label">GÓC NHÌN 1 · THIẾT BỊ</span>
            <h2>Internet gồm những gì?</h2>
            <p>Internet là “mạng của các mạng”, gồm hàng tỷ <b>thiết bị đầu cuối</b> (host) nối với nhau qua <b>đường truyền</b> và <b>thiết bị chuyển mạch gói</b>.</p>
            <ul class="tick-list">
              <li><b>Host / end system:</b> máy tính, điện thoại, server, camera, cảm biến… chạy ứng dụng mạng.</li>
              <li><b>Link:</b> cáp đồng, cáp quang, sóng vô tuyến; tốc độ tính bằng bit/giây (bps).</li>
              <li><b>Packet switch:</b> router ở lõi mạng, switch trong mạng LAN, chuyển tiếp gói tin.</li>
              <li><b>ISP:</b> nhà cung cấp dịch vụ, kết nối các mạng thành liên mạng toàn cầu.</li>
            </ul>
          </article>
          <article class="card tint">
            <span class="mini-label">GÓC NHÌN 2 · DỊCH VỤ</span>
            <h2>Internet phục vụ ai?</h2>
            <p>Internet là hạ tầng cung cấp dịch vụ cho các <b>ứng dụng phân tán</b>: Web, email, truyền file, video, mạng xã hội, game online, IoT.</p>
            <p>Ứng dụng chạy trên host ở rìa mạng và trao đổi dữ liệu qua hạ tầng mà không cần biết chi tiết bên dưới.</p>
            <div class="pill-row"><span class="pill">Web</span><span class="pill">Email</span><span class="pill green">Video</span><span class="pill violet">Game</span><span class="pill amber">IoT</span></div>
          </article>
        </div>
        <h2>Giao thức (protocol) là gì?</h2>
        <p>Giao thức là tập <b>quy tắc</b> quy định cách hai bên giao tiếp. Một giao thức cần xác định ba yếu tố:</p>
        <div class="grid-3">
          <article class="card"><h3>1. Cú pháp</h3><p>Định dạng và thứ tự các trường trong thông điệp. Ví dụ dòng <code>GET /index.html</code> của HTTP.</p></article>
          <article class="card"><h3>2. Ngữ nghĩa</h3><p>Ý nghĩa từng trường. Ví dụ mã <code>200</code> nghĩa là yêu cầu thành công.</p></article>
          <article class="card"><h3>3. Đồng bộ</h3><p>Thời điểm gửi và phản hồi. Ví dụ TCP bắt tay 3 bước trước khi truyền dữ liệu.</p></article>
        </div>
        <div class="callout tip"><b>So sánh với con người</b><p>Khi chào hỏi: A nói “Xin chào”, B đáp “Chào bạn”. Hai bên dùng cùng ngôn ngữ, đúng thứ tự thì giao tiếp thành công. Máy tính cũng vậy, nhưng quy tắc phải chính xác đến từng bit.</p></div>
        <h2>Một gói tin được tạo ra thế nào?</h2>
        <div class="flow">
          <div class="flow-step"><b>ỨNG DỤNG</b>Dữ liệu của bạn: văn bản, ảnh, video</div>
          <div class="flow-step"><b>GIAO VẬN</b>Chia thành segment, gắn số cổng</div>
          <div class="flow-step"><b>TẦNG MẠNG</b>Gắn địa chỉ IP nguồn và đích</div>
          <div class="flow-step"><b>LIÊN KẾT</b>Đóng thành frame, gắn địa chỉ MAC</div>
          <div class="flow-step dark"><b>ĐƯỜNG TRUYỀN</b>Bit đi trên cáp hoặc sóng</div>
        </div>
        <div class="callout"><b>Tiêu chuẩn mở</b><p>Giao thức Internet do <b>IETF</b> công bố trong các tài liệu <b>RFC</b> (ví dụ HTTP/1.1 là RFC 7230). Chuẩn mạng cục bộ do <b>IEEE</b> ban hành: Ethernet 802.3, Wi-Fi 802.11. Nhờ chuẩn mở, thiết bị nhiều hãng mới nói chuyện được với nhau.</p></div>
      `,
      keyPoints: [
        "Internet = host ở rìa mạng + router/switch ở lõi + đường truyền + ISP + giao thức.",
        "Giao thức gồm cú pháp, ngữ nghĩa và đồng bộ thời gian.",
        "Ứng dụng chỉ cần dùng dịch vụ của tầng giao vận, không cần biết hạ tầng bên dưới.",
        "Chuẩn mở (RFC, IEEE) giúp các hệ thống khác hãng tương tác được."
      ]
    }
,
    {
      id: "ch1-2",
      title: "Chuyển mạch gói vs chuyển mạch kênh",
      minutes: 13,
      keywords: ["circuit switching", "packet switching", "chuyển mạch", "FDM", "TDM", "statistical multiplexing", "store-and-forward", "store and forward"],
      intro: "Hai cách đưa dữ liệu qua mạng lõi: giữ riêng một kênh (circuit) hay chia sẻ đường truyền theo từng gói (packet)?",
      body: `
        <div class="grid-2">
          <article class="card">
            <span class="mini-label">CÁCH 1</span>
            <h2>Chuyển mạch kênh</h2>
            <p>Trước khi truyền, mạng <b>dành riêng</b> một kênh từ nguồn đến đích (như cuộc gọi điện thoại). Tài nguyên bị giữ trong suốt phiên, kể cả khi hai bên im lặng.</p>
            <ul class="tick-list">
              <li>Tốc độ ổn định, độ trễ biến động thấp.</li>
              <li>Không có hàng đợi tại nút mạng.</li>
              <li>Lãng phí băng thông khi không truyền dữ liệu.</li>
              <li>Thiết lập kết nối tốn thời gian (call setup).</li>
            </ul>
          </article>
          <article class="card tint">
            <span class="mini-label">CÁCH 2</span>
            <h2>Chuyển mạch gói</h2>
            <p>Dữ liệu được chia thành <b>gói tin</b>, mỗi gói mang địa chỉ đích và được chuyển tiếp độc lập qua các router. Các luồng dùng chung đường truyền theo kiểu <b>thống kê</b>.</p>
            <ul class="tick-list">
              <li>Tận dụng băng thông tốt khi lưu lượng bùng nổ.</li>
              <li>Không cần thiết lập kênh trước.</li>
              <li>Có thể trễ, mất gói khi mạng quá tải.</li>
              <li>Là nền tảng của Internet hiện nay.</li>
            </ul>
          </article>
        </div>
        <h2>Chia sẻ kênh: FDM và TDM</h2>
        <div class="grid-2">
          <article class="card"><h3>FDM – chia theo tần số</h3><p>Mỗi phiên được cấp một <b>dải tần riêng</b>. Ví dụ đài FM: 90 MHz, 95 MHz, 100 MHz cùng tồn tại mà không chồng lấn.</p><div class="pill-row"><span class="pill">Kênh 1</span><span class="pill green">Kênh 2</span><span class="pill amber">Kênh 3</span><span class="pill violet">Kênh 4</span></div></article>
          <article class="card"><h3>TDM – chia theo thời gian</h3><p>Mỗi phiên được cấp <b>khe thời gian</b> lần lượt. Ai cũng có lượt, nhưng khi đến lượt mà không có dữ liệu thì khe đó bị bỏ trống.</p><div class="flow"><div class="flow-step">A</div><div class="flow-step">B</div><div class="flow-step">C</div><div class="flow-step">A</div></div></article>
        </div>
        <h2>Ví dụ kinh điển: 10 người hay 35 người?</h2>
        <div class="callout example"><b>Đề bài</b><p>Một đường truyền 1 Mbps. Mỗi người dùng cần 100 kbps khi hoạt động, và chỉ hoạt động 10% thời gian.</p></div>
        <div class="grid-2">
          <article class="card"><h3>Chuyển mạch kênh</h3><p>Mỗi người giữ cố định 100 kbps, nên tối đa <b>1 Mbps / 100 kbps = 10 người</b>. Người thứ 11 bị từ chối dù 9 người kia đang im lặng.</p></article>
          <article class="card"><h3>Chuyển mạch gói</h3><p>Với 35 người, xác suất có hơn 10 người hoạt động cùng lúc <b>nhỏ hơn 0,04%</b>. Nhờ dùng chung theo thống kê, mạng phục vụ được 35 người mà hiếm khi quá tải.</p></article>
        </div>
        <div class="callout tip"><b>Vì sao Internet chọn chuyển mạch gói?</b><p>Lưu lượng dữ liệu có tính <b>bùng nổ</b> (lúc nhiều lúc ít). Dành riêng kênh sẽ lãng phí phần lớn thời gian. Chuyển mạch gói cho phép nhiều người chia sẻ cùng hạ tầng với chi phí thấp hơn nhiều.</p></div>
        <h2>Độ trễ store-and-forward</h2>
        <p>Router phải <b>nhận đủ cả gói</b> rồi mới chuyển tiếp. Thời gian đưa một gói có kích thước L bit lên đường truyền tốc độ R bps là <code>L/R</code>.</p>
        <div class="formula-box"><span>Một gói, một chặng</span><span class="eq">d<sub>trans</sub> = L / R</span><small>Ví dụ: gói 1000 byte = 8000 bit, R = 2 Mbps → 8000 / 2.000.000 = 4 ms mỗi chặng.</small></div>
        <div class="callout"><b>Nhiều gói, nhiều chặng</b><p>Với N gói qua K chặng, gói đầu đến sau <code>K·L/R</code>; các gói sau “nối đuôi” nên tổng thời gian xấp xỉ <code>(K + N − 1)·L/R</code> nếu bỏ qua trễ lan truyền và hàng đợi. Đây là lợi ích của <b>pipelining</b>.</p></div>
      `,
      keyPoints: [
        "Chuyển mạch kênh giữ tài nguyên cố định; chuyển mạch gói chia sẻ theo nhu cầu.",
        "FDM chia theo tần số, TDM chia theo khe thời gian.",
        "Chuyển mạch gói tận dụng băng thông tốt hơn nhờ ghép kênh thống kê.",
        "Store-and-forward: mỗi chặng tốn L/R giây để đẩy gói lên link."
      ]
    }
,
    {
      id: "ch1-3",
      title: "Độ trễ, mất gói & thông lượng",
      minutes: 15,
      keywords: ["delay", "độ trễ", "queueing", "hàng đợi", "propagation", "transmission", "throughput", "thông lượng", "traceroute", "bandwidth", "packet loss"],
      intro: "Vì sao cùng một mạng có lúc nhanh lúc chậm? Bốn thành phần của độ trễ và khái niệm thông lượng giải thích điều đó.",
      body: `
        <h2>Bốn thành phần của độ trễ nút mạng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Thành phần</th><th>Công thức</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>Xử lý</td><td><code>d_proc</code></td><td>Kiểm tra header, tra bảng chuyển tiếp. Thường rất nhỏ (micro giây).</td></tr>
            <tr><td>Hàng đợi</td><td><code>d_queue</code></td><td>Chờ đến lượt gửi khi link bận. Phụ thuộc mức tải, có thể rất lớn.</td></tr>
            <tr><td>Truyền</td><td><code>L / R</code></td><td>Đẩy toàn bộ L bit lên link tốc độ R bps.</td></tr>
            <tr><td>Lan truyền</td><td><code>d / s</code></td><td>Bit đi hết khoảng cách d với tốc độ sóng s (gần 2×10⁸ m/s trong cáp).</td></tr>
          </tbody>
        </table></div>
        <div class="formula-box"><span>Tổng độ trễ nút mạng</span><span class="eq">d<sub>nodal</sub> = d<sub>proc</sub> + d<sub>queue</sub> + L/R + d/s</span><small>Trễ hàng đợi là thành phần biến động nhất, quyết định cảm giác “mạng chậm” khi tải cao.</small></div>
        <div class="callout warn"><b>Dễ nhầm: truyền ≠ lan truyền</b><p>Trễ <b>truyền</b> là thời gian đẩy gói lên dây, phụ thuộc kích thước gói và tốc độ link. Trễ <b>lan truyền</b> là thời gian tín hiệu đi qua khoảng cách, phụ thuộc khoảng cách và tốc độ sóng. Gói tin to hơn không làm tín hiệu đi xa chậm hơn!</p></div>
        <h2>Hàng đợi và mất gói</h2>
        <p>Gọi <b>a</b> là tốc độ gói đến trung bình (gói/giây), <b>L</b> là kích thước gói, <b>R</b> là tốc độ link. Đại lượng <code>La/R</code> gọi là <b>cường độ lưu lượng</b>:</p>
        <div class="grid-3">
          <article class="card"><h3>La/R ≈ 0</h3><p>Link nhàn rỗi, hàng đợi gần như bằng 0.</p></article>
          <article class="card"><h3>La/R &lt; 1</h3><p>Link còn khả năng phục vụ, nhưng tải càng gần 1 thì độ trễ hàng đợi tăng vọt.</p></article>
          <article class="card"><h3>La/R ≥ 1</h3><p>Gói đến nhanh hơn khả năng phục vụ. Hàng đợi đầy dần và <b>gói bị loại bỏ</b>.</p></article>
        </div>
        <div class="callout"><b>Mất gói xảy ra ở đâu?</b><p>Chủ yếu tại <b>bộ đệm của router</b> khi hàng đợi đầy. Gói bị mất không được báo cho tầng mạng; TCP hoặc ứng dụng phải phát hiện và gửi lại. Một số router dùng thuật toán loại bỏ sớm như RED để tránh mất hàng loạt.</p></div>
        <h2>Thông lượng (throughput)</h2>
        <p>Thông lượng là tốc độ thực tế dữ liệu được truyền thành công, khác với <b>băng thông</b> (tốc độ tối đa của link). Trên một chuỗi kết nối, thông lượng bị chặn bởi <b>link chậm nhất</b>:</p>
        <div class="formula-box"><span>Thông lượng đầu cuối</span><span class="eq">throughput = min(R<sub>1</sub>, R<sub>2</sub>, …, R<sub>n</sub>)</span><small>Ví dụ: server 1 Gbps → mạng gia đình 100 Mbps → Wi-Fi 300 Mbps. Thực tế nhận được tối đa khoảng 100 Mbps, vì link 100 Mbps là nút cổ chai.</small></div>
        <div class="callout tip"><b>Cách kiểm tra nhanh</b><p><code>traceroute</code> (Windows: <code>tracert</code>) in ra từng router trên đường đi kèm 3 mẫu RTT. RTT tăng vọt ở một chặng cho thấy chặng đó đang nghẽn hoặc có hàng đợi lớn. <code>ping</code> đo RTT và tỉ lệ mất gói tới đích.</p></div>
        <div class="widget" data-widget="delay">
          <div class="widget-head"><h3>Máy tính độ trễ</h3><span>Transmission vs Propagation</span></div>
          <div class="widget-row">
            <div class="field"><span>Kích thước gói L (byte)</span><input data-delay-l type="number" value="1500" min="1"></div>
            <div class="field"><span>Tốc độ link R (Mbps)</span><input data-delay-r type="number" value="100" min="0.001" step="any"></div>
            <div class="field"><span>Khoảng cách d (km)</span><input data-delay-d type="number" value="2000" min="0"></div>
            <div class="field"><span>Tốc độ sóng (×10⁸ m/s)</span><input data-delay-s type="number" value="2" step="0.01" min="0.01"></div>
            <button class="primary-button" data-delay-run>Tính</button>
          </div>
          <p class="hint">Bỏ qua trễ xử lý và hàng đợi. Hãy thử tăng kích thước gói để thấy trễ truyền tăng, còn trễ lan truyền giữ nguyên.</p>
          <div class="widget-output" data-delay-out></div>
        </div>
      `,
      keyPoints: [
        "d_nodal = xử lý + hàng đợi + L/R + d/s.",
        "Trễ truyền phụ thuộc kích thước gói; trễ lan truyền phụ thuộc khoảng cách.",
        "Cường độ lưu lượng La/R tiến gần 1 thì trễ hàng đợi tăng mạnh, vượt 1 thì mất gói.",
        "Thông lượng đầu cuối bị giới hạn bởi link chậm nhất trên đường đi."
      ]
    }
,
    {
      id: "ch1-4",
      title: "Mô hình phân tầng OSI & TCP/IP",
      minutes: 14,
      keywords: ["OSI", "TCP/IP", "layer", "phân tầng", "encapsulation", "đóng gói", "PDU", "segment", "datagram", "frame", "application", "transport", "network", "link"],
      intro: "Chia mạng thành các tầng giúp thiết kế, học và sửa lỗi dễ hơn. Bài này nối mô hình OSI 7 tầng với mô hình TCP/IP 5 tầng thực tế.",
      body: `
        <h2>Vì sao phải chia tầng?</h2>
        <div class="grid-3">
          <article class="card"><h3>Module hóa</h3><p>Mỗi tầng chỉ giải một bài toán. Tầng trên không cần biết tầng dưới làm thế nào.</p></article>
          <article class="card"><h3>Thay thế độc lập</h3><p>Đổi Wi-Fi sang 5G hay cáp quang không cần viết lại trình duyệt.</p></article>
          <article class="card"><h3>Dễ học & gỡ lỗi</h3><p>Khoanh vùng lỗi theo tầng: dây hỏng, IP sai, hay ứng dụng lỗi?</p></article>
        </div>
        <h2>OSI 7 tầng và TCP/IP 5 tầng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>OSI</th><th>TCP/IP</th><th>Chức năng chính</th><th>PDU</th></tr></thead>
          <tbody>
            <tr><td>7. Application</td><td rowspan="3">Application</td><td>Dịch vụ cho người dùng: HTTP, DNS, SMTP, FTP</td><td>Message</td></tr>
            <tr><td>6. Presentation</td><td>Mã hóa, nén, định dạng dữ liệu (TLS, UTF-8)</td><td>—</td></tr>
            <tr><td>5. Session</td><td>Thiết lập, duy trì phiên làm việc</td><td>—</td></tr>
            <tr><td>4. Transport</td><td>Transport</td><td>Giao tiếp tiến trình, chia segment, cổng, tin cậy</td><td>Segment</td></tr>
            <tr><td>3. Network</td><td>Network</td><td>Định tuyến và chuyển tiếp giữa các mạng, địa chỉ IP</td><td>Packet / Datagram</td></tr>
            <tr><td>2. Data Link</td><td>Link</td><td>Đóng frame, địa chỉ MAC, phát hiện lỗi trên một link</td><td>Frame</td></tr>
            <tr><td>1. Physical</td><td>Physical</td><td>Truyền bit trên cáp, sợi quang, sóng vô tuyến</td><td>Bit</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Mẹo nhớ OSI từ trên xuống</b><p><b>A</b>ll <b>P</b>eople <b>S</b>eem <b>T</b>o <b>N</b>eed <b>D</b>ata <b>P</b>rocessing: Application, Presentation, Session, Transport, Network, Data Link, Physical. Trong thực tế Internet dùng 5 tầng: Application, Transport, Network, Link, Physical.</p></div>
        <h2>Đóng gói (encapsulation)</h2>
        <p>Khi dữ liệu đi xuống, mỗi tầng <b>bọc thêm header</b> của mình. Khi đi lên ở bên nhận, mỗi tầng <b>bóc header</b> tương ứng.</p>
        <div class="flow">
          <div class="flow-step"><b>APPLICATION</b>Message: <code>GET /</code></div>
          <div class="flow-step"><b>TRANSPORT</b>+ TCP header, cổng 80</div>
          <div class="flow-step"><b>NETWORK</b>+ IP header, địa chỉ nguồn/đích</div>
          <div class="flow-step"><b>LINK</b>+ frame header + FCS</div>
          <div class="flow-step dark"><b>PHYSICAL</b>Chuỗi bit 0101…</div>
        </div>
        <div class="callout"><b>Ví dụ bọc thư</b><p>Bức thư (message) được cho vào phong bì ghi số hiệu (segment), rồi bỏ vào túi ghi địa chỉ nhà (datagram), rồi đưa cho bưu tá có tuyến cụ thể (frame). Mỗi lớp chỉ đọc thông tin của lớp mình.</p></div>
        <h2>Đầu cuối và từng chặng</h2>
        <div class="grid-2">
          <article class="card"><h3>Chức năng đầu cuối (end-to-end)</h3><p>Tầng giao vận chỉ chạy trên hai host đầu cuối. Router trung gian <b>không</b> mở TCP header. Vì vậy TCP mới đảm bảo tin cậy xuyên suốt.</p></article>
          <article class="card"><h3>Chức năng từng chặng (hop-by-hop)</h3><p>Tầng mạng và liên kết xử lý ở mỗi router/switch. IP header được đọc tại mọi router; frame được thay mới trên từng link.</p></article>
        </div>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Thiết bị</th><th>Tầng hoạt động</th><th>Đơn vị xử lý</th></tr></thead>
          <tbody>
            <tr><td>Hub / repeater</td><td>Physical</td><td>Bit, khuếch đại tín hiệu</td></tr>
            <tr><td>Switch</td><td>Link</td><td>Frame, địa chỉ MAC</td></tr>
            <tr><td>Router</td><td>Network</td><td>Packet, địa chỉ IP</td></tr>
            <tr><td>Firewall / proxy</td><td>Network → Application</td><td>Tùy chính sách</td></tr>
          </tbody>
        </table></div>
      `,
      keyPoints: [
        "OSI có 7 tầng; Internet dùng mô hình TCP/IP 5 tầng.",
        "Mỗi tầng thêm/bớt header của mình: message → segment → packet → frame → bit.",
        "Tầng giao vận chạy end-to-end; tầng mạng và liên kết chạy từng chặng.",
        "Hub ở tầng 1, switch ở tầng 2, router ở tầng 3."
      ]
    }
,
    {
      id: "ch1-5",
      title: "An ninh mạng căn bản",
      minutes: 12,
      keywords: ["security", "an ninh", "malware", "dos", "ddos", "sniffing", "spoofing", "mitm", "botnet", "firewall", "TLS", "encryption", "IDS"],
      intro: "Internet được thiết kế để kết nối, không phải để bảo mật. Hiểu các mối đe dọa phổ biến là bước đầu để phòng vệ.",
      body: `
        <div class="callout warn"><b>Nguyên tắc quan trọng</b><p>Internet được thiết kế dựa trên sự tin tưởng giữa các hệ thống, nên bảo mật phải được <b>thêm vào từng tầng</b>. Không có lớp bảo mật duy nhất nào đủ chống mọi tấn công.</p></div>
        <h2>Bốn mối đe dọa phổ biến</h2>
        <div class="grid-2">
          <article class="card"><h3>Malware & botnet</h3><p>Phần mềm độc hại (virus, worm, trojan) lây qua email, link độc, lỗ hổng phần mềm. Máy bị nhiễm có thể bị điều khiển thành <b>botnet</b> để tấn công mạng khác.</p></article>
          <article class="card"><h3>DoS / DDoS</h3><p>Tấn công từ chối dịch vụ: gửi lượng truy cập khổng lồ làm máy chủ quá tải. <b>DDoS</b> dùng nhiều máy (botnet) cùng tấn công nên khó chặn hơn.</p></article>
          <article class="card"><h3>Nghe lén (sniffing)</h3><p>Trên môi trường quảng bá (Wi-Fi, hub cũ), kẻ tấn công đặt card mạng ở chế độ nghe lén để bắt mọi gói tin đi qua, đọc dữ liệu không mã hóa.</p></article>
          <article class="card"><h3>Giả mạo & MITM</h3><p><b>IP spoofing</b>: giả địa chỉ nguồn để trốn truy vết. <b>Man-in-the-middle</b>: kẻ tấn công đứng giữa hai bên, chặn và sửa thông điệp mà nạn nhân không biết.</p></article>
        </div>
        <h2>Ví dụ thực tế: SYN flood</h2>
        <div class="flow">
          <div class="flow-step"><b>KẺ TẤN CÔNG</b>Gửi hàng loạt gói SYN giả mạo</div>
          <div class="flow-step"><b>SERVER</b>Cấp bộ đệm cho mỗi kết nối nửa vời</div>
          <div class="flow-step"><b>BỘ ĐỆM CẠN</b>Không còn chỗ cho kết nối thật</div>
          <div class="flow-step dark"><b>HẬU QUẢ</b>Người dùng hợp lệ bị từ chối</div>
        </div>
        <p>Đây là lý do các hệ thống hiện đại dùng <b>SYN cookies</b>: không cấp tài nguyên ngay, mà nhúng thông tin vào số thứ tự và chỉ cấp khi nhận được ACK hợp lệ.</p>
        <h2>Phòng vệ theo tầng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Mục tiêu</th><th>Công cụ / kỹ thuật</th></tr></thead>
          <tbody>
            <tr><td>Xác thực</td><td>Mật khẩu mạnh, OTP, chứng chỉ số, khóa công khai</td></tr>
            <tr><td>Bảo mật (confidentiality)</td><td>Mã hóa: TLS/HTTPS, VPN, IPsec, mã hóa đầu cuối</td></tr>
            <tr><td>Toàn vẹn (integrity)</td><td>Hàm băm, MAC, chữ ký số, checksum</td></tr>
            <tr><td>Sẵn sàng</td><td>Firewall, IDS/IPS, giới hạn tốc độ, CDN, dự phòng</td></tr>
            <tr><td>Giám sát</td><td>Log, phân tích lưu lượng, phát hiện bất thường</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Thói quen bảo mật cá nhân</b><p>Dùng HTTPS khi nhập dữ liệu nhạy cảm, cập nhật phần mềm để vá lỗ hổng, không mở email/link lạ, dùng mật khẩu khác nhau cho từng dịch vụ và bật xác thực hai lớp.</p></div>
        <div class="callout"><b>Firewall làm gì?</b><p>Firewall lọc gói tin theo địa chỉ IP, cổng, giao thức và trạng thái kết nối. IDS phát hiện tấn công để cảnh báo, IPS có thể tự chặn. Ba thứ này phối hợp tạo lớp phòng thủ biên cho mạng nội bộ.</p></div>
      `,
      keyPoints: [
        "Bốn mối đe dọa lớn: malware/botnet, DoS/DDoS, sniffing, spoofing/MITM.",
        "SYN flood làm cạn bộ đệm kết nối; SYN cookies là biện pháp đối phó.",
        "Bảo mật cần đủ ba yếu tố: bí mật, toàn vẹn, sẵn sàng.",
        "Mã hóa (TLS) là biện pháp chủ chốt chống nghe lén và giả mạo."
      ]
    }
  ]
});
