const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let todoList = [];

// HOME
app.get("/", (req, res) => {
  res.render("index", { todoList });
});

// ADD
app.post("/add", (req, res) => {
  const { name, email, course, mobile } = req.body;

  todoList.push({ name, email, course, mobile });
  res.redirect("/");
});

// DELETE
app.post("/delete", (req, res) => {
  const index = req.body.index;
  todoList.splice(index, 1);
  res.redirect("/");
});

// EDIT PAGE
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  res.render("edit", { data: todoList[index], index });
});


// UPDATE
app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  const { name, email, course, mobile } = req.body;

  todoList[index] = { name, email, course, mobile };
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
