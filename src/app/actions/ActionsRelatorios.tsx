export async function exibeRelatorio(clientId: string, initDate: string, endDate: string) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token de autenticação não encontrado");
        }

        const response = await fetch("http://localhost:3000/timestamps/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                clientId: clientId,
                initDate: initDate, 
                endDate: endDate,
            }),
            redirect: "follow",
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao exibir relatório:", error);
        throw error;
    }
}