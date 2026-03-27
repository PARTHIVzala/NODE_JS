const express = require('express');
const routes = express.Router();
const root = require('../Controller/product.controller');
const uploads = require('../middleware/product.multer')
const passport = require("../Controller/localStrategy");

routes.get('/view-product', passport.checkAuthenticate, root.viewProductPage)
routes.get('/add-product', passport.checkAuthenticate, root.addProductPage)
routes.post('/add-product', uploads.single('productImage'), root.addProduct)
routes.get('/edit-product/:_id', passport.checkAuthenticate, root.editProductPage)
routes.post('/edit-product/:_id', uploads.single('productImage'), root.editProduct)
routes.get('/delete-product/:_id', passport.checkAuthenticate, root.deleteProduct)

module.exports = routes;