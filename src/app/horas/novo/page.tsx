"use client";

import React, { useState } from "react";
import NovoHoras from "@/app/componentes/apropriacaoHoras/novoHoras";

export default function ApropiacaoHoras() {
  const [dados] = useState({
    clientId: "",
    companyName: "",
    date_time_stamp: "",
    initHour: "",
    endHour: "",
    local: "",
    project: "",
    activitiesDescription: "",
    userFunction: "",
    observations: "",
  });

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
    <NovoHoras
      clienteNome={companyName}
      data={date_time_stamp}
      horaInicio={initHour}
      horaFim={endHour}
      local={local}
      tituloProjeto={project}
      atividade={activitiesDescription}
      funcao={userFunction}
      observacoes={observations}
      cliente={clientId}
    />
  );
}
