import { useState } from "react";
import {
    FaHome,
    FaChartBar,
    FaUsers,
    FaTasks,
    FaClipboardList,
} from "react-icons/fa";
import styles from "./menuLateral.module.css";

const MenuLateral = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`${styles.menuLateral} ${isOpen ? styles.open : ""}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className={styles.menuContent}>
                <a href="/dashboard" className={styles.menuItem}>
                    <FaHome className={styles.icon} />
                    {isOpen && <span>Home</span>}
                </a>
                <a href="/relatorio" className={styles.menuItem}>
                    <FaChartBar className={styles.icon} />
                    {isOpen && <span>Análise geral</span>}
                </a>

                <a href="/cliente" className={styles.menuItem}>
                    <FaUsers className={styles.icon} />
                    {isOpen && <span>clientes</span>}
                </a>

                <a href="/consultor" className={styles.menuItem}>
                    <FaUsers className={styles.icon} />
                    {isOpen && <span>Consultores</span>}
                </a>
                <a href="/atividades" className={styles.menuItem}>
                    <FaTasks className={styles.icon} />
                    {isOpen && <span>Atividades</span>}
                </a>
                <a href="/horas" className={styles.menuItem}>
                    <FaClipboardList className={styles.icon} />
                    {isOpen && <span>Folha de Apropriação de horas</span>}
                </a>
            </div>
        </div>
    );
};

export default MenuLateral;
