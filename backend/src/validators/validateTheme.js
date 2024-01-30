const Joi = require("joi");

const getThemeSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    name: Joi.string().max(255).presence("required"),
  });
};

const validateTheme = (req, res, next) => {
  const schema = getThemeSchema();

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

module.exports = validateTheme;
