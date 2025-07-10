const db = require("../models/queries");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");


passport.use(new LocalStrategy( async(username, password, done) => {
    try{
        const user = await db.getUserByName(username);
        if(!user){
            return done(null, false, { message: "Username not found!"});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, { message: "Password is incorrect!"});
        }

        return done(null, user);
    }catch(err){
        return done(err);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await db.getUserById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
});

function handleLogin(req, res, next){
    passport.authenticate("local", (err, user, info) => {
        if(err) return next(err);
        if(!user){
            return res.status(401).json({ message: info?.message || "Invalid username or password"});
        }

        req.login(user, (err) => {
            if(err) return next(err);
            console.log("User Logged In Successfully!");
            return res.status(200).json({ message: "login successful", user: user });
        });
    })(req, res, next);
}


module.exports = {
    passport,
    handleLogin
}
