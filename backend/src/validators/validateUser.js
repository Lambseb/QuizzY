const Joi = require("joi");

const getUserSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    username: Joi.string().max(255).presence("required"),
    email: Joi.string().max(255).presence("required"),
    password: Joi.string().max(255).presence("required"),
    created_at: Joi.date().timestamp().presence("required"),
    is_admin: Joi.boolean().presence("required"),
  });
};

const validateUser = (req, res, next) => {
  const schema = getUserSchema();

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

module.exports = validateUser;
