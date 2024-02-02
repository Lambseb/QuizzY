const Joi = require("joi");

const getMessagingSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    title: Joi.string().max(255).presence("required"),
    body: Joi.string().max(500).presence("required"),
    created_at: Joi.number().presence("required"),
    is_read: Joi.boolean().presence("required"),
  });
};

const validateMessaging = (req, res, next) => {
  const schema = getMessagingSchema();

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

module.exports = validateMessaging;
