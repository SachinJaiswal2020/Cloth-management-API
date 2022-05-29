const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const crudController = require("../app/http/controllers/crudController");

// middleware 
const { userAuth, checkRole } = require("../app/config/Auth");

function initRoutes(app) {
  app.post("/register-user", authController().registerUser);
  app.post("/register-admin", authController().registerAdmin);
  app.post("/login", authController().login);
  app.get("/", userAuth, homeController().index);
  app.get("/admin-dashboard", userAuth, checkRole(['admin']), homeController().adminDashboard);
  app.post("/admin-add-cloth", userAuth, checkRole(['admin']), crudController().add);
  app.put("/admin-update-cloth/:id", userAuth, checkRole(['admin']), crudController().update);
  app.delete("/admin-delete-cloth/:id", userAuth, checkRole(['admin']), crudController().delete);

}

module.exports = initRoutes;
