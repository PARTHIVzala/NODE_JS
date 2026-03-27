const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const adminModel = require('../model/admin.model')
const bcrypt = require("bcrypt");


passport.use(new localStrategy(async (username, password, done) => {
    let admin = await adminModel.findOne({ username: username })
    if (!admin) {
        console.log("Admin not found");
        return done(null, false);
    }

    let isLegit = await bcrypt.compare(password, admin.password); 

    if (!isLegit) {
        console.log("Password incorrect");
        return done(null, false);
    }
    return done(null, admin);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
    try {
        const admin = await adminModel.findById(_id);
        done(null, admin);
    } catch (error) {
        done(error, null);
    }
});


passport.checkAuthenticate = (req, res, next) => {
    // console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/auth/login");
};

module.exports = passport;