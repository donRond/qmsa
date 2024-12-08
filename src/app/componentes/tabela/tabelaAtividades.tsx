import Buttons from "../button/buttons";
import Icone from "../icones/icone";

const TabelaAtividades = ({ atividades, onDelete }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th
            style={{
              borderBottom: "2px solid #0097A7",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Nome
          </th>
          <th
            style={{
              borderBottom: "2px solid #0097A7",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Data de Criação
          </th>
          <th
            style={{
              borderBottom: "2px solid #0097A7",
              padding: "10px",
              textAlign: "center",
            }}
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {atividades.map((atividade) => (
          <tr key={atividade.id}>
            <td
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {atividade.description}
            </td>
            <td
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {new Date(atividade.createdAt).toLocaleDateString()}
            </td>
            <td
              style={{
                borderBottom: "2px solid #0097A7",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ display: "inline-flex" }}>
                <Icone
                  href={`/atividades/${atividade.id}`}
                  iconName={"edit"}
                  legenda="Editar"
                />
                <Buttons
                  href={undefined}
                  label={undefined}
                  onClick={() => onDelete(atividade.id)}
                  icon={"delete"}
                  variant="buttonDelete"
                  title={"Excluir"}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaAtividades;
