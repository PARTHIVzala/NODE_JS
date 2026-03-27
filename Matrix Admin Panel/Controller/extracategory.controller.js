const extraCategoryModel = require('../model/extracategory.model')
const subCategoryModel = require('../model/subcategory.model')
const categoryModel = require('../model/category.model')
const path = require('path')
const fs = require('fs')

exports.viewextraCategoryPage = async (req, res) => {
    categories = await extraCategoryModel.find().populate('scid');
    console.log(categories)
    res.render('viewextracategory', { categories })
}
exports.addextraCategoryPage = async (req, res) => {
    const categories = await categoryModel.find();
    // Load all subcategories initially; frontend will filter them based on selected category.
    const subcategories = await subCategoryModel.find().populate('cid');
    res.render('addextracategory', { categories, subcategories })
}
exports.addextraCategory = async (req, res) => {
    console.log(req.body);
    category = req.body

    category.extraCategoryCover = req.file ? `/uploads/category/extracategory/${req.file.filename}` : ''

    newcategory = await extraCategoryModel.create(category);
    return res.redirect('/extracategory/view-extracategory')
}
exports.deleteextraCategory = async (req, res) => {
    console.log(req.params._id);
    let extracategory = await extraCategoryModel.findById(req.params._id);    

    if(extracategory.extraCategoryCover) fs.unlinkSync(path.join(__dirname, '..', 'public', extracategory.extraCategoryCover))

    await extraCategoryModel.findByIdAndDelete(req.params._id);

    return res.redirect('/extracategory/view-extracategory')
}
exports.editextraCategoryPage = async (req, res) => {
    const categories = await categoryModel.find();
    // Populate scid and its cid (category) so we can pre-select the right category/subcategory
    let extracategory = await extraCategoryModel.findOne({ _id: req.params._id})
        .populate({
            path: 'scid',
            populate: { path: 'cid' }
        });
    let subcategories = await subCategoryModel.find().populate('cid');
    return res.render('editextracategory', { categories, extracategory, subcategories })
}
exports.editextraCategory = async (req, res) => {
    console.log(req.body, req.file)
    let newextraCategory = req.body;
    if(req?.file?.filename){ // if there's a new extracategory image
        let oldextraCategory = await extraCategoryModel.findOne({_id: req.params._id});
        if(oldextraCategory.extraCategoryCover != ''){ // if there's old extracategory image
            fs.unlinkSync(path.join(__dirname, '..', 'public', oldextraCategory.extraCategoryCover)) // delete old extracategory image
        }
        newextraCategory.extraCategoryCover = `/uploads/category/extracategory/${req.file.filename}`;
    }
    let extracategory = await extraCategoryModel.findOneAndUpdate({"_id": req.params._id}, newextraCategory)
    res.redirect('/extracategory/view-extracategory')
}

// API: Return extracategories for a given subcategory
exports.getExtracategoriesBySubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;
        if (!subcategoryId) return res.status(400).json({ error: 'subcategoryId is required' });
        const extracategories = await extraCategoryModel.find({ scid: subcategoryId }).populate('scid');
        return res.json(extracategories);
    } catch (error) {
        console.error('Error fetching extracategories by subcategory:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}