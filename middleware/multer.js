const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const filename = crypto.randomBytes(10).toString("hex")+ path.extname(file.originalname)
        cb(null,filename)
    }
})
upload= multer({storage:storage})
module.exports=upload;