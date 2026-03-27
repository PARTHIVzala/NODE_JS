const express = require('express');
const routes = express.Router();
const root = require('../Controller/index.controller');
const uploads = require('../middleware/admin.multer')
const blogUploads = require('../middleware/blog.multer')
const passport = require("../Controller/localStrategy");

routes.get('/', passport.checkAuthenticate, root.authenticate)
routes.get('/dashboard', passport.checkAuthenticate, root.homepage)
routes.get('/blog', passport.checkAuthenticate, root.blog)
routes.post('/blog/add-blog', blogUploads.single('profileImage'), root.addBlog)
routes.get('/blog/delete-blog/:_id', root.deleteBlog)
routes.get('/blog/edit-blog/:_id', passport.checkAuthenticate, root.editBlogPage)
routes.post('/blog/edit-blog/:_id', blogUploads.single('coverImage'),  root.editBlog)
routes.post('/blog/search',  root.searchBlog)
routes.get("/OneBlogView/:id", root.OneBlogView)


module.exports = routes