export default {
  success: {
    login: "Access granted, welcome",
    sendEmail: "A recovery link has been sent to your email",
    changePwd: "Your password has been successfully changed",
    register: "Your registration has been successfully created",
    createBranchLine: "Branch line created successfully",
    deleteBranchLine: "Branch line deleted successfully",
    editBranchLine: "Branch line edited successfully",
    createSystem: "System created successfully",
    deleteSystem: "System deleted successfully | Systems deleted successfully",
    scheduleEvent: "Event scheduled successfully",
  },

  fail: {
    login: "Incorrect credentials, please try again!",
    sendEmail: "An error occurred while trying to send the email",
    changePwd: "An error occurred while trying to change your password",
    register: "An error occurred while creating your registration",
    createBranchLine: "An error occurred while creating the branch line",
    deleteBranchLine: "An error occurred while deleting the branch line",
    editBranchLine: "Branch line edited successfully",
    createSystem: "An error occurred while creating the system",
    deleteSystem: {
      error:
        "An error occurred while deleting the system | An error occurred while deleting the systems",
      notSelected: "You must select at least one system to delete",
    },
    scheduleEvent: "An error occurred while scheduling the event",
  },
};
