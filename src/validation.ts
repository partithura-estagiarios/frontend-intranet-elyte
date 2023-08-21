import * as yup from "yup";

const password = yup
  .string()
  .required(t("warning.requiredField"))
  .min(8, t("warning.pwd"))
  .matches(/[a-z]/, t("warning.lowercase"))
  .matches(/[A-Z]/, t("warning.uppercase"))
  .matches(/\d/, t("warning.containDigit"))
  .matches(/[!@#$%^&*(),.?":{}|<>]/, t("warning.containSpecialChar"));

const email = yup
  .string()
  .required(t("warning.requiredField"))
  .email(t("warning.email"));

const username = yup
  .string()
  .required(t("warning.requiredField"))
  .min(2, t("warning.username"));

export const usernameSchema = yup.object({
  username,
});

export const emailSchema = yup.object({
  email,
});

export const passwordSchema = yup.object({
  password,
});

export const confirmPwdSchema = yup.object({
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], t("warning.matchingPwd")),
});

export const userSchema = yup.object({
  username,
  email,
  password,
});

export const loginSchema = yup.object({
  user: yup.string().required(t("warning.requiredField")),
  pwd: yup.string().required(t("warning.requiredField")),
});
