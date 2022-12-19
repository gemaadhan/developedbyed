const Joi = require("Joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const { value, error } = schema.validate(data);
  return { value, error };
};
const loginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const { value, error } = schema.validate(data);
  return { value, error };
};

module.exports = { registerValidation, loginValidation };
