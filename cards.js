// 名刺の中身。lit.link のように、プロフィールの下にリンクのボタンを並べる。
// キー（"yamase"）がURLの最後の部分になる：
//   https://ak-serizawa34.github.io/yamase-digital-card/yamase/
// ※NFCタグに書いたあとはキーを変えないこと（URLが変わってタグが使えなくなる）。
// 中身（名前・リンク・並び順など）はいつ変えても大丈夫。
//
// 「仮」と書いた所は、まだ本当の内容が入っていない。

window.CARDS = {
  yamase: {
    org: "YAMASE",
    title: "代表",                        // 仮
    name: "芹澤 ○○",                     // 仮（漢字の表記をもらって入れる）
    nameKana: "せりざわ あきひろ",          // 仮
    nameEn: "Akihiro Serizawa",
    bio: "ここに自己紹介が入ります。",       // 仮
    photo: "",                           // 例："../assets/photo.jpg"（空なら頭文字を表示）
    accent: "#2f3a4a",                   // テーマ色（YAMASEの色は未決定のため仮）

    // 「連絡先を保存」で入る内容。空なら入らない。
    phone: "",                           // 例："+81-90-0000-0000"
    email: "",                           // 例："serizawa@yamaselab.com"
    website: "",                         // 例："https://yamaselab.com/"
    address: "",

    // ボタンの欄。上から順に表示する。url が空のボタンは表示しない。
    sections: [
      {
        heading: "YAMASE",
        links: [
          { label: "YAMASE の Web サイト", url: "" },          // 仮
          { label: "Instagram", url: "" },                     // 仮
        ],
      },
      {
        heading: "hotorino",
        text: "まちと人、暮らしと旅の、ちょうどいいあいだ。",     // 仮（Canvaの名刺の言葉）
        links: [
          { label: "hotorino の Web サイト", url: "" },        // 仮
          { label: "ご予約", url: "" },                        // 仮
          { label: "Instagram", url: "" },                     // 仮
        ],
      },
      {
        heading: "AIカタチラボ",
        links: [
          { label: "AIカタチラボ", url: "" },                  // 仮
        ],
      },
    ],
  },
};
