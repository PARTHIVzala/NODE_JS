const mongoose = require("mongoose");

const dbconnect = () => {
  mongoose.connect("mongodb://localhost:27017/Node-PR");

  mongoose.connection.on("connected", () => {
    console.log("DB is Connected !!");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

module.exports = dbconnect;
