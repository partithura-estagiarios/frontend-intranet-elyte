export default {
  success: {
    login: "Access granted, welcome",
    sendEmail: "A recovery link has been sent to your email",
    changePwd: "Your password has been successfully changed",
    register: "Your registration has been successfully created",
    createRamal: "Branch created successfully",
    deleteRamal: "Branch deleted successfully",
    editRamal: "Branch edited successfully",
    createMenu: "Menu created successfully",
    editMenu: "Menu edited successfully",
    createSystem: "System created successfully",
    deleteSystem: "System deleted successfully | Successfully deleted systems",
  },

  fail: {
    login: "Incorrect credentials, please try again!",
    sendEmail: "An error occurred while trying to send the email",
    emailNotFound: "E-mail not found",
    changePwd: "An error occurred while trying to change your password",
    register: "An error occurred while creating your registration",
    createRamal: "An error occurred while creating the branch line",
    deleteRamal: "An error occurred while deleting the branch line",
    editRamal: "Branch line edited successfully",
    createMenu: "There was an error creating the menu",
    editMenu: "There was an error editing the menu",
    createSystem: "An error occurred while creating the system",
    deleteSystem: {
      error:
        "An error occurred while deleting the system | An error occurred while deleting the systems",
      notSelected: "You must select at least one system to delete",
    },
    emptyField: "Required field",
    invalidEmail: "Invalid email",
    equalPassword: "Passwords do not match",
    invalidPassword: "Invalid password",
  },
};
