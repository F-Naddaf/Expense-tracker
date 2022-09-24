//validation package
const Joi = require('@hapi/joi');

// register validation
const userRegisterSchema = Joi.object({
  firstName: Joi.string().required().max(20).min(2),
  lastName: Joi.string().required().max(20).min(2),
  email: Joi.string().required().max(50).min(6).email().lowercase(),
  password: Joi.string().required().max(50).min(6),
  repeat_password: Joi.ref('password'),
  birth: Joi.date().required(),
  gender: Joi.string().required(),
});

// login validation
const userLoginSchema = Joi.object({
  email: Joi.string().required().max(50).min(6).email(),
  password: Joi.string().required().max(50).min(6),
});

module.exports = { userRegisterSchema, userLoginSchema };
