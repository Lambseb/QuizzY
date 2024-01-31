// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all quizs from the database
    const quizs = await tables.quiz.readAll();

    // Respond with the quizs in JSON format
    res.status(200).json(quizs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific quiz from the database based on the provided ID
    const quiz = await tables.quiz.read(req.params.id);

    // If the quiz is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the quiz in JSON format
    if (quiz == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(quiz);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the quiz data from the request body
  const quiz = req.body;

  try {
    // Insert the quiz into the database
    await tables.quiz.update(quiz, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the quiz data from the request body
  const quiz = req.body;

  try {
    // Insert the quiz into the database
    const insertId = await tables.quiz.create(quiz);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted quiz
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the quiz data from the request body
  try {
    // Insert the quiz into the database
    await tables.quiz.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
