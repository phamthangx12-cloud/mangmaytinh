window.MMT_CHAPTERS = window.MMT_CHAPTERS || [];
window.MMT_CHAPTERS.push({
  id: "ch2",
  label: "Chương 2",
  title: "Tầng ứng dụng",
  subtitle: "HTTP, DNS, email, FTP và P2P: các giao thức bạn dùng mỗi ngày hoạt động ra sao.",
  lessons: [
    {
      id: "ch2-1",
      title: "Kiến trúc ứng dụng & socket",
      minutes: 13,
      keywords: ["client server", "P2P", "peer to peer", "socket", "process", "port", "API", "client-server", "kiến trúc"],
      intro: "Ứng dụng mạng chọn kiến trúc client–server hay P2P? Hai tiến trình nói chuyện với nhau qua socket như thế nào?",
      body: `
        <h2>Hai kiến trúc ứng dụng</h2>
        <div class="grid-2">
          <article class="card">
            <span class="mini-label">KIẾN TRÚC 1</span>
            <h3>Client – Server</h3>
            <p>Có một <b>server luôn bật</b> với địa chỉ cố định, phục vụ yêu cầu từ nhiều client. Client chỉ giao tiếp với server, không trực tiếp với nhau.</p>
            <ul class="tick-list">
              <li>Dễ quản lý, tập trung dữ liệu.</li>
              <li>Server là điểm nghẽn và điểm lỗi duy nhất.</li>
              <li>Chi phí hạ tầng tăng theo số người dùng.</li>
            </ul>
            <div class="pill-row"><span class="pill">Web</span><span class="pill">Email</span><span class="pill green">DNS</span></div>
          </article>
          <article class="card tint">
            <span class="mini-label">KIẾN TRÚC 2</span>
            <h3>Peer-to-Peer (P2P)</h3>
            <p>Không cần server trung tâm. Các <b>peer</b> vừa là client vừa là server, trao đổi trực tiếp với nhau.</p>
            <ul class="tick-list">
              <li><b>Tự mở rộng</b>: mỗi peer mới vừa lấy vừa cho tài nguyên.</li>
              <li>Rẻ, bền vững, không có điểm lỗi duy nhất.</li>
              <li>Khó quản lý, bảo mật và tính sẵn sàng khó đảm bảo.</li>
            </ul>
            <div class="pill-row"><span class="pill violet">BitTorrent</span><span class="pill amber">Skype cũ</span><span class="pill">Blockchain</span></div>
          </article>
        </div>
        <h2>Tiến trình giao tiếp qua socket</h2>
        <p>Giao tiếp không phải giữa các chương trình, mà giữa các <b>tiến trình</b>. Một tiến trình muốn nhận dữ liệu phải có <b>định danh</b>: địa chỉ IP của máy + <b>số hiệu cổng</b> (port) của tiến trình.</p>
        <div class="formula-box"><span>Định danh tiến trình</span><span class="eq">IP + Port</span><small>Ví dụ: 192.168.1.10:8080 — máy nào, tiến trình nào.</small></div>
        <p><b>Socket</b> là “cánh cửa” để tiến trình đẩy/nhận dữ liệu. Ứng dụng ghi dữ liệu vào socket, phần còn lại do tầng giao vận đảm nhiệm. Socket là giao diện giữa tầng ứng dụng và tầng giao vận.</p>
        <div class="flow">
          <div class="flow-step"><b>TIẾN TRÌNH A</b>Ghi dữ liệu vào socket</div>
          <div class="flow-step"><b>SOCKET</b>Cổng nguồn → cổng đích</div>
          <div class="flow-step"><b>TẦNG GIAO VẬN</b>TCP hoặc UDP đóng segment</div>
          <div class="flow-step"><b>MẠNG</b>Chuyển đến host đích</div>
          <div class="flow-step dark"><b>TIẾN TRÌNH B</b>Đọc từ socket của mình</div>
        </div>
        <h2>Nhu cầu dịch vụ của ứng dụng</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Ứng dụng</th><th>Mất dữ liệu</th><th>Băng thông</th><th>Nhạy cảm trễ</th></tr></thead>
          <tbody>
            <tr><td>Web, email, truyền file</td><td>Không cho phép</td><td>Linh hoạt</td><td>Không</td></tr>
            <tr><td>Gọi thoại, video hội họp</td><td>Có thể chấp nhận ít</td><td>Ít, nhưng ổn định</td><td>Có (100 ms)</td></tr>
            <tr><td>Game online</td><td>Không</td><td>Ít</td><td>Có (vài chục ms)</td></tr>
            <tr><td>Streaming phim</td><td>Không</td><td>Lớn, linh hoạt</td><td>Ít (đệm được)</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Chọn TCP hay UDP?</b><p>Ứng dụng cần truyền chính xác 100% (web, email, file) dùng <b>TCP</b>. Ứng dụng chịu được mất ít dữ liệu nhưng cần nhanh (thoại, video trực tiếp) dùng <b>UDP</b>. Streaming phim dùng TCP vì phát lại được nhờ bộ đệm.</p></div>
      `,
      keyPoints: [
        "Client–server tập trung; P2P tự mở rộng vì mỗi peer vừa cho vừa nhận.",
        "Tiến trình được định danh bằng IP + port.",
        "Socket là giao diện giữa tầng ứng dụng và tầng giao vận.",
        "Chọn TCP khi cần chính xác, UDP khi cần nhanh và chấp nhận mất mát nhỏ."
      ]
    }
,
    {
      id: "ch2-2",
      title: "HTTP & Web",
      minutes: 16,
      keywords: ["http", "https", "request", "response", "cookie", "cache", "get", "post", "persistent", "pipelining", "http2", "http3", "ETag", "status code"],
      intro: "Trình duyệt tải một trang web bằng HTTP như thế nào, và vì sao có cookie, cache cùng HTTP/2, HTTP/3?",
      body: `
        <h2>HTTP là giao thức request–response</h2>
        <p>HTTP chạy trên TCP (cổng 80; HTTPS cổng 443 với TLS). Client gửi <b>request</b>, server trả <b>response</b>. HTTP <b>không trạng thái</b>: server không nhớ gì giữa các yêu cầu — đó là lý do cần cookie.</p>
        <pre class="code"><span class="c"># Request từ trình duyệt</span>
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

<span class="c"># Response từ server</span>
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 3420
&lt;html&gt;…</pre>
        <h2>Phương thức và mã trạng thái</h2>
        <div class="grid-2">
          <article class="card"><h3>Phương thức chính</h3><ul class="tick-list"><li><b>GET</b> — lấy tài nguyên.</li><li><b>POST</b> — gửi dữ liệu (form).</li><li><b>PUT</b> — cập nhật/thay thế.</li><li><b>DELETE</b> — xóa tài nguyên.</li><li><b>HEAD</b> — chỉ lấy header, không lấy nội dung.</li></ul></article>
          <article class="card"><h3>Mã trạng thái</h3><ul class="tick-list"><li><b>2xx</b> thành công (200 OK).</li><li><b>3xx</b> chuyển hướng (301, 304).</li><li><b>4xx</b> lỗi client (404 Not Found).</li><li><b>5xx</b> lỗi server (503).</li></ul></article>
        </div>
        <h2>Cookie: HTTP nhớ được nhờ đâu?</h2>
        <div class="flow">
          <div class="flow-step"><b>LẦN ĐẦU</b>Server gửi header <code>Set-Cookie: 1678</code></div>
          <div class="flow-step"><b>TRÌNH DUYỆT</b>Lưu cookie trong máy</div>
          <div class="flow-step"><b>CÁC LẦN SAU</b>Gửi kèm <code>Cookie: 1678</code></div>
          <div class="flow-step dark"><b>SERVER</b>Nhận ra người dùng cũ</div>
        </div>
        <p>Cookie giúp duy trì <b>phiên làm việc</b>: giỏ hàng, đăng nhập, gợi ý. Đổi lại, cookie là công cụ bị dùng để <b>theo dõi</b> hành vi người dùng.</p>
        <h2>Kết nối lâu dài (persistent)</h2>
        <p>Phiên bản HTTP/1.0 mở một TCP cho mỗi đối tượng (non-persistent) — rất lãng phí. HTTP/1.1 mở <b>một kết nối TCP dùng cho nhiều đối tượng</b> (persistent), có thể gửi nhiều yêu cầu liên tiếp (pipelining).</p>
        <div class="formula-box"><span>Thời gian tải trang</span><span class="eq">t = 2·RTT + n·(L/R)</span><small>Non-persistent với n đối tượng, mỗi đối tượng L bit: mỗi đối tượng tốn thêm một RTT để mở TCP. Persistent chỉ trả 2 RTT cho cả trang, sau đó các đối tượng chỉ tốn L/R.</small></div>
        <h2>Web cache & conditional GET</h2>
        <p>Proxy/browser lưu bản sao tài nguyên để trả nhanh và giảm tải server. Khi cache hỏi lại server, nó gửi kèm thời điểm sửa đổi:</p>
        <div class="callout"><b>Ví dụ</b><p>Request: <code>If-Modified-Since: ...</code> hoặc <code>If-None-Match: ETag</code>. Nếu tài nguyên chưa đổi, server trả <code>304 Not Modified</code> mà <b>không kèm nội dung</b> — tiết kiệm băng thông. Cache là nền tảng của CDN.</p></div>
        <h2>HTTP/2 và HTTP/3</h2>
        <div class="grid-2">
          <article class="card"><h3>HTTP/2</h3><p>Ghép nhiều request/response trên <b>một kết nối TCP</b> (multiplexing), nén header, server push. Giảm số kết nối và độ trễ.</p></article>
          <article class="card"><h3>HTTP/3</h3><p>Chạy trên <b>QUIC</b> (UDP) thay vì TCP, có mã hóa sẵn và khôi phục nhanh hơn khi mất gói, đặc biệt tốt trên di động.</p></article>
        </div>
      `,
      keyPoints: [
        "HTTP không trạng thái; cookie duy trì phiên làm việc.",
        "2xx thành công, 3xx chuyển hướng, 4xx lỗi client, 5xx lỗi server.",
        "Persistent HTTP dùng một TCP cho nhiều đối tượng, nhanh hơn non-persistent.",
        "Conditional GET (If-Modified-Since / ETag) cho phép cache trả 304 mà không tải lại."
      ]
    }
,
    {
      id: "ch2-3",
      title: "Email: SMTP, POP3, IMAP",
      minutes: 11,
      keywords: ["email", "SMTP", "POP3", "IMAP", "MIME", "mail server", "user agent", "thư điện tử"],
      intro: "Email dùng SMTP để gửi và POP3/IMAP để nhận. Vì sao một thư cần tới ba giao thức?",
      body: `
        <h2>Ba thành phần của hệ thống email</h2>
        <div class="flow">
          <div class="flow-step"><b>USER AGENT</b>Outlook, Gmail, Thunderbird</div>
          <div class="flow-step"><b>MAIL SERVER</b>Hộp thư + hàng đợi gửi</div>
          <div class="flow-step"><b>SMTP</b>Giao thức “đẩy” thư giữa các server</div>
          <div class="flow-step dark"><b>POP3 / IMAP</b>Giao thức “kéo” thư về đọc</div>
        </div>
        <ul class="tick-list">
          <li><b>SMTP</b> đẩy thư từ người gửi đến server nhận (cổng 25/587).</li>
          <li><b>POP3</b> tải thư về máy, mặc định xóa trên server (cổng 110).</li>
          <li><b>IMAP</b> giữ thư trên server, đồng bộ nhiều thiết bị (cổng 143).</li>
        </ul>
        <h2>Đặc điểm của SMTP</h2>
        <div class="grid-2">
          <article class="card"><h3>SMTP làm gì?</h3><p>Chạy trên TCP, dùng <b>dòng lệnh văn bản</b> với mã trả lời 3 chữ số. Ví dụ <code>HELO</code>, <code>MAIL FROM</code>, <code>RCPT TO</code>, <code>DATA</code>, kết thúc bằng <code>QUIT</code>.</p></article>
          <article class="card"><h3>Giới hạn nổi tiếng</h3><p>SMTP gốc chỉ chấp nhận thân thư <b>7-bit ASCII</b>. Để gửi ảnh, file đính kèm, tiếng Việt có dấu, người ta dùng <b>MIME</b> để mã hóa thành văn bản ASCII.</p></article>
        </div>
        <h2>SMTP so với HTTP</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Tiêu chí</th><th>SMTP</th><th>HTTP</th></tr></thead>
          <tbody>
            <tr><td>Hướng dữ liệu</td><td>Đẩy (push) từ nơi gửi</td><td>Kéo (pull) theo yêu cầu client</td></tr>
            <tr><td>Nội dung</td><td>Bắt buộc mã hóa 7-bit (MIME)</td><td>Nhị phân, đa dạng</td></tr>
            <tr><td>Ai mở kết nối</td><td>Server gửi mở kết nối tới server nhận</td><td>Client mở kết nối tới server</td></tr>
            <tr><td>Tương tác</td><td>Nhiều lệnh trên một kết nối</td><td>Mỗi request độc lập, không trạng thái</td></tr>
          </tbody>
        </table></div>
        <h2>Hành trình một email</h2>
        <div class="flow">
          <div class="flow-step"><b>1 · GỬI</b>UA của A gửi thư qua SMTP tới mail server A</div>
          <div class="flow-step"><b>2 · TRUYỀN</b>Server A dùng SMTP đẩy tới server B</div>
          <div class="flow-step"><b>3 · LƯU</b>Thư nằm trong hộp thư của B trên server B</div>
          <div class="flow-step dark"><b>4 · ĐỌC</b>UA của B kéo thư về bằng POP3/IMAP</div>
        </div>
        <div class="callout tip"><b>Vì sao không dùng SMTP để nhận?</b><p>SMTP là giao thức <b>đẩy</b>, thiết kế để chuyển thư giữa các server. Việc người dùng truy cập hộp thư cần thao tác đồng bộ, xóa, đánh dấu… nên dùng giao thức <b>truy cập</b> riêng là POP3 (tải về) hoặc IMAP (đồng bộ nhiều thiết bị).</p></div>
      `,
      keyPoints: [
        "SMTP đẩy thư giữa các mail server; POP3/IMAP để người dùng nhận thư.",
        "SMTP chỉ gửi 7-bit ASCII; MIME mã hóa ảnh, file, tiếng Việt có dấu.",
        "POP3 tải về và xóa trên server; IMAP giữ trên server, đồng bộ nhiều thiết bị.",
        "SMTP là push, HTTP là pull — hai mô hình khác nhau về hướng dữ liệu."
      ]
    }
,
    {
      id: "ch2-4",
      title: "DNS – Hệ thống tên miền",
      minutes: 16,
      keywords: ["dns", "domain", "tên miền", "root", "TLD", "authoritative", "resolver", "A record", "CNAME", "MX", "NS", "recursive", "iterative", "TTL", "caching"],
      intro: "Con người nhớ tên, máy nhớ số. DNS biến tên miền thành địa chỉ IP qua một cơ sở dữ liệu phân tán theo cấp bậc.",
      body: `
        <h2>DNS làm gì?</h2>
        <p>DNS (Domain Name System) là <b>danh bạ của Internet</b>: ánh xạ tên miền thân thiện (www.example.com) thành địa chỉ IP. DNS là giao thức tầng ứng dụng chạy trên <b>UDP cổng 53</b> (và TCP cho truy vấn lớn/chuyển vùng).</p>
        <h2>Cấu trúc phân cấp</h2>
        <div class="layer-stack">
          <div class="layer"><span class="num">0</span><strong>Root</strong><em>13 cụm máy chủ gốc, đỉnh của cây tên miền</em><span class="pdu">.</span></div>
          <div class="layer"><span class="num">1</span><strong>TLD</strong><em>Top-Level Domain: .com, .vn, .edu, .org, .net…</em><span class="pdu">.com</span></div>
          <div class="layer"><span class="num">2</span><strong>Authoritative</strong><em>Máy chủ của tổ chức sở hữu tên miền</em><span class="pdu">example.com</span></div>
          <div class="layer hl"><span class="num">3</span><strong>Bản ghi</strong><em>Ánh xạ tên → IP, mail server, bí danh…</em><span class="pdu">www → 93.184.216.34</span></div>
        </div>
        <h2>Các loại bản ghi phổ biến</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Loại</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>Tên máy → IPv4</td><td>www.example.com → 93.184.216.34</td></tr>
            <tr><td>AAAA</td><td>Tên máy → IPv6</td><td>→ 2606:2800:220:1::…</td></tr>
            <tr><td>CNAME</td><td>Bí danh → tên chuẩn</td><td>www → example.com</td></tr>
            <tr><td>MX</td><td>Mail server của miền</td><td>example.com → mail.example.com</td></tr>
            <tr><td>NS</td><td>Máy chủ tên miền của miền</td><td>example.com → ns1.example.com</td></tr>
          </tbody>
        </table></div>
        <h2>Hai kiểu truy vấn</h2>
        <div class="grid-2">
          <article class="card"><h3>Recursive (đệ quy)</h3><p>Resolver của bạn <b>chịu trách nhiệm hỏi hộ</b> toàn bộ chuỗi và trả kết quả cuối cùng. Người dùng chỉ gửi một câu hỏi, nhận một câu trả lời.</p></article>
          <article class="card"><h3>Iterative (lặp)</h3><p>Mỗi server trả lời <b>“tôi không biết, hãy hỏi chỗ này”</b>. Resolver lần lượt hỏi root → TLD → authoritative cho đến khi có câu trả lời.</p></article>
        </div>
        <div class="callout"><b>Caching & TTL</b><p>Mọi câu trả lời DNS đều có <b>TTL</b> (thời gian sống). Resolver lưu kết quả vào cache đến khi hết TTL, giúp truy vấn sau nhanh hơn nhiều. Vì vậy đổi IP của miền phải chờ cache hết hạn mới lan rộng.</p></div>
        <div class="widget" data-widget="stepper">
          <div class="widget-head"><h3>Mô phỏng phân giải tên miền</h3><span>www.example.com</span></div>
          <div class="step-list" data-stepper-list>
            <div class="step-item"><div class="dot">1</div><div><b>Bộ nhớ đệm trình duyệt</b><p>Trình duyệt kiểm tra cache riêng trước.</p></div></div>
            <div class="step-item"><div class="dot">2</div><div><b>Cache hệ điều hành</b><p>Hệ điều hành có một bộ đệm DNS riêng.</p></div></div>
            <div class="step-item"><div class="dot">3</div><div><b>Resolver nội bộ</b><p>Máy chủ DNS của nhà mạng/công ty nhận truy vấn.</p></div></div>
            <div class="step-item"><div class="dot">4</div><div><b>Hỏi root server</b><p>Root trả lời: “hỏi máy chủ quản lý .com”.</p></div></div>
            <div class="step-item"><div class="dot">5</div><div><b>Hỏi TLD .com</b><p>TLD trả lời: “hỏi máy chủ của example.com”.</p></div></div>
            <div class="step-item"><div class="dot">6</div><div><b>Hỏi authoritative</b><p>Máy chủ của example.com trả IP chính xác.</p></div></div>
            <div class="step-item"><div class="dot">7</div><div><b>Lưu cache & trả kết quả</b><p>Resolver lưu kết quả theo TTL rồi trả IP cho trình duyệt.</p></div></div>
            <div class="step-item"><div class="dot">8</div><div><b>Trình duyệt kết nối</b><p>Mở TCP tới địa chỉ IP vừa nhận được.</p></div></div>
          </div>
          <div class="step-controls">
            <button class="primary-button" data-stepper-play>Chạy từng bước</button>
            <button class="secondary-button" data-stepper-reset>Làm lại</button>
          </div>
        </div>
        <div class="callout warn"><b>DNS và bảo mật</b><p>DNS gốc chạy không mã hóa nên dễ bị nghe lén, giả mạo (<b>DNS spoofing</b>) dẫn người dùng tới trang giả. <b>DNS over HTTPS/TLS</b> (DoH/DoT) mã hóa truy vấn. DNS cũng là mục tiêu DDoS lớn — hạ DNS của một nhà cung cấp là “tắt điện” cả một vùng dịch vụ.</p></div>
      `,
      keyPoints: [
        "DNS ánh xạ tên miền thành IP, chạy trên UDP cổng 53.",
        "Cây DNS: root → TLD → authoritative → bản ghi.",
        "Bản ghi chính: A (IPv4), AAAA (IPv6), CNAME (bí danh), MX (mail), NS (name server).",
        "Caching theo TTL giúp truy vấn nhanh; recursive để resolver hỏi hộ, iterative để đi từng bậc."
      ]
    }
,
    {
      id: "ch2-5",
      title: "FTP, P2P & BitTorrent",
      minutes: 13,
      keywords: ["ftp", "control connection", "data connection", "p2p", "bittorrent", "torrent", "tracker", "rarest first", "tit-for-tat", "chunk", "file distribution"],
      intro: "Truyền file theo kiểu client–server bằng FTP, và chia sẻ file quy mô lớn theo kiểu P2P bằng BitTorrent.",
      body: `
        <h2>FTP: hai kết nối, một phiên</h2>
        <p>FTP dùng <b>hai kết nối TCP song song</b>. Kết nối <b>điều khiển</b> (cổng 21) duy trì lệnh và trạng thái; kết nối <b>dữ liệu</b> (cổng 20) chỉ mở khi thực sự truyền file.</p>
        <div class="grid-2">
          <article class="card"><h3>Kết nối điều khiển (21)</h3><p>Gửi lệnh: <code>USER</code>, <code>PASS</code>, <code>LIST</code>, <code>RETR file</code>, <code>STOR file</code>. Giữ mở suốt phiên nên FTP là giao thức <b>có trạng thái</b>.</p></article>
          <article class="card"><h3>Kết nối dữ liệu (20)</h3><p>Mở mới cho mỗi lần truyền file, đóng sau khi xong. Hướng mở kết nối khác nhau giữa chế độ <b>active</b> (server mở về client) và <b>passive</b> (client mở ra server).</p></article>
        </div>
        <div class="callout"><b>FTP vs HTTP</b><p>HTTP truyền file qua <b>một kết nối</b> và không trạng thái; FTP dùng hai kết nối và có trạng thái. HTTP cũng dần thay thế FTP cho việc tải file nhờ đơn giản và tường lửa thân thiện hơn.</p></div>
        <h2>P2P: phân phối file hiệu quả theo số người dùng</h2>
        <p>Gọi F là kích thước file, N là số máy nhận, u là tốc độ tải lên. Thời gian phân phối F tới N máy:</p>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th>Mô hình</th><th>Thời gian xấp xỉ</th></tr></thead>
          <tbody>
            <tr><td>Client–server</td><td><code>max{ N·F/u_server, F/d_min }</code> — tăng tuyến tính theo N</td></tr>
            <tr><td>P2P</td><td><code>max{ F/u_server, F/d_min, N·F/(u_server + Σu_i) }</code> — gần như không đổi khi N lớn</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Vì sao P2P mở rộng tốt?</b><p>Mỗi peer mới vừa tải về vừa <b>chia sẻ lên</b>, nên tổng băng thông tải lên tăng theo N. Client–server thì server là nút cổ chai duy nhất.</p></div>
        <h2>BitTorrent hoạt động thế nào?</h2>
        <div class="flow">
          <div class="flow-step"><b>TORRENT</b>File .torrent chứa thông tin về các chunk</div>
          <div class="flow-step"><b>TRACKER</b>Danh sách các peer đang có file</div>
          <div class="flow-step"><b>SWARM</b>Các peer tải chunk lẫn nhau</div>
          <div class="flow-step dark"><b>SEED</b>Peer có đủ file, chỉ chia sẻ</div>
        </div>
        <ul class="tick-list">
          <li>File được chia thành <b>chunk</b>; có đủ các chunk là có thể dựng lại file.</li>
          <li><b>Rarest first</b>: ưu tiên tải chunk hiếm nhất để giữ sự đa dạng trong swarm.</li>
          <li><b>Tit-for-tat</b>: ưu tiên gửi cho peer nào gửi lại cho mình nhiều, chống “ăn không”.</li>
          <li>Peer tải xong có thể trở thành <b>seeder</b>, tăng sức khỏe của cả swarm.</li>
        </ul>
        <div class="callout warn"><b>Lưu ý</b><p>BitTorrent là công nghệ hợp pháp (nhiều bản Linux dùng nó để phân phối), nhưng chia sẻ nội dung có bản quyền là vi phạm pháp luật. Hãy chỉ dùng với nội dung được phép.</p></div>
      `,
      keyPoints: [
        "FTP dùng kết nối điều khiển (21) và kết nối dữ liệu (20); có trạng thái.",
        "Client–server tăng tuyến tính theo N; P2P gần như không đổi nhờ peer chia sẻ lên.",
        "BitTorrent chia file thành chunk, dùng tracker để tìm peer.",
        "Rarest first giữ đa dạng chunk; tit-for-tat thưởng peer chia sẻ tốt."
      ]
    }
,
    {
      id: "ch2-6",
      title: "Video streaming & CDN",
      minutes: 12,
      keywords: ["video", "streaming", "DASH", "adaptive", "bitrate", "CDN", "content delivery", "buffer", "đệm", "DNS redirection", "netflix"],
      intro: "Video chiếm phần lớn lưu lượng Internet. Làm sao phát mượt trên đường truyền chập chờn? Câu trả lời là DASH và CDN.",
      body: `
        <h2>Thách thức của video</h2>
        <p>Video có dung lượng lớn và cần phát <b>liên tục</b>. Nếu tải về nguyên file mới phát, người xem phải chờ rất lâu. Giải pháp là <b>streaming</b>: phát từng phần trong khi vẫn tải các phần sau.</p>
        <h2>DASH: thích ứng theo đường truyền</h2>
        <div class="flow">
          <div class="flow-step"><b>MÃ HÓA</b>Một video được mã hóa thành nhiều mức bitrate</div>
          <div class="flow-step"><b>CHIA ĐOẠN</b>Cắt thành các đoạn nhỏ vài giây</div>
          <div class="flow-step"><b>MANIFEST</b>File mô tả các đoạn và URL tải</div>
          <div class="flow-step dark"><b>CHỌN MỨC</b>Client đo băng thông để chọn bitrate phù hợp</div>
        </div>
        <p>Bộ đệm (buffer) hấp thụ sự biến động: băng thông giảm thì hạ bitrate để không giật, băng thông tăng thì nâng bitrate để hình nét hơn. Đây gọi là <b>adaptive bitrate streaming</b>.</p>
        <div class="callout tip"><b>Vì sao phim mới bắt đầu có thể mờ?</b><p>Client khởi đầu với bitrate thấp để bắt đầu phát nhanh, sau đó đo được băng thông tốt mới nâng dần chất lượng. Đó là hành vi bình thường của DASH.</p></div>
        <h2>CDN: đưa nội dung lại gần người xem</h2>
        <p>Một server duy nhất không đủ phục vụ hàng triệu người xem toàn cầu. <b>CDN</b> (Content Delivery Network) đặt bản sao nội dung ở nhiều <b>trung tâm dữ liệu biên</b> khắp nơi.</p>
        <div class="grid-2">
          <article class="card"><h3>Enter deep</h3><p>Đặt máy chủ <b>sâu trong mạng nhà cung cấp</b>, gần người dùng nhất nhưng phải quản lý nhiều điểm.</p></article>
          <article class="card"><h3>Bring home</h3><p>Đặt ít máy chủ lớn tại <b>điểm trao đổi lưu lượng (IXP)</b>, ít điểm hơn nhưng xa người dùng hơn.</p></article>
        </div>
        <h2>Làm sao CDN chọn server gần nhất?</h2>
        <div class="flow">
          <div class="flow-step"><b>1 · YÊU CẦU</b>Bạn gõ tên miền video</div>
          <div class="flow-step"><b>2 · DNS</b>Hệ thống DNS được cấu hình trỏ tới CDN</div>
          <div class="flow-step"><b>3 · ĐỊNH TUYẾN</b>CDN chọn server biên gần/bé nhất</div>
          <div class="flow-step dark"><b>4 · PHÁT</b>Video được gửi từ server gần bạn</div>
        </div>
        <p>Kỹ thuật <b>DNS redirection</b> giúp CDN trả IP khác nhau cho cùng một tên miền tùy vị trí người hỏi, nhờ vậy mỗi người được phục vụ bởi server gần mình.</p>
      `,
      keyPoints: [
        "Streaming phát từng phần song song với tải, không cần tải cả file.",
        "DASH chia video thành nhiều mức bitrate và đoạn nhỏ, chọn mức theo băng thông.",
        "Bộ đệm hấp thụ biến động đường truyền.",
        "CDN đặt bản sao ở nhiều nơi; DNS redirection chọn server gần người dùng."
      ]
    }
,
    {
      id: "ch2-7",
      title: "Lập trình socket thực hành",
      minutes: 15,
      keywords: ["socket", "python", "udp", "tcp", "lập trình", "bind", "sendto", "recvfrom", "listen", "accept", "connect"],
      intro: "Nhìn tận mắt cách một tiến trình tạo socket, gửi và nhận dữ liệu bằng Python với UDP và TCP.",
      body: `
        <h2>Socket UDP (không kết nối)</h2>
        <p>UDP giống gửi bưu thiếp: địa chỉ đích ghi trên từng gói, không cần bắt tay trước. Client gửi, server nhận rồi đáp lại.</p>
        <pre class="code"><span class="c"># Server UDP (server_udp.py)</span>
<span class="k">import</span> socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((<span class="s">'0.0.0.0'</span>, 12000))          <span class="c"># lắng nghe cổng 12000</span>
<span class="k">while</span> True:
    data, addr = s.recvfrom(2048)         <span class="c"># nhận tối đa 2048 byte</span>
    msg = data.decode().upper()           <span class="c"># in hoa</span>
    s.sendto(msg.encode(), addr)          <span class="c"># trả về nơi gửi</span></pre>
        <pre class="code"><span class="c"># Client UDP (client_udp.py)</span>
<span class="k">import</span> socket
c = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
msg = input(<span class="s">'Nhập chữ thường: '</span>)
c.sendto(msg.encode(), (<span class="s">'127.0.0.1'</span>, 12000))
data, _ = c.recvfrom(2048)
print(data.decode())
c.close()</pre>
        <h2>Socket TCP (có kết nối)</h2>
        <p>TCP giống cuộc gọi: phải thiết lập kết nối trước. Server <code>listen</code> và <code>accept</code>; client <code>connect</code> rồi gửi.</p>
        <pre class="code"><span class="c"># Server TCP (server_tcp.py)</span>
<span class="k">import</span> socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((<span class="s">'0.0.0.0'</span>, 12000))
s.listen(1)                              <span class="c"># sẵn sàng nhận kết nối</span>
<span class="k">while</span> True:
    conn, addr = s.accept()              <span class="c"># chờ client, tạo socket riêng</span>
    data = conn.recv(2048)
    conn.send(data.upper())
    conn.close()</pre>
        <pre class="code"><span class="c"># Client TCP (client_tcp.py)</span>
<span class="k">import</span> socket
c = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
c.connect((<span class="s">'127.0.0.1'</span>, 12000))       <span class="c"># bắt tay 3 bước ở đây</span>
c.send(input(<span class="s">'Nhập chữ: '</span>).encode())
print(c.recv(2048).decode())
c.close()</pre>
        <h2>Khác biệt then chốt</h2>
        <div class="table-wrap"><table class="compare-table">
          <thead><tr><th></th><th>UDP</th><th>TCP</th></tr></thead>
          <tbody>
            <tr><td>Thiết lập</td><td>Không cần</td><td>connect/accept (bắt tay 3 bước)</td></tr>
            <tr><td>API gửi/nhận</td><td><code>sendto</code> / <code>recvfrom</code></td><td><code>send</code> / <code>recv</code></td></tr>
            <tr><td>Mỗi gói có địa chỉ?</td><td>Có, ghi đích từng gói</td><td>Không, địa chỉ cố định từ lúc connect</td></tr>
            <tr><td>Tin cậy</td><td>Không đảm bảo</td><td>Đảm bảo, có thứ tự</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><b>Thử tại nhà</b><p>Lưu hai file trên, mở hai cửa sổ terminal: chạy <code>python server_tcp.py</code> trước, rồi <code>python client_tcp.py</code>. Gõ chữ thường và xem server in hoa trả về — bạn đã lập trình mạng đầu tiên!</p></div>
      `,
      keyPoints: [
        "UDP: sendto/recvfrom, không cần kết nối, địa chỉ ghi trên từng gói.",
        "TCP: listen/accept ở server, connect ở client, dùng send/recv.",
        "Server TCP dùng socket riêng cho mỗi client sau accept.",
        "TCP đảm bảo tin cậy và thứ tự; UDP thì không."
      ]
    }
  ]
});
