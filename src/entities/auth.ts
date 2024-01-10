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

export function isAuthQuery(obj: any): obj is AuthQuery {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "auth" in obj &&
    "token" in obj.auth &&
    "user" in obj.auth
  );
}
