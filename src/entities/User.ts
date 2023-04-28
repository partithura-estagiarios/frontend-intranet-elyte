export interface UserStorage {
  name: string;
  id: string;
  email: string;
  token: string;
}

type Getters = {
  getToken(): string;
};
type Actions = {
  setUser(value: UserStorage): void;
};

export interface UserStorageConstructor {
  state: UserStorage;
  getters: Getters;
  actions: Actions;
  setUser(value: UserStorage): void;
  isLoggedIn: boolean;
}
