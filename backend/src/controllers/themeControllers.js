// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all themes from the database
    const themes = await tables.theme.readAll();

    // Respond with the themes in JSON format
    res.status(200).json(themes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific theme from the database based on the provided ID
    const theme = await tables.theme.read(req.params.id);

    // If the theme is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the theme in JSON format
    if (theme == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(theme);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the theme data from the request body
  const theme = req.body;

  try {
    // Insert the theme into the database
    await tables.theme.update(theme, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the theme data from the request body
  const theme = req.body;

  try {
    // Insert the theme into the database
    const insertId = await tables.theme.create(theme);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted theme
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the theme data from the request body
  try {
    // Insert the theme into the database
    await tables.theme.delete(req.params.id);

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
