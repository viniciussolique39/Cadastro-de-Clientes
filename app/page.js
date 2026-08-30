'use client';

import { useEffect, useState } from 'react';

const formularioVazio = {
  nome: '',
  email: '',
  telefone: ''
};

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');

  async function carregarClientes() {
    const resposta = await fetch('/api/clientes');
    const dados = await resposta.json();

    if (resposta.ok) {
      setClientes(dados);
    } else {
      setMensagem(dados.erro || 'Erro ao carregar clientes.');
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  async function salvar(evento) {
    evento.preventDefault();
    setMensagem('');

    const url = editandoId ? `/api/clientes/${editandoId}` : '/api/clientes';
    const metodo = editandoId ? 'PUT' : 'POST';

    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario)
    });

    const dados = await resposta.json();
    setMensagem(dados.mensagem || dados.erro);

    if (resposta.ok) {
      setFormulario(formularioVazio);
      setEditandoId(null);
      carregarClientes();
    }
  }

  function editar(cliente) {
    setFormulario({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone || ''
    });
    setEditandoId(cliente.id);
    setMensagem('Editando cliente #' + cliente.id);
  }

  function cancelarEdicao() {
    setFormulario(formularioVazio);
    setEditandoId(null);
    setMensagem('');
  }

  async function excluir(id) {
    const confirmar = window.confirm('Deseja realmente excluir este cliente?');
    if (!confirmar) return;

    const resposta = await fetch(`/api/clientes/${id}`, {
      method: 'DELETE'
    });

    const dados = await resposta.json();
    setMensagem(dados.mensagem || dados.erro);

    if (resposta.ok) {
      carregarClientes();
    }
  }

  return (
    <main className="container">
      <h1>Cadastro de Clientes</h1>
      <p className="subtitulo">Next.js + PostgreSQL</p>

      <form onSubmit={salvar} className="formulario">
        <input
          name="nome"
          placeholder="Nome"
          value={formulario.nome}
          onChange={alterarCampo}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={formulario.email}
          onChange={alterarCampo}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={formulario.telefone}
          onChange={alterarCampo}
        />

        <div className="acoes-formulario">
          <button type="submit">
            {editandoId ? 'Salvar alteração' : 'Cadastrar'}
          </button>

          {editandoId && (
            <button type="button" className="secundario" onClick={cancelarEdicao}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <section className="lista">
        <h2>Clientes cadastrados</h2>

        {clientes.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone || '-'}</td>
                    <td className="acoes-tabela">
                      <button onClick={() => editar(cliente)}>Editar</button>
                      <button className="perigo" onClick={() => excluir(cliente.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
