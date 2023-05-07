const express = require("express");
const app = express();
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main", {
    name: "Yordii",
  });
});

app.use("/", require("./routes/daily.route"));
app.use("/", require("./routes/study.route"));

module.exports = app;
