const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  browseByQuiz,
} = require("./controllers/quizControllers");
const validateQuiz = require("./validators/validateQuiz");

router.get("/quiz", browseByQuiz);
router.get("/quiz/name_quiz", browse);
router.get("/quiz/:id", read);
router.post("/quiz", validateQuiz, add);
// router.put("/quiz/:id", validateQuiz, quizControllers.edit);
// router.delete("/quiz/:id", quizControllers.destroy);

const quizStoryControllers = require("./controllers/quizStoryControllers");

router.get("/quizstory", quizStoryControllers.browse);
router.get("/quizstory/:id", quizStoryControllers.read);
// router.post("/quiz_storys", quizStoryControllers.add);
// router.put("/quiz_storys/:id" quizStoryControllers.edit);
// router.delete("/quiz_storys/:id", quizStoryControllers.destroy);

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

const personRouter = require("./router/responseRouter");

router.use("/responses", personRouter);

const userRouter = require("./router/userRouter");

router.use("/users", userRouter);

const loginRouter = require("./router/authentification");

router.use("/login", loginRouter);

module.exports = router;
