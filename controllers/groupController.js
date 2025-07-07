const db = require("../models/queries");


async function createNewGroup(req, res){
    const { name } = req.body;
    if(!name) return res.status(400).json({ messages: "Group Name Missing"});

    try{
        await db.createNewGroup(name);
        return res.status(200).json({ message: "Group created Successfully!"});
    }catch(err){
        return res.status(500).json({ message: err.message });       
    }
}

async function joinGroup(req, res){
    const { userId, groupId } = req.body;
    if(!req.user) return res.status(403).json({ message: "You have no permission to continue with this operation" });
    if(!groupId || !userId) return res.status(400).json({ message: "Incomplete or missing credentials!"});

    try{
        await db.joinGroup(Number(userId), Number(groupId));
        return res.status(200).json({ message: "Nest joined successfully!"});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}

async function leaveGroup(req, res){
    const { userId } = req.body;
    const { groupId } = req.params;
    if(!req.user) return res.status(403).json({ message: "You have no permission to continue with this operation"});
    if(!groupId || !userId) return res.status(400).json({ message: "Incomplete or missing credentials!"});

    try{
        await db.leaveGroup(Number(userId), Number(groupId));
        return res.status(200).json({ message: "Left nest successfully!"});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}

async function getGroups(req, res){
    const groups = await db.getGroups();
    return res.status(200).json({ groups: groups });
}

async function getGroupById(req, res){
    const { groupId } = req.params;
    if(!groupId) return res.status(400).json({ message: "Group Id missing"});
    try{
        const group = await db.getGroupById(Number(groupId));
        return res.status(200).json({ group: group });
    }catch(err){
        return res.status(500).json({ messge: err.message });
    }
}

async function createNewMessageGroup(req, res){
    const { text, senderId, groupId } = req.body;
    if(!text || !senderId || !groupId) return res.status(400).json({ message: "Credentials missing or incomplete."});
   
    try{
        await db.createNewMessageGroup(text, Number(senderId), Number(groupId));
        return res.status(200).json({ message: "Message created successfully!."});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}


module.exports = {
    getGroups,
    joinGroup,
    leaveGroup,
    getGroupById,
    createNewGroup,
    createNewMessageGroup,
}