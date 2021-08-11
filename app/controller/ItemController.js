const Item = require("../module/Item");
const url = require("url");

module.exports = {
  doGetAllItems: async function (request, response) {
    Item.getAllItems().then((data) => {
      response.render("list.ejs", {
        items: data,
        session: {
          name: request.session.userName,
          id: request.session.userId,
        },
      });
    });
  },
  doGetOneItem: async function (request, response) {
    const parsseUrl = url.parse(request.url, true);
    let itemId = parsseUrl.href.replace("/list/", "");
    Item.getItemDetail(itemId)
      .then((data) => {
        response.render("itemDetail.ejs", {
          session: {
            name: request.session.userName,
            id: request.session.userId,
          },
          item: data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  addCartItem: function (request, response) {
    console.log("アイテムをカートに登録しました");
    response.redirect("/list");
  },
};
