import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { showMessage } from "../../adapter/ShowMessage";
import type { User, UserLogin, UserSchema } from "../../types/User";
import { api } from "../../utils/api";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery<User | undefined>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await api.get("/user/checkAuth");
      return response.data?.data ?? undefined;
    },
    retry: false,
  });

  const isAuthenticated = !!user;

  const loginMutation = useMutation({
    mutationFn: async (data: UserLogin) => {
      const response = await api.post("/user/login", data);
      return response.data.data;
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["auth-user"], data);
      showMessage.success("Logado com sucesso!");
      navigate("/");
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: UserSchema) => {
      await api.post("/user/cadastrar", data);
    },
    onSuccess: () => {
      showMessage.success("Conta criada!");
      navigate("/login");
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/user/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth-user"] });
      showMessage.success("Saiu!");
      navigate("/login");
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      showMessage.error(err.response?.data?.message);
    } else if (err instanceof Error) {
      showMessage.error(err.message);
    } else {
      showMessage.error("Erro desconhecido");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login: loginMutation.mutate,
        registerUser: registerMutation.mutate,
        logout: logoutMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
