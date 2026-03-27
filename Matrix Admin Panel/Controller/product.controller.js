const productModel = require('../model/product.model')
const categoryModel = require('../model/category.model')
const subcategoryModel = require('../model/subcategory.model')
const extracategoryModel = require('../model/extracategory.model')
const path = require('path')
const fs = require('fs')

exports.viewProductPage = async (req, res) => {
    try {
        const products = await productModel.find()
            .populate('category')
            .populate('subcategory')
            .populate('extracategory')
        res.render('viewproduct', { products })
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}

exports.addProductPage = async (req, res) => {
    try {
        const categories = await categoryModel.find()
        res.render('addproduct', { categories })
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}

exports.addProduct = async (req, res) => {
    try {
        console.log(req.body);
        const product = req.body

        product.productImage = req.file ? `/uploads/product/${req.file.filename}` : ''

        const newProduct = await productModel.create(product);
        return res.redirect('/product/view-product')
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        console.log(req.params._id);
        const product = await productModel.findById(req.params._id);

        if(product.productImage) {
            const imagePath = path.join(__dirname, '..', 'public', product.productImage)
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        await productModel.findByIdAndDelete(req.params._id);
        return res.redirect('/product/view-product')
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}

exports.editProductPage = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params._id })
            .populate('category')
            .populate('subcategory')
            .populate('extracategory')
        const categories = await categoryModel.find()
        return res.render('editproduct', { product, categories })
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}

exports.editProduct = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const newProduct = req.body;
        if(req?.file?.filename){ // if there's a new product image
            const oldProduct = await productModel.findOne({_id: req.params._id});
            if(oldProduct.productImage && oldProduct.productImage !== ''){ // if there's old product image
                const oldImagePath = path.join(__dirname, '..', 'public', oldProduct.productImage)
                if(fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath) // delete old product image
                }
            }
            newProduct.productImage = `/uploads/product/${req.file.filename}`;
        }
        await productModel.findOneAndUpdate({"_id": req.params._id}, newProduct)
        res.redirect('/product/view-product')
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
}