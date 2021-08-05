const express = require("express");
const router = express.Router();
const qs = require("querystring");
var userController = require("../controller/UserController");

// 初期ページのルーティング
router.get("/", (request, response) => {
  response.render("index.ejs", {
    title: "ショッピングページ",
  });
});

// ログインのルーティング
router.post("/login", userController.doGetLoginUser);

// ログイン後のルーティング
router.get("/list", (request, response) => {
  response.render("list.ejs", {
    title: "List画面",
  });
});
module.exports = router;
