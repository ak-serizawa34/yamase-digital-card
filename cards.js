// 名刺の中身。lit.link のように、プロフィールの下にリンクを並べる。
// キー（"yamase"）がURLの最後の部分になる：
//   https://ak-serizawa34.github.io/yamase-digital-card/yamase/
// ※NFCタグに書いたあとはキーを変えないこと（URLが変わってタグが使えなくなる）。
// 中身（名前・リンク・並び順など）はいつ変えても大丈夫。
//
// リンクの type で丸いアイコンが決まる：
//   phone / mail / instagram / facebook / web / map / link
// url が空のリンクは表示しない。「要確認」は、まだ正しいURLが入っていない所。

window.CARDS = {
  yamase: {
    org: "YAMASE",
    title: "",                            // 肩書き（空なら出さない）
    name: "芹澤 亮裕",
    nameKana: "せりざわ あきひろ",          // 連絡先を保存したときのふりがな
    nameEn: "Akihiro Serizawa",
    bio: "地域に、新しい風を。\n祖父母の八百屋の屋号「ヤマセ」に、\n山から吹く風「山背」を重ねて。", // YAMASE の下のリード文（\n で改行）
    photo: "",                            // 例："../assets/photo.jpg"（空なら頭文字を表示）
    accent: "#3f9a9a",                    // テーマ色（share-me の名刺に合わせたティール）

    // 「連絡先を保存」で入る内容。電話とメールは、リンクの一番上にも出る。
    phone: "080-6924-8697",
    email: "ak-serizawa@yamaselab.com",
    website: "",
    address: "",

    // リンクの欄。上から順に表示する。heading が空の欄は見出しなし。
    sections: [
      {
        // YAMASE が運営しているお店・活動。見てくれた人にフォローしてもらいたい。cta が右側のボタンの文字になる。
        en: "Follow us",                   // 見出しの上の大きい英字
        heading: "運営しているお店・活動の Instagram",
        links: [
          // img：丸いアイコンの画像（Instagram のプロフィール画像など）
          // desc：一言の説明　more：下に並べる小さいボタン
          {
            type: "instagram", img: "../assets/hotorino.jpg",
            label: "hotorino（ホトリノ）", desc: "狩野川のほとりで、小さな拠点をひらいています。",
            text: "@hotorino_", cta: "フォロー", url: "https://www.instagram.com/hotorino_/",
            more: [
              { label: "Web サイト", url: "https://hotorino.jp/" },
            ],
          },
          {
            type: "instagram", img: "../assets/ashitaka_terroir.jpg",
            label: "愛鷹テロワール", desc: "静岡東部らしさを勝手に語ってます。",
            text: "@ashitaka_terroir", cta: "フォロー", url: "https://www.instagram.com/ashitaka_terroir/",
            more: [
              { label: "Spotify で聴く", url: "https://open.spotify.com/show/0346YteU64OWcHY2xqwcE0" },
            ],
          },
        ],
      },
      {
        // contact: true の欄の一番上に、電話とメールが入る。
        heading: "連絡先",
        contact: true,
        links: [
          { type: "instagram", label: "Instagram", text: "@serizawakihiro", url: "https://www.instagram.com/serizawakihiro/" },
          { type: "facebook", label: "Facebook", text: "akihiro.serizawa.12", url: "https://www.facebook.com/akihiro.serizawa.12/" },
        ],
      },
    ],
  },
};
