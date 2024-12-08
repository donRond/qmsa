"use client";

import React, { useState, useEffect } from "react";
import Header from "../componentes/header/header";

import Logomarca from "../componentes/logomarca/logomarca";

import TabelaHoras from "../componentes/tabela/tabelaHoras";
import Buttons from "../componentes/button/buttons";
import Loading from "../componentes/loading/loading";
import { getTimeStamp, deleteTimeStamp } from "../actions/actionsTimeStamp";
import { toast } from "react-toastify";
import withAuth from "../hoc/withAuth";

function HorasRegistradas() {
  const [loading, setLoading] = useState(true);
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    fetchTimeStamp();
  }, []);

  const fetchTimeStamp = async () => {
    try {
      const result = await getTimeStamp();
      setLoading(false);
      setHoras(result);
    } catch (error) {
      console.error("Erro ao buscar TimeStamp:", error);
      setLoading(false);
    }
  };

  const deleteTS = async (id: string) => {
    try {
      const response = await deleteTimeStamp(id);

      if (!response.ok) {
        console.log(response);
        throw new Error("Erro ao excluir a atividade");
      }

      toast.success("Atividade excluída com sucesso");
      setLoading(false);
      fetchTimeStamp();
    } catch (error) {
      console.log("erro", error);

      toast.success("Atividade excluída com sucesso");
      setLoading(false);
      fetchTimeStamp();
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
          Apropriação de Horas
        </h1>
        <h2
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "100px",
            marginTop: "20px",
            fontSize: "20px",
          }}
        >
          Anotações recentes
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Buttons
            icon={undefined}
            href={"/horas/novo"}
            label="Nova"
            onClick={""}
            title="Nova"
            variant="buttonNovo"
          />
          <Buttons
            icon={undefined}
            href={"/dashboard"}
            label="Voltar"
            onClick={""}
            title="Voltar"
            variant="buttonVoltar"
          />
        </div>
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <TabelaHoras horas={horas} onDelete={deleteTS} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(HorasRegistradas);
