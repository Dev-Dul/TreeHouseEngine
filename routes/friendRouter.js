const { Router } = require("express");
const friendRouter = Router();
const friendController = require("../controllers/friendController");

// get routes
friendRouter.get("/", friendController.getUserFriends);
friendRouter.get("/:friendId/messages", friendController.getUserMessagesToFriend);

// post routes
friendRouter.post("/add", friendController.addFriend);
friendRouter.post("/:friendId/messages/new", friendController.createNewMessageFriend);

module.exports = friendRouter;