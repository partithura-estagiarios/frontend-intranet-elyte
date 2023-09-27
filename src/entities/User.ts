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
  setUser(): void;
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
