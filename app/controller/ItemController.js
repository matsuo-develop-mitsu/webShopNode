const Item = require("../module/Item");

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
};
