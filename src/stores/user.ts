import { UserStorage } from "./../entities/User";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "User",
  state: () => {
    return {
      user: {
        name: "",
        email: "",
        token: "",
        id: "",
      },
    };
  },
  getters: {
    getToken(): string {
      return this.user.token;
    },
    getUser(): UserStorage {
      return this.user;
    },
    isLoggedIn(): boolean {
      return !!this.getToken;
    },
  },
  actions: {
    setUser(value: UserStorage) {
      Object.assign(this.$state.user, value);
      const userData = `{"name": "${value.name}", "email":"${value.email}", "id":"${value.id}", "token":"${value.token}"}`;
      localStorage.setItem("userData", userData);
    },
    logout() {
      clearStorage();
      this.$state.user.name = "";
      this.$state.user.email = "";
      this.$state.user.token = "";
      this.$state.user.id = "";
    },
  },
  persist: true,
});

export const userStorage = useUserStore();
