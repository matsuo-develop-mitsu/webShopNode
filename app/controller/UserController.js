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
      User.getLoginUser(loginUser.email, loginUser.password).then((result) => {
        if (result) {
          response.redirect("/list");
        } else {
          response.redirect("/");
        }
      });
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
