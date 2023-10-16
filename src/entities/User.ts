export interface UserStorage {
  username: string;
  id: string;
  email: string;
  token: string;
}

type Getters = {
  getToken(): string;
};
type Actions = {
  setUser(value: UserStorage): void;
  getLoggedUser(): Promise<boolean>;
  logout(): void;
  setToken(value: string): void;
};

export interface UserStorageConstructor {
  state: UserStorage;
  getters: Getters;
  actions: Actions;
}

export interface UserForm {
  username: string;
  password: string;
  email: string;
}
