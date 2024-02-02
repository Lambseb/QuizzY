const express = require("express");

const quizRouter = express.Router();
const {
  browse,
  read,
  add,
  browseByQuiz,
  destroy,
} = require("../controllers/quizControllers");
const validateQuiz = require("../validators/validateQuiz");

quizRouter.get("/", browseByQuiz);
quizRouter.get("/name_quiz", browse);
quizRouter.get("/:id", read);
quizRouter.post("/", validateQuiz, add);
quizRouter.delete("/:id", destroy);
// quizRouter.put("/quiz/:id", validateQuiz, quizControllers.edit);

module.exports = quizRouter;
