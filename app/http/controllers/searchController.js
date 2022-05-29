// const { serializeUser } = require("../../config/Auth");
const Cloth = require("../../model/Cloth");

function searchController() {
  return {
    async search(req, res) {
        const searchKey = req.query.q;
        Cloth.find(
        { name: { $regex: searchKey, $options: "i" } },
        (err, data) => {
          if (err) {
            return res.json({
              message: "Nothing found search another term",
              status: false,
            });
          } else if (data.length <= 0) {
            return res.json({
              message: "Nothing found search another term",
              status: false,
            });
          } else {
            return res.json({
              message: "Searched clothes",
              status: true,
              data,
            });
          }
        }
      );
    },

  };
}

module.exports = searchController;
