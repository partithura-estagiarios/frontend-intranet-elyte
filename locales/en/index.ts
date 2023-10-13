import action from "./action";
import text from "./text";
import titles from "./titles";
import label from "./label";
import email from "./email";
export default {
  action,
  home: "Home",
  admin: "Admin",
  email,
  login: {
    title: "Login",
    labelInputName: "Your user name",
    labelInputPassword: "Your password",
    hintName: "Your registration number",
    hintPassword: "6 first number of your cpf",
    submitButton: "Submit",
    warning: "Please type something!",
  },
  about: "About",
  tags: "Tags",
  text,
  label,
};
