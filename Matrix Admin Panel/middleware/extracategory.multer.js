const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/category/extracategory'))
    }, 
    filename: (req, file, cb) => {
        cb(null, `extracategory_${req.body.username}${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports = multer({storage})