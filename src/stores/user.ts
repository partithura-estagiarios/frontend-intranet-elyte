import { defineStore } from "pinia";
import { AuthenticateType } from "../entities/auth";
type UserState = {
  user: AuthenticateType["user"];
};

// Objeto vazio do tipo AuthenticateType
const EMPTY_USER: AuthenticateType["user"] = {
  id: null,
  email: "",
  username: "",
  token: "",
};
export const userStorage = defineStore("counter", {
  state: (): UserState => ({
    user: { ...EMPTY_USER },
  }),
  actions: {
    logout() {
      this.user = EMPTY_USER;
    },
  },
  persist: true,
});
