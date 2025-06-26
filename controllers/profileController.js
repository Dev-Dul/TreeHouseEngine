const db = require("../models/queries");

async function updateProfile(req, res){
    const { userId, name, username, email, bio } = req.body;
    const profilePicUrl = req.files.profilePic[0].path;
    const backgroundPicUrl = req.files.backgroundPic[0].path;
    if(!name || !username || !email || !bio) return res.status(401).json({ message: "Credentials incomplete or missing"});
    if(!profilePicUrl || !backgroundPicUrl) return res.status(401).json({ message: "No Pictues Uploaded" });

    try{
        await db.updateProfile(name, email, username, bio, profilePicUrl, backgroundPicUrl, Number(userId));
        return res.status(200).json({ message: "Profile Updated Successully!" });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

}

async function getUserById(req, res){
    const { userId } = req.body;
    if(!userId) return res.status(401).json({ message: "Credentials incomplete or missing"});
    
    try{
        const user = await db.getUserById(Number(userId));
        return res.status(200).json({ user: user });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    
}

module.exports = {
    getUserById,
    updateProfile,
}