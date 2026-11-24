/* ============================================================
   MMT Lab – interactive widgets
   ============================================================ */
(function () {
  "use strict";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function fmtTime(t) {
    if (!num(t)) return "—";
    if (t >= 1) return t.toFixed(3) + " s";
    if (t >= 1e-3) return (t * 1e3).toFixed(3) + " ms";
    return (t * 1e6).toFixed(2) + " µs";
  }
  function bin16(n) { return ("0000000000000000" + (n >>> 0).toString(2)).slice(-16); }
  function hex16(n) { return "0x" + ("0000" + (n >>> 0).toString(16).toUpperCase()).slice(-4); }

  /* ---------- Delay calculator ---------- */
  function runDelay(root) {
    var L = parseFloat($("[data-delay-l]", root).value);
    var R = parseFloat($("[data-delay-r]", root).value);
    var d = parseFloat($("[data-delay-d]", root).value);
    var s = parseFloat($("[data-delay-s]", root).value);
    var out = $("[data-delay-out]", root);
    if (!num(L) || !num(R) || !num(d) || !num(s) || L <= 0 || R <= 0 || d < 0 || s <= 0) {
      out.innerHTML = '<span class="err">Vui lòng nhập số dương hợp lệ cho L, R, d và tốc độ sóng.</span>';
      return;
    }
    var transmission = (L * 8) / (R * 1e6);
    var propagation = (d * 1000) / (s * 1e8);
    var total = transmission + propagation;
    var ratio = transmission > 0 ? propagation / transmission : 0;
    out.innerHTML =
      '<h4>Kết quả</h4>' +
      '<div class="result-grid">' +
        '<div class="result-cell"><span>Trễ truyền (L/R)</span><b>' + fmtTime(transmission) + '</b></div>' +
        '<div class="result-cell"><span>Trễ lan truyền (d/s)</span><b>' + fmtTime(propagation) + '</b></div>' +
        '<div class="result-cell"><span>Tổng (bỏ qua hàng đợi)</span><b>' + fmtTime(total) + '</b></div>' +
        '<div class="result-cell"><span>Lan truyền / truyền</span><b>×' + ratio.toFixed(2) + '</b></div>' +
      '</div>' +
      '<p class="hint">Trễ lan truyền chiếm ' + ((propagation / total) * 100).toFixed(1) +
      '% tổng trễ. Tăng kích thước gói làm trễ truyền tăng, nhưng không ảnh hưởng trễ lan truyền.</p>';
  }

  /* ---------- One's complement checksum ---------- */
  function parseCsWord(tok) {
    tok = tok.trim();
    if (!tok) return NaN;
    if (/^0x[0-9a-f]+$/i.test(tok)) {
      var h = parseInt(tok, 16);
      return h >= 0 && h <= 0xffff ? h : NaN;
    }
    if (/^[01]+$/.test(tok) && tok.length > 1 && tok.length <= 16) return parseInt(tok, 2);
    if (/^\d+$/.test(tok)) {
      var n = parseInt(tok, 10);
      return n >= 0 && n <= 0xffff ? n : NaN;
    }
    return NaN;
  }

  function runChecksum(root) {
    var input = $("[data-cs-input]", root).value;
    var out = $("[data-cs-output]", root);
    var raw = input.split(/[\s,;]+/).filter(Boolean);
    if (!raw.length) {
      out.innerHTML = '<span class="err">Hãy nhập ít nhất một từ 16 bit.</span>';
      return;
    }
    var words = [];
    for (var i = 0; i < raw.length; i++) {
      var w = parseCsWord(raw[i]);
      if (!num(w)) {
        out.innerHTML = '<span class="err">Không đọc được “' + esc(raw[i]) + '”. Dùng 0x…, dãy 0/1 tối đa 16 bit, hoặc số 0–65535.</span>';
        return;
      }
      words.push(w);
    }
    var sum = 0;
    for (var j = 0; j < words.length; j++) sum += words[j];
    var folded = sum;
    var wraps = 0;
    while (folded > 0xffff) {
      folded = (folded & 0xffff) + Math.floor(folded / 0x10000);
      wraps++;
    }
    var checksum = (~folded) & 0xffff;
    var verify = (folded + checksum) & 0xffff;
    var rows = words.map(function (w, idx) {
      return '<span>' + bin16(w) + '</span>  <span class="hl">(từ ' + (idx + 1) + ' = ' + hex16(w) + ')</span>';
    }).join('<br>');
    out.innerHTML =
      '<h4>Các từ 16 bit</h4>' +
      '<div class="binary">' + rows + '</div>' +
      '<div class="result-grid" style="margin-top:10px">' +
        '<div class="result-cell"><span>Tổng ban đầu</span><b>' + hex16(sum) + '</b></div>' +
        '<div class="result-cell"><span>Số lần cộng tràn</span><b>' + wraps + '</b></div>' +
        '<div class="result-cell"><span>Sau khi wrap</span><b>' + hex16(folded) + '</b></div>' +
        '<div class="result-cell"><span>Checksum (đảo bit)</span><b>' + hex16(checksum) + ' (' + bin16(checksum) + ')</b></div>' +
      '</div>' +
      '<p class="hint"><span class="ok">Kiểm tra:</span> tổng sau wrap + checksum = ' + hex16(verify) +
      (verify === 0xffff ? ' → toàn bit 1, dữ liệu hợp lệ.' : ' → không đạt toàn bit 1, hãy kiểm tra lại.') + '</p>';
  }

  /* ---------- Subnet calculator ---------- */
  function parseIpv4(text) {
    var parts = String(text).trim().split(".");
    if (parts.length !== 4) return null;
    var n = 0;
    for (var i = 0; i < 4; i++) {
      if (!/^\d{1,3}$/.test(parts[i])) return null;
      var v = parseInt(parts[i], 10);
      if (v > 255) return null;
      n = ((n << 8) | v) >>> 0;
    }
    return n;
  }
  function ipv4Str(n) {
    return [24, 16, 8, 0].map(function (s) { return (n >>> s) & 255; }).join(".");
  }

  function runSubnet(root) {
    var ipText = $("[data-subnet-ip]", root).value;
    var prefix = parseInt($("[data-subnet-prefix]", root).value, 10);
    var out = $("[data-subnet-out]", root);
    var ip = parseIpv4(ipText);
    if (ip === null) {
      out.innerHTML = '<span class="err">Địa chỉ IPv4 không hợp lệ. Ví dụ đúng: 192.168.1.130</span>';
      return;
    }
    if (!(prefix >= 0 && prefix <= 32)) {
      out.innerHTML = '<span class="err">Prefix phải nằm trong khoảng 0–32.</span>';
      return;
    }
    var mask = prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
    var network = (ip & mask) >>> 0;
    var broadcast = (network | (~mask >>> 0)) >>> 0;
    var total = Math.pow(2, 32 - prefix);
    var usable = prefix === 32 ? 1 : prefix === 31 ? 2 : total - 2;
    var first = prefix >= 31 ? network : (network + 1) >>> 0;
    var last = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
    var isPrivate = (ip >>> 24) === 10 || (ip >>> 20) === 0xAC1 || (ip >>> 16) === 0xC0A8;
    var ipClass = (ip >>> 31) === 0 ? "A" : (ip >>> 30) === 2 ? "B" : (ip >>> 29) === 6 ? "C" : (ip >>> 28) === 14 ? "D" : "E";
    out.innerHTML =
      '<div class="result-grid">' +
        '<div class="result-cell"><span>Địa chỉ mạng</span><b>' + ipv4Str(network) + '/' + prefix + '</b></div>' +
        '<div class="result-cell"><span>Mặt nạ</span><b>' + ipv4Str(mask) + '</b></div>' +
        '<div class="result-cell"><span>Broadcast</span><b>' + ipv4Str(broadcast) + '</b></div>' +
        '<div class="result-cell"><span>Host dùng được</span><b>' + usable.toLocaleString("vi-VN") + '</b></div>' +
        '<div class="result-cell"><span>Dải host</span><b>' + ipv4Str(first) + ' – ' + ipv4Str(last) + '</b></div>' +
        '<div class="result-cell"><span>Lớp / loại</span><b>Lớp ' + ipClass + (isPrivate ? ' · private' : ' · public') + '</b></div>' +
      '</div>' +
      '<p class="hint">Số địa chỉ = 2<sup>(32−' + prefix + ')</sup> = ' + total.toLocaleString("vi-VN") +
      (prefix >= 31 ? '; trường hợp đặc biệt point-to-point/loopback.' : '; trừ 2 (mạng + broadcast) còn ' + usable.toLocaleString("vi-VN") + ' host.') + '</p>';
  }

  /* ---------- CRC (modulo-2 division) ---------- */
  function runCrc(root) {
    var data = $("[data-crc-data]", root).value.trim();
    var gen = $("[data-crc-gen]", root).value.trim();
    var out = $("[data-crc-out]", root);
    if (!/^[01]{1,64}$/.test(data)) {
      out.innerHTML = '<span class="err">Dữ liệu chỉ gồm bit 0/1, tối đa 64 bit.</span>';
      return;
    }
    if (!/^[01]{2,32}$/.test(gen) || gen[0] !== "1" || gen[gen.length - 1] !== "1") {
      out.innerHTML = '<span class="err">Đa thức sinh phải bắt đầu và kết thúc bằng bit 1, dài 2–32 bit.</span>';
      return;
    }
    var r = gen.length - 1;
    var aug = data + new Array(r + 1).join("0");
    var work = aug.split("").map(Number);
    var steps = [];
    for (var i = 0; i <= work.length - gen.length; i++) {
      if (work[i] === 1) {
        var before = work.slice(i, i + gen.length).join("");
        for (var j = 0; j < gen.length; j++) work[i + j] ^= Number(gen[j]);
        steps.push({ pos: i, before: before, after: work.slice(i, i + gen.length).join("") });
      }
    }
    var remainder = work.slice(work.length - r).join("");
    var codeword = data + remainder;
    var show = steps.slice(0, 8).map(function (st, idx) {
      return '<span>Bước ' + (idx + 1) + ' (bit ' + st.pos + '): ' + st.before + ' ⊕ ' + gen + ' = ' + st.after + '</span>';
    }).join('<br>');
    out.innerHTML =
      '<div class="result-grid">' +
        '<div class="result-cell"><span>Chuỗi sau khi thêm ' + r + ' bit 0</span><b>' + aug + '</b></div>' +
        '<div class="result-cell"><span>Số dư (CRC)</span><b>' + remainder + '</b></div>' +
        '<div class="result-cell"><span>Chuỗi gửi đi</span><b>' + codeword + '</b></div>' +
      '</div>' +
      '<div class="binary" style="margin-top:10px">' + (show || "Không cần chia vì bit đầu là 0.") +
      (steps.length > 8 ? '<br><span class="hl">… còn ' + (steps.length - 8) + ' bước nữa</span>' : '') + '</div>' +
      '<p class="hint">Bên nhận chia toàn bộ chuỗi nhận được cho G. Số dư toàn bit 0 nghĩa là không phát hiện lỗi.</p>';
  }

  /* ---------- Step-through animation ---------- */
  function playSteps(root) {
    var items = $all("[data-stepper-list] .step-item", root);
    if (!items.length) return;
    if (root._timer) clearInterval(root._timer);
    items.forEach(function (el) { el.classList.remove("show"); });
    var i = 0;
    root._timer = setInterval(function () {
      if (i >= items.length) {
        clearInterval(root._timer);
        root._timer = null;
        return;
      }
      items[i].classList.add("show");
      i++;
    }, 620);
  }

  function resetSteps(root) {
    if (root._timer) {
      clearInterval(root._timer);
      root._timer = null;
    }
    $all(".step-item", root).forEach(function (el) { el.classList.remove("show"); });
  }

  /* ---------- Sliding-window simulator ---------- */
  function buildSwEvents(protocol, N, loss) {
    var e = [];
    function send(n, note) { e.push({ dir: "→", type: "fwd", text: "Gửi F" + n + (note ? " — " + note : "") }); }
    function recv(n, note) { e.push({ dir: "←", type: "back", text: "Nhận ACK" + n + (note ? " — " + note : "") }); }
    function lost(n) { e.push({ dir: "×", type: "loss", text: "F" + n + " bị mất trên đường truyền" }); }
    function info(t) { e.push({ dir: "!", type: "note", text: t }); }

    if (protocol === "stop") {
      for (var n = 1; n <= 4; n++) {
        send(n);
        if (loss && n === 2) {
          lost(2);
          info("Timeout: chưa nhận ACK2");
          send(2, "gửi lại");
        }
        recv(n);
      }
      info("Stop-and-Wait: mỗi lúc chỉ có tối đa 1 gói đang bay.");
    } else if (protocol === "gbn") {
      send(1); recv(1);
      send(2);
      if (loss) {
        lost(2);
        send(3);
        e.push({ dir: "←", type: "back", text: "Receiver bỏ F3, gửi ACK1 (trùng)" });
        send(4);
        e.push({ dir: "←", type: "back", text: "Receiver bỏ F4, gửi ACK1 (trùng)" });
        info("Timeout tại F2 → Go-Back-N gửi lại từ F2");
        send(2, "gửi lại"); send(3, "gửi lại"); send(4, "gửi lại");
        recv(4, "tích lũy");
      } else {
        send(3); recv(3); send(4); recv(4);
      }
      send(5); recv(5);
      info("Cửa sổ N = " + N + ": ACK tích lũy, gói lệch thứ tự bị bỏ.");
    } else {
      send(1); recv(1);
      send(2);
      if (loss) {
        lost(2);
        send(3); recv(3, "riêng");
        send(4); recv(4, "riêng");
        info("Receiver đệm F3, F4 và chờ F2");
        info("Timeout tại F2 → chỉ gửi lại F2");
        send(2, "gửi lại"); recv(2);
        info("Đủ F2, F3, F4 → giao lần lượt lên tầng trên");
      } else {
        send(3); recv(3); send(4); recv(4);
      }
      send(5); recv(5);
      info("Selective Repeat: đệm gói lệch thứ tự và chỉ gửi lại gói mất.");
    }
    return e;
  }

  function renderSwWindow(win, protocol, N, loss) {
    var total = protocol === "stop" ? 4 : 5;
    var chips = "";
    for (var n = 1; n <= total; n++) {
      var cls = "win-chip acked";
      if (loss && n === 2) cls = "win-chip";
      if (loss && protocol === "sr" && (n === 3 || n === 4)) cls = "win-chip buffered";
      chips += '<span class="' + cls + '">F' + n + "</span>";
    }
    win.innerHTML = "<b>Cửa sổ minh họa (N = " + N + "):</b>" + chips;
  }

  function runSw(root) {
    var protocol = $("[data-sw-protocol]", root).value;
    var N = parseInt($("[data-sw-window]", root).value, 10) || 3;
    var loss = $("[data-sw-loss]", root).checked;
    var log = $("[data-sw-log]", root);
    var win = $("[data-sw-windows]", root);
    if (root._timer) clearInterval(root._timer);
    log.innerHTML = "";
    win.innerHTML = "";
    var events = buildSwEvents(protocol, N, loss);
    var i = 0;
    function step() {
      if (i >= events.length) {
        clearInterval(root._timer);
        root._timer = null;
        renderSwWindow(win, protocol, N, loss);
        return;
      }
      var ev = events[i++];
      var line = document.createElement("div");
      line.className = "sw-line " + ev.type;
      line.innerHTML = '<span class="dir">' + ev.dir + "</span><span>" + ev.text + "</span>";
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }
    step();
    root._timer = setInterval(step, 650);
  }

  function resetSw(root) {
    if (root._timer) {
      clearInterval(root._timer);
      root._timer = null;
    }
    var log = $("[data-sw-log]", root);
    var win = $("[data-sw-windows]", root);
    if (log) log.innerHTML = "";
    if (win) win.innerHTML = "";
  }

  /* ---------- Wire up all widgets ---------- */
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var btn = target.closest("button");
    if (!btn) return;
    var widget = btn.closest("[data-widget]");
    if (!widget) return;
    if (btn.hasAttribute("data-delay-run")) runDelay(widget);
    else if (btn.hasAttribute("data-cs-run")) runChecksum(widget);
    else if (btn.hasAttribute("data-subnet-run")) runSubnet(widget);
    else if (btn.hasAttribute("data-crc-run")) runCrc(widget);
    else if (btn.hasAttribute("data-stepper-play")) playSteps(widget);
    else if (btn.hasAttribute("data-stepper-reset")) resetSteps(widget);
    else if (btn.hasAttribute("data-sw-run")) runSw(widget);
    else if (btn.hasAttribute("data-sw-reset")) resetSw(widget);
  });
})();
