export interface UserStorage {
  username: string;
  id: string;
  email: string;
  token: string;
  route: () => string;
}

type Getters = {
  getToken(): string;
  isLoggedIn(): boolean;
  getLoggedUser(): boolean;
};
type Actions = {
  setToken(value: string): void;
  setUser(value: UserStorage): void;
  logout(): void;
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
