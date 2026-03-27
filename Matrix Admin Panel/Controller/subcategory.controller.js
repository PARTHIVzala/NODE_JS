const subCategoryModel = require('../model/subcategory.model')
const categoryModel = require('../model/category.model')
const extraCategoryModel = require('../model/extracategory.model')
const path = require('path')
const fs = require('fs')

exports.viewSubCategoryPage = async (req, res) => {
    categories = await subCategoryModel.find().populate('cid');
    console.log(categories)
    res.render('viewsubcategory', { categories })
}
exports.addSubCategoryPage = async (req, res) => {
    categories = await categoryModel.find();
    res.render('addsubcategory', { categories });
}

// API: Return subcategories for a given category
exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) return res.json({ error: 'categoryId is required' });
        const subcategories = await subCategoryModel.find({ cid: categoryId }).populate('cid');
        return res.json(subcategories);
    } catch (error) {
        return res.json({ error: 'Internal server error' });
    }
};

exports.addSubCategory = async (req, res) => {
    console.log(req.body);
    category = req.body

    category.categoryCover = req.file ? `/uploads/category/subcategory/${req.file.filename}` : ''
    
    newcategory = await subCategoryModel.create(category);
    return res.redirect('/subcategory/view-subcategory')
}
exports.deleteSubCategory = async (req, res) => {
    console.log(req.params._id);
    const subcategoryId = req.params._id;
    let subcategory = await subCategoryModel.findById(subcategoryId);

    if(subcategory && subcategory.categoryCover) {
        const coverPath = path.join(__dirname, '..', 'public', subcategory.categoryCover)
        if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath)
    }

    // Delete dependent extra categories (cascade delete)
    const extraCategories = await extraCategoryModel.find({ scid: subcategoryId });
    for (const extra of extraCategories) {
        if (extra.extraCategoryCover) {
            const extraCoverPath = path.join(__dirname, '..', 'public', extra.extraCategoryCover)
            if (fs.existsSync(extraCoverPath)) fs.unlinkSync(extraCoverPath)
        }
        await extraCategoryModel.findByIdAndDelete(extra._id);
    }

    await subCategoryModel.findByIdAndDelete(subcategoryId);

    return res.redirect('/subcategory/view-subcategory')
}
exports.editSubCategoryPage = async (req, res) => {
    let subcategory = await subCategoryModel.findOne({ _id: req.params._id}).populate('cid');
    let categories = await categoryModel.find();
    return res.render('editsubcategory', { subcategory, categories })
}
exports.editSubCategory = async (req, res) => {
    console.log(req.body, req.file)
    let newSubCategory = req.body;
    if(req?.file?.filename){ // if there's a new subcategory image
        let oldSubCategory = await subCategoryModel.findOne({_id: req.params._id});
        if(oldSubCategory.categoryCover != ''){ // if there's old subcategory image
            fs.unlinkSync(path.join(__dirname, '..', 'public', oldSubCategory.categoryCover)) // delete old subcategory image
        }
        newSubCategory.categoryCover = `/uploads/category/subcategory/${req.file.filename}`;
    }
    let subcategory = await subCategoryModel.findOneAndUpdate({"_id": req.params._id}, newSubCategory)
    res.redirect('/subcategory/view-subcategory')
}