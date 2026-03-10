const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const adminModel = require("../model/admin.model");

passport.use(new LocalStrategy(
    {usernameField:'email'},
    async (email,password,done)=>{
        
        let user = await adminModel.findOne({email:email});

        if(!user){
            return done(null,false);
        }

        if(user.password != password){
            return done(null,false);
        }

        return done(null,user);
    }
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let user = await adminModel.findById(id);
    return done(null,user);
});

passport.checkAuthenticate = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/");
}

passport.setAuthenticate = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    return next();
}

module.exports = passport;