// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all quiz_storys from the database
    const quiz_storys = await tables.quiz_story.readAll();

    // Respond with the quiz_storys in JSON format
    res.status(200).json(quiz_storys);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific quiz_story from the database based on the provided ID
    const quiz_story = await tables.quiz_story.read(req.params.id);

    // If the quiz_story is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the quiz_story in JSON format
    if (quiz_story == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(quiz_story);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the quiz_story data from the request body
  const quiz_story = req.body;

  try {
    // Insert the quiz_story into the database
    await tables.quiz_story.update(quiz_story, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the quiz_story data from the request body
  const quiz_story = req.body;

  try {
    // Insert the quiz_story into the database
    const insertId = await tables.quiz_story.create(quiz_story);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted quiz_story
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the quiz_story data from the request body
  try {
    // Insert the quiz_story into the database
    await tables.quiz_story.delete(req.params.id);

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
