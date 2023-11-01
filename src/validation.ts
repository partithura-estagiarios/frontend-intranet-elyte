import * as yup from "yup";
export const validationSchema = yup.object({
  username: yup
    .string()
    .required(t("warning.requiredField"))
    .min(2, t("warning.username")),
  email: yup
    .string()
    .required(t("warning.requiredField"))
    .email(t("warning.email")),
  password: yup
    .string()
    .required(t("warning.requiredField"))
    .min(8, t("warning.pwd"))
    .matches(/[a-z]/, t("warning.lowercase"))
    .matches(/[A-Z]/, t("warning.uppercase"))
    .matches(/\d/, t("warning.containDigit"))
    .matches(/[!@#$%^&*(),.?":{}|<>]/, t("warning.containSpecialChar")),
});
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

const registration = yup.number().required(t("warning.requiredField"));
const label = yup.string().required(t("warning.requiredField"));
const icon = yup.string().required(t("warning.requiredField"));
const sublabel = yup.string().required(t("warning.requiredField"));
const sistema = yup.string().required(t("warning.requiredField"));
const link = yup.string().required(t("warning.requiredField"));
const message = yup.string().required(t("warning.requiredField"));
export const loginForContact = yup.object({
  username,
  email,
  registration,
  message,
});
export const inputSchema = yup.object({
  label,
  icon,
  sublabel,
  sistema,
  link,
});
export const formSystem = yup.object({
  label,
  icon,
  sublabel,
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
