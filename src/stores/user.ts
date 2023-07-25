import { defineStore, acceptHMRUpdate } from "pinia";

import { UserStorage, UserStorageConstructor } from "../entities/User";

function buildUser({ username, id, email, token }: UserStorage): UserStorage {
  return {
    username,
    id,
    email,
    token,
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
    isLoggedIn: (state) => {
      if (state.user.token) {
        return true;
      }
      return false;
    },
  },
  actions: {
    setToken(value: string) {
      this.user.token = value;
    },
    setUser(value: UserStorage) {
      this.user = {
        email: value.email,
        id: value.id,
        token: value.token,
        username: value.username,
      };
    },
    logout() {
      this.user = buildUser(NULL_USER);
    },
  },
  persist: true,
}) as unknown as UserStorageConstructor;

export const userStorage = useUserStore();
