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
  setUser(arg0: {
    username: string;
    id: string;
    email: string;
    token: string;
  }): unknown;
  state: UserStorage;
  getters: Getters;
  actions: Actions;
}
