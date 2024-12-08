import React from "react";
import moment from 'moment';


const TabelaRelatorio = ({ relatorio }) => {

  return (
    
    <div>
      {relatorio.length === 0 ? (
        <p style={{ textAlign: "center", color: "#FF0000", margin: "20px 0" }}>
          Dados não encontrados
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
            <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Data</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Cliente</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Total de Horas</th>
               
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Atividade</th>
         
        
          

            </tr>
          </thead>
          <tbody>
            {relatorio.timeStamp.map((relatorio) => (
              <tr key={relatorio.id}>
                
                <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>{moment(relatorio.date_time_stamp).format('DD/MM/YYYY')}</td>
                <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>{relatorio.companyName}</td>

                
                <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>{moment.utc(relatorio.hours_worked).format("HH:mm")}</td>


                <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>{relatorio.activitiesDescription}</td>
  

                
              </tr>
            ))}

          </tbody>
                    
        </table>
      )}
    </div>
  );
};

export default TabelaRelatorio;
