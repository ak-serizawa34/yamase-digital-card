// URLのフォルダ名（/yamase/ など）から cards.js の1枚を選んで表示する。
(function () {
  var parts = location.pathname.split("/").filter(Boolean);
  var id = window.CARD_ID || parts[parts.length - 1] || "";
  var c = (window.CARDS || {})[id];
  var root = document.getElementById("app");

  // 丸いアイコン（背景色と白い絵）
  var ICONS = {
    phone: ["#30c25a", '<path d="M8.6 4.5c.4-.4 1-.4 1.4 0l1.7 2.1c.3.4.3 1-.1 1.4l-1 1c.8 1.7 2.2 3.1 3.9 3.9l1-1c.4-.4 1-.4 1.4-.1l2.1 1.7c.4.4.4 1 0 1.4l-1.3 1.3c-.6.6-1.5.8-2.3.5C11.5 15.6 8.4 12.5 7 8.6c-.3-.8-.1-1.7.5-2.3z" fill="#fff"/>'],
    mail: ["#ea4335", '<rect x="5" y="7" width="14" height="10" rx="1.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M5.5 7.8 12 12.6l6.5-4.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>'],
    instagram: ["linear-gradient(45deg,#f9a825,#e1306c 50%,#833ab4)", '<rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="15.9" cy="8.1" r="1" fill="#fff"/>'],
    facebook: ["#1877f2", '<path d="M13.2 19v-6h2l.3-2.4h-2.3V9.2c0-.7.2-1.2 1.2-1.2h1.2V5.9c-.2 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7h-2V13h2v6z" fill="#fff"/>'],
    web: ["var(--accent)", '<circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M5.5 12h13M12 5.5c-2.2 2.4-2.2 10.6 0 13M12 5.5c2.2 2.4 2.2 10.6 0 13" fill="none" stroke="#fff" stroke-width="1.6"/>'],
    map: ["#4285f4", '<path d="M12 19s-5-5-5-8.6A5 5 0 0 1 17 10.4C17 14 12 19 12 19z" fill="#fff"/><circle cx="12" cy="10.4" r="1.9" fill="#4285f4"/>'],
    link: ["#7a7f87", '<path d="M10.5 13.5l3-3M9.2 11.3l-1.5 1.5a2.5 2.5 0 0 0 3.5 3.5l1.5-1.5M14.8 12.7l1.5-1.5a2.5 2.5 0 0 0-3.5-3.5l-1.5 1.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>'],
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  if (!c) {
    root.appendChild(el("p", "missing", "この名刺は見つかりませんでした。"));
    return;
  }

  var accent = c.accent || "#3f9a9a";
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
    prof.appendChild(el("div", "photo", (c.name || "").trim().charAt(0)));
  }
  prof.appendChild(el("div", "rule"));
  prof.appendChild(el("h1", "name", c.name));
  if (c.nameEn) prof.appendChild(el("p", "sub", c.nameEn));
  root.appendChild(prof);

  var orgLine = [c.org, c.title].filter(Boolean).join("　");
  if (orgLine) root.appendChild(el("p", "org", orgLine));
  if (c.bio) root.appendChild(el("p", "bio", c.bio));

  var btn = el("button", "save", "連絡先に保存");
  btn.type = "button";
  btn.addEventListener("click", function () { saveVCard(c, id); });
  root.appendChild(btn);

  // リンクの欄（電話・メールは先頭の欄の上に足す）
  var sections = (c.sections || []).map(function (s) {
    return { en: s.en, heading: s.heading, text: s.text, contact: s.contact, links: (s.links || []).slice() };
  });
  if (!sections.length) sections.push({ links: [] });
  var head = [];
  if (c.phone) head.push({ type: "phone", label: "電話番号", text: c.phone, url: "tel:" + c.phone.replace(/[^\d+]/g, "") });
  if (c.email) head.push({ type: "mail", label: "メール", text: c.email, url: "mailto:" + c.email });
  if (c.website) head.push({ type: "web", label: "Web サイト", url: c.website });
  if (c.address) head.push({ type: "map", label: "住所", text: c.address, url: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.address) });
  var cs = sections.filter(function (s) { return s.contact; })[0] || sections[0];
  cs.links = head.concat(cs.links);

  sections.forEach(function (s) {
    var links = s.links.filter(function (l) { return l.url; });
    if (!links.length && !s.text) return;
    var sec = el("section", "sec");
    if (s.en) sec.appendChild(el("p", "sec-en", s.en));
    if (s.heading) sec.appendChild(el("h2", "sec-h", s.heading));
    if (s.text) sec.appendChild(el("p", "sec-t", s.text));
    links.forEach(function (l) { sec.appendChild(row(l)); });
    root.appendChild(sec);
  });

  root.appendChild(el("p", "foot", "© " + c.org));

  function row(l) {
    var a = el("a", "row");
    a.href = l.url;
    if (/^https?:/.test(l.url)) { a.target = "_blank"; a.rel = "noopener"; }
    var i = el("span", "icon");
    if (l.img) {
      i.className = "icon img";
      var im = el("img"); im.src = l.img; im.alt = ""; i.appendChild(im);
      // 画像アイコンのときは、右下に小さいサービスのマークを付ける（Instagram だと分かるように）
      if (ICONS[l.type]) {
        var bd = el("span", "badge");
        bd.style.background = ICONS[l.type][0];
        bd.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[l.type][1] + "</svg>";
        i.appendChild(bd);
      }
    } else {
      var ic = ICONS[l.type] || ICONS.link;
      i.style.background = ic[0];
      i.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ic[1] + "</svg>";
    }
    a.appendChild(i);
    var t = el("span", "row-t");
    t.appendChild(el("span", "row-l", l.label));
    if (l.desc) t.appendChild(el("span", "row-d", l.desc));
    var SERVICE = { instagram: "Instagram", facebook: "Facebook" };
    var v = l.text || l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    if (l.img && SERVICE[l.type]) v = SERVICE[l.type] + "  " + v;
    t.appendChild(el("span", "row-v", v));
    a.appendChild(t);
    if (l.cta) a.appendChild(el("span", "cta", l.cta));

    var more = (l.more || []).filter(function (m) { return m.url; });
    if (!more.length) return a;
    var box = el("div", "item");
    box.appendChild(a);
    var bar = el("div", "more");
    more.forEach(function (m) {
      var b = el("a", "chip", m.label);
      b.href = m.url; b.target = "_blank"; b.rel = "noopener";
      bar.appendChild(b);
    });
    box.appendChild(bar);
    return box;
  }

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
