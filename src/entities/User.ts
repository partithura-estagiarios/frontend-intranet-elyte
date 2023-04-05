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
  setUser(): void;
};

export interface UserStorageConstructor {
  state: UserStorage;
  getters: Getters;
  actions: Actions;
}
