const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Database Connection
const dbconnect = require("./config/dbconnect");

// Passport Config
const passport = require("./controller/localStregert");

// ======================
// Basic Setup
// ======================

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// ======================
// Session Setup
// ======================
app.use(
  session({
    secret: "vivekSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// ======================
// Passport Setup
// ======================
app.use(passport.initialize());
app.use(passport.session());

// ======================
// Routes
// ======================
app.use("/", require("./routes/index.routes"));

// ======================
// Database Connection
// ======================
dbconnect();

// ======================
// Server Start
// ======================
app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});