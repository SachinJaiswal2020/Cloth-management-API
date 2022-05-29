// const { serializeUser } = require("../../config/Auth");
const Cloth = require("../../model/Cloth");

function homeController() {
  return {
    async index(req, res) {
      const clothes = await Cloth.find();
      return res.json({ message: "Hello User", status: true, clothes });
    },
    async adminDashboard(req, res) {
      const clothes = await Cloth.find();
      return res.json({ message: "Hello Admin", status: true, clothes });
    },
  };
}

module.exports = homeController;
