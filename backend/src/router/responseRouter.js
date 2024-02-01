const express = require("express");

const personRouter = express.Router();

const { browse, read, add } = require("../controllers/responseControllers");
const validateResponse = require("../validators/validateResponse");

personRouter.get("/", browse);
personRouter.get("/:id", read);
personRouter.post("/", add);
// personRouter.put("/responses/:id", validateResponse, responseControllers.edit);
// personRouter.delete("/responses/:id", responseControllers.destroy);

module.exports = personRouter;
