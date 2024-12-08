import { formDataLogin } from "../dtos/login.dto";

export async function signup(payload: formDataLogin) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (typeof window !== "undefined" && data.access_token) {
      localStorage.setItem("token", data.access_token);
    } else {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "usuário inválido ou senha incorreta",
      );
    }

    return data; // Retorna o resultado do signup
  } catch (error) {
    console.error("Erro no signup:", error);
    throw error; // Re-lança o erro para ser tratado em outro lugar
  }
}
