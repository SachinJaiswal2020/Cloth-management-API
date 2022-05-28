const { serializeUser } = require("../../config/Auth");

function homeController() {
  return {
    async index(req, res) {
      return res.json(serializeUser(req.user));
    },
    async adminDashboard(req, res) {
      return res.json({message: "hello admin", status: true});
    },
  };
}

module.exports = homeController;
