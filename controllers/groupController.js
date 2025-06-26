const { useId } = require("react");
const db = require("../models/queries");


async function createNewGroup(res, req){
    const { groupName } = req.body;
    if(!groupName) return res.status(401).json({ messages: "Group Name Missing"});

    try{
        await db.createNewGroup(groupName);
        return res.status(200).json({ message: "Group created Successfully!"});
    }catch(err){
        return res.status(500).json({ message: err.message });       
    }
}

async function joinGroup(req, res){
    const { userId } = req.body;
    const { groupId } = req.params;
    if(!groupId || !userId) return res.status(401).json({ message: "Incomplete or missing credentials!"});

    try{
        await db.joinGroup(Number(userId), Number(groupId));
        return res.status(200).json({ message: "Group joined successfylly!"});
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
    if(!groupId) return res.status(401).json({ message: "Group Id missing"});
    try{
        const group = await db.getGroupById(Number(groupId));
        return res.status(200).json({ group: group });
    }catch(err){
        return res.status(500).json({ messge: err.message });
    }
}

async function createNewMessageGroup(req, res){
    const { text, authorId, groupId } = req.body;
    if(!text || !authorId || !groupId) return res.status(401).json({ message: "Credentials missing or incomplete."});
   
    try{
        await db.createNewMessageGroup(text, Number(authorId), Number(groupId));
        return res.status(200).json({ message: "Message created successfully!."});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
}


module.exports = {
    getGroups,
    joinGroup,
    getGroupById,
    createNewGroup,
    createNewMessageGroup,
}