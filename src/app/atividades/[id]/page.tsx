"use client";
import Buttons from "@/app/componentes/button/buttons";
import Header from "@/app/componentes/header/header";
import Logomarca from "@/app/componentes/logomarca/logomarca";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  getAtividadesById,
  updateAtividades,
} from "@/app/actions/ActionsAtividades";
import withAuth from "@/app/hoc/withAuth";

function EditAtividade() {
  const [atividade, setAtividade] = useState<{ description: string }>({
    description: "",
  });
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchAtividade = async () => {
      try {
        if (id) {
          const result = await getAtividadesById(id);
          setAtividade(result);
        } else {
          throw new Error("Atividade não encontrada");
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da atividade");
        console.log(error);
      }
    };

    fetchAtividade();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtividade({ ...atividade, description: e.target.value });
  };

  const handleSave = async () => {
    if (atividade.description.trim().length < 5) {
      toast.error("O nome da atividade deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      const response = await updateAtividades(id, atividade.description);

      if (response && response.success) {
        toast.success("Atividade atualizada com sucesso");
        setAtividade({ description: "" });
        setTimeout(() => {
          router.push("/atividades");
        }, 500);
      } else {
        throw new Error("Erro na resposta do servidor.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao tentar atualizar a atividade");
    }
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
            Editar atividade
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

export default withAuth(EditAtividade);
