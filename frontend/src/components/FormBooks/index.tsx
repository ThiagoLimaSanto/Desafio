import type { UpdateBookInput } from "../../types/Book";
import { Input } from "../Input";
import { MainForm } from "../MainForm";

interface FormProps {
  title?: string;
  book: UpdateBookInput;
  setBook: (book: UpdateBookInput) => void;
  handleSubmit: () => void;
}

export function FormBooks({ title, book, setBook, handleSubmit }: FormProps) {
  return (
    <MainForm title={title} handleSubmit={handleSubmit}>
      <Input
        id="titulo"
        type="text"
        placeholder="Digite o título do livro"
        labelText="Título"
        value={book.titulo}
        onChange={(e) => setBook({ ...book, titulo: e.target.value })}
      />

      <Input
        id="autor"
        type="text"
        placeholder="Digite o nome do autor"
        labelText="Autor"
        value={book.autor}
        onChange={(e) => setBook({ ...book, autor: e.target.value })}
      />

      <Input
        id="genero"
        type="text"
        placeholder="Digite o gênero"
        labelText="Gênero"
        value={book.genero}
        onChange={(e) => setBook({ ...book, genero: e.target.value })}
      />

      <Input
        id="ano"
        type="number"
        placeholder="Digite o ano"
        labelText="Ano"
        value={book.ano}
        onChange={(e) => setBook({ ...book, ano: Number(e.target.value) })}
      />

      <Input
        id="estoque"
        type="number"
        placeholder="Digite o estoque"
        labelText="Estoque"
        value={book.estoque}
        onChange={(e) => setBook({ ...book, estoque: Number(e.target.value) })}
      />
    </MainForm>
  );
}
