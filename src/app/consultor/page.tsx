"use client";

import React from "react";
import Header from "../componentes/header/header";
import Logomarca from "../componentes/logomarca/logomarca";
import Buttons from "../componentes/button/buttons";
import TabelaConsultor from "../componentes/tabela/tabelaConsultor";
import withAuth from "../hoc/withAuth";

const ConsultorPage = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Logomarca />

        <h1 style={{ fontSize: "2em" }}>Consultor</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Buttons
            onClick={undefined}
            icon={undefined}
            href="/cadastro"
            label="Cadastrar Novo Consultor"
            variant="buttonNovo"
            title={"cadastrar novo consultor"}
          />
        </div>

        <div style={{ width: "100%" }}>
          <TabelaConsultor />
        </div>
      </main>
    </div>
  );
};

export default withAuth(ConsultorPage);
