const Book = require("../Model/Books.model");

exports.getAllBook = async (req, res) => {
    try {
        let books = await Book.find();
        return res.render('index', { books });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.addNewBook = async (req, res) => {
    try {
        let book = await Book.create(req.body);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.deleteBook = async (req, res) => {
    try {
        let id = req.params.id;
        let book = await Book.findById(id);

        if (!book) {
            console.log("Book Not Found");
            return res.redirect("/");
        }

        await Book.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.editBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) {
            console.log("Book Not Found");
            return res.redirect("/");
        }
        return res.render('editBooks', { book });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) {
            console.log("Book Not Found");
            return res.redirect("/");
        }

        await Book.findByIdAndUpdate(book._id, req.body, { new: true });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};
