export type userRole = "USER" | "ADMIN";

export type UserSchema = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
