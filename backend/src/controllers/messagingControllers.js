// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all messagings from the database
    const messagings = await tables.messaging.readAll();

    // Respond with the messagings in JSON format
    res.status(200).json(messagings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific messaging from the database based on the provided ID
    const messaging = await tables.messaging.read(req.params.id);

    // If the messaging is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the messaging in JSON format
    if (messaging == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(messaging);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the messaging data from the request body
  const messaging = req.body;

  try {
    // Insert the messaging into the database
    await tables.messaging.update(messaging, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the messaging data from the request body
  const messaging = req.body;

  try {
    // Insert the messaging into the database
    const insertId = await tables.messaging.create(messaging);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted messaging
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the messaging data from the request body
  try {
    // Insert the messaging into the database
    await tables.messaging.delete(req.params.id);

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
