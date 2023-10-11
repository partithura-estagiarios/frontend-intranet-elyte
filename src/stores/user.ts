import { defineStore, acceptHMRUpdate } from "pinia";

import { UserStorage, UserStorageConstructor } from "../entities/User";

import ValidateToken from "../graphql/verifyUser/ValidateToken.gql";

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
    user: {
      ...buildUser(NULL_USER),
      token: localStorage.getItem("token") || "",
    },
  }),
  getters: {
    getToken: (state) => {
      return state.user.token;
    },
    isLoggedIn: (state) => {
      return Boolean(state.user.token);
    },
  },
  actions: {
    setToken(value: string) {
      this.user.token = value;
      localStorage.setItem("token", value);
    },
    async getLoggedUser() {
      return await runQuery(ValidateToken, { token: userStorage.getToken });
    },
    setUser(value: UserStorage) {
      this.user = {
        email: value.email,
        id: value.id,
        token: value.token,
        username: value.username,
      };
      localStorage.setItem("token", value.token);
    },
    logout() {
      this.user = buildUser(NULL_USER);
      localStorage.removeItem("token");
    },
  },
}) as unknown as UserStorageConstructor;

export const userStorage = useUserStore();
