const db = require("../models/queries");
const bcrypt = require("bcrypt");

async function signUpPost(req, res){
    const { name, username, email, password } = req.body;
    if(!name || !username || !email || !password) return res.status(401).json({ message: "Credentials missing or incomplete."});

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createNewUser(name, email, username, hashedPassword);
        return res.status(200).json({ message: "Sign Up Successfull"});
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    signUpPost,
};