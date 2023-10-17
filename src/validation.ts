import * as yup from "yup";

//*Nessa seção ficam as variáveis
const icon = yup.string().required(t("warning.requiredField"));

const title = yup.string().required(t("warning.requiredField"));

const link = yup.string().required(t("warning.requiredField"));

const system = yup.string().required(t("warning.requiredField"));

const description = yup.string().required(t("warning.requiredField"));

const password = yup
  .string()
  .min(8, t("warning.pwd"))
  .required(t("warning.requiredField"))
  .matches(/[a-z]/, t("warning.lowercase"))
  .matches(/[A-Z]/, t("warning.uppercase"))
  .matches(/\d/, t("warning.containDigit"))
  .matches(/[!@#$%^&*(),.?":{}|<>]/, t("warning.containSpecialChar"));

const email = yup
  .string()
  .email(t("warning.email"))
  .required(t("warning.requiredField"));

const username = yup
  .string()
  .min(2, t("warning.username"))
  .required(t("warning.requiredField"));

//*E nessa seção ficam os schemas que serão exportados
export const usernameSchema = yup.object({
  username,
});

export const emailSchema = yup.object({
  email,
});

export const passwordSchema = yup.object({
  password,
});

export const userSchema = yup.object({
  email,
  username,
  password,
});

export const systemSchema = yup.object({
  icon,
  link,
  title,
  system,
  description,
});

export const confirmPwdSchema = yup.object({
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], t("warning.matchingPwd")),
});

export const loginSchema = yup.object({
  username: yup.string().required(t("warning.requiredField")),
  password: yup.string().required(t("warning.requiredField")),
});

export const scheduleSchema = yup.object({
  email,
  description,
  finalTime: yup.date(),
  initialTime: yup.date(),
  roomId: yup.number().required(t("warning.requiredField")),
  userCreated: yup.string().required(t("warning.requiredField")),
  ramalNumber: yup.number().required(t("warning.requiredField")),
  totalPeople: yup.number().required(t("warning.requiredField")),
  userRegistration: yup.number().required(t("warning.requiredField")),
});
