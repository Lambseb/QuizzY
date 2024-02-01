const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const quiz = await tables.quiz.readAll();

    res.status(200).json(quiz);
  } catch (err) {
    next(err);
  }
};
const browseByQuiz = async (req, res, next) => {
  try {
    const quiz = await tables.quiz.readAllByQuiz();

    res.status(200).json(quiz);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const quiz = await tables.quiz.read(req.params.id);

    if (quiz == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(quiz);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const quiz = req.body;

  try {
    await tables.quiz.update(quiz, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const quiz = req.body;
  try {
    const insertId = await tables.quiz.create(quiz);

    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.quiz.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browseByQuiz,
  browse,
  read,
  edit,
  add,
  destroy,
};
