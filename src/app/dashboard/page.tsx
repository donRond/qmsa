"use client";

import Link from "next/link";
import Header from "../componentes/header/header";
import Logomarca from "../componentes/logomarca/logomarca";

import styles from "./dashboard.module.css";
import DashImage from "../componentes/dashImage/dashImage";

import { FaFileAlt, FaTasks, FaUsers } from "react-icons/fa";
import withAuth from "../hoc/withAuth";

function Dashboard() {
  return (
    <div>
      <Header />

      <div className="fullContainer">
        <main className={styles.main}>
          <div>
            <Logomarca />
          </div>
          <div className={styles.headerSection}>
            <div className={styles.buttonContainer}>
              <Link href="/cliente" className={styles.button}>
                <FaUsers className={styles.icon} />
                Ver Clientes
              </Link>
              <Link href="/cliente/nova" className={styles.button}>
                <FaUsers className={styles.icon} />
                Adicionar Novo Cliente
              </Link>
              <Link href="/atividades" className={styles.button}>
                <FaTasks className={styles.icon} />
                Ver Atividades
              </Link>
              <Link href="/relatorio" className={styles.button}>
                <FaFileAlt className={styles.icon} />
                Gerar Relatório
              </Link>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <DashImage />
          </div>
        </main>
      </div>
    </div>
  );
}
export default withAuth(Dashboard);
