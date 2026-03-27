const adminModel = require('../model/admin.model')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

exports.loginPage = (req, res) => {
    return res.render('login')
}
exports.authenticate = async (req, res) => { // authenticate login when at /auth/login
    admin = await adminModel.findOne({ username: req.body.username })
    // console.log(admin)
    if (admin) {
        // if(admin.password == req.body.password) res.cookie('adminauth', admin)
        // if (await bcrypt.compare(req.body.password, admin.password)) res.cookie('adminauth', admin);
        // if (await bcrypt.compare(req.body.password, admin.password)) return res.redirect('/');
        return res.redirect('/');
    }

    return res.redirect('/');

    // brief explanation: if admin is there, and db responds, cookie is added, else nothing
    // and / is redirected, isLoggedin is check at ./index.controller.js 
}


// exports.logout = (req, res) => {
//     // res.clearCookie('adminauth')
//     res.redirect('/');
// }


exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            return res.redirect("/");
        })
    })
}

