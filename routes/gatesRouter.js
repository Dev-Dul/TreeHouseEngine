const { Router } = require("express");
const gatesRouter = Router();
const gatesController = require("../controllers/gatesController");
const { handleLogin } = require("../auth/passport-config");

gatesRouter.post("/signup", gatesController.signUpPost);
gatesRouter.post("/login", handleLogin);


module.exports = gatesRouter;