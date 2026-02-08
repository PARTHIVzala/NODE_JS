const express = require("express");
const port = 8080;
const app = express();
const dbconnect = require("./config/dbconnection");

//DB connection
dbconnect();

//Middlware
app.set("view engine", 'ejs');
app.use(express.urlencoded());

app.use("/", require("./routes/books.routes"))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server start at http://localhost:${port}`);
});