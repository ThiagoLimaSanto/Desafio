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

  const { data: user, isLoading: loading } = useQuery<User | null>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await api.get("/user/checkAuth");
      return res.data?.data ?? null;
    },
    retry: false,
  });

  const isAuthenticated = !!user;

  const loginMutation = useMutation({
    mutationFn: async (data: UserLogin) => {
      showMessage.dismiss();
      const response = await api.post("/user/login", data);
      console.log(response.data);
      
      return response.data.data.user;
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["auth-user"], data);

      showMessage.success("Entrou!");

      navigate(data.role === "ADMIN" ? "/admin" : "/", {
        replace: true,
      });
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: UserSchema) => {
      showMessage.dismiss();
      await api.post("/user/cadastrar", data);
    },
    onSuccess: () => {
      showMessage.success("Conta criada!");
      navigate("/login", { replace: true });
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      showMessage.dismiss();
      await api.post("/user/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      showMessage.success("Saiu!");
      navigate("/login", { replace: true });
    },
    onError: (err: unknown) => {
      handleError(err);
    },
  });

  const handleError = (err: unknown) => {
    showMessage.dismiss();
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
