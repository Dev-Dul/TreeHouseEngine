const { Router } = require("express");
const groupRouter = Router();
const groupController = require("../controllers/groupController");

// get routes
groupRouter.get("/", groupController.getGroups);
groupRouter.get("/:groupId/", groupController.getGroupById);

// post routes
groupRouter.post("/join", groupController.joinGroup);
groupRouter.post("/:groupId/leave", groupController.leaveGroup);
groupRouter.post("/new", groupController.createNewMessageGroup);
groupRouter.post("/:groupId/messsages/new", groupController.createNewMessageGroup);

module.exports = groupRouter;