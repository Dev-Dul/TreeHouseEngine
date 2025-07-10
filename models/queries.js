const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();


async function createNewUser(name, email, username, password){
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            username: username,
            password: password
        }
    });
}

async function createNewMessageFriend(text, senderId, recipientId){
    await prisma.messages.create({
        data: {
            text: text,
            sender: { 
                connect: { id: senderId }
            },
            recipient: { 
                connect: { id: recipientId }
            },
        }
    });
}

async function createNewMessageGroup(text, senderId, groupId){
    await prisma.messages.create({
        data: {
            text: text,
            sender: { 
                connect:  { id: senderId }, 
            },
            group: { 
                connect: { id: groupId }, 
            },
        }
    });
}

// Add a friend relationship between two users
async function addFriend(userId, friendId) {
    await prisma.friend.create({
        data: {
            user: { connect: { id: userId } },
            friend: { connect: { id: friendId } }
        }
    });
}

async function joinGroup(userId, groupId){
    await prisma.nests.create({
        data: {
            user: { 
                connect: { id: userId} 
            },
            group: { 
                connect:  { id: groupId} 
            },
            role: "member",
        }
    })
}

async function createNewGroup(name){
    await prisma.groups.create({
        data: {
            name: name,
        }
    })
}


// get functions

async function getUserById(id){
    return await prisma.user.findUnique({
        where: { id: id },
        include: {
            sentMessages: true,
            friends: {
                include: { friend: true }
            },
            groups: {
                include: {
                     group: true,
                     user: true,
                 }
            },
        }
    })
}

async function getUserByName(name){
    return await prisma.user.findFirst({
        where: { username: name },
        include: {
            sentMessages: true,
            friends: {
                include: { friend: true }
            },
            groups: {
                include: {
                     group: true,
                     user: true,
                 }
            },
        }
    })
}

async function getAllUsers(){
    return await prisma.user.findMany();
}

async function getUserMessagesToFriend(recipientId){
    return await prisma.messages.findMany({
        where: { recipientId: recipientId }
    })
}

async function getUserFriends(userId){
    return await prisma.friend.findMany({
        where: { friendId: userId },
    });
}

async function getGroups(){
    return await prisma.groups.findMany({
        include: {
            members: true,
            Messages: true,
        }
    });
}

async function getGroupById(groupId){
    return await prisma.groups.findUnique({
        where: { id: groupId },
        include: {
            members: {
                include: { user: true },
            },
            Messages: {
                include: { group: true, sender: true },
            },
        }
    });
}

// update functions

async function updateProfile(userId, email, username, bio = null, profileUrl = null, backUrl = null){
    await prisma.user.update({
        where: { id: userId },
        data: {
            bio: bio,
            email: email,
            username: username,
            profile: profileUrl,
            backgrd: backUrl,
        }
    });
}

// destroy functions
async function deleteFriendRows(){
    await prisma.friend.deleteMany()
}

async function leaveGroup(userId, groupId){
    await prisma.nests.delete({
        where: {
            userId_groupId:{
                userId: userId,
                groupId: groupId,
            }
         },
    })
}

module.exports = {
    createNewUser,
    createNewGroup,
    createNewMessageFriend,
    createNewMessageGroup,
    addFriend,
    joinGroup,
    leaveGroup,
    getGroups,
    getGroupById,
    getUserById,
    getAllUsers,
    getUserByName,
    getUserFriends,
    getUserMessagesToFriend,
    updateProfile,
    deleteFriendRows
}



