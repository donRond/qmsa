"use client";

import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import EditHoras from "@/app/componentes/apropriacaoHoras/editHoras";
import { getTimeStampById } from "@/app/actions/actionsTimeStamp";
import withAuth from "@/app/hoc/withAuth";
import { useParams } from "next/dist/client/components/navigation";

function EditNewHoras() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[-1] : params.id;

  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await getTimeStampById(id);
        setDados(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchDados();
  }, [id]);

  if (!dados) {
    return <div>Carregando...</div>; // Mostra um carregamento enquanto os dados são buscados
  }

  const {
    clientId,
    companyName,
    date_time_stamp,
    initHour,
    endHour,
    local,
    project,
    activitiesDescription,
    userFunction,
    observations,
  } = dados;

  return (
    <EditHoras
      id={id}
      cliente={clientId}
      clienteNome={companyName}
      data={date_time_stamp}
      horaInicio={initHour}
      horaFim={endHour}
      local={local}
      tituloProjeto={project}
      atividade={activitiesDescription}
      funcao={userFunction}
      observacoes={observations}
      user={undefined}
    />
  );
}

export default withAuth(EditNewHoras);
