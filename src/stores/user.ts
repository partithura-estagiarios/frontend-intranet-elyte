import { defineStore, acceptHMRUpdate } from "pinia";
import { getTokenStorage } from "../helpers/storage";
interface UserStorage {
  username: string;
  id: string;
  email: string;
  token: string;
}
function buildUser({ username, id, email, token }: UserStorage): UserStorage {
  return {
    username,
    id,
    email,
  };
}
const NULL_USER = {
  username: "",
  id: "",
  email: "",
  token: "",
};
export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    user: buildUser(NULL_USER),
  }),
  getters: {
    getToken: (state) => {
      return state.user.token;
    },
    getUser: (state) => {
      return state.user;
    },
    getId: (state) => {
      return state.user.id;
    },
    getEmail: (state) => {
      return state.user.email;
    },
    getUsername: (state) => {
      return state.user.username;
    },
    isLoggedIn: (state) => {
      return state.user.token === getTokenStorage();
    },
  },
  actions: {
    setToken(value: string) {
      Object.assign(this.user.token, value !== null || getItemStorage());
    },
    setUser(value: UserStorage) {
      Object.assign(this.user, value);
    },
    logout() {
      this.user = buildUser(NULL_USER);
      clearStorage();
    },
  },
  persist: true,
});
export const userStorage = useUserStore();
