const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");


// middleware 
const { userAuth, checkRole } = require("../app/config/Auth");

function initRoutes(app) {
  app.post("/register-user", authController().registerUser);
  app.post("/register-admin", authController().registerAdmin);
  app.post("/login", authController().login);
  app.get("/", userAuth, homeController().index);
  app.get("/admin-dashboard", userAuth, checkRole(['admin']), homeController().adminDashboard);

}

module.exports = initRoutes;
