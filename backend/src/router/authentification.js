const express = require("express");

const loginRouter = express.Router();

const { login } = require("../controllers/authentificationControllers");

loginRouter.post("/", login);

module.exports = loginRouter;
