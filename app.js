const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect("mongodb://localhost:27017/nodeAuth_jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT), console.log(`App is listening @${PORT}`))
  .catch((err) => console.log(err));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/lobby", (req, res) => res.render("lobby"));

app.use(authRoutes);
