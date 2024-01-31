const Joi = require("joi");

const getQuizSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    name: Joi.string().max(50).presence("required"),
    validated: Joi.boolean(),
  });
};

const validateQuiz = (req, res, next) => {
  const schema = getQuizSchema();
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

module.exports = validateQuiz;
