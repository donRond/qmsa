'use client';
import React, { useState } from 'react';
import './App.css';
import Header from "../componentes/header/header";
import { useRouter } from 'next/navigation';
import withAuth from '../hoc/withAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cadastro: React.FC = () => {
  const router = useRouter();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificação das senhas
    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    const usuario = {
      nomeCompleto,
      email,
      password: senha, // Mudança de senha para password conforme esperado pelo backend
    };

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }

      toast.success('Usuário cadastrado com sucesso!');

      // Aguarda 2 segundos antes de redirecionar, para que o toast tenha tempo de ser exibido
      setTimeout(() => {
        router.push('/consultor');
      }, 1500);

    } catch (error) {
      // Altere o tipo de erro para um erro mais específico
      if (error instanceof Error) {
        console.error('Erro:', error);
        toast.error(error.message);  // Exibe erro do backend ou erro genérico
      } else {
        toast.error('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <h1>Cadastro de Usuário</h1>

          <div className="form-grid">
            <div>
              <label htmlFor="nomeCompleto">Nome Completo:</label>
              <input
                type="text"
                id="nomeCompleto"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmarSenha">Repita a Senha:</label>
              <input
                type="password"
                id="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default withAuth(Cadastro);
