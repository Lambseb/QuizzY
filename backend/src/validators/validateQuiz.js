const Joi = require("joi");

const getQuizSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    name: Joi.string().min(5).presence("required"),
    user_id: Joi.number(),
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
