"use client";
import Buttons from "@/app/componentes/button/buttons";
import Header from "@/app/componentes/header/header";
import Logomarca from "@/app/componentes/logomarca/logomarca";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createAtividade } from "@/app/actions/ActionsAtividades";
import withAuth from "@/app/hoc/withAuth";

function NovaAtividade() {
  const [atividade, setAtividade] = useState<{ description: string }>({
    description: "",
  });
  const router = useRouter();

  const handleSave = async () => {
    if (atividade.description.trim().length < 5) {
      toast.error("O nome da atividade deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      await createAtividade(atividade.description);
      toast.success("Atividade salva com sucesso!");
      setTimeout(() => {
        router.push("/atividades");
      }, 500);
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao tentar criar ativiadade. Tente novamente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtividade({ ...atividade, description: e.target.value });
  };

  return (
    <div>
      <Header />

      <div className="fullContainer">
        <div>
          <Logomarca />
        </div>

        <div style={{ margin: "0 auto", width: "fit-content" }}>
          <h1
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "100px",
              fontSize: "48px",
            }}
          >
            Criar tipo de atividade
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px",
              maxWidth: "600px",
              marginLeft: "100px",
            }}
          >
            <Buttons
              icon={undefined}
              label="Salvar"
              variant="buttonSalvar"
              onClick={handleSave}
              title={undefined}
              href={undefined}
            />

            <Buttons
              icon={undefined}
              href="/atividades"
              label="Voltar"
              variant="buttonVoltar"
              onClick={undefined}
              title={undefined}
            />
          </div>
          <div>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "100px",
                maxWidth: "600px",
              }}
            >
              <label htmlFor="atividade">Nome da atividade</label>
              <input
                type="text"
                id="atividade"
                name="atividade"
                value={atividade.description}
                onChange={handleChange}
                style={{
                  height: "40px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #B2EBF2",
                  padding: "0 12px",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#212121",
                  outline: "none",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default withAuth(NovaAtividade);
