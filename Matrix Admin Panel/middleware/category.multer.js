const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/category'))
    }, 
    filename: (req, file, cb) => {
        cb(null, `category_${req.body.username}${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports = multer({storage})