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
