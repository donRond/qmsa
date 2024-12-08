import Icone from '../icones/icone'; 
import Buttons from '../button/buttons';
import moment from 'moment';

const TabelaHoras = ({ horas, onDelete }) => {

    const ordenarHorasPorIdRecente = (horas) => {
      return horas
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
      };



  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Data</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Cliente</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Hora de início</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Hora Fim</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Total de Horas</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Local</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Titulo do Projeto</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Atividade</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>Função</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>observações</th>
          <th style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}></th>
        </tr>
      </thead>
      <tbody>
      {ordenarHorasPorIdRecente(horas).map((horas) => (
          <tr key={horas.id}>
            
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{moment.utc(horas.date_time_stamp).format("DD/MM/YYYY")}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.companyName}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{moment.utc(horas.initHour).format("HH:mm")}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{moment.utc(horas.endHour).format("HH:mm")}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}> {moment(horas.hours_worked).utc().format("HH:mm")}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.local}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.project}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.activitiesDescription}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.userFunction}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>{horas.observations}</td>
            <td style={{ borderBottom: "2px solid #0097A7", padding: "10px", textAlign: "center" }}>
              <div style={{ display: 'inline-flex' }}>
                <Icone href={`/horas/${horas.id}`} iconName={'edit'} legenda='Editar' />
                <Buttons onClick={() => onDelete(horas.id)} icon={"delete"} variant="buttonDelete" title={"Excluir"}/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaHoras;


//acrecentar uma permissão para o user só ver os dados do seu user logado.