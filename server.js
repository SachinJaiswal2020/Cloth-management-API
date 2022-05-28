const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const bp =  require("body-parser");
const passport = require("passport");

//MONGODB CONNECTION
require("./DB/conn");

app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./app/http/middleware/passport")(passport);

//routes
require('./routes/web')(app);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});