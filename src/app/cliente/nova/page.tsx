"use client";

import { useState } from "react";
import Buttons from "@/app/componentes/button/buttons";
import Header from "@/app/componentes/header/header";
import Logomarca from "@/app/componentes/logomarca/logomarca";
import withAuth from "@/app/hoc/withAuth";
import { createClient } from "@/app/actions/ActionsClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";

interface ClienteFormData {
  company_name: string;
  cnpj: string;
  street: string;
  district: string;
  city: string;
  uf: string;
  zip_code: string;
  company_number: string;
  email: string;
  telefone: string;
  insc_est: string;
  hour_value: number;
  observation: string;
}

const ClienteForm: React.FC = () => {
  const [formData, setFormData] = useState<ClienteFormData>({
    company_name: "",
    cnpj: "",
    street: "",
    district: "",
    city: "",
    uf: "",
    zip_code: "",
    company_number: "",
    email: "",
    telefone: "",
    insc_est: "",
    hour_value: 0,
    observation: "",
  });

  const router = useRouter();
  const [loadingCep, setLoadingCep] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateCep = (cep: string) => /^[0-9]{8}$/.test(cep);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip_code = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setFormData({ ...formData, zip_code });

    if (validateCep(zip_code)) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zip_code}/json/`,
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar CEP");
        }

        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            zip_code,
            street: data.logradouro || "",
            district: data.bairro || "",
            city: data.localidade || "",
            uf: data.uf || "",
          }));
          toast.success("Endereço carregado com sucesso!");
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar CEP. Tente novamente.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      await createClient(formData);

      toast.success("Cliente salvo com sucesso!");
      setTimeout(() => {
        router.push("/cliente");
      }, 500);
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao tentar criar cliente. Tente novamente.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header />
      <div
        className="fullContainer"
        style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}
      >
        <div>
          <Logomarca />
        </div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Cadastrar Cliente
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 35%" }}>
              <label style={{ fontWeight: "bold" }}>Razão Social</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ flex: "1 1 35%" }}>
              <label style={{ fontWeight: "bold" }}>CNPJ</label>
              <InputMask
                mask="99.999.999/9999-99"
                value={formData.cnpj}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cnpj"
                    style={{
                      width: "100%",
                      padding: "12px",
                      margin: "8px 0",
                      border: "1px solid #0097A7",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </InputMask>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>CEP</label>
              <InputMask
                mask="99999-999"
                value={formData.zip_code}
                onChange={handleCepChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="zip_code"
                    style={{
                      width: "100%",
                      padding: "12px",
                      margin: "8px 0",
                      border: "1px solid #0097A7",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </InputMask>
              {loadingCep && (
                <div style={{ marginTop: "5px", color: "#0097A7" }}>
                  Buscando...
                </div>
              )}
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Número</label>
              <input
                type="text"
                name="company_number"
                value={formData.company_number}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="telefone"
                    style={{
                      width: "100%",
                      padding: "12px",
                      margin: "8px 0",
                      border: "1px solid #0097A7",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </InputMask>
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Valor Hora</label>
              <InputMask
                mask="R$ 999,99"
                value={
                  formData.hour_value
                    ? `R$ ${formData.hour_value.toFixed(2).replace(".", ",")}`
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value
                    .replace(/[^\d,]/g, "")
                    .replace(",", ".");

                  if (value) {
                    setFormData((prev) => ({
                      ...prev,
                      hour_value: parseFloat(value),
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      hour_value: 0,
                    }));
                  }
                }}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="hour_value"
                    style={{
                      width: "100%",
                      padding: "12px",
                      margin: "8px 0",
                      border: "1px solid #0097A7",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </InputMask>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Endereço</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Bairro</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Inscrição Estadual</label>
              <input
                type="text"
                name="insc_est"
                value={formData.insc_est}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <label style={{ fontWeight: "bold" }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  border: "1px solid #0097A7",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <label style={{ fontWeight: "bold" }}>Observações</label>
            <textarea
              name="observation"
              value={formData.observation}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                border: "1px solid #0097A7",
                borderRadius: "4px",
                minHeight: "100px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
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
              href="/cliente"
              label="Voltar"
              variant="buttonVoltar"
              onClick={undefined}
              title={undefined}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(ClienteForm);
