const db = require("./queries");

async function deleteFriends(){
    try{
        console.log("Deleting rows...");
        await db.deleteFriendRows();
        console.log("Done!");
    }catch(err){
        console.log(err.message);
    }
}


deleteFriends();