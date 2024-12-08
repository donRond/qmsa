import Buttons from "../button/buttons";
import Icone from "../icones/icone";
import InputMask from "react-input-mask";

interface ICreateCompanyDto {
  id: string;
  cnpj: string;
  insc_est: string;
  company_name: string;
  zip_code: string;
  uf: string;
  city: string;
  district: string;
  street: string;
  company_number: string;
  telefone: string;
  observation: string;
  email: string;
  hour_value: number;
}

interface Cliente extends ICreateCompanyDto {
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  numero: string;
  email: string;
  telefone: string;
  inscricaoEstadual: string;
  valorHora: string;
  observacoes: string;
}
interface TabelaClientesProps {
  clientes: Cliente[];
  onDelete: (id: string) => void;
}

const TabelaClientes: React.FC<TabelaClientesProps> = ({
  clientes,
  onDelete,
}) => {
  const formatValorHora = (valorHora: string | number | undefined) => {
    if (!valorHora) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valorHora));
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={headerStyle}>Nome</th>
          <th style={headerStyle}>CNPJ</th>
          <th style={headerStyle}>Inscrição Estadual</th>
          <th style={headerStyle}>Endereço</th>
          <th style={headerStyle}>Telefone</th>
          <th style={headerStyle}>Email</th>
          <th style={headerStyle}>Valor Hora</th>
          <th style={headerStyle}>Observação</th>
          <th style={headerStyle}>Opções</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente: ICreateCompanyDto) => (
          <tr key={cliente.id}>
            <td style={cellStyle}>{cliente.company_name}</td>
            <td style={cellStyle}>
              <InputMask
                mask="99.999.999/9999-99"
                value={cliente.cnpj}
                disabled
              >
                {(inputProps) => (
                  <input {...inputProps} style={inputMaskStyle} type="text" />
                )}
              </InputMask>
            </td>
            <td style={cellStyle}>{cliente.insc_est}</td>
            <td style={cellStyle}>
              {`${cliente.street}, ${cliente.district}, ${cliente.company_number}, ${cliente.city} - ${cliente.uf}`}
            </td>
            <td style={cellStyle}>
              <InputMask
                mask="(99) 99999-9999"
                value={cliente.telefone}
                disabled
              >
                {(inputProps) => (
                  <input {...inputProps} style={inputMaskStyle} type="text" />
                )}
              </InputMask>
            </td>
            <td style={cellStyle}>{cliente.email ?? "-"}</td>
            <td style={cellStyle}>{formatValorHora(cliente.hour_value)}</td>
            <td style={cellStyle}>{cliente.observation}</td>
            <td style={cellStyle}>
              <div style={{ display: "inline-flex" }}>
                <Icone
                  href={`/cliente/${cliente.id}`}
                  iconName={"edit"}
                  legenda="Editar"
                />
                <Buttons
                  href={undefined}
                  label={undefined}
                  onClick={() => onDelete(cliente.id)}
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

const headerStyle: React.CSSProperties = {
  borderBottom: "2px solid #0097A7",
  padding: "10px",
  textAlign: "center",
};

const cellStyle: React.CSSProperties = {
  borderBottom: "2px solid #0097A7",
  padding: "10px",
  textAlign: "center",
};

const inputMaskStyle: React.CSSProperties = {
  border: "none",
  backgroundColor: "transparent",
  textAlign: "center",
  fontSize: "inherit",
};

export default TabelaClientes;
