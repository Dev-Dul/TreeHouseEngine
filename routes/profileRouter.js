const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const upload = require("../models/multer-config");

profileRouter.get("/all", profileController.getAllUsers);
profileRouter.get("/hydrate", profileController.hydrateUser);
profileRouter.get("/:userId", profileController.getUserById);
profileRouter.post("/logout", profileController.logOut);
profileRouter.post(
  "/update",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "backgroundPic", maxCount: 1 },
  ]),
  profileController.updateProfile
);

module.exports = profileRouter;


