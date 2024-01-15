import { defineStore } from "pinia";

import { UserStorage } from "../entities/User";

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
      route: localStorage.getItem("route") || "/",
      oldId: localStorage.getItem("oldId") || "/",
    },
  }),
  getters: {
    getToken: (state) => {
      return state.user.token;
    },
    isLoggedIn: (state) => {
      return Boolean(state.user.token);
    },
    async getLoggedUser(): Promise<boolean> {
      const result = await runQuery(ValidateToken, {
        token: userStorage.getToken,
      });
      return !!result.validateToken;
    },
    getRoute: () => {
      return localStorage.getItem("route");
    },
    getOldId: () => {
      return localStorage.getItem("oldId");
    },
  },
  actions: {
    setToken(value: string) {
      this.user.token = value;
      localStorage.setItem("token", value);
    },
    setRoute(value: string) {
      localStorage.setItem("route", value);
    },
    setId(value: string) {
      localStorage.setItem("oldId", value);
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
    removeToken() {
      localStorage.removeItem("token");
    },
    logout(errorCode?: string | null) {
      const { route, id } = this.user;

      if (errorCode !== null && !isNaN(Number(errorCode))) {
        this.user = { ...buildUser(NULL_USER), route, id };
        negativeNotify(t("notifications.fail.timeExpired"));
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      this.user = buildUser(NULL_USER);
      localStorage.removeItem("route");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});

export const userStorage = useUserStore();
