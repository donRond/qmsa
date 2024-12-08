"use client";
import Header from "../componentes/header/header";
import Loading from "../componentes/loading/loading";
import Logomarca from "../componentes/logomarca/logomarca";

import TabelaAtividades from "../componentes/tabela/tabelaAtividades";
import Buttons from "../componentes/button/buttons";
import { deleteAtividade, getAtividades } from "../actions/ActionsAtividades";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import withAuth from "../hoc/withAuth";

const Atividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    try {
      const result = await getAtividades(); // Supondo que getAtividades faça uma requisição assíncrona
      setLoading(false);
      setAtividades(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      setLoading(false);
    }
  };

  const deleteAtividades = async (id: string) => {
    try {
      const response = await deleteAtividade(id);

      if (!response.ok) {
        console.log(response);
        throw new Error("Erro ao excluir a atividade");
      }

      toast.success("Atividade excluída com sucesso");
      setLoading(false);
      fetchAtividades();
    } catch (error) {
      console.log("erro", error);

      toast.success("Atividade excluída com sucesso");
      setLoading(false);
      fetchAtividades();
    }
  };

  return (
    <div>
      <Header />

      <div className="fullContainer">
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
          Atividades
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Buttons
            icon={undefined}
            onClick={undefined}
            href="/atividades/nova"
            label="Nova"
            variant="buttonNovo"
            title={"criar atividade"}
          />
          <Buttons
            icon={undefined}
            onClick={undefined}
            href="/dashboard"
            label="Voltar"
            variant="buttonVoltar"
            title={"voltar para dashboard"}
          />
        </div>
        <>
          {loading ? (
            <Loading />
          ) : (
            <TabelaAtividades
              atividades={atividades}
              onDelete={deleteAtividades}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default withAuth(Atividades);
