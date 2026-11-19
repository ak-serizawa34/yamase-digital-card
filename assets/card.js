// URLのフォルダ名（/yamase/ など）から cards.js の1枚を選んで表示する。
(function () {
  var parts = location.pathname.split("/").filter(Boolean);
  var id = window.CARD_ID || parts[parts.length - 1] || "";
  var c = (window.CARDS || {})[id];
  var root = document.getElementById("app");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(href, cls, text) {
    var a = el("a", cls, text);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  if (!c) {
    root.appendChild(el("p", "missing", "この名刺は見つかりませんでした。"));
    return;
  }

  var accent = c.accent || "#2f3a4a";
  document.title = c.name + "｜" + c.org;
  document.documentElement.style.setProperty("--accent", accent);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = accent;

  // プロフィール
  var prof = el("header", "profile");
  if (c.photo) {
    var img = el("img", "photo");
    img.src = c.photo; img.alt = c.name;
    prof.appendChild(img);
  } else {
    prof.appendChild(el("div", "photo", (c.nameEn || c.name).trim().charAt(0)));
  }
  prof.appendChild(el("p", "org", [c.org, c.title].filter(Boolean).join(" ／ ")));
  prof.appendChild(el("h1", "name", c.name));
  prof.appendChild(el("p", "sub", [c.nameKana, c.nameEn].filter(Boolean).join("　")));
  if (c.bio) prof.appendChild(el("p", "bio", c.bio));

  // 電話・メールの小さいボタン
  var quick = el("div", "quick");
  if (c.phone) quick.appendChild(link("tel:" + c.phone.replace(/[^\d+]/g, ""), "chip", "電話"));
  if (c.email) quick.appendChild(link("mailto:" + c.email, "chip", "メール"));
  if (c.address) quick.appendChild(link("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.address), "chip", "地図"));
  if (quick.childNodes.length) prof.appendChild(quick);
  root.appendChild(prof);

  var btn = el("button", "save", "連絡先を保存");
  btn.type = "button";
  btn.addEventListener("click", function () { saveVCard(c, id); });
  root.appendChild(btn);

  // ボタンの欄
  (c.sections || []).forEach(function (s) {
    var links = (s.links || []).filter(function (l) { return l.url; });
    if (!links.length && !s.text) return;
    var sec = el("section", "sec");
    if (s.heading) sec.appendChild(el("h2", "sec-h", s.heading));
    if (s.text) sec.appendChild(el("p", "sec-t", s.text));
    links.forEach(function (l) { sec.appendChild(link(l.url, "btn", l.label)); });
    root.appendChild(sec);
  });

  root.appendChild(el("p", "foot", "© " + c.org));

  function esc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1"); }

  function saveVCard(c, id) {
    var n = (c.name || "").split(/[\s　]+/);
    var family = n[0] || "", given = n.slice(1).join(" ");
    var k = (c.nameKana || "").split(/[\s　]+/);
    var L = [
      "BEGIN:VCARD", "VERSION:3.0",
      "N:" + esc(family) + ";" + esc(given) + ";;;",
      "FN:" + esc(c.name),
    ];
    if (k.length > 1) {
      L.push("X-PHONETIC-LAST-NAME:" + esc(k[0]));
      L.push("X-PHONETIC-FIRST-NAME:" + esc(k.slice(1).join(" ")));
    }
    if (c.org) L.push("ORG:" + esc(c.org));
    if (c.title) L.push("TITLE:" + esc(c.title));
    if (c.phone) L.push("TEL;TYPE=CELL:" + c.phone);
    if (c.email) L.push("EMAIL;TYPE=INTERNET:" + c.email);
    if (c.website) L.push("URL:" + c.website);
    L.push("URL:" + location.href.split("#")[0]);
    if (c.address) L.push("ADR;TYPE=WORK:;;" + esc(c.address) + ";;;;");
    L.push("END:VCARD");

    var blob = new Blob([L.join("\r\n") + "\r\n"], { type: "text/vcard;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (c.nameEn || id).replace(/\s+/g, "_") + ".vcf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
})();
