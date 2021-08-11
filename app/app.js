const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

// セッションオブジェクトを初期化する
app.use(
  session({
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);

// 画面のパス
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 静的なファイルの読み込み
app.use(express.static(path.join(__dirname, "public")));

// URLと処理をマッピング
app.use("/", require("./routes/index.js"));
app.use("/login", require("./routes/index.js"));

// ポート3000で起動
app.listen(3000);

// サーバーが起動したことをログで確認
console.log("サーバーが起動しました");
