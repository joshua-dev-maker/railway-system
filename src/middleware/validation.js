const joi = require("joi");

const validateSignup = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string().required().min(10).max(14),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "ng"] },
  }),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .min(8),
  //this regexp takes cap letter as first character and any letter followed by
  //a number and any special characters
  country: joi.string().required(),
  idCardNumber: joi.string().required(),
});
const validateLogin = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "ng"] },
  }),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .required(),
});
const changePasswordValidate = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .required(),
  confirmPassword: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .required(),
});
const forgotPasswordValidate = joi.object({
  newPassword: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .required(),
  confirmPassword: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&/.*])[a-zA-Z0-9!@#$%^&/.*]{8,20}$"
      )
    )
    .required(),
});

const urlValidate = joi.object({
  email: joi.string().required(),
});

module.exports = {
  validateSignup,
  validateLogin,
  changePasswordValidate,
  forgotPasswordValidate,
  urlValidate,
};
