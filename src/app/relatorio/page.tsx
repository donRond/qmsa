"use client";
import { useState, useEffect } from "react";

import Header from "../componentes/header/header";
import Logomarca from "../componentes/logomarca/logomarca";
import Buttons from "../componentes/button/buttons";
import styles from "./relatorio.module.css";

import TabelaRelatorio from "../componentes/tabela/tabelaRelatorio";
import TabelaTotalHoras from "../componentes/tabela/tabelaTotalHoras";
import { toast } from "react-toastify";

import { exibeRelatorio } from "../actions/ActionsRelatorios";

import Loading from "../componentes/loading/loading";
import { downloadExcelReport } from "../actions/ActionsExport";

import moment from "moment";
import TabelaRelatorioSintetico from "../componentes/tabela/tabelaRelatorioSintetico ";

export default function Relatorio() {
  // const router = useRouter();

  const [relatorio, setRelatorio] = useState([]);

  const [loading, setLoading] = useState(true); // msg carregar
  // const [error, setError] = useState<unknown>(null); // msg erro  31:17  Error: 'setError' is assigned a value but never used.  @typescript-eslint/no-unused-vars

  const [loadingRelatorio, setLoadingRelatorio] = useState(false);
  const [errorRelatorio, setErrorRelatorio] = useState(false);

  const [errorSelecionarEmpresa, setErrorSelecionarEmpresa] = useState(false);

  // const [total, setTotal] = useState(0);

  const [empresaSelecionada, setEmpresaSelecionada] = useState("");

  const [tipoRelatorio, setTipoRelatorio] = useState<
    "Sintético" | "Analítico" | string
  >("Sintético");
  const [tipoArquivo, setTipoArquivo] = useState<"PDF" | "Planilha">("PDF");

  // Clientes cadastrados
  const [empresas, setEmpresas] = useState([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);

  // Data de início e fim do relatório
  const [initDate, setInitDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Botão "Exibir"
  const handleExibirClick = async () => {
    if (!empresaSelecionada) {
      setErrorSelecionarEmpresa(true);
      return;
    }

    if (!initDate || !endDate) {
      toast.error("Por favor, selecione as datas de início e fim.");
      return;
    }

    try {
      setLoadingRelatorio(true);
      setErrorSelecionarEmpresa(false);
      setErrorRelatorio(false);

      const momentInitDate = moment(initDate).toISOString();
      const momentEndDate = moment(endDate).toISOString();

      // Chama a função exibeRelatorio com os parâmetros necessários
      const relatorioData = await exibeRelatorio(
        empresaSelecionada,
        momentInitDate,
        momentEndDate,
      );
      setLoading(false);
      setRelatorio(relatorioData);
    } catch (error) {
      console.error("Erro ao exibir relatório:", error);
      setErrorRelatorio(true);
    } finally {
      setLoadingRelatorio(false);
    }
  };

  // Busca empresas cadastradas
  const fetchEmpresas = async () => {
    setLoadingEmpresas(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch("http://localhost:3000/company", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    } finally {
      setLoadingEmpresas(false);
    }
  };

  // Atualiza lista de empresas
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const downloadExcel = async () => {
    if (!empresaSelecionada || !initDate || !endDate) {
      toast.error(
        "Por favor, preencha todos os campos necessários para gerar o relatório.",
      );
      return;
    }

    downloadExcelReport(empresaSelecionada, initDate, endDate);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.headerSection}>
          <Logomarca />
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Relatório de Horas</h1>
            <div className={styles.menuNavegacao}>
              <Buttons
                onClick={undefined}
                href={"/dashboard"}
                label="Voltar"
                title="Voltar"
                variant="buttonVoltar"
                icon={null}
              />
            </div>
          </div>
        </div>

        {/*Compos de filtros */}
        <div className={styles.formulario}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Empresa:
              {loadingEmpresas ? (
                <p>Carregando empresas...</p>
              ) : (
                <select
                  className={styles.formSelect}
                  value={empresaSelecionada}
                  onChange={(e) => setEmpresaSelecionada(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.company_name}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.timeSheet}>
              {/* Novos Campos de datas */}
              <label className={styles.formLabel}>
                Data de Início:
                <input
                  className={styles.date}
                  type="date"
                  value={initDate}
                  onChange={(e) => setInitDate(e.target.value)}
                />
              </label>
              <label className={styles.formLabel}>
                Data de Fim:
                <input
                  className={styles.date}
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Tipo do relatório   */}
          <label className={styles.formLabel}>
            Tipo de Relatório:
            <select
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
              className={styles.date}
            >
              <option value="Sintético">Sintético</option>
              <option value="Analítico">Analítico</option>
            </select>
          </label>

          <div className={styles.formGroup}>
            <div className={styles.formExport}>
              <label className={styles.formLabel}>
                Exportar:
                <select
                  value={tipoArquivo}
                  onChange={(e) =>
                    setTipoArquivo(e.target.value as "PDF" | "Planilha")
                  }
                  style={{ maxWidth: "200px" }}
                  className={styles.date}
                >
                  <option value="PDF">PDF</option>
                  <option value="Planilha">Planilha</option>
                </select>
              </label>

              <div className={styles.formButtons}>
                {tipoArquivo === "Planilha" ? (
                  <Buttons
                    href={undefined}
                    onClick={downloadExcel}
                    label="Download.XLS"
                    title="Download"
                    icon={"download"}
                    variant="buttonIcon"
                  />
                ) : (
                  <Buttons
                    onClick={""}
                    href={undefined}
                    label="Download"
                    title="Download"
                    icon={"picture_as_pdf"}
                    variant="buttonIcon"
                  />
                )}
                <Buttons
                  onClick={handleExibirClick}
                  href={undefined}
                  label="Gerar"
                  title="Gerar"
                  variant="buttonSalvar"
                  icon={"update"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          {errorSelecionarEmpresa ? (
            <p>Selecione uma empresa para exibir o relatório</p>
          ) : errorRelatorio ? (
            <p>Erro ao exibir relatório</p>
          ) : loadingRelatorio ? (
            <p>Carregando relatório...</p>
          ) : relatorio.length === 0 ? (
            <p>.</p>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <TabelaTotalHoras relatorio={relatorio} />
                  {tipoRelatorio === "Analítico" ? (
                    <TabelaRelatorio relatorio={relatorio} />
                  ) : (
                    <TabelaRelatorioSintetico relatorio={relatorio} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
