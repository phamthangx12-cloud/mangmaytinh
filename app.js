/* ============================================================
   MMT Lab – application core
   ============================================================ */
(function () {
  "use strict";

  var chapters = window.MMT_CHAPTERS || [];
  var quizBank = window.MMT_QUIZ || [];
  var flashcards = window.MMT_FLASHCARDS || [];
  var lessons = [];

  chapters.forEach(function (ch) {
    ch.lessons.forEach(function (lesson, idx) {
      lesson.chapterId = ch.id;
      lesson.chapterLabel = ch.label;
      lesson.order = idx;
      lessons.push(lesson);
    });
  });

  var content = document.getElementById("content");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");
  var progressFill = document.getElementById("progressFill");
  var progressText = document.getElementById("progressText");
  var progressDetail = document.getElementById("progressDetail");
  var crumbChapter = document.getElementById("crumbChapter");
  var crumbTitle = document.getElementById("crumbTitle");
  var searchPanel = document.getElementById("searchPanel");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var currentRoute = "";

  /* ---------- helpers ---------- */
  function byId(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function chapterOf(id) {
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === id) return chapters[i];
    return null;
  }
  function lessonIndexOf(id) {
    for (var i = 0; i < lessons.length; i++) if (lessons[i].id === id) return i;
    return -1;
  }
  function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function quizLabel(ch) {
    var c = chapterOf(ch);
    return c ? c.label : "Tổng hợp";
  }

  /* ---------- progress storage ---------- */
  var progress = {};
  try {
    var saved = JSON.parse(localStorage.getItem("mmt-progress") || "{}");
    if (saved && typeof saved === "object") progress = saved;
  } catch (e) { progress = {}; }

  function isDone(id) { return !!progress[id]; }
  function saveProgress() {
    try { localStorage.setItem("mmt-progress", JSON.stringify(progress)); } catch (e) { /* ignore */ }
  }
  function chapterDone(chId) {
    var list = (chapterOf(chId) || { lessons: [] }).lessons;
    var n = 0;
    for (var i = 0; i < list.length; i++) if (isDone(list[i].id)) n++;
    return n;
  }
  function totalDone() {
    var n = 0;
    for (var i = 0; i < lessons.length; i++) if (isDone(lessons[i].id)) n++;
    return n;
  }

  /* ---------- home ---------- */
  function homeHTML() {
    var firstId = lessons.length ? lessons[0].id : "home";
    var cards = chapters.map(function (ch, ci) {
      var done = chapterDone(ch.id);
      var total = ch.lessons.length;
      var chips = ch.lessons.map(function (l, li) {
        return '<button class="chip-btn' + (isDone(l.id) ? " done" : "") + '" data-chip-lesson="' + l.id + '" data-go="' + l.id + '">' +
          (li + 1) + ". " + esc(l.title) + "</button>";
      }).join("");
      return '<article class="chapter-card">' +
        '<div class="ch-top"><span class="chapter-num">' + (ci + 1) + '</span><div>' +
          '<h3>' + esc(ch.title) + '</h3><p class="ch-sub">' + esc(ch.subtitle) + '</p>' +
        '</div></div>' +
        '<div class="lesson-chips">' + chips + '</div>' +
        '<div class="ch-progress"><div class="bar"><i data-ch-bar="' + ch.id + '" style="width:' + pct(done, total) + '%"></i></div>' +
          '<small data-ch-count="' + ch.id + '">' + done + "/" + total + ' bài</small></div>' +
      '</article>';
    }).join("");

    return '<section class="section" id="home" data-title="Tổng quan">' +
      '<div class="home-hero">' +
        '<div>' +
          '<span class="eyebrow">MẠNG MÁY TÍNH · 5 CHƯƠNG · 33 BÀI</span>' +
          '<h1>Từ <em>gói tin</em> đến ứng dụng</h1>' +
          '<p>Khóa học tương tác bao trọn kiến thức Mạng máy tính: từ độ trễ, phân tầng, HTTP/DNS, TCP, IP, định tuyến đến Ethernet và Wi-Fi. Học theo lộ trình, thực hành bằng mô phỏng và kiểm tra bằng đề ngẫu nhiên.</p>' +
          '<button class="primary-button" data-go="' + firstId + '">Bắt đầu học <span>→</span></button>' +
          '<button class="ghost-button" data-go="practice">Luyện đề ngay</button>' +
        '</div>' +
        '<div class="home-hero-art" aria-hidden="true">' +
          '<span class="orbit-tag t1">HTTP / DNS</span>' +
          '<span class="orbit-tag t2">TCP / UDP</span>' +
          '<span class="orbit-tag t3">IPv4 / IPv6</span>' +
          '<span class="orbit-tag t4">Ethernet / Wi-Fi</span>' +
          '<div class="orb">MMT<br>LAB</div>' +
        '</div>' +
      '</div>' +
      '<div class="home-section-head"><div><h2>Lộ trình 5 chương</h2><p>Học lần lượt hoặc nhảy tới phần bạn cần ôn.</p></div></div>' +
      '<div class="chapter-grid">' + cards + '</div>' +
      '<div class="home-section-head"><div><h2>Cách học hiệu quả</h2><p>Ba bước để nhớ lâu và làm bài tốt.</p></div></div>' +
      '<div class="study-tips">' +
        '<div class="study-tip"><span class="tip-num">01 · HIỂU</span><h3>Đọc và tự giải thích</h3><p>Đọc từng bài, dừng lại tự hỏi “vì sao cần cơ chế này?”. Dùng bảng so sánh và sơ đồ để nắm bản chất thay vì học thuộc.</p></div>' +
        '<div class="study-tip"><span class="tip-num">02 · THỰC HÀNH</span><h3>Chạy mô phỏng</h3><p>Thử máy tính checksum, subnet, CRC và mô phỏng cửa sổ trượt. Tự tay đổi tham số giúp hiểu công thức nhanh hơn nhiều.</p></div>' +
        '<div class="study-tip"><span class="tip-num">03 · KIỂM TRA</span><h3>Luyện đề & thẻ nhớ</h3><p>Làm đề ngẫu nhiên 15–20 câu, xem giải thích cho câu sai, rồi ôn thuật ngữ bằng thẻ ghi nhớ trước khi thi.</p></div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- lesson sections ---------- */
  function lessonHTML(lesson) {
    var ch = chapterOf(lesson.chapterId);
    var idx = lessonIndexOf(lesson.id);
    var prev = idx > 0 ? lessons[idx - 1] : null;
    var next = idx < lessons.length - 1 ? lessons[idx + 1] : null;
    var points = (lesson.keyPoints || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
    var done = isDone(lesson.id);
    var pager = '<div class="lesson-pager">' +
      (prev ? '<button class="pager-btn" data-go="' + prev.id + '"><b>← Bài trước</b>' + esc(prev.title) + '</button>' : "") +
      (next ? '<button class="pager-btn next" data-go="' + next.id + '"><b>Bài tiếp →</b>' + esc(next.title) + '</button>' : "") +
      '</div>';

    return '<section class="section lesson" id="' + lesson.id + '" data-chapter="' + lesson.chapterId + '" data-title="' + esc(lesson.title) + '">' +
      '<div class="lesson-head">' +
        '<span class="eyebrow">' + esc(ch.label) + " · BÀI " + (lesson.order + 1) + '</span>' +
        '<h1>' + esc(lesson.title) + '</h1>' +
        '<p class="lede">' + esc(lesson.intro) + '</p>' +
        '<div class="meta-row">' +
          '<span class="meta-chip accent">⏱ ' + lesson.minutes + ' phút</span>' +
          '<span class="meta-chip">' + esc(ch.title) + '</span>' +
          '<span class="meta-chip">' + (lesson.keyPoints ? lesson.keyPoints.length : 0) + ' điểm cần nhớ</span>' +
        '</div>' +
      '</div>' +
      '<div class="lesson-body">' + lesson.body + '</div>' +
      (points ? '<div class="key-points"><h2>Ghi nhớ nhanh</h2><ul>' + points + '</ul></div>' : "") +
      '<div class="lesson-actions">' +
        '<button class="complete-btn' + (done ? " done" : "") + '" data-complete="' + lesson.id + '">' + (done ? "✓ Đã học" : "Đánh dấu đã học") + '</button>' +
        '<button class="quiz-launch" data-quiz-chapter="' + lesson.chapterId + '">Luyện câu hỏi chương</button>' +
      '</div>' +
      pager +
    '</section>';
  }

  /* ---------- practice section ---------- */
  function practiceHTML() {
    var options = chapters.map(function (ch) {
      return '<option value="' + ch.id + '">' + esc(ch.label + " · " + ch.title) + '</option>';
    }).join("");
    return '<section class="section" id="practice" data-title="Luyện đề & kiểm tra">' +
      '<div class="practice-shell">' +
        '<div class="practice-setup">' +
          '<span class="eyebrow">LUYỆN ĐỀ · ' + quizBank.length + ' CÂU HỎI</span>' +
          '<h1>Kiểm tra kiến thức</h1>' +
          '<p>Đề được tạo ngẫu nhiên từ ngân hàng câu hỏi của cả 5 chương. Mỗi câu có giải thích ngay sau khi trả lời, giúp bạn hiểu vì sao đúng hoặc sai.</p>' +
          '<div class="setup-row">' +
            '<div class="field"><label for="practiceChapter">Phạm vi</label><select id="practiceChapter"><option value="all">Toàn bộ 5 chương</option>' + options + '</select></div>' +
            '<div class="field"><label for="practiceCount">Số câu</label><select id="practiceCount"><option>10</option><option selected>15</option><option>20</option></select></div>' +
            '<button class="primary-button" id="practiceStart">Bắt đầu làm đề</button>' +
          '</div>' +
        '</div>' +
        '<div id="practiceArea" class="practice-shell"></div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- flashcards section ---------- */
  function flashcardsHTML() {
    var options = chapters.map(function (ch) {
      return '<option value="' + ch.id + '">' + esc(ch.label + " · " + ch.title) + '</option>';
    }).join("");
    return '<section class="section" id="flashcards" data-title="Thẻ ghi nhớ">' +
      '<div class="practice-setup" style="margin-bottom:14px">' +
        '<span class="eyebrow">THẺ GHI NHỚ · ' + flashcards.length + ' THUẬT NGỮ</span>' +
        '<h1>Ôn nhanh thuật ngữ</h1>' +
        '<p>Nhấn vào thẻ để lật xem định nghĩa. Dùng bộ lọc theo chương hoặc nút xáo trộn để tự kiểm tra mức độ ghi nhớ.</p>' +
      '</div>' +
      '<div class="flash-shell">' +
        '<div class="flash-toolbar">' +
          '<div class="field"><label for="flashChapter">Lọc theo chương</label><select id="flashChapter"><option value="all">Tất cả chương</option>' + options + '</select></div>' +
          '<button class="secondary-button" data-flash-shuffle>Xáo trộn</button>' +
        '</div>' +
        '<div class="flashcard-wrap"><div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Lật thẻ ghi nhớ"></div></div>' +
        '<div class="flash-controls">' +
          '<button class="secondary-button" data-flash-prev>← Trước</button>' +
          '<span class="counter" id="flashCounter">1 / ' + flashcards.length + '</span>' +
          '<button class="secondary-button" data-flash-next>Sau →</button>' +
          '<button class="primary-button" data-flash-flip>Lật thẻ</button>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- build nav & sections ---------- */
  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  function buildNav() {
    var nav = byId("lessonNav");
    if (!nav) return;
    var home = '<button class="nav-item nav-home" data-section="home"><span class="nav-number">00</span><span>Tổng quan khóa học</span></button>';
    var groups = chapters.map(function (ch) {
      var items = ch.lessons.map(function (l, i) {
        return '<button class="nav-item nav-lesson" data-section="' + l.id + '">' +
          '<span class="nav-number">' + pad2(i + 1) + '</span>' +
          '<span>' + esc(l.title) + '</span>' +
          '<span class="done-mark" data-done="' + l.id + '">' + (isDone(l.id) ? "✓" : "") + '</span>' +
        '</button>';
      }).join("");
      return '<div class="nav-group" data-chapter="' + ch.id + '">' +
        '<button class="nav-chapter-head" data-chapter-toggle="' + ch.id + '">' +
          esc(ch.label) + ' · ' + esc(ch.title) + '<span class="chev">▾</span>' +
        '</button>' +
        '<div class="nav-lessons">' + items + '</div>' +
      '</div>';
    }).join("");
    nav.innerHTML = home + groups;
  }

  function renderSections() {
    content.innerHTML = homeHTML() +
      lessons.map(lessonHTML).join("") +
      practiceHTML() +
      flashcardsHTML();
  }

  /* ---------- progress UI ---------- */
  function updateProgressUI() {
    var done = totalDone();
    var total = lessons.length;
    var p = pct(done, total);
    progressFill.style.width = p + "%";
    progressText.textContent = p + "%";
    progressDetail.textContent = done + "/" + total + " bài đã học";

    var bars = document.querySelectorAll("[data-ch-bar]");
    for (var i = 0; i < bars.length; i++) {
      var chId = bars[i].getAttribute("data-ch-bar");
      var ch = chapterOf(chId);
      if (ch) bars[i].style.width = pct(chapterDone(chId), ch.lessons.length) + "%";
    }
    var counts = document.querySelectorAll("[data-ch-count]");
    for (var k = 0; k < counts.length; k++) {
      var id = counts[k].getAttribute("data-ch-count");
      var c = chapterOf(id);
      if (c) counts[k].textContent = chapterDone(id) + "/" + c.lessons.length + " bài";
    }
    var marks = document.querySelectorAll("[data-done]");
    for (var m = 0; m < marks.length; m++) {
      marks[m].textContent = isDone(marks[m].getAttribute("data-done")) ? "✓" : "";
    }
    var chips = document.querySelectorAll("[data-chip-lesson]");
    for (var n = 0; n < chips.length; n++) {
      chips[n].classList.toggle("done", isDone(chips[n].getAttribute("data-chip-lesson")));
    }
  }

  /* ---------- routing ---------- */
  function closeSidebar() {
    sidebar.classList.remove("open");
    scrim.classList.remove("open");
  }
  function openSidebar() {
    sidebar.classList.add("open");
    scrim.classList.add("open");
  }
  function parseHash() {
    return (location.hash || "").replace(/^#\/?/, "") || "home";
  }

  function navigate(id, opts) {
    var target = byId(id);
    if (!target || target.className.indexOf("section") === -1) {
      id = "home";
      target = byId("home");
    }
    if (!target) return;
    currentRoute = id;
    var sections = document.querySelectorAll(".section");
    for (var i = 0; i < sections.length; i++) sections[i].classList.toggle("active", sections[i] === target);

    var navItems = document.querySelectorAll(".nav-item[data-section]");
    for (var j = 0; j < navItems.length; j++) {
      navItems[j].classList.toggle("active", navItems[j].getAttribute("data-section") === id);
    }

    var chId = target.getAttribute("data-chapter");
    if (id === "home") {
      crumbChapter.textContent = "Khóa học";
      crumbTitle.textContent = "Tổng quan";
    } else if (id === "practice") {
      crumbChapter.textContent = "Luyện tập";
      crumbTitle.textContent = "Luyện đề & kiểm tra";
    } else if (id === "flashcards") {
      crumbChapter.textContent = "Ôn tập";
      crumbTitle.textContent = "Thẻ ghi nhớ";
    } else {
      var ch = chapterOf(chId);
      crumbChapter.textContent = ch ? ch.label : "Bài học";
      crumbTitle.textContent = target.getAttribute("data-title") || "";
      var group = document.querySelector('.nav-group[data-chapter="' + chId + '"]');
      if (group) group.classList.remove("collapsed");
    }

    updateProgressUI();
    closeSidebar();
    closeSearch();

    if (location.hash !== "#/" + id) {
      try { history.replaceState(null, "", "#/" + id); }
      catch (e) { location.hash = "#/" + id; }
    }
    if (!opts || opts.scroll !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* ---------- search ---------- */
  function closeSearch() {
    searchPanel.classList.remove("open");
    searchResults.classList.remove("open");
    var btn = byId("searchButton");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
  function openSearch() {
    searchPanel.classList.add("open");
    byId("searchButton").setAttribute("aria-expanded", "true");
    searchInput.focus();
  }
  function renderSearch(raw) {
    var q = String(raw || "").trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!q) {
      searchResults.classList.remove("open");
      return;
    }
    var hits = [];
    lessons.forEach(function (l) {
      var hay = (l.title + " " + (l.keywords || []).join(" ") + " " + l.intro).toLowerCase();
      if (hay.indexOf(q) !== -1) hits.push({ type: "lesson", id: l.id, title: l.title, sub: l.chapterLabel + " · " + l.minutes + " phút" });
    });
    flashcards.forEach(function (c) {
      if ((c.term + " " + c.def).toLowerCase().indexOf(q) !== -1) hits.push({ type: "card", term: c.term, def: c.def });
    });
    hits = hits.slice(0, 12);
    if (!hits.length) {
      searchResults.innerHTML = '<div class="sr-empty">Không tìm thấy “' + esc(raw) + '”. Thử từ khóa ngắn hơn như TCP, DNS, NAT, CRC…</div>';
    } else {
      searchResults.innerHTML = hits.map(function (h) {
        if (h.type === "lesson") {
          return '<button class="search-hit" data-search-go="' + h.id + '"><span class="sr-tag">BÀI</span><span><b>' +
            esc(h.title) + '</b><small>' + esc(h.sub) + '</small></span></button>';
        }
        return '<button class="search-hit" data-search-card="' + esc(h.term) + '"><span class="sr-tag term">THẺ</span><span><b>' +
          esc(h.term) + '</b><small>' + esc(h.def) + '</small></span></button>';
      }).join("");
    }
    searchResults.classList.add("open");
  }

  /* ---------- quiz modal ---------- */
  var quizModal = byId("quizModal");
  var quizOptions = byId("quizOptions");
  var quizState = { ch: null, pool: [], current: null };

  function closeQuiz() {
    quizModal.classList.remove("open");
    quizModal.setAttribute("aria-hidden", "true");
  }

  function nextQuizQuestion() {
    var pool = quizState.pool;
    if (!pool.length) return;
    var q = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      var guard = 0;
      while (q === quizState.current && guard < 25) {
        q = pool[Math.floor(Math.random() * pool.length)];
        guard++;
      }
    }
    quizState.current = q;
    byId("quizEyebrow").textContent = "CÂU HỎI NHANH · " + quizLabel(q.ch).toUpperCase();
    byId("quizQuestion").textContent = q.q;
    byId("quizResult").textContent = "";
    byId("quizNext").hidden = true;
    quizOptions.innerHTML = q.options.map(function (opt, i) {
      return '<button data-option="' + i + '">' + esc(opt) + '</button>';
    }).join("");
  }

  function openQuiz(ch) {
    quizState.ch = ch || null;
    quizState.pool = quizBank.filter(function (q) { return !ch || q.ch === ch; });
    if (!quizState.pool.length) quizState.pool = quizBank.slice();
    quizState.current = null;
    quizModal.classList.add("open");
    quizModal.setAttribute("aria-hidden", "false");
    nextQuizQuestion();
  }

  /* ---------- complete toggle ---------- */
  function toggleComplete(id) {
    if (progress[id]) delete progress[id];
    else progress[id] = true;
    saveProgress();
    var btn = document.querySelector('[data-complete="' + id + '"]');
    if (btn) {
      btn.classList.toggle("done", !!progress[id]);
      btn.textContent = progress[id] ? "✓ Đã học" : "Đánh dấu đã học";
    }
    updateProgressUI();
  }

  /* ---------- practice engine ---------- */
  var practiceState = { list: [], index: 0, score: 0, answered: false };

  function startPractice() {
    var chSel = byId("practiceChapter");
    var countSel = byId("practiceCount");
    var ch = chSel ? chSel.value : "all";
    var count = countSel ? parseInt(countSel.value, 10) : 15;
    var pool = quizBank.filter(function (q) { return ch === "all" || q.ch === ch; });
    pool = shuffle(pool.slice());
    practiceState.list = pool.slice(0, Math.min(count, pool.length));
    practiceState.index = 0;
    practiceState.score = 0;
    practiceState.answered = false;
    renderPractice();
  }

  function renderPractice() {
    var area = byId("practiceArea");
    if (!area) return;
    var st = practiceState;
    if (!st.list.length) {
      area.innerHTML = '<div class="practice-setup"><p>Không có câu hỏi nào cho phạm vi đã chọn.</p></div>';
      return;
    }
    if (st.index >= st.list.length) {
      area.innerHTML = practiceScoreHTML();
      return;
    }
    var q = st.list[st.index];
    var letters = ["A", "B", "C", "D"];
    var options = q.options.map(function (opt, i) {
      return '<button class="option" data-practice-option="' + i + '"><span class="key">' + letters[i] +
        "</span><span>" + esc(opt) + "</span></button>";
    }).join("");
    area.innerHTML =
      '<div class="practice-status"><span>Câu ' + (st.index + 1) + "/" + st.list.length + '</span>' +
        '<div class="bar"><i style="width:' + ((st.index / st.list.length) * 100) + '%"></i></div>' +
        '<span>Đúng: ' + st.score + '</span></div>' +
      '<div class="question-card">' +
        '<div class="q-meta"><span class="pill">' + esc(quizLabel(q.ch)) + '</span><span class="pill grey">Chọn một đáp án</span></div>' +
        '<h2>' + esc(q.q) + '</h2>' +
        '<div id="practiceOptions">' + options + '</div>' +
        '<div id="practiceExplain"></div>' +
        '<div class="practice-footer"><span class="score" id="practiceScore">Đúng: ' + st.score + '</span>' +
          '<button class="primary-button" id="practiceNext" hidden>' +
          (st.index === st.list.length - 1 ? "Xem kết quả" : "Câu tiếp →") + '</button></div>' +
      '</div>';
  }

  function answerPractice(btn) {
    var st = practiceState;
    if (st.answered) return;
    var q = st.list[st.index];
    if (!q) return;
    var idx = parseInt(btn.getAttribute("data-practice-option"), 10);
    st.answered = true;
    var wrap = byId("practiceOptions");
    var buttons = wrap ? wrap.querySelectorAll("button") : [];
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === q.answer) buttons[i].classList.add("correct");
    }
    if (idx === q.answer) st.score++;
    else btn.classList.add("wrong");
    var ex = byId("practiceExplain");
    if (ex) {
      ex.innerHTML = '<div class="explain-box"><b>' + (idx === q.answer ? "Chính xác" : "Chưa đúng") +
        '</b><p>' + esc(q.explain) + '</p></div>';
    }
    var score = byId("practiceScore");
    if (score) score.textContent = "Đúng: " + st.score + "/" + (st.index + 1);
    var next = byId("practiceNext");
    if (next) next.hidden = false;
  }

  function nextPractice() {
    if (!practiceState.answered) return;
    practiceState.index++;
    practiceState.answered = false;
    renderPractice();
  }

  function practiceScoreHTML() {
    var st = practiceState;
    var total = st.list.length;
    var p = pct(st.score, total);
    var msg = p >= 85
      ? "Xuất sắc! Bạn đã nắm rất chắc kiến thức."
      : p >= 65
        ? "Khá tốt. Xem lại vài câu sai là bạn sẵn sàng cho bài thi."
        : "Cần ôn thêm. Hãy đọc lại bài liên quan rồi làm đề mới.";
    var perCh = {};
    st.list.forEach(function (q) {
      perCh[q.ch] = perCh[q.ch] || { total: 0 };
      perCh[q.ch].total++;
    });
    var breakdown = Object.keys(perCh).map(function (k) {
      return "<span>" + esc(quizLabel(k)) + ": " + perCh[k].total + " câu</span>";
    }).join("");
    return '<div class="score-card"><div class="big">' + st.score + '<small>/' + total + "</small></div>" +
      "<h2>" + p + "%</h2><p>" + msg + '</p>' +
      '<div class="score-breakdown">' + breakdown + '</div>' +
      '<button class="primary-button" id="practiceAgain">Làm đề khác</button></div>';
  }

  /* ---------- flashcards engine ---------- */
  var flashState = { list: flashcards.slice(), index: 0, flipped: false };

  function renderFlashcard() {
    var card = byId("flashcard");
    if (!card) return;
    if (!flashState.list.length) {
      card.innerHTML = '<div class="flash-face"><p>Không có thẻ nào cho bộ lọc này.</p></div>';
      return;
    }
    var item = flashState.list[flashState.index];
    card.classList.toggle("flipped", flashState.flipped);
    card.innerHTML =
      '<div class="flash-face"><span class="fc-tag">' + esc(quizLabel(item.ch)).toUpperCase() + '</span>' +
        '<h2>' + esc(item.term) + '</h2><p>Nhấn để xem định nghĩa</p>' +
        '<span class="hint-flip">Click hoặc Enter để lật thẻ</span></div>' +
      '<div class="flash-face flash-back"><span class="fc-tag">ĐỊNH NGHĨA</span>' +
        '<p>' + esc(item.def) + '</p></div>';
    var counter = byId("flashCounter");
    if (counter) counter.textContent = (flashState.index + 1) + " / " + flashState.list.length;
  }

  function flashStep(delta) {
    if (!flashState.list.length) return;
    flashState.index = (flashState.index + delta + flashState.list.length) % flashState.list.length;
    flashState.flipped = false;
    renderFlashcard();
  }

  function flashShuffle() {
    shuffle(flashState.list);
    flashState.index = 0;
    flashState.flipped = false;
    renderFlashcard();
  }

  function flashFilter(ch) {
    flashState.list = flashcards.filter(function (c) { return ch === "all" || c.ch === ch; });
    flashState.index = 0;
    flashState.flipped = false;
    renderFlashcard();
  }

  /* ---------- events ---------- */
  function bindEvents() {
    document.addEventListener("click", function (event) {
      var t = event.target;
      if (!t || !t.closest) return;
      var el;

      if ((el = t.closest("[data-section]"))) { navigate(el.getAttribute("data-section")); return; }
      if ((el = t.closest("[data-go]"))) { navigate(el.getAttribute("data-go")); return; }
      if ((el = t.closest("[data-chapter-toggle]"))) {
        var group = el.closest(".nav-group");
        if (group) group.classList.toggle("collapsed");
        return;
      }
      if ((el = t.closest("[data-complete]"))) { toggleComplete(el.getAttribute("data-complete")); return; }
      if ((el = t.closest("[data-quiz-chapter]"))) { openQuiz(el.getAttribute("data-quiz-chapter")); return; }
      if ((el = t.closest("[data-search-go]"))) {
        navigate(el.getAttribute("data-search-go"));
        searchInput.value = "";
        closeSearch();
        return;
      }
      if ((el = t.closest("[data-search-card]"))) {
        navigate("flashcards");
        searchInput.value = "";
        closeSearch();
        return;
      }
      if ((el = t.closest("#practiceStart"))) { startPractice(); return; }
      if ((el = t.closest("[data-practice-option]"))) { answerPractice(el); return; }
      if ((el = t.closest("#practiceNext"))) { nextPractice(); return; }
      if ((el = t.closest("#practiceAgain"))) { startPractice(); return; }
      if ((el = t.closest("[data-flash-prev]"))) { flashStep(-1); return; }
      if ((el = t.closest("[data-flash-next]"))) { flashStep(1); return; }
      if ((el = t.closest("[data-flash-shuffle]"))) { flashShuffle(); return; }
      if ((el = t.closest("[data-flash-flip]"))) {
        flashState.flipped = !flashState.flipped;
        renderFlashcard();
        return;
      }
      if ((el = t.closest("#flashcard"))) {
        flashState.flipped = !flashState.flipped;
        renderFlashcard();
      }
    });

    var searchBtn = byId("searchButton");
    if (searchBtn) {
      searchBtn.addEventListener("click", function () {
        if (searchPanel.classList.contains("open")) closeSearch();
        else openSearch();
      });
    }
    byId("closeSearch").addEventListener("click", closeSearch);
    searchInput.addEventListener("input", function (e) { renderSearch(e.target.value); });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = searchResults.querySelector("[data-search-go]");
      if (first) navigate(first.getAttribute("data-search-go"));
      else if (searchResults.querySelector("[data-search-card]")) navigate("flashcards");
      searchInput.value = "";
      closeSearch();
    });

    byId("menuButton").addEventListener("click", function () {
      if (sidebar.classList.contains("open")) closeSidebar();
      else openSidebar();
    });
    scrim.addEventListener("click", closeSidebar);

    byId("quizClose").addEventListener("click", closeQuiz);
    quizModal.addEventListener("click", function (e) { if (e.target === quizModal) closeQuiz(); });
    byId("quizNext").addEventListener("click", nextQuizQuestion);

    quizOptions.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("button[data-option]") : null;
      if (!btn || btn.disabled) return;
      var q = quizState.current;
      if (!q) return;
      var idx = parseInt(btn.getAttribute("data-option"), 10);
      var children = quizOptions.querySelectorAll("button");
      for (var i = 0; i < children.length; i++) {
        children[i].disabled = true;
        if (i === q.answer) children[i].classList.add("correct");
      }
      if (idx !== q.answer) btn.classList.add("wrong");
      byId("quizResult").innerHTML = "<b>" + (idx === q.answer ? "Chính xác!" : "Chưa đúng.") + "</b> " + esc(q.explain);
      byId("quizNext").hidden = false;
    });

    var flashSel = byId("flashChapter");
    if (flashSel) flashSel.addEventListener("change", function () { flashFilter(flashSel.value); });

    var card = byId("flashcard");
    if (card) {
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flashState.flipped = !flashState.flipped;
          renderFlashcard();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeQuiz();
        closeSidebar();
        closeSearch();
      }
    });

    window.addEventListener("hashchange", function () {
      var hash = parseHash();
      if (hash !== currentRoute) navigate(hash, { scroll: false });
    });
  }

  /* ---------- boot ---------- */
  function init() {
    buildNav();
    renderSections();
    renderFlashcard();
    updateProgressUI();
    bindEvents();
    navigate(parseHash(), { scroll: false });
  }

  init();
})();
