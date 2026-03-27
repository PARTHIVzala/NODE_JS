const express = require('express');
const routes = express.Router();
const root = require('../Controller/admin.controller');
const uploads = require('../middleware/admin.multer')
const passport = require('../Controller/localStrategy');

routes.get('/', passport.checkAuthenticate, root.viewAdminPage) // fallback
routes.get('/view-admin', passport.checkAuthenticate, root.viewAdminPage)
routes.get('/add-admin', passport.checkAuthenticate, root.addAdminPage)
routes.post('/add-admin', uploads.single('profileImage'), root.addAdmin)
routes.get('/edit-admin/:_id', passport.checkAuthenticate, root.editAdminPage)
routes.post('/edit-admin/:_id', uploads.single('profileImage'), root.editAdmin)
routes.get('/delete-admin/:_id', passport.checkAuthenticate, root.deleteAdmin)
// routes.get('/change-password', passport.checkAuthenticate, root.homepage)


module.exports = routes