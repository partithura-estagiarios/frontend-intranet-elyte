import { UserStorage } from "./../entities/User";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: "",
    email: "",
    token: "",
    id: "",
  }),
  getters: {
    getToken(state): string {
      return state.token;
    },
    getId(state): string {
      return state.id;
    },
    getEmail(state): string {
      return state.email;
    },
    getName(state): string {
      return state.name;
    },
    getUser(state): UserStorage {
      return state;
    },
    isLoggedIn(state): boolean {
      return state.token === getTokenStorage();
    },
  },
  actions: {
    setToken(token: string) {
      Object.assign(this.token, token !== null || getTokenStorage());
    },
    setUser(value: UserStorage) {
      Object.assign(this, value);
    },
    logout() {
      clearStorage();
    },
  },
});

export const userStorage = useUserStore;
