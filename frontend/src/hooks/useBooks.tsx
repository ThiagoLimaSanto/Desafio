import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "../adapter/ShowMessage";
import type { Book, BookSchema, UpdateBookInput } from "../types/Book";
import { api } from "../utils/api";

export function useGetAllBooks() {
  return useQuery<Book>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get(`/book/obter`);

      return response.data;
    },
  });
}

export function usePostBooks() {
  const queryClient = useQueryClient();
  return useMutation<BookSchema, unknown, BookSchema>({
    mutationFn: async (data: BookSchema) => {
      const response = await api.post(`/book/cadastrar`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showMessage.success("Livro cadastrado com sucesso!");
    },
    onError: () => {
      showMessage.error("Erro ao cadastrar livro!");
    },
  });
}

export function usePutBooks() {
  const queryClient = useQueryClient();
  return useMutation<BookSchema, unknown, UpdateBookInput>({
    mutationFn: async (data: UpdateBookInput) => {
      const response = await api.patch(`/book/update/${data._id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showMessage.success("Livro alterado com sucesso!");
    },
    onError: () => {
      showMessage.error("Erro ao alterar livro!");
    },
  });
}

export function useDeleteBooks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`/book/delete/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showMessage.success("Livro removido com sucesso!");
    },
    onError: () => {
      showMessage.error("Erro ao remover livro!");
    },
  });
}
