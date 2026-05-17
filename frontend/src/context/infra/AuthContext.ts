import { createContext } from "react";
import type { User, UserLogin, UserSchema } from "../../types/User";

export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User | null;
  login: (data: UserLogin) => void;
  registerUser: (data: UserSchema) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);