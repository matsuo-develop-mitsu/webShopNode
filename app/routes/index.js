const express = require("express");
const router = express.Router();

// 初期ページのルーティング
router.get("/", (request, response) => {
  response.render("index.ejs", {
    title: "NodeSample01",
    message: "Hello Node.js",
  });
});

router.post("/login", (request, response) => {
  console.log("ログインしました");
  response.render("list.ejs", {
    title: "List",
  });
});

module.exports = router;
