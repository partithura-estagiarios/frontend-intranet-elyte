export interface AuthQuery {
  auth: AuthenticateType;
}

interface AuthenticateType {
  token: string;
  user: User;
}

interface User {
  token: string;
  username: string;
  id: string;
  email: string;
}
