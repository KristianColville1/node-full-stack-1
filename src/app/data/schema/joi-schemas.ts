import Joi from "joi";

/**
 * Joi schema for user signup payload.
 * Required: firstName, lastName, email, password.
 */
export const UserSpec = Joi.object({
  firstName: Joi.string().required().description("User first name"),
  lastName: Joi.string().required().description("User last name"),
  email: Joi.string().email().required().description("User email address"),
  password: Joi.string().required().description("User password"),
}).description("User signup payload");

/**
 * Joi schema for login credentials.
 * Required: email, password.
 */
export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required().description("User email address"),
  password: Joi.string().required().description("Login password"),
}).description("User login credentials");