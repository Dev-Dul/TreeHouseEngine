const { Router } = require("express");
const friendRouter = Router();
const friendController = require("../controllers/friendController");

// get routes
friendRouter.get("/", friendController.getUserFriends);
friendRouter.get("/:recipientId/messages", friendController.getUserMessagesToFriend);

// post routes
friendRouter.post("/add", friendController.addFriend);
friendRouter.post("/:recipientId/messages/new", friendController.createNewMessageFriend);

module.exports = friendRouter;