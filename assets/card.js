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

  if (!c) {
    root.appendChild(el("p", "missing", "この名刺は見つかりませんでした。"));
    return;
  }

  document.title = c.name + "｜" + c.org;
  document.documentElement.style.setProperty("--accent", c.accent || "#2f3a4a");
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = c.accent || "#2f3a4a";

  var card = el("div", "card");
  card.appendChild(el("div", "band"));

  var head = el("div", "head");
  if (c.photo) {
    var img = el("img", "photo");
    img.src = c.photo; img.alt = c.name;
    head.appendChild(img);
  } else {
    head.appendChild(el("div", "photo", (c.nameEn || c.name).trim().charAt(0)));
  }
  head.appendChild(el("p", "org", [c.org, c.title].filter(Boolean).join(" ／ ")));
  head.appendChild(el("h1", "name", c.name));
  head.appendChild(el("p", "sub", [c.nameKana, c.nameEn].filter(Boolean).join("　")));
  if (c.bio) head.appendChild(el("p", "bio", c.bio));
  card.appendChild(head);

  var btn = el("button", "save", "連絡先を保存");
  btn.type = "button";
  btn.addEventListener("click", function () { saveVCard(c, id); });
  card.appendChild(btn);

  var rows = [];
  if (c.phone) rows.push(["電話", c.phone, "tel:" + c.phone.replace(/[^\d+]/g, "")]);
  if (c.email) rows.push(["メール", c.email, "mailto:" + c.email]);
  if (c.website) rows.push(["Web", c.website.replace(/^https?:\/\//, "").replace(/\/$/, ""), c.website]);
  (c.links || []).forEach(function (l) { rows.push([l.label, l.text || "", l.url]); });
  if (c.address) rows.push(["住所", c.address, "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.address)]);

  if (rows.length) {
    var ul = el("ul", "list");
    rows.forEach(function (r) {
      var a = el("a");
      a.href = r[2];
      if (/^https?:/.test(r[2])) { a.target = "_blank"; a.rel = "noopener"; }
      if (r[1]) { a.appendChild(el("span", "k", r[0])); a.appendChild(el("span", "v", r[1])); }
      else { a.appendChild(el("span", "v", r[0])); }
      a.appendChild(el("span", "arrow", "›"));
      var li = el("li"); li.appendChild(a); ul.appendChild(li);
    });
    card.appendChild(ul);
  }

  root.appendChild(card);
  root.appendChild(el("p", "foot", c.org));

  function esc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1"); }

  function saveVCard(c, id) {
    var family = "", given = "";
    var n = (c.name || "").split(/[\s　]+/);
    if (n.length > 1) { family = n[0]; given = n.slice(1).join(" "); } else { family = c.name || ""; }
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
    (c.links || []).forEach(function (l) { L.push("URL:" + l.url); });
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
