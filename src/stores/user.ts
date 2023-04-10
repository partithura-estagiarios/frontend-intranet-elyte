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
      if (this.getToken) {
        return true;
      }
      return false;
    },
  },
  actions: {
    setUser(value: UserStorage) {
      Object.assign(this.$state.user, value);
    },
    logout() {
      clearStorage();
    },
  },
  persist: true,
});

export const userStorage = useUserStore();
