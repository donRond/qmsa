import React, { useState, useEffect, useCallback } from "react";
import Buttons from "../button/buttons";
import Icone from "../icones/icone";
import { toast, ToastContainer } from "react-toastify";

// Definindo o tipo de Consultor
interface Consultor {
  id: string;
  name: string;
  email: string;
}

const TabelaConsultores: React.FC = () => {
  // Alterando o tipo de 'cadastro' para Consultor[]
  const [cadastro, setCadastro] = useState<Consultor[]>([]); // Tipo agora é Consultor[]
  const token = localStorage.getItem("token"); // Pegando o token de forma segura

  // Função para buscar os dados do cadastro, usando useCallback para memorizar a função
  const fetchCadastro = useCallback(async () => {
    if (!token) {
      toast.error("Token de autenticação não encontrado");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar cadastro");
      }

      const data: Consultor[] = await response.json(); // Definindo que os dados são do tipo Consultor[]
      setCadastro(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao buscar cadastro:", error);
      toast.error("Erro ao carregar consultores");
    }
  }, [token]); // Apenas recriar a função quando o token mudar

  // Função para deletar o consultor
  const deleteConsultor = async (id: string) => {
    if (!token) {
      toast.error("Token de autenticação não encontrado");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao deletar consultor");
      }

      toast.success("Consultor excluído com sucesso!");
      // Atualiza a lista de consultores após a exclusão
      fetchCadastro();
    } catch (error) {
      console.log("Erro ao excluir consultor:", error);
      toast.error("Erro ao tentar excluir o consultor");
    }
  };

  // Chama a função de buscar quando o componente for montado
  useEffect(() => {
    fetchCadastro();
  }, [fetchCadastro]); // O hook useEffect agora depende da função fetchCadastro

  return (
    <div>
      <ToastContainer />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Nome
            </th>
            <th
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              E-mail
            </th>
            <th
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {cadastro.length > 0 ? (
            cadastro.map((usuario) => (
              <tr key={usuario.id}>
                <td
                  style={{
                    borderBottom: "2px solid #0097A7",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {usuario.name}
                </td>
                <td
                  style={{
                    borderBottom: "2px solid #0097A7",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {usuario.email}
                </td>
                <td
                  style={{
                    borderBottom: "2px solid #0097A7",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ display: "inline-flex" }}>
                    <Icone
                      href={`/consultor/${usuario.id}`} // Redireciona para o formulário de edição
                      iconName={"edit"}
                      legenda="Editar"
                    />
                    <Buttons
                      label={undefined}
                      href={undefined}
                      onClick={() => deleteConsultor(usuario.id)} // Função de excluir
                      icon={"delete"}
                      variant="buttonDelete"
                      title={"Excluir"}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                Nenhum consultor encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaConsultores;
