export interface AuthQuery {
  auth: AuthenticateType;
}

export type AuthenticateType = {
  token: string;
  user: {
    id?: string | null | undefined;
    email: string;
    username: string;
    token: string;
  };
};

interface User {
  token: string;
  username: string;
  id: string;
  email: string;
}
