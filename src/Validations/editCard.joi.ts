import Joi from "joi";
export const editCardSchema = Joi.object({
  title: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Title is required",
    "string.min": "Title has to be at least 2 characters long",
    "string.max": "Title cannot exceed 256 characters",
  }),
  subtitle: Joi.string().required().min(2).max(256).messages({
    "string.empty": "Subtitle is required",
    "string.min": "Subtitle has to be at least 2 characters long",
    "string.max": "Subtitle cannot exceed 256 characters",
  }),
  description: Joi.string().required().min(2).max(1024).messages({
    "string.empty": "Description is required",
    "string.min": "Description has to be at least 2 characters long",
    "string.max": "Description cannot exceed 1024 characters",
  }),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.min": "Phone number has to be at least 9 characters long",
      "string.max": "Phone number cannot exceed 11 characters",
      "string.pattern.base":
        "Phone number must start with 0 followed by digits in a valid format",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
  web: Joi.string()
    .required()
    .pattern(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    )
    .messages({
      "string.empty": "Website URL is required",
      "string.pattern.base": "Website must be a valid URL.",
    }),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .pattern(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        )
        .required()
        .messages({
          "string.empty": "Image is required (URL or file)",
          "alternatives.match": "Please provide a valid image URL",
          "string.pattern.base": "Image source must be a valid URL",
        }),

      alt: Joi.string().min(2).max(256).required().messages({
        "string.empty": "Photo must have description text",
        "string.min": "Description text must be at least 2 characters",
        "string.max": "Description text cannot exceed 256 characters",
      }),
    })
    .required(),

  address: Joi.object().keys({
    state: Joi.string().allow("", null),
    country: Joi.string()
      .required()
      .messages({ "string.empty": "Country is required" }),
    city: Joi.string()
      .required()
      .messages({ "string.empty": "City is required" }),
    street: Joi.string()
      .required()
      .messages({ "string.empty": "Street is required" }),
    houseNumber: Joi.number().min(1).required().messages({
      "number.base": "House number must be a number",
      "number.min": "House number must be at least 1 character",
      "any.required": "House number is required",
    }),
    zip: Joi.number().required().messages({
      "number.base": "Zip code must be a number",
      "any.required": "Zip code is required",
    }),
  }),
});
