const adminModel = require("../model/admin.model");

module.exports.addAdminPage = (req,res)=>{
    return res.render("add_admin");
}

module.exports.dashboard = async(req,res)=>{
    return res.render("dashboard");
}

module.exports.addAdmin = async(req,res)=>{

    let img = "";

    if(req.file){
        img = req.file.path;
    }

    req.body.img = img;

    await adminModel.create(req.body);

    return res.redirect("/admin/view-admin");
}

module.exports.addView = async(req,res)=>{

    let data = await adminModel.find();

    return res.render("view_admin",{
        data
    })
}

module.exports.deleteAdmin = async(req,res)=>{

    let id = req.params.id;

    await adminModel.findByIdAndDelete(id);

    return res.redirect("/admin/view-admin");
}

module.exports.editAdminPage = async(req,res)=>{

    let id = req.params.id;

    let data = await adminModel.findById(id);

    return res.render("edit_admin",{
        data
    });
}

module.exports.Chnage = async(req,res)=>{

    let id = req.params.id;

    await adminModel.findByIdAndUpdate(id,req.body);

    return res.redirect("/admin/view-admin");
}