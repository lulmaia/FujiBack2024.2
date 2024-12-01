import Joi from 'joi';

export const eventSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().optional(),
  date: Joi.string().isoDate().optional(),
  location: Joi.string().optional(),
  description: Joi.string().optional(),
});
