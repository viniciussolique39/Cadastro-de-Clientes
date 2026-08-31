"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function entrar(e) {
    e.preventDefault();

    setMensagem("");

    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario,
        senha
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      setMensagem(dados.erro);
      return;
    }

    localStorage.setItem("usuario", dados.usuario.nome);

    router.push("/");
  }

  return (
    <main>
      <div className="login">
        <h1>Login</h1>

        <form onSubmit={entrar}>

          <label>Usuário</label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <label>Senha</label>

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">
            Entrar
          </button>

        </form>

        {mensagem && (
          <p>{mensagem}</p>
        )}

      </div>
    </main>
  );
}