"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getConsultorById,
  updateConsultor,
} from "@/app/actions/ActionsConsultor";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../componentes/header/header";
import Logomarca from "../../componentes/logomarca/logomarca";
import Buttons from "../../componentes/button/buttons";

const EditarConsultor: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [consultor, setConsultor] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchConsultor = async () => {
      try {
        if (id) {
          const result = await getConsultorById(id);
          setConsultor(result);
        } else {
          throw new Error("Consultor não encontrado");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados do consultor");
        console.error(error);
      }
    };

    fetchConsultor();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await updateConsultor(
        id,
        consultor.name,
        consultor.email,
        consultor.password,
      );

      if (response && response.ok) {
        toast.success("Consultor atualizado com sucesso");
        setConsultor({ name: "", email: "", password: "" });
        setTimeout(() => {
          router.push("/consultor");
        }, 1500);
      } else {
        throw new Error("Erro na resposta do servidor.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao tentar atualizar o consultor");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setConsultor({
      ...consultor,
      [name]: value,
    });
  };

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
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Logomarca />

        <h1 style={{ fontSize: "2em" }}>Editar Consultor</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="name" style={{ fontWeight: "bold" }}>
              Nome Completo:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={consultor.name}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1em",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              E-mail:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={consultor.email}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1em",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="password" style={{ fontWeight: "bold" }}>
              Senha:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={consultor.password}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1em",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Buttons
              onClick={undefined}
              icon={undefined}
              href="/consultor"
              label="Voltar"
              title="Voltar para a página de consultores"
              variant="buttonNovo"
            />
            <Buttons
              onClick={undefined}
              icon={undefined}
              href={undefined}
              type="submit"
              label="Salvar"
              title="Salvar alterações"
              variant="buttonNovo"
            />
          </div>
        </form>

        <ToastContainer />
      </main>
    </div>
  );
};

export default EditarConsultor;
