import Joi from "joi";
export const editProfileSchema = Joi.object({
  name: Joi.object().keys({
    first: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name has to be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
    }),
    middle: Joi.string().allow(""),
    last: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name has to be at least 2 characters long",
      "string.max": "Last name cannot exceed 50 characters",
    }),
  }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.min": "Phone number has to be at least 10 characters long",
      "string.max": "Phone number cannot exceed 15 characters",
      "string.pattern.base":
        "Phone number must start with 0 followed by digits in a valid format",
    }),
  image: Joi.object().keys({
    url: Joi.string()
      .pattern(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      )
      .messages({ "string.pattern.base": "User photo must be a valid URL." })
      .allow(""),
    alt: Joi.string().min(2).max(50).allow(""),
  }),

  address: Joi.object().keys({
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
  }),
});
