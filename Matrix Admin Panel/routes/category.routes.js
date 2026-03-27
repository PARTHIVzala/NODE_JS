const express = require('express');
const routes = express.Router();
const root = require('../Controller/category.controller');
const uploads = require('../middleware/category.multer')
const passport = require("../Controller/localStrategy");

routes.get('/view-category', passport.checkAuthenticate, root.viewCategoryPage)
routes.get('/add-category', passport.checkAuthenticate, root.addCategoryPage)
routes.post('/add-category', uploads.single('categoryImage'), root.addCategory)
routes.get('/edit-category/:_id', passport.checkAuthenticate, root.editCategoryPage)
routes.post('/edit-category/:_id', uploads.single('categoryImage'), root.editCategory)
routes.get('/delete-category/:_id', passport.checkAuthenticate, root.deleteCategory)


module.exports = routes;