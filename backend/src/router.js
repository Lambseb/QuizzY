const express = require("express");

const router = express.Router();

const messagingControllers = require("./controllers/messagingControllers");
// const validateMessaging = require("./validators/validateMessaging");

router.get("/messagings", messagingControllers.browse);
router.get("/messagings/:id", messagingControllers.read);
// router.post("/messagings", validateMessaging, messagingControllers.add);
// router.put("/messagings/:id", validateMessaging, messagingControllers.edit);
// router.delete("/messagings/:id", messagingControllers.destroy);


const themeControllers = require("./controllers/themeControllers");
// const validateTheme = require("./validators/validateTheme");

router.get("/themes", themeControllers.browse);
router.get("/themes/:id", themeControllers.read);
// router.post("/themes", validateTheme, themeControllers.add);
// router.put("/themes/:id", validateTheme, themeControllers.edit);
// router.delete("/themes/:id", themeControllers.destroy);


const userControllers = require("./controllers/userControllers");
// const validateUser = require("./validators/validateUser");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
// router.post("/users", validateUser, userControllers.add);
// router.put("/users/:id", validateUser, userControllers.edit);
// router.delete("/users/:id", userControllers.destroy);


/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
