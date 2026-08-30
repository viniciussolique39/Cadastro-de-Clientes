"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [senha, SetSenha] = useState("");
    const [mensagem, SettMensagem] = useState("");

    async function entrar(e) {
        e.preventDefault();

        SettMensagem("");

        const resposta = await fetch("/api/login", {
            method: "POST", 
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                senha
            })

        });

        const dados = await resposta.json();

        if(!resposta.ok){
            SettMensagem(dados.erro);
            return;
        }

        localStorage.setItem("Usuario", dados.usuario.nome);
        router.push("/")
    }

    return(
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
            onChange={(e) => SetSenha(e.target.value)}
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