const express = require("express");

const userRouter = express.Router();
const hashedpassword = require("../middlewares/hashPassword");
const { browse, read, add } = require("../controllers/userControllers");
const userValidation = require("../middlewares/userValidationZod");
const verifyToken = require("../middlewares/auth");

userRouter.get("/", browse);
userRouter.get("/:id", read);
userRouter.post("/", userValidation, hashedpassword, add);
// userRouter.put("/:id", validateUser, userControllers.edit);
// router.delete("/users/:id", userControllers.destroy);

module.exports = userRouter;
