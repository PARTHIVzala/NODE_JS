const adminModel = require('../model/admin.model');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// ================= ADD ADMIN PAGE =================
exports.addAdminPage = (req, res) => {
    res.render('addadmin');
};

// ================= VIEW ADMIN =================
exports.viewAdminPage = async (req, res) => {
    const admins = await adminModel.find();
    res.render('viewadmin', { admins });
};

// ================= ADD ADMIN =================
exports.addAdmin = async (req, res) => {
    try {
        const admin = req.body;

        admin.profilePath = req.file ? `/uploads/${req.file.filename}` : '';

        // 🔥 HASH PASSWORD
        admin.password = await bcrypt.hash(admin.password, 10);

        await adminModel.create(admin);

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

// ================= EDIT ADMIN PAGE =================
exports.editAdminPage = async (req, res) => {
    const admin = await adminModel.findById(req.params._id);
    res.render('editadmin', { admin });
};

// ================= EDIT ADMIN =================
exports.editAdmin = async (req, res) => {
    try {
        let newAdmin = req.body;

        // 🔥 PASSWORD HASH IF UPDATED
        if (newAdmin.password) {
            newAdmin.password = await bcrypt.hash(newAdmin.password, 10);
        }

        // 🔥 IMAGE UPDATE
        if (req.file) {
            let oldAdmin = await adminModel.findById(req.params._id);

            if (oldAdmin.profilePath) {
                const filePath = path.join(__dirname, '..', 'public', oldAdmin.profilePath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            newAdmin.profilePath = `/uploads/${req.file.filename}`;
        }

        await adminModel.findByIdAndUpdate(req.params._id, newAdmin);

        res.redirect('/admin/view-admin');
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
};

// ================= DELETE ADMIN =================
exports.deleteAdmin = async (req, res) => {
    try {
        const oldAdmin = await adminModel.findById(req.params._id);

        if (oldAdmin.profilePath) {
            const filePath = path.join(__dirname, '..', 'public', oldAdmin.profilePath);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await adminModel.findByIdAndDelete(req.params._id);

        return res.redirect('/admin/view-admin');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};