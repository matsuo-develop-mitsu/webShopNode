const express = require("express");
const router = express.Router();
const qs = require("querystring");
const userController = require("../controller/UserController");
const itemController = require("../controller/ItemController");

// 初期ページのルーティング
router.get("/", (request, response) => {
  response.render("index.ejs", {
    title: "トップページ",
  });
});

// ログインのルーティング
router.post("/login", userController.doGetLoginUser);
// 一覧画面のルーティング
router.get("/list", itemController.doGetAllItems);

// アカウント作成画面へのルーティング
router.get("/regist", (request, response) => {
  response.render("register.ejs", {
    title: "登録画面",
  });
});

// アカウント作成のルーティング
router.post("/regist", userController.doRegistUser);

module.exports = router;
