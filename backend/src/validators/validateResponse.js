const Joi = require("joi");

const getResponseSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    response: Joi.string().max(255).presence("required"),
    value: Joi.boolean(),
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
