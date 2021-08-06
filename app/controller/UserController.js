const qs = require("querystring");
const User = require("../module/User");

module.exports = {
  doGetLoginUser: function (request, response) {
    let loginUser;
    request.on("data", (chunk) => {
      loginUser = "";
      loginUser += chunk;
    });
    request.on("end", () => {
      loginUser = qs.parse(loginUser);

      // フロントでメールアドレスかパスワードがからであればDBに登録されているかどうかの処理を行う
      if (!loginUser.email || !loginUser.password) {
        response.redirect("/");
      } else {
        User.getLoginUser(loginUser.email, loginUser.password).then(
          (result) => {
            // メールアドレスとパスワードがDBに登録されているユーザーと一致すれば、リスト画面に飛ぶ
            result ? response.redirect("/list") : response.redirect("/");
          }
        );
      }
    });
  },
  doRegistUser: function (request, response) {
    let registerUser;

    request.on("data", (chunk) => {
      registerUser = "";
      registerUser += chunk;
    });

    request.on("end", () => {
      registerUser = qs.parse(registerUser);

      User.registUser(
        registerUser.name,
        registerUser.mail,
        registerUser.password
      ).then((data) => {
        if (data) {
          response.redirect("/list");
        } else {
          response.redirect("/");
        }
      });
    });
  },
};
