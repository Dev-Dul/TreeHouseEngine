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

async function createNewMessageFriend(text, authorId, friendId) {
    await prisma.messages.create({
        data: {
            text: text,
            author: { connect: authorId },
            friend: { connect: friendId },
        }
    });
}

async function createNewMessageGroup(text, authorId, groupId){
    await prisma.messages.create({
        data: {
            text: text,
            author: { connect: authorId},
            group: { connect: groupId },
        }
    });
}

async function addFriend(userId){
    await prisma.friend.create({
        data: {
            friend: { connect: userId },
        }
    });
}

async function joinGroup(userId, groupId){
    await prisma.nests.create({
        data: {
            user: { connect: userId },
            group: { connect: groupId },
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
            message: true,
            friends: true,
            groups: true,
        }
    })
}

async function getUserByName(name){
    return await prisma.user.findFirst({
        where: { username: name },
        include: {
            message: true,
            friends: true,
            groups: true,
        }
    })
}

async function getUserMessagesToFriend(friendId){
    return await prisma.messages.findMany({
        where: { friendId: friendId }
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
            members: true,
            Messages: true,
        }
    });
}

// update functions

async function updateProfile(name, email, username, bio, profileUrl, backUrl, userId){
    await prisma.user.update({
        where: { id: userId },
        data: {
            name: name, 
            bio: bio,
            email: email,
            username: username,
            profile: profileUrl,
            backgrd: backUrl,
        }
    });
}

// destroy functions
async function deleteMessage(id){
    await prisma.messages.delete({
        where: { id: id },
    })
}

async function removeFriend(id){
   await prisma.friend.delete({
        where: { id: id },
   });
}

async function leaveGroup(userId, groupId){
    await prisma.nests.delete({
        where: { }
    })
}

module.exports = {
    createNewUser,
    createNewGroup,
    createNewMessageFriend,
    createNewMessageGroup,
    addFriend,
    joinGroup,
    getGroups,
    getGroupById,
    getUserById,
    getUserByName,
    getUserFriends,
    getUserMessagesToFriend,
    deleteMessage,
    updateProfile,
}



