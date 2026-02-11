const express = require("express");
const dbconnect = require("./config/dbconnection");

const app = express();
const PORT = 8080;

const startServer = () => {
  dbconnect();

  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads"));
  app.use(express.static("public"));

  app.use("/", require("./routes/movie.routes"));

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

startServer();
