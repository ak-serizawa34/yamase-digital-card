// 名刺の中身。1枚＝1ブロック。キー（"yamase" など）がURLの最後の部分になる。
// 例：https://ak-serizawa34.github.io/yamase-digital-card/yamase/
// ※NFCタグに書いたあとはキーを変えないこと（URLが変わってタグが使えなくなる）。
// 中身（名前・リンクなど）はいつ変えても大丈夫。
//
// 「仮」と書いた所は、まだ本当の内容が入っていない。

window.CARDS = {
  yamase: {
    org: "YAMASE",                       // 仮
    title: "代表",                        // 仮
    name: "芹澤 ○○",                     // 仮（漢字の表記をもらって入れる）
    nameKana: "せりざわ あきひろ",          // 仮
    nameEn: "Akihiro Serizawa",
    bio: "ここに自己紹介が入ります。",       // 仮
    photo: "",                           // 例："../assets/photo.jpg"（空なら頭文字を表示）
    accent: "#2f3a4a",                   // テーマ色（YAMASEの色は未決定のため仮）
    phone: "",                           // 例："+81-90-0000-0000"
    email: "",                           // 例："serizawa@yamaselab.com"
    website: "",
    address: "",
    links: [
      // { label: "Instagram", url: "https://www.instagram.com/xxxx/" },
    ],
  },

  hotorino: {
    org: "hotorino",
    title: "オーナー",                    // 仮
    name: "芹澤 ○○",                     // 仮
    nameKana: "せりざわ あきひろ",          // 仮
    nameEn: "Akihiro Serizawa",
    bio: "まちと人、暮らしと旅の、ちょうどいいあいだ。", // 仮（Canvaの名刺の言葉）
    photo: "",
    accent: "#008b8b",                   // hotorinoのブランドカラー
    phone: "",
    email: "",
    website: "",
    address: "",
    links: [],
  },
};
