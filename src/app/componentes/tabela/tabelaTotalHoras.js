

const TotalHoras = ({relatorio})=> {

    return(

    
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
         <tr>
              <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>Horas Totais</td>
              <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>Valor Total</td>
            </tr>
            <tr>
              <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center" }}>{relatorio.horasTotais}</td>
              <td style={{ borderBottom: "1px solid #0097A7", padding: "10px", textAlign: "center", fontWeight: "bold" }}>
                {relatorio.valorTotal}
              </td>
            </tr>

 </table>
    )
}

export default TotalHoras