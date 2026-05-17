import { useState } from "react";
import { Input } from "../../components/Input";
import { MainForm } from "../../components/MainForm";
import { useAuth } from "../../hooks/useAuth";
import { MainLoginTemplate } from "../../templates/MainLoginTemplate";

export function RegisterPage() {
  const { registerUser } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    registerUser(user);
  };
  return (
    <MainLoginTemplate
      textButton="Registrar"
      textLink="Já possui uma conta?"
      link="/login"
      handleSubmit={handleSubmit}
    >
      <MainForm>
        <Input
          id="name"
          type="text"
          placeholder="Digite o seu nome"
          labelText="Nome"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          id="email"
          type="email"
          placeholder="Digite o seu e-mail"
          labelText="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          id="password"
          type="password"
          placeholder="Digite a sua senha"
          labelText="Senha"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </MainForm>
    </MainLoginTemplate>
  );
}
