// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all responses from the database
    const responses = await tables.response.readAll();

    // Respond with the responses in JSON format
    res.status(200).json(responses);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific response from the database based on the provided ID
    const response = await tables.response.read(req.params.id);

    // If the response is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the response in JSON format
    if (response == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the response data from the request body
  const response = req.body;

  try {
    // Insert the response into the database
    await tables.response.update(response, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the response data from the request body
  const response = req.body;

  try {
    // Insert the response into the database
    const insertId = await tables.response.create(response);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted response
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the response data from the request body
  try {
    // Insert the response into the database
    await tables.response.delete(req.params.id);

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
