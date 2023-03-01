import * as Joi from 'joi';

const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com'] },
  })
  .required();

const passwordSchema = Joi.string().min(6).required();

export { emailSchema, passwordSchema };
