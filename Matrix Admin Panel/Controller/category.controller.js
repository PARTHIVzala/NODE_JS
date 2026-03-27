const categoryModel = require('../model/category.model')
const path = require('path')
const fs = require('fs')

exports.viewCategoryPage = async (req, res) => {
    categories = await categoryModel.find();
    // console.log(categories)
    res.render('viewcategory', { categories })
}
exports.addCategoryPage = async (req, res) => {
    res.render('addcategory')
}
exports.addCategory = async (req, res) => {
    console.log(req.body);
    category = req.body

    category.categoryCover = req.file ? `/uploads/category/${req.file.filename}` : ''

    newcategory = await categoryModel.create(category);
    return res.redirect('/category/view-category')
}
exports.deleteCategory = async (req, res) => {
    console.log(req.params._id);
    let category = await categoryModel.findById(req.params._id);    

    if(category.categoryCover) fs.unlinkSync(path.join(__dirname, '..', 'public', category.categoryCover))

    await categoryModel.findByIdAndDelete(req.params._id);

    return res.redirect('/category/view-category')
}
exports.editCategoryPage = async (req, res) => {
    let category = await categoryModel.findOne({ _id: req.params._id})
    return res.render('editcategory', { category })
}
exports.editCategory = async (req, res) => {
    console.log(req.body, req.file)
    let newCategory = req.body;
    if(req?.file?.filename){ // if there's a new category image
        let oldCategory = await categoryModel.findOne({_id: req.params._id});
        if(oldCategory.categoryCover != ''){ // if there's old category image
            fs.unlinkSync(path.join(__dirname, '..', 'public', oldCategory.categoryCover)) // delete old category image
        }
        newCategory.categoryCover = `/uploads/category/${req.file.filename}`;
    }
    let category = await categoryModel.findOneAndUpdate({"_id": req.params._id}, newCategory)
    res.redirect('/category/view-category')
}