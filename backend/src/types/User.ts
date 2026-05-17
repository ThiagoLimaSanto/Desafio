export type userRole = "admin" | "user";

export type User = {
  name: string;
  email: string;
  password: string;
  role: userRole;
};

export type UserLogin = {
  email: string;
  password: string;
};
