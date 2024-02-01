const Joi = require("joi");

const getResponseSchema = () => {
  return Joi.object({
    response: Joi.string().max(255).presence("required"),
    value: Joi.boolean(),
    user_id: Joi.number().presence("required"),
  });
};

const validateResponse = (req, res, next) => {
  const schema = getResponseSchema();

  const { error } = schema.validate(
    {
      ...req.body,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateResponse;
