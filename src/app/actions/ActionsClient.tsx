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

export async function getClient(search?: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  try {
    const url = new URL("http://localhost:3000/company");

    if (search) url.searchParams.append("company_name", search); // Parâmetro de pesquisa

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export async function getOneClient(id: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  try {
    const response = await fetch(`http://localhost:3000/company/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export async function deleteClient(id: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  try {
    const response = await fetch(`http://localhost:3000/company/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    });
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Dados não encontrados");
    }

    return response;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}

export async function createClient(payload: ClienteFormData) {
  console.log(payload.zip_code);
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  try {
    const response = await fetch("http://localhost:3000/company/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro ao cadastrar um cliente");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}

export async function updateClient(payload: ClienteFormData, id: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  try {
    const response = await fetch(`http://localhost:3000/company/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro ao cadastrar um cliente");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}
