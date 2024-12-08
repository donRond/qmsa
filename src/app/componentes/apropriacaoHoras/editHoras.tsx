"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/componentes/header/header";
import Buttons from "@/app/componentes/button/buttons";
import styles from "@/app/horas/novo/horas.module.css";
import Logomarca from "@/app/componentes/logomarca/logomarca";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import { updateTimeStamp } from "@/app/actions/actionsTimeStamp";
import { getAtividades } from "@/app/actions/ActionsAtividades";
import { getClient } from "@/app/actions/ActionsClient";

import Loading from "../loading/loading";
import withAuth from "@/app/hoc/withAuth";

const EditHoras = ({
  id,
  user,
  cliente,
  clienteNome,
  data,
  horaInicio,
  horaFim,
  local,
  tituloProjeto,
  atividade,
  funcao,
  observacoes,
}) => {
  const [date_time_stamp, setDate_time_stamp] = useState(data);
  const [initHour, setInitHour] = useState(
    moment.utc(horaInicio).format("HH:mm"),
  );
  const [endHour, setEndHour] = useState(moment.utc(horaFim).format("HH:mm"));
  const [tipoTrabalho, setTipoTrabalho] = useState(local);
  const [project, setProject] = useState(tituloProjeto);
  const [activitiesDescription, setActivitiesDescription] = useState(atividade);
  const [userFunction, setUserFunction] = useState(funcao);
  const [observations, setObservations] = useState(observacoes);
  const [atividades, setAtividades] = useState([]);
  const [clientId, setClientId] = useState(cliente || "");
  const [companyName, setCompanyName] = useState(clienteNome || "");
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchAtividades();
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setIsLoading(true);
      const res = await getClient();
      console.log("clientes", res);
      setClientes(res);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAtividades = async () => {
    try {
      const result = await getAtividades();

      setAtividades(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    function convertTimeToISO(hora: string) {
      const dataAtual = moment().format("YYYY-MM-DD");
      const isoString = moment.utc(`${dataAtual}T${hora}:00`).toISOString();

      return isoString;
    }

    function horasTrabalhadas() {
      const init = moment(initHour, "HH:mm");
      const fim = moment(endHour, "HH:mm");

      if (!init.isValid() || !fim.isValid()) {
        console.error("Horas inválidas");
        return; // Retorna early se as horas não forem válidas
      }
      const duration = moment.duration(fim.diff(init));

      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      const formattedDuration = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      const horasTotais = convertTimeToISO(formattedDuration);

      return horasTotais;
    }

    const newHora = {
      id,
      date_time_stamp: moment.utc(date_time_stamp).toISOString(),
      initHour: initHour,
      endHour: endHour,
      local: tipoTrabalho,
      project,
      userFunction,
      observations,
      hours_worked: horasTrabalhadas(),
    };
    const newHoraString = JSON.stringify(newHora);
    console.log(newHoraString);

    try {
      await updateTimeStamp(newHora, user, clientId, activitiesDescription);
      console.log(user);
      toast.success("Registro salvo com sucesso!");
      setTimeout(() => {
        router.push("/horas");
      }, 500);
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Logomarca />
      </div>
      <div className="main">
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
            fontSize: "20px",
          }}
        >
          Editar
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Buttons
            label="Salvar"
            icon={undefined}
            variant="buttonNovo"
            onClick={handleSave}
            title={undefined}
            href={undefined}
          />
          <Buttons
            icon={undefined}
            href="/horas"
            label="Voltar"
            variant="buttonVoltar"
            onClick={undefined}
            title={undefined}
          />
        </div>
      </div>

      <form className={styles.formulario} onSubmit={handleSave}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="cliente">
            Cliente:
          </label>
          {isLoading ? (
            <Loading />
          ) : (
            <select
              className={styles.formSelect}
              id="cliente"
              value={clientId}
              onChange={(e) => {
                const selectedId = e.target.value; // Obtém o ID do cliente selecionado
                setClientId(selectedId); // Atualiza o ID do cliente
                const selectedCompany = clientes.find(
                  (cliente) => cliente.id === selectedId,
                );
                setCompanyName(
                  selectedCompany ? selectedCompany.company_name : "",
                ); // Atualiza o nome da companhia
              }}
              required
            >
              <option disabled selected>
                {companyName}
              </option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.company_name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className={styles.timeSheet}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="date">
              Data:
            </label>
            <input
              className={styles.date}
              id="date"
              type="date"
              value={moment.utc(date_time_stamp).format("yyyy-MM-DD")}
              onChange={(e) => setDate_time_stamp(e.target.value)}
            />
          </div>
          <div className={styles.timeSheet}>
            <div className={styles.formGroupHour}>
              <label className={styles.formLabel} htmlFor="horaInicio">
                Hora de Início:
              </label>
              <input
                className={styles.formInput}
                value={initHour}
                onChange={(e) => setInitHour(e.target.value)}
                type="time"
                id="horaInicio"
                name="horaInicio"
                min="00:00"
                max="23:59"
                placeholder="HH:mm"
                required
              />
            </div>

            <div className={styles.formGroupHour}>
              <label className={styles.formLabel} htmlFor="horaFim">
                Hora de Fim:
              </label>
              <input
                className={styles.formInput}
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                type="time"
                id="horaFim"
                name="horaFim"
                min="00:00"
                max="23:59"
                placeholder="HH:mm"
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="tipoTrabalho">
            Local de Trabalho:
          </label>
          <select
            className={styles.formSelect}
            id="tipoTrabalho"
            name="tipoTrabalho"
            value={tipoTrabalho}
            onChange={(e) => setTipoTrabalho(e.target.value)}
            required
          >
            <option disabled selected>
              {local}
            </option>
            <option value="Presencial">Presencial </option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="tituloProjeto">
            Título do Projeto:
          </label>
          <input
            className={styles.formInput}
            value={project}
            onChange={(e) => setProject(e.target.value)}
            type="text"
            id="tituloProjeto"
            name="tituloProjeto"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="atividade">
            Tipo da Atividade:
          </label>
          <select
            className={styles.formSelect}
            id="atividade"
            name="atividade"
            value={activitiesDescription}
            onChange={(e) => setActivitiesDescription(e.target.value)}
            required
          >
            <option disabled selected>
              {activitiesDescription}
            </option>
            {atividades.map((atividade) => (
              <option key={atividade.id} value={atividade.description}>
                {atividade.description}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="funcao">
            Função:
          </label>
          <select
            className={styles.formSelect}
            id="funcao"
            name="funcao"
            value={userFunction}
            onChange={(e) => setUserFunction(e.target.value)}
            required
          >
            <option disabled selected>
              {userFunction}
            </option>
            <option value="Consultora">Consultora</option>
            <option value="Professora">Professora</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="observacoes">
            Observações:
          </label>
          <textarea
            className={styles.formTextarea}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            id="observacoes"
            name="observacoes"
            rows={4}
            placeholder="Digite suas observações aqui..."
          ></textarea>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default withAuth(EditHoras);
