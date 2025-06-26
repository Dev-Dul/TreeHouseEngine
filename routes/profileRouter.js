const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const upload = require("../models/multer-config");

profileRouter.get("/", profileController.getUserById);
profileRouter.post("/update", upload.fields(
    { name: 'pofilePic', maxCount: 1 },
    { name: 'backgroundPic', maxCount: 1}),
    profileController.updateProfile,
);

module.exports = profileRouter;


