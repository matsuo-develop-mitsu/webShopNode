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
router.post("/login", (request, response) => {
  let loginUser;
  request.on("data", (chunk) => {
    loginUser = "";
    loginUser += chunk;
  });
  request.on("end", () => {
    loginUser = qs.parse(loginUser);
    userController
      .doGetLoginUser(loginUser.email, loginUser.password)
      .then((data) => {
        if (data) {
          response.redirect("/list");
        } else {
          response.redirect("/");
        }
      });
  });
});

// ログイン後のルーティング
router.get("/list", (request, response) => {
  response.render("list.ejs", {
    title: "List画面",
  });
});
module.exports = router;
