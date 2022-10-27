const http = require("http");

require("dotenv").config();

const sequelize = require("./utils/database");

const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

const { get404 } = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

const server = http.createServer(app);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

server.listen(3000);
//module.exports = path.dirname(require.main.filename);
