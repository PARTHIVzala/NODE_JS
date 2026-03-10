const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Database Connection
const dbconnect = require("./config/dbconnect");
dbconnect();

// Passport Config
const passport = require("./controller/localStregert");

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

// Session
app.use(
  session({
    name: "adminpanel",
    secret: "vivekSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ================= ROUTES =================

// Login Page
app.get("/", (req, res) => {
  res.render("login");
});

// Login Process
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Dashboard
app.get("/dashboard", passport.checkAuthenticate, (req, res) => {
  res.render("dashboard");
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

// Admin Routes
const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

// ================= SERVER =================

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});