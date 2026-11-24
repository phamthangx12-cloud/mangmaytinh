window.MMT_CHAPTERS = window.MMT_CHAPTERS || [];
window.MMT_CHAPTERS.push({
  id: "ch3",
  label: "Chương 3",
  title: "Tầng giao vận",
  subtitle: "Dồn kênh, UDP, truyền tin cậy và TCP: trái tim đảm bảo dữ liệu đến đúng tiến trình, đúng thứ tự.",
  lessons: [
    {
      id: "ch3-1",
      title: "Vai trò & dồn kênh/phân kênh",
      minutes: 12,
      keywords: ["transport", "giao vận", "multiplexing", "demultiplexing", "dồn kênh", "phân kênh", "port", "cổng", "socket", "segment"],
      intro: "Tầng giao vận nối các tiến trình ứng dụng qua mạng bằng dồn kênh, phân kênh và hai giao thức UDP, TCP.",
      body: `
        <div class="grid-2">
          <article class="card">
            <span class="mini-label">KHÁC VỚI TẦNG MẠNG</span>
            <h2>Từ host đến tiến trình</h2>
            <p>Tầng mạng chỉ đưa dữ liệu <b>giữa các máy</b>. Tầng giao vận đưa dữ liệu <b>giữa các tiến trình</b> chạy trên máy. Nếu không có nó, không thể biết dữ liệu thuộc về trình duyệt hay ứng dụng nhạc.</p>
          </article>
          <article class="card tint">
            <span class="mini-label">HAI GIAO THỨC</span>
            <h2>UDP và TCP</h2>
            <ul class="tick-list">
              <li><b>UDP</b>: đơn giản, không kết nối, không đảm bảo, nhanh.</li>
              <li><b>TCP</b>: có kết nối, tin cậy, có thứ tự, kiểm soát luồng và tắc nghẽn.</li>
            </ul>
          </article>
        </div>
        <h2>Dồn kênh và phân kênh</h2>
        <p>Trên máy gửi, <b>dồn kênh</b> gom dữ liệu từ nhiều socket, gắn header chứa <b>số cổng nguồn và đích</b> thành segment. Trên máy nhận, <b>phân kênh</b> đọc cổng đích để trao segment cho đúng socket.</p>
        <div class="grid-2">
          <article class="card"><h3>Dồn kênh (phía gửi)</h3><p>Nhiều ứng dụng → gắn cổng → đóng segment → đưa xuống tầng mạng.</p></article>
          <article class="card"><h3>Phân kênh (phía nhận)</h3><p>Đọc cổng đích → tìm socket khớp → trao dữ liệu đúng tiến trình.</p></article>
        </div>
        <h2>Socket được định danh thế nào?</h2>
        <div class="grid-2">
          <article class="card"><h3>Socket UDP</h3><p>Định danh bằng <b>cặp (IP đích, cổng đích)</b>. Hai segment tới cùng IP:port thì trao cho cùng một socket.</p></article>
          <article class="card"><h3>Socket TCP</h3><p>Định danh bằng <b>bộ 4</b>: (IP nguồn, cổng nguồn, IP đích, cổng đích). Server nhận ra từng client riêng nhờ cặp nguồn khác nhau.</p></article>
        </div>
        <div class="formula-box"><span>Định danh socket TCP</span><span class="eq">{ IP<sub>src</sub>, Port<sub>src</sub>, IP<sub>dst</sub>, Port<sub>dst</sub> }</span><small>Bộ 4 giá trị này xác định duy nhất một kết nối TCP trên toàn Internet.</small></div>
        <h2>Phân loại số hiệu cổng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Khoảng</th><th>Tên gọi</th><th>Ví dụ</th></tr></thead>
          <tbody>
            <tr><td>0 – 1023</td><td>Well-known (nổi tiếng)</td><td>HTTP 80, HTTPS 443, DNS 53, FTP 21, SSH 22</td></tr>
            <tr><td>1024 – 49151</td><td>Registered (đăng ký)</td><td>MySQL 3306, RDP 3389</td></tr>
            <tr><td>49152 – 65535</td><td>Ephemeral (tạm thời)</td><td>Client tự chọn cho mỗi kết nối</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Mẹo nhớ</b><p>Cổng dưới 1024 cần quyền quản trị để mở trên server. Cổng ephemeral là cổng mà client dùng tạm rồi trả lại, thường từ 49152 trở lên.</p></div>
      `,
      keyPoints: [
        "Tầng giao vận giao tiếp tiến trình-tiến-trình; tầng mạng giao tiếp máy-máy.",
        "Dồn kênh gắn cổng khi gửi; phân kênh đọc cổng khi nhận.",
        "Socket TCP định danh bằng bộ 4; socket UDP bằng cặp IP:port đích.",
        "Cổng chia 3 khoảng: well-known, registered, ephemeral."
      ]
    }
,
    {
      id: "ch3-2",
      title: "UDP & checksum",
      minutes: 14,
      keywords: ["udp", "checksum", "header", "datagram", "8 byte", "best effort", "dns", "voip", "quic", "bù một"],
      intro: "UDP chỉ thêm một header 8 byte, không kết nối, không ACK. Vậy checksum của nó được tính thế nào và dùng để làm gì?",
      body: `
        <h2>UDP: tối giản nhưng nhanh</h2>
        <p>UDP (User Datagram Protocol) là giao thức <b>best-effort</b>: gửi đi mà không hứa hẹn gì về việc đến nơi. Nó chỉ thêm vào dữ liệu một header 8 byte.</p>
        <div class="grid-2">
          <article class="card">
            <h3>Header UDP (8 byte)</h3>
            <div class="table-wrap"><table class="compare-table">
              <thead><tr><th>Trường</th><th>Độ rộng</th><th>Ý nghĩa</th></tr></thead>
              <tbody>
                <tr><td>Port nguồn</td><td>16 bit</td><td>Cổng người gửi (có thể = 0 nếu không cần trả lời)</td></tr>
                <tr><td>Port đích</td><td>16 bit</td><td>Cổng người nhận</td></tr>
                <tr><td>Độ dài</td><td>16 bit</td><td>Độ dài header + dữ liệu (byte)</td></tr>
                <tr><td>Checksum</td><td>16 bit</td><td>Kiểm tra lỗi (tùy chọn ở IPv4)</td></tr>
              </tbody>
            </table></div>
          </article>
          <article class="card tint">
            <h3>Vì sao dùng UDP?</h3>
            <ul class="tick-list">
              <li>Không mất thời gian bắt tay kết nối.</li>
              <li>Header nhỏ, ít overhead.</li>
              <li>Không kiểm soát luồng → gửi nhanh hết mức có thể.</li>
              <li>Ứng dụng tự quyết định xử lý mất mát ra sao.</li>
            </ul>
            <div class="pill-row"><span class="pill">DNS</span><span class="pill green">VoIP</span><span class="pill amber">Game</span><span class="pill violet">QUIC/HTTP3</span></div>
          </article>
        </div>
        <h2>Internet checksum bằng bù một</h2>
        <p>Checksum phát hiện lỗi bằng cách coi dữ liệu là dãy các <b>từ 16 bit</b>:</p>
        <div class="flow">
          <div class="flow-step"><b>BƯỚC 1</b>Cộng tất cả các từ 16 bit</div>
          <div class="flow-step"><b>BƯỚC 2</b>Cộng phần tràn ngược lại (wrap-around)</div>
          <div class="flow-step"><b>BƯỚC 3</b>Đảo toàn bộ bit → checksum</div>
          <div class="flow-step dark"><b>KIỂM TRA</b>Bên nhận cộng cả checksum, đúng thì ra toàn bit 1</div>
        </div>
        <p>Ở bên nhận, nếu cộng tất cả các từ <b>kể cả checksum</b> rồi đảo mà kết quả bằng 0 thì dữ liệu không lỗi; khác 0 là có lỗi.</p>
        <div class="widget" data-widget="checksum">
          <div class="widget-head"><h3>Tính checksum 16-bit (bù một)</h3><span>UDP / Internet checksum</span></div>
          <div class="widget-row">
            <input class="grow" data-cs-input value="0x6666 0xD555">
            <button class="primary-button" data-cs-run>Tính</button>
          </div>
          <p class="hint">Nhập các từ 16-bit cách nhau bởi dấu cách. Dùng <code>0x…</code> cho hex, dãy <code>0/1</code> cho nhị phân, hoặc số thập phân.</p>
          <div class="widget-output" data-cs-output></div>
        </div>
        <h2>UDP so với TCP</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th></th><th>UDP</th><th>TCP</th></tr></thead>
          <tbody>
            <tr><td>Kết nối</td><td>Không</td><td>Có (bắt tay 3 bước)</td></tr>
            <tr><td>Header</td><td>8 byte</td><td>20 byte trở lên</td></tr>
            <tr><td>Đảm bảo thứ tự</td><td>Không</td><td>Có</td></tr>
            <tr><td>Kiểm soát luồng/tắc nghẽn</td><td>Không</td><td>Có</td></tr>
            <tr><td>Dùng cho</td><td>DNS, thoại, game, QUIC</td><td>Web, email, file</td></tr>
          </tbody>
        </table></div>
      `,
      keyPoints: [
        "Header UDP chỉ 8 byte: 2 cổng + độ dài + checksum.",
        "UDP không kết nối, không ACK, không kiểm soát luồng.",
        "Checksum = bù một của tổng (có wrap-around) các từ 16 bit.",
        "Bên nhận cộng cả checksum rồi đảo: bằng 0 là không lỗi."
      ]
    }
,
    {
      id: "ch3-3",
      title: "Nguyên lý truyền tin cậy (rdt)",
      minutes: 15,
      keywords: ["rdt", "reliable", "tin cậy", "ACK", "NAK", "sequence number", "timer", "timeout", "stop and wait", "FSM", "retransmit"],
      intro: "Làm sao truyền tin cậy trên một kênh không tin cậy? Từng bước: ACK/NAK, số thứ tự, bộ định thời và gửi lại.",
      body: `
        <p>Giao thức <b>rdt</b> (reliable data transfer) được xây dần qua các phiên bản, mỗi phiên bản khắc phục một vấn đề của kênh truyền.</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Phiên bản</th><th>Kênh truyền giả định</th><th>Cơ chế mới</th></tr></thead>
          <tbody>
            <tr><td>rdt 1.0</td><td>Hoàn hảo, không lỗi</td><td>Chưa cần gì</td></tr>
            <tr><td>rdt 2.0</td><td>Có lỗi bit</td><td>Checksum + ACK / NAK</td></tr>
            <tr><td>rdt 2.1/2.2</td><td>ACK/NAK cũng có thể lỗi</td><td>Số thứ tự (0/1) để phân biệt gói</td></tr>
            <tr><td>rdt 3.0</td><td>Gói có thể mất hoàn toàn</td><td>Bộ định thời + gửi lại khi timeout</td></tr>
          </tbody>
        </table></div>
        <h2>Ba cơ chế cốt lõi</h2>
        <div class="grid-3">
          <article class="card"><h3>Checksum + ACK/NAK</h3><p>Phát hiện lỗi bit và báo lại. NAK báo “gói lỗi, gửi lại”; ACK báo “đã nhận đúng”.</p></article>
          <article class="card"><h3>Số thứ tự</h3><p>Dùng 0/1 luân phiên để phân biệt gói mới với gói gửi lại, tránh nhận trùng.</p></article>
          <article class="card"><h3>Bộ định thời</h3><p>Nếu quá thời gian chờ mà chưa có ACK, coi như gói (hoặc ACK) đã mất và gửi lại.</p></article>
        </div>
        <div class="callout warn"><b>Vì sao cần số thứ tự?</b><p>Nếu gói mới và gói gửi lại giống hệt nhau, bên nhận không thể biết gói nào trùng. Số thứ tự 0/1 luân phiên giúp phân biệt. Đây là nền tảng cho cửa sổ trượt ở bài sau.</p></div>
        <h2>Hoạt động của rdt 3.0 (Stop-and-Wait)</h2>
        <div class="flow">
          <div class="flow-step"><b>GỬI</b>Gửi gói có số thứ tự, bật đồng hồ</div>
          <div class="flow-step"><b>CHỜ</b>Chờ ACK, không gửi gói mới</div>
          <div class="flow-step"><b>ACK ĐÚNG</b>Gửi gói tiếp theo, đảo số thứ tự</div>
          <div class="flow-step dark"><b>TIMEOUT</b>Gửi lại chính gói đó</div>
        </div>
        <h2>Hiệu suất của Stop-and-Wait</h2>
        <p>Stop-and-Wait gửi một gói rồi đứng chờ nên rất lãng phí trên đường truyền có RTT lớn:</p>
        <div class="formula-box"><span>Hiệu suất sử dụng link</span><span class="eq">U = (L/R) / (RTT + L/R)</span><small>Ví dụ: L = 8000 bit, R = 1 Gbps, RTT = 30 ms → U ≈ 0,027%. Link 1 Gbps gần như ngồi không. Giải pháp là cho nhiều gói bay đồng thời — chủ đề của bài tiếp theo.</small></div>
        <div class="callout"><b>Rút gọn ý tưởng</b><p>Truyền tin cậy = <b>phát hiện lỗi</b> (checksum) + <b>phản hồi</b> (ACK/NAK) + <b>phân biệt gói</b> (số thứ tự) + <b>chống mất gói</b> (timer + gửi lại). TCP chính là phiên bản thực tế và phức tạp hơn của ý tưởng này.</p></div>
      `,
      keyPoints: [
        "rdt phát triển qua các phiên bản: lỗi bit → ACK/NAK, lỗi ACK → số thứ tự, mất gói → timer.",
        "Checksum phát hiện lỗi; ACK/NAK phản hồi; số thứ tự phân biệt gói.",
        "Timer hết hạn thì gửi lại gói chưa được xác nhận.",
        "Stop-and-Wait lãng phí: hiệu suất = (L/R)/(RTT + L/R)."
      ]
    }
,
    {
      id: "ch3-4",
      title: "Cửa sổ trượt: Go-Back-N & Selective Repeat",
      minutes: 16,
      keywords: ["go back n", "GBN", "selective repeat", "SR", "pipelining", "window", "cửa sổ", "cumulative ACK", "buffer", "sliding window"],
      intro: "Cho nhiều gói bay đồng thời (pipelining) để dùng hết đường truyền. Hai giao thức GBN và SR xử lý mất gói khác nhau ra sao?",
      body: `
        <h2>Pipelining và cửa sổ</h2>
        <p>Thay vì gửi một gói rồi chờ, bên gửi được phép gửi trước tối đa <b>N</b> gói (cửa sổ). Cửa sổ <b>trượt</b> về phía trước khi nhận ACK, nhường chỗ cho gói mới.</p>
        <div class="callout tip"><b>Vì sao cần N?</b><p>N còn gọi là kích thước cửa sổ, giúp giới hạn số gói “đang bay” để không làm nghẽn mạng và không cần vô hạn bộ đệm. Chọn N hợp lý mới dùng hết được đường truyền.</p></div>
        <h2>Go-Back-N (GBN)</h2>
        <div class="grid-2">
          <article class="card">
            <h3>Cách hoạt động</h3>
            <ul class="tick-list">
              <li>ACK <b>tích lũy</b>: ACK(n) xác nhận mọi gói đến n.</li>
              <li>Nhận gói lệch thứ tự → <b>bỏ đi</b>, gửi ACK cho gói cuối đúng thứ tự.</li>
              <li>Timer cho gói già nhất; hết giờ → gửi lại <b>toàn bộ cửa sổ</b> từ gói lỗi.</li>
            </ul>
          </article>
          <article class="card tint">
            <h3>Ưu / nhược</h3>
            <ul class="x-list">
              <li>Bên nhận đơn giản, không cần bộ đệm.</li>
              <li>Một gói lỗi làm gửi lại nhiều gói đã đúng → lãng phí khi lỗi cao.</li>
            </ul>
          </article>
        </div>
        <h2>Selective Repeat (SR)</h2>
        <div class="grid-2">
          <article class="card">
            <h3>Cách hoạt động</h3>
            <ul class="tick-list">
              <li>ACK <b>riêng từng gói</b>.</li>
              <li>Gói đến lệch thứ tự được <b>đệm lại</b>, không bỏ.</li>
              <li>Mỗi gói có timer riêng; hết giờ chỉ gửi lại <b>đúng gói lỗi</b>.</li>
            </ul>
          </article>
          <article class="card tint">
            <h3>Ưu / nhược</h3>
            <ul class="x-list">
              <li>Chỉ gửi lại gói mất, tiết kiệm băng thông.</li>
              <li>Bên nhận phức tạp hơn, cần bộ đệm và timer từng gói.</li>
            </ul>
          </article>
        </div>
        <h2>Giới hạn kích thước cửa sổ</h2>
        <div class="formula-box"><span>Với số thứ tự k bit</span><span class="eq">GBN: N ≤ 2<sup>k</sup> − 1 &nbsp;·&nbsp; SR: N ≤ 2<sup>k−1</sup></span><small>SR cần giới hạn chặt hơn để tránh nhầm lẫn giữa gói mới và gói cũ khi cửa sổ quấn vòng. Ví dụ k = 2: GBN tối đa 3, SR tối đa 2.</small></div>
        <div class="widget" data-widget="sw">
          <div class="widget-head"><h3>Mô phỏng cửa sổ trượt</h3><span>Stop-and-Wait · GBN · SR</span></div>
          <div class="widget-row">
            <div class="field"><span>Giao thức</span><select data-sw-protocol><option value="stop">Stop-and-Wait</option><option value="gbn" selected>Go-Back-N</option><option value="sr">Selective Repeat</option></select></div>
            <div class="field"><span>Cửa sổ N</span><select data-sw-window><option>2</option><option selected>3</option><option>4</option></select></div>
            <label><input type="checkbox" data-sw-loss> Mất gói số 2</label>
            <button class="primary-button" data-sw-run>Chạy</button>
            <button class="secondary-button" data-sw-reset>Đặt lại</button>
          </div>
          <div class="sw-log" data-sw-log></div>
          <div class="window-line" data-sw-windows></div>
        </div>
        <div class="callout"><b>So sánh nhanh</b><p><b>GBN</b>: ACK tích lũy, bỏ gói lệch thứ tự, gửi lại cả cửa sổ — đơn giản, lãng phí. <b>SR</b>: ACK từng gói, đệm gói lệch thứ tự, chỉ gửi lại gói lỗi — hiệu quả, phức tạp. TCP thực tế là biến thể lai giữa hai ý tưởng này.</p></div>
      `,
      keyPoints: [
        "Pipelining cho nhiều gói bay đồng thời, giới hạn bởi cửa sổ N.",
        "GBN: ACK tích lũy, bỏ gói lệch thứ tự, timeout gửi lại cả cửa sổ.",
        "SR: ACK từng gói, đệm gói lệch thứ tự, chỉ gửi lại gói lỗi.",
        "Với k bit số thứ tự: GBN ≤ 2^k − 1, SR ≤ 2^(k−1)."
      ]
    }
,
    {
      id: "ch3-5",
      title: "TCP: segment & bắt tay ba bước",
      minutes: 15,
      keywords: ["tcp", "segment", "seq", "ack", "SYN", "ACK", "FIN", "handshake", "bắt tay", "three-way", "TIME_WAIT", "MSS", "flag"],
      intro: "Cấu trúc segment TCP và cách hai đầu thiết lập, rồi kết thúc một kết nối bằng các gói SYN, ACK, FIN.",
      body: `
        <h2>Segment TCP có gì?</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Trường</th><th>Vai trò</th></tr></thead>
          <tbody>
            <tr><td>Port nguồn / đích</td><td>Định danh tiến trình gửi / nhận (mỗi trường 16 bit)</td></tr>
            <tr><td>Số thứ tự (seq)</td><td>Số byte đầu tiên của dữ liệu trong segment này</td></tr>
            <tr><td>Số xác nhận (ack)</td><td>Số byte tiếp theo bên nhận chờ đợi (xác nhận mọi byte trước đó)</td></tr>
            <tr><td>Flags</td><td>SYN (thiết lập), ACK (xác nhận), FIN (kết thúc), RST (hủy)</td></tr>
            <tr><td>Window (rwnd)</td><td>Dung lượng bộ đệm còn trống bên nhận (kiểm soát luồng)</td></tr>
            <tr><td>Checksum</td><td>Phát hiện lỗi trên cả segment</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><b>Hiểu seq và ack theo byte</b><p>Nếu client đã gửi 1000 byte đầu có seq = 0, segment tiếp theo có seq = 1000. Server nhận đủ 1000 byte sẽ trả <b>ack = 1000</b>, nghĩa là “tôi chờ byte thứ 1000”. Seq và ack không phải số gói mà là <b>vị trí byte</b> trong luồng.</p></div>
        <h2>Bắt tay ba bước</h2>
        <p>Trước khi truyền dữ liệu, hai bên trao đổi <b>ba thông điệp</b> để thống nhất số thứ tự khởi đầu và khả năng gửi/nhận hai chiều.</p>
        <div class="widget" data-widget="stepper">
          <div class="widget-head"><h3>Mô phỏng bắt tay ba bước</h3><span>Client ↔ Server</span></div>
          <div class="step-list" data-stepper-list>
            <div class="step-item"><div class="dot">1</div><div><b>Client gửi SYN</b><p><code>SYN, seq = x</code>. Client yêu cầu mở kết nối, thông báo số thứ tự khởi đầu x.</p></div></div>
            <div class="step-item"><div class="dot">2</div><div><b>Server trả SYN+ACK</b><p><code>SYN+ACK, seq = y, ack = x+1</code>. Server đồng ý, gửi số thứ tự y và xác nhận byte x.</p></div></div>
            <div class="step-item"><div class="dot">3</div><div><b>Client gửi ACK</b><p><code>ACK, ack = y+1</code>. Client xác nhận lại. Kết nối chính thức mở, có thể gửi dữ liệu.</p></div></div>
          </div>
          <div class="step-controls">
            <button class="primary-button" data-stepper-play>Chạy từng bước</button>
            <button class="secondary-button" data-stepper-reset>Làm lại</button>
          </div>
        </div>
        <div class="callout tip"><b>Vì sao phải ba bước?</b><p>Ba bước đảm bảo <b>cả hai chiều</b> đều thông: client biết server nhận được, server biết client nhận được. Hai bước không đủ vì server không biết ACK của mình có tới nơi hay không.</p></div>
        <h2>Kết thúc kết nối (bốn bước)</h2>
        <p>Kết thúc cần <b>bốn thông điệp</b> vì mỗi chiều đóng riêng (TCP full-duplex):</p>
        <div class="flow">
          <div class="flow-step"><b>1</b>A gửi FIN</div>
          <div class="flow-step"><b>2</b>B trả ACK</div>
          <div class="flow-step"><b>3</b>B gửi FIN</div>
          <div class="flow-step dark"><b>4</b>A trả ACK</div>
        </div>
        <p>Sau khi gửi ACK cuối, bên chủ động đóng chờ <b>2·MSL</b> (khoảng 2–4 phút, gọi là trạng thái <b>TIME_WAIT</b>) để các gói trễ của kết nối cũ trôi hết, tránh trùng số thứ tự với kết nối mới.</p>
      `,
      keyPoints: [
        "seq là vị trí byte đầu của segment; ack là byte kế tiếp bên nhận chờ.",
        "Bắt tay 3 bước: SYN → SYN+ACK → ACK, để mở kết nối hai chiều.",
        "Kết thúc cần 4 bước FIN/ACK vì mỗi chiều đóng riêng.",
        "TIME_WAIT chờ 2·MSL để gói trễ của kết nối cũ trôi hết."
      ]
    }
,
    {
      id: "ch3-6",
      title: "TCP: timeout, truyền lại & kiểm soát luồng",
      minutes: 15,
      keywords: ["RTT", "EstimatedRTT", "DevRTT", "timeout", "retransmit", "fast retransmit", "duplicate ACK", "flow control", "rwnd", "receive window", "nagle", "silly window"],
      intro: "TCP chọn khoảng chờ timeout bao lâu cho hợp lý, truyền lại nhanh bằng ACK trùng, và ngăn bên gửi làm ngập bộ đệm bên nhận.",
      body: `
        <h2>Ước lượng RTT và timeout</h2>
        <p>Timeout quá ngắn gây truyền lại thừa, quá dài làm phản ứng chậm. TCP ước lượng RTT bằng trung bình có trọng số (EWMA):</p>
        <div class="formula-box"><span>Trung bình động</span><span class="eq">EstimatedRTT = (1 − α)·EstimatedRTT + α·SampleRTT</span><small>α thường = 0,125. Cần thêm độ lệch để timeout phản ứng nhanh khi mạng biến động.</small></div>
        <div class="formula-box"><span>Độ lệch & timeout</span><span class="eq">DevRTT = (1 − β)·DevRTT + β·|SampleRTT − EstimatedRTT|</span><small>β thường = 0,25. <b>TimeoutInterval = EstimatedRTT + 4·DevRTT</b>. Khi timeout, TCP nhân đôi TimeoutInterval (exponential backoff).</small></div>
        <h2>Truyền lại nhanh (fast retransmit)</h2>
        <p>Thay vì chờ timer, TCP có thể phát hiện mất gói sớm hơn nhờ <b>ACK trùng</b>. Khi một gói mất, các gói sau vẫn đến và mỗi gói khiến bên nhận gửi lại ACK của byte bị thiếu.</p>
        <div class="flow">
          <div class="flow-step"><b>GỬI</b>Gói 1, 2, 3, 4 bay đi, gói 2 bị mất</div>
          <div class="flow-step"><b>NHẬN</b>Gói 3, 4 đến → gửi ACK(2) lặp lại</div>
          <div class="flow-step"><b>ĐẾM</b>Bên gửi nhận <b>3 ACK trùng</b></div>
          <div class="flow-step dark"><b>GỬI LẠI</b>Truyền lại gói 2 ngay, không chờ timer</div>
        </div>
        <div class="callout tip"><b>Vì sao là 3 ACK trùng?</b><p>Một hoặc hai ACK trùng có thể do gói đến lệch thứ tự (vô hại). Ba ACK trùng là tín hiệu đủ mạnh cho thấy gói thực sự mất, tránh truyền lại oan.</p></div>
        <h2>Kiểm soát luồng (flow control)</h2>
        <p>Mục tiêu: ngăn bên gửi làm <b>tràn bộ đệm bên nhận</b> khi ứng dụng nhận xử lý chậm. Bên nhận quảng cáo vùng trống còn lại trong trường <b>window (rwnd)</b> của mỗi ACK.</p>
        <div class="formula-box"><span>Giới hạn gửi</span><span class="eq">LastByteSent − LastByteAcked ≤ rwnd</span><small>rwnd thay đổi theo thời gian: bộ đệm càng đầy thì rwnd càng nhỏ; rwnd = 0 buộc bên gửi dừng, chỉ gửi gói thăm dò nhỏ để biết khi nào mở lại.</small></div>
        <div class="grid-2">
          <article class="card"><h3>Kiểm soát luồng</h3><p>Giới hạn bởi <b>rwnd</b> — vùng trống bộ đệm của <b>bên nhận</b>, chống tràn đích.</p></article>
          <article class="card"><h3>Kiểm soát tắc nghẽn</h3><p>Giới hạn bởi <b>cwnd</b> — ước lượng sức chứa của <b>mạng</b>, chống nghẽn đường truyền (bài sau).</p></article>
        </div>
        <div class="callout"><b>Silly window syndrome</b><p>Khi rwnd còn rất nhỏ, bên gửi có thể gửi những segment bé xíu gây lãng phí. Thuật toán <b>Nagle</b> (gộp dữ liệu nhỏ) và trì hoãn ACK giúp tránh tình trạng này.</p></div>
      `,
      keyPoints: [
        "TimeoutInterval = EstimatedRTT + 4·DevRTT, dùng EWMA để ước lượng.",
        "Timeout xảy ra thì nhân đôi TimeoutInterval (exponential backoff).",
        "3 ACK trùng → fast retransmit, truyền lại ngay không chờ timer.",
        "Flow control dùng rwnd (bộ đệm bên nhận); congestion control dùng cwnd (mạng)."
      ]
    }
,
    {
      id: "ch3-7",
      title: "Điều khiển tắc nghẽn TCP",
      minutes: 16,
      keywords: ["congestion", "tắc nghẽn", "cwnd", "slow start", "AIMD", "congestion avoidance", "Tahoe", "Reno", "fast recovery", "ssthresh", "fairness", "ECN", "BBR"],
      intro: "TCP tăng giảm cửa sổ gửi (cwnd) thế nào để vừa dùng hết đường truyền vừa không làm nghẽn mạng?",
      body: `
        <h2>Mục tiêu và công cụ</h2>
        <p>Tắc nghẽn xảy ra khi gửi quá nhanh so với sức chứa mạng, làm hàng đợi đầy và mất gói. TCP không được mạng báo trước sức chứa, nên tự <b>thăm dò</b> bằng cách tăng/giảm <b>cwnd</b> (congestion window).</p>
        <div class="formula-box"><span>Cửa sổ gửi thực tế</span><span class="eq">SendWindow = min(cwnd, rwnd)</span><small>rwnd là giới hạn bên nhận (flow control), cwnd là giới hạn mạng (congestion control). Gửi không vượt quá giá trị nhỏ hơn trong hai cái.</small></div>
        <h2>Hai pha tăng trưởng</h2>
        <div class="grid-2">
          <article class="card"><h3>Slow Start (khởi động chậm)</h3><p>Bắt đầu cwnd = 1 MSS, <b>nhân đôi mỗi RTT</b> (tăng theo cấp số nhân) đến khi đạt ngưỡng <b>ssthresh</b>. Gọi là “slow” vì khởi đầu từ 1, nhưng thực ra tăng rất nhanh.</p></article>
          <article class="card"><h3>Congestion Avoidance (tránh nghẽn)</h3><p>Sau khi vượt ssthresh, mỗi RTT chỉ <b>cộng 1 MSS</b> (tăng tuyến tính). Càng gần giới hạn càng cẩn trọng, giống AIMD.</p></article>
        </div>
        <h2>AIMD: tăng cộng, giảm nhân</h2>
        <div class="flow">
          <div class="flow-step"><b>TĂNG</b>Mỗi RTT không lỗi: cwnd + 1 MSS</div>
          <div class="flow-step"><b>PHÁT HIỆN</b>3 ACK trùng hoặc timeout</div>
          <div class="flow-step"><b>GIẢM</b>Chia cwnd còn một nửa</div>
          <div class="flow-step dark"><b>LẶP LẠI</b>Tiếp tục tăng chậm rồi lại giảm</div>
        </div>
        <div class="formula-box"><span>Nguyên tắc AIMD</span><span class="eq">Tăng cộng, giảm nhân</span><small>Mỗi RTT cộng 1 MSS; khi mất gói thì cwnd = cwnd / 2. Kết quả tạo hình răng cưa trên đồ thị.</small></div>
        <h2>Tahoe vs Reno</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Sự kiện</th><th>Tahoe</th><th>Reno</th></tr></thead>
          <tbody>
            <tr><td>3 ACK trùng</td><td>cwnd = 1, quay về slow start</td><td>cwnd = cwnd/2, vào fast recovery (nhanh hơn)</td></tr>
            <tr><td>Timeout</td><td>cwnd = 1, slow start</td><td>cwnd = 1, slow start</td></tr>
            <tr><td>Đặc điểm</td><td>Đơn giản, bảo thủ</td><td>Phục hồi nhanh sau lỗi nhẹ</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><b>Đồ thị hình răng cưa</b><p>cwnd tăng đều trong giai đoạn tránh nghẽn rồi đột ngột rơi xuống một nửa khi mất gói, tạo ra đường gấp khúc lặp đi lặp lại như răng cưa. Đây là đặc trưng của TCP cổ điển.</p></div>
        <svg viewBox="0 0 700 190" style="width:100%;height:auto;margin-top:6px" role="img" aria-label="Đồ thị cwnd hình răng cưa">
          <line x1="45" y1="160" x2="680" y2="160" stroke="#dfe3ec" stroke-width="1"/>
          <line x1="45" y1="20" x2="45" y2="160" stroke="#dfe3ec" stroke-width="1"/>
          <path d="M45 150 L120 110 L195 70 L270 45 L345 45 L345 85 L420 120 L495 150 L570 150 L570 75 L620 95 L680 115" fill="none" stroke="#3158d4" stroke-width="3"/>
          <path d="M345 45 L345 85 M570 150 L570 75" fill="none" stroke="#eaa563" stroke-width="2" stroke-dasharray="5 5"/>
          <text x="40" y="14" font-size="10" fill="#9aa1af">cwnd</text>
          <text x="640" y="176" font-size="10" fill="#9aa1af">RTT</text>
        </svg>
        <div class="callout tip"><b>Mở rộng hiện đại</b><p><b>ECN</b> cho phép router đánh dấu nghẽn trong gói thay vì đợi mất gói. <b>BBR</b> (của Google) đo băng thông và RTT để chọn cwnd tối ưu, tránh đợi mất gói — cho thông lượng cao hơn trên mạng có đệm lớn.</p></div>
      `,
      keyPoints: [
        "SendWindow = min(cwnd, rwnd): vừa tránh nghẽn mạng vừa không tràn bên nhận.",
        "Slow Start nhân đôi cwnd mỗi RTT; Congestion Avoidance cộng 1 MSS mỗi RTT.",
        "AIMD: tăng cộng, giảm nhân — tạo đồ thị răng cưa.",
        "Tahoe quay về slow start khi 3 ACK trùng; Reno dùng fast recovery."
      ]
    }
  ]
});
