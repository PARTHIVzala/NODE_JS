const express = require("express");
const { getAllBook, addNewBook, deleteBook, editBook, updateBook } = require("../controller/books.controller");

const routes = express.Router();

routes.get("/", getAllBook);

routes.post("/add-books", addNewBook);

routes.get("/delete-books/:id", deleteBook);

routes.get("/edit-books/:id", editBook);

routes.post("/update-books/:id", updateBook);

module.exports = routes;
