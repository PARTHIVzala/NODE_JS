const adminModel = require('../model/admin.model')
const blogModel = require('../model/blog.model')
const path = require('path')
const fs = require('fs')
const bcrypt = require("bcrypt");


exports.homepage = async (req, res) => {
    if (req.isAuthenticated()) return res.render('dashboard');
    return res.redirect('/auth/login');
};
exports.loginPage = (req, res) => {
    res.render('login')
}
exports.authenticate = (req, res) => { // authenticate at dashboard entry
    if (req.isAuthenticated()) return res.redirect('/dashboard');
    return res.redirect('/auth/login');
}
exports.blog = async (req, res) => {
    let filter = {};
    let blog = {}
    const categorySearch = req.query.category;
    if (categorySearch) {
        filter.category = categorySearch;
        blog = await blogModel.find(filter);
    } else blog = await blogModel.find();
    console.log(blog)
    return res.render('blog', { blog });
}
exports.addBlog = async (req, res) => {
    // console.log(req.file);
    let blog = req.body

    blog.coverImage = req.file ? `/uploads/blog/${req.file.filename}` : ''
    console.log(blog)
    let newblog = await blogModel.create(blog);
    console.log(newblog);
    return res.redirect('/blog')
}
exports.deleteBlog = async (req, res) => {
    try {

        console.log(req.params._id)
        let oldBlog = await blogModel.findOne({ _id: req.params._id })
        if (oldBlog.coverImage) fs.unlinkSync(path.join(__dirname, '..', 'public', oldBlog.coverImage))
        let blog = await blogModel.findOneAndDelete({ _id: req.params._id })
    } catch (e) {
        console.log('error :', e)
        res.redirect('/blog');
    }
    res.redirect('/blog');
}
exports.editBlog = async (req, res) => {
    console.log(req.params._id)
    let newBlog = { ...req.body, coverImage: '' }
    let oldBlog = await blogModel.findOne({ _id: req.params._id })

    if (req?.file?.filename) { // delete only if new image arrives 
        if (oldBlog.coverImage) fs.unlinkSync(path.join(__dirname, '..', 'public', oldBlog.coverImage))
        newBlog.coverImage = `/uploads/blog/${req.file.filename}`;
    } else newBlog.coverImage = oldBlog.coverImage || '';
    let blog = await blogModel.findOneAndUpdate({ _id: req.params._id }, newBlog);
    // console.log(req.body, newBlog);
    res.redirect('/blog')
}
exports.editBlogPage = async (req, res) => {
    console.log(req.params._id)
    let blog = await blogModel.findOne({ _id: req.params._id })
    res.render('editBlog', { blog })
}
exports.searchBlog = async (req, res) => {
    const searchQuery = String(req.body.search || '').trim();
    let blog = await blogModel.find({
        $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { author: { $regex: searchQuery, $options: 'i' } },
            { category: { $regex: searchQuery, $options: 'i' } },
        ]
    })
    // console.log(movie)
    // console.log(Object.keys(movieModel.schema.paths));

    res.render('blog', { blog })
}
exports.OneBlogView = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId);

        return res.render("OneBlogView", { blog });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}