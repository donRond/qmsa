export async function getTimeStamp() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/timestamps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTimeStampById(id: string) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/timestamps/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateTimeStamp(
  data,
  userEmail: string,
  clientId: string,
  activitiesDescription: string,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/timestamps/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          userEmail,
          clientId,
          activitiesDescription,
        }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
  }
}

export async function createTimeStamp(
  data,
  clientId: string,
  activitiesDescription: string,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/timestamps/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        clientId,
        activitiesDescription,
      }),
      redirect: "follow",
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
  }
}

export async function deleteTimeStamp(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/timestamps/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}
