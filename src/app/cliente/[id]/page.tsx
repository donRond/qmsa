"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { getOneClient, updateClient } from "@/app/actions/ActionsClient";
import Buttons from "@/app/componentes/button/buttons";
import withAuth from "@/app/hoc/withAuth";
import Header from "@/app/componentes/header/header";
import Logomarca from "@/app/componentes/logomarca/logomarca";

const EditarCliente: React.FC = () => {
  const [cliente, setCliente] = useState({
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

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [loadingCep, setLoadingCep] = useState(false);

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip_code = e.target.value;
    console.log(zip_code);
    setCliente({ ...cliente, zip_code });
    if (zip_code.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zip_code}/json/`,
        );
        const data = await response.json();
        if (!data.erro) {
          setCliente({
            ...cliente,
            zip_code,
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            uf: data.uf,
          });
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        setLoading(true);
        try {
          const response = await getOneClient(id); // Rota para buscar dados do cliente
          setCliente(response); // Atualiza os dados do cliente no estado
        } catch (error) {
          console.log(error);
          toast.error("Erro ao carregar dados do cliente.");
        } finally {
          setLoading(false);
        }
      };

      fetchCliente();
    }
  }, [id]);

  // Função para atualizar os dados do cliente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateClient(cliente, id);

      if (response) {
        toast.success("Cliente atualizado com sucesso!");
        router.push("/cliente"); // Redireciona para a página de lista de clientes
      } else {
        toast.error("Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />

      <div className="fullContainer">
        <div>
          <Logomarca />
        </div>
        <div
          style={{
            padding: "20px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              marginTop: "5px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            Editar Cliente
          </h1>

          {loading ? (
            <div>Carregando...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    marginTop: "5px",
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
                    onClick={handleSubmit}
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
                {/* Campos do Formulário */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>Razão Social</label>
                    <input
                      type="text"
                      name="company_name"
                      value={cliente.company_name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>CNPJ</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={cliente.cnpj}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>CEP</label>
                    <input
                      type="text"
                      name="zip_code"
                      value={cliente.zip_code}
                      onChange={handleCepChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>Número</label>
                    <input
                      type="text"
                      name="company_number"
                      value={cliente.company_number}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>Endereço</label>
                    <input
                      type="text"
                      name="street"
                      value={cliente.street}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>Bairro</label>
                    <input
                      type="text"
                      name="district"
                      value={cliente.district}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>Cidade</label>
                    <input
                      type="text"
                      name="city"
                      value={cliente.city}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>UF</label>
                    <input
                      type="text"
                      name="uf"
                      value={cliente.uf}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>CEP</label>
                    <input
                      type="text"
                      name="zip_code"
                      value={cliente.zip_code}
                      onChange={handleCepChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                    {loadingCep && <span>Carregando...</span>}
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>Número</label>
                    <input
                      type="text"
                      name="company_number"
                      value={cliente.company_number}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={cliente.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>Telefone</label>
                    <input
                      type="text"
                      name="telefone"
                      value={cliente.telefone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label>Inscrição Estadual</label>
                    <input
                      type="text"
                      name="insc_est"
                      value={cliente.insc_est}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label>Valor Hora</label>
                    <input
                      type="text"
                      name="hour_value"
                      value={Number(cliente.hour_value)}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #0097A7",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label>Observações</label>
                  <textarea
                    name="observation"
                    value={cliente.observation}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #0097A7",
                      borderRadius: "5px",
                      height: "100px",
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
                ></div>
              </div>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default withAuth(EditarCliente);
