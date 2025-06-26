const db = require("../models/queries");


async function addFriend(req, res){
    const { friendId } = req.body;
    if(!friendId) return res.status(400).json({ message: "Credentials incomplete or missing"});

    try{
        await db.addFriend(Number(friendId));
        return res.status(200).json({ message: "Friend added sucessfully!"});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}

async function createNewMessageFriend(req, res){
    const { text, authorId } = req.body;
    const { friendId } = req.params;
    if(!text || !authorId || !friendId) return res.status(400).json({ message: "Credentials missing or incomplete."});

    try{
        await db.createNewMessageFriend(text, Number(authorId), Number(friendId));
        return res.status(200).json({ message: "Message sent successfully "});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}

async function getUserFriends(req, res){
    const { userId } = req.body;
    if(!userId) return res.status(400).json({ message: "UserId missing."});
    try{
        const friends = await db.getUserFriends(Number(userId));
        return res.status(200).json({ friends: friends });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

async function getUserMessagesToFriend(req, res){
    const { friendId } = req.params;
    if(!friendId) return res.status(400).json({ message: "friendId missing."});
    try{
        const messages = await db.getUserMessagesToFriend(Number(friendId));
        return res.status(200).json({ messages: messages });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addFriend,
    getUserFriends,
    createNewMessageFriend,
    getUserMessagesToFriend
}