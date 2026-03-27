const express = require('express');
const routes = express.Router();
const root = require('../Controller/subcategory.controller');
const uploads = require('../middleware/subcategory.multer')
const passport = require("../Controller/localStrategy");

routes.get('/view-subcategory', passport.checkAuthenticate, root.viewSubCategoryPage)
routes.get('/add-subcategory', passport.checkAuthenticate, root.addSubCategoryPage)
routes.post('/add-subcategory', uploads.single('subcategoryImage'), root.addSubCategory)
routes.get('/api/by-category/:categoryId', passport.checkAuthenticate, root.getSubcategoriesByCategory)
routes.get('/edit-subcategory/:_id', passport.checkAuthenticate, root.editSubCategoryPage)
routes.post('/edit-subcategory/:_id', uploads.single('subcategoryImage'), root.editSubCategory)
routes.get('/delete-subcategory/:_id', passport.checkAuthenticate, root.deleteSubCategory)


module.exports = routes;