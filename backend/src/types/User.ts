export enum userRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type UserSchema = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserToken = {
  id: string;
  name?: string;
  role?: userRole;
};
