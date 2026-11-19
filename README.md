# yamase-digital-card

NFCタグで開く、芹澤のデジタル名刺。lit.link のように、プロフィールの下にリンクのボタンを並べる。
hotorino は YAMASE の中の事業なので、別の名刺にせず、YAMASE の名刺の中の欄にする（2026-11-19）。
share-me（https://share-me.design/serizawaakihiro）の代わりに、自分で持つ。
GitHub Pages で公開する（2026-11-19 決定）。

## URL（NFCタグに書き込むもの）

`https://ak-serizawa34.github.io/yamase-digital-card/yamase/`

- タグに書いたURLは、あとから変えられない。フォルダ名（`yamase/` など）も、公開先のアドレスも変えないこと
- ページの中身は、`cards.js` を直せばいつでも変わる（タグはそのまま）

## できること

- 名前・肩書き・自己紹介・写真
- 「連絡先を保存」ボタン（スマホの連絡先に入る。vCard）
- 電話・メール・地図の小さいボタン
- 事業ごとの欄（YAMASE・hotorino・AIカタチラボなど）に、リンクのボタンを並べる。URLが空のボタンは出ない

## 中身を直す

`cards.js` だけを直す。「要確認」と書いた所が、まだ正しいURLが入っていない所（URLが空のリンクは表示されない）。
欄やボタンを足す・並べ替えるときは、`sections` の中を直す。
写真を使うときは `assets/` に入れて、`photo: "../assets/ファイル名.jpg"` と書く。

## 名刺を増やす（別の人・別のURLが要るとき）

1. `cards.js` に1ブロック足す（キーがURLの最後の部分になる。例：`katachi`）
2. `yamase/` フォルダを丸ごと写して、フォルダ名をキーと同じにし、中の `index.html` の `CARD_ID` をキーに変える

## ファイル

- `cards.js` … 名刺の中身
- `assets/card.css` / `assets/card.js` … 見た目と動き（全部の名刺で共通）
- `<キー>/index.html` … それぞれの名刺のURLになるページ
- `.nojekyll` … GitHub Pages がファイルを加工しないようにする
