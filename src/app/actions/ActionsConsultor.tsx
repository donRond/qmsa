export async function getConsultorById(id: string) {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      const response = await fetch(`https://api.qmsaconsultoria.com.br/user/profile/${id}`, {
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
      console.log(result)
      return result;
    } catch (error) {
      console.log("erro", error);
      throw error;
    }
  }


  export async function updateConsultor(id: string, name: string, email: string, password: string) {

    console.log('update')
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      // Atualize a atividade no servidor (substitua pela função que você usar para atualizar)
      const response = await fetch(`https://api.qmsaconsultoria.com.br/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          
          name,
          email,
          password,
        }),
      });
      if (response.status.valueOf() === 400) {
        console.log("caiu no err");
        const errorData = await response.json();
        throw new Error(errorData.message || "Dados não encontrados");
      }
        
     
      return response;
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  }