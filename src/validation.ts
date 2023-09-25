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

const title = yup.string().required(t("warning.requiredField"));
const icon = yup.string().required(t("warning.requiredField"));
const description = yup.string().required(t("warning.requiredField"));
const system = yup.string().required(t("warning.requiredField"));
const link = yup.string().required(t("warning.requiredField"));

export const inputSchema = yup.object({
  title,
  icon,
  description,
  system,
  link,
});

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
  username: yup.string().required(t("warning.requiredField")),
  password: yup.string().required(t("warning.requiredField")),
});

export const scheduleSchema = yup.object({
  name: yup.string().required(t("warning.requiredField")),
  register: yup.number().required(t("warning.requiredField")),
  ramalOrPhone: yup.number().required(t("warning.requiredField")),
  email,
  initialDate: yup.date().required(t("warning.requiredField")),
  finalDate: yup.date().required(t("warning.requiredField")),
  participants: yup.number().required(t("warning.requiredField")),
  local: yup.number().required(t("warning.requiredField")),
  description,
});
