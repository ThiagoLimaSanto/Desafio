import { useState } from "react";
import { Input } from "../../components/Input";
import { MainForm } from "../../components/MainForm";
import { useAuth } from "../../hooks/useAuth";
import { MainLoginTemplate } from "../../templates/MainLoginTemplate";

export function LoginPage() {
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    login(user);
  };
  return (
    <MainLoginTemplate
      textButton="Entrar"
      textLink="Não possui uma conta?"
      link="/register"
      handleSubmit={handleSubmit}
    >
      <MainForm title="Login" handleSubmit={handleSubmit}>
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
