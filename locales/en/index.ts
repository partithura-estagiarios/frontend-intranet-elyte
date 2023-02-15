import action from "./action";
import text from "./text";
export default {
  action,
  caderno: {
    title: "Notebooks",
    quantidade: "Without notebooks | one notebook | {count} notebooks",
    aumentarQtde: "Increment notebooks",
    addCaderno: "Create notebook",
    form: {
      title: "Title",
      warning: "Please enter a title",
    },
  },
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
  titles: {
    ManagementSystem: "Management System",
    HrSystem: "Hr System",
    Others: "OTHERS",
    SubTitlesManagement: {
      DataSul: "DataSul",
      Partithura: "Partithura",
      StockQuery: "Stock Query",
      CODI: "CODI",
      GoodIdea: "Good Idea",
      Reports: "Reports",
      ProcessMapping: "Process Mapping",
      FtWeb: "FT Web",
    },
    SubTitlesHr: {
      HRDiscloses: "HR Discloses",
      Birthdays: "Birthdays",
      FixedSchedule: "Fixed Schedule",
      ContactWithDirector: "Contact with Director",
      Menu: "Menu",
      Fones: "Fones",
      Agenda: "Agenda",
    },
    DescriptionManagement: {
      ErpSystem: "ERP System",
      StrategicManagement: "Strategic Management",
      ProductionManagement: "Production Management",
      Mapping: "Mapping",
      FT: "Web Technical Sheet",
      DataSulPrototype: "Exclusive for Test",
    },
  },
  text,
};
