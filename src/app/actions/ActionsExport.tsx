

export async function downloadExcelReport(clientId: string, initDate: string, endDate: string) {
    const token = localStorage.getItem('token'); 
    const queryParams = new URLSearchParams({
        clientId,
        initDate,
        endDate,
      }).toString();
  
  
    try {
      const response = await fetch(`http://localhost:3000/timestamps/report/generate-excel?${queryParams}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        
        redirect: "follow",
    });
       
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
  
        // O nome do arquivo é recebido do servidor no cabeçalho 'Content-Disposition'
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'relatorio_horas.xlsx';
  
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Erro ao gerar o relatório:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao se comunicar com o servidor:', error);
    }
  }
  