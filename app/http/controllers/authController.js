const { userRegister, userLogin } = require("../../config/Auth");

function authController() {
  return {
    async registerUser(req, res) {
      await userRegister(req.body, "user", res);
    },
    async registerAdmin(req, res) {
      await userRegister(req.body, "admin", res);
    },
    async login(req, res) {
        await userLogin(req.body, res);
    },
  };
}

module.exports = authController;
