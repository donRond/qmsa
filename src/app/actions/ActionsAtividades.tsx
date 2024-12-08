export async function getAtividades() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch("http://localhost:3000/activities", {
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
    console.log("erro", error);
    throw error;
  }
}

export async function getAtividadesById(id: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch(`http://localhost:3000/activities/${id}`, {
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
    console.log("erro", error);
    throw error;
  }
}

export async function updateAtividades(id: string, description: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    // Atualize a atividade no servidor (substitua pela função que você usar para atualizar)
    const response = await fetch(`http://localhost:3000/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
      }),
    });
    if (response.status.valueOf() === 400) {
      console.log("caiu no err");
      const errorData = await response.json();
      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
  }
}

export async function createAtividade(description: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch(`http://localhost:3000/activities/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
  }
}

export async function deleteAtividade(id: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch(`http://localhost:3000/activities/${id}`, {
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
    return result;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}
