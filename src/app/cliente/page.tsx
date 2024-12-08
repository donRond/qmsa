"use client";

import Header from "../componentes/header/header";
import Loading from "../componentes/loading/loading";
import Logomarca from "../componentes/logomarca/logomarca";
import Buttons from "../componentes/button/buttons";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import withAuth from "../hoc/withAuth";
import TabelaClientes from "../componentes/tabela/tabelaClientes";
import { deleteClient, getClient } from "../actions/ActionsClient";

interface ICreateCompanyDto {
  id: string;
  cnpj: string;
  insc_est: string;
  company_name: string;
  zip_code: string;
  uf: string;
  city: string;
  district: string;
  street: string;
  company_number: string;
  telefone: string;
  observation: string;
  email: string;
  hour_value: number;
}

// Tipagem para os dados dos clientes
interface Cliente extends ICreateCompanyDto {
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  numero: string;
  email: string;
  telefone: string;
  inscricaoEstadual: string;
  valorHora: string;
  observacoes: string;
}

const ListarClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchClientes(searchTerm); // Chama fetchClientes com o searchTerm para filtrar
    } else {
      fetchClientes(); // Se o campo de pesquisa estiver vazio, busca todos os clientes
    }
  }, [searchTerm]);

  const fetchClientes = async (search: string = "") => {
    setLoading(true);
    try {
      const response = await getClient(search);

      setClientes(response);
    } catch (error) {
      toast.error("Erro ao buscar os clientes" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteClient(id);

      if (!response.ok) {
        console.log(response);
        throw new Error("Erro ao excluir a atividade");
      }
      toast.success("Cliente deletado com sucesso!");

      setLoading(false);
      fetchClientes();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar cliente");
    }
  };

  return (
    <div>
      <Header />
      <div className="fullContainer">
        <div className="">
          <div>
            <Logomarca />
          </div>
          <h1
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "100px",
              fontSize: "48px",
            }}
          >
            Clientes
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 50px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "250px",
                border: "1px solid #0097A7",
                borderRadius: "4px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Buttons
                label="Filtrar"
                href={undefined}
                onClick={undefined}
                icon={undefined}
                variant="buttonNovo"
                title="Filtrar clientes"
              />
              <Buttons
                icon={undefined}
                onClick={undefined}
                href="/cliente/nova"
                label="Novo"
                variant="buttonNovo"
                title="Adicionar novo cliente"
              />
              <Buttons
                icon={undefined}
                onClick={undefined}
                href="/dashboard"
                label="Voltar"
                variant="buttonVoltar"
                title="Voltar para o dashboard"
              />
            </div>
          </div>
          <div
            style={{
              marginLeft: "20px",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <TabelaClientes clientes={clientes} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ListarClientes);
