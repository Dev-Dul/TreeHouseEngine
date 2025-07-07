const db = require("../models/queries");

async function updateProfile(req, res){
    const { userId, username, email, bio } = req.body;
    let profilePicUrl, backgroundPicUrl;
    if(req.files){
        profilePicUrl  = req.files.profilePic[0].path;
        backgroundPicUrl = req.files.backgroundPic[0].path;
    }
    if(!username || !email) return res.status(400).json({ message: "Credentials incomplete or missing"});
    if(req.files && (!profilePicUrl || !backgroundPicUrl)) return res.status(400).json({ message: "No Pictues Uploaded" });

    try{
        if(profilePicUrl && backgroundPicUrl){
            await db.updateProfile(Number(userId), email, username, bio, profilePicUrl, backgroundPicUrl);
        }else if(username && email && bio){
            await db.updateProfile(Number(userId), email, username, bio);
        }else{
            await db.updateProfile(Number(userId), email, username);
        }

        const user = db.getUserById(Number(userId));
        return res.status(200).json({ message: "Profile Updated Successfully!", user: user });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

}

async function getUserById(req, res){
    const { userId } = req.params;
    if(!userId) return res.status(400).json({ message: "Credentials incomplete or missing"});
    
    try{
        const user = await db.getUserById(Number(userId));
        return res.status(200).json({ user: user });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    
}

async function hydrateUser(req, res){
    if(req.isAuthenticated){
        res.status(200).json({ user: req.user });
    }else{
        res.status(401).json({ message: "User isn't logged In" });
    }
}

async function getAllUsers(req, res){
    let users = await db.getAllUsers();
    users = users.filter(user => user.id !== req.user.id)
    res.status(200).json({ success: true, users: users });
}

async function logOut(req, res, next){
    if(!req.user) return res.status(401).json({ message: "No user logged in."});
    
    req.logout((err) => {
        if(err){
            return next(err);
        }

        res.status(200).json({ message: "Logout successfull!."});
    })
}

module.exports = {
    logOut,
    getUserById,
    updateProfile,
    getAllUsers,
    hydrateUser,
}