import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cep: Joi.string()
    .pattern(/^\d{5}-\d{3}$/) // Valida o formato "12345-678"
    .required(),
});
