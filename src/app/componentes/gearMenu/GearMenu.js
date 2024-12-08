"use client";

import React, { useState, useEffect } from "react";
import styles from "./GearMenu.module.css"; // Crie um arquivo CSS para estilizar o menu
import { useRouter } from "next/navigation";
import getUserFromToken from '@/app/actions/ActionsPerfil'

export default function GearMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [usuario, setUsuario] = useState(null);
    
    useEffect(() => {
        const userData = getUserFromToken();
        console.log(userData);
    if (userData) {
      setUsuario(userData);
    }
  }, []);
        

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

const router = useRouter();
    
    
    const handleLogout = () => {
        // Limpa o token do localStorage
        localStorage.removeItem("token");
        // Redireciona para a página de login
        router.push("/login");
    };

    return (
        <div className={styles.gearMenuContainer}>
            <>
            {/* <p>{usuario.email} </p> */}
           
            </>
            <span
                className="material-icons"
                style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    background: "#0097A7",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={toggleMenu}
            >
                account_circle
            </span>
            {isOpen && (
                <div className={styles.menu}>
                    <ul>
                        <li onClick={() => usuario && (router.push(`/consultor/${usuario.sub}`))}>
                            <span className="material-icons">account_circle</span>
                            Meu Perfil 
                        </li>
                        <li onClick={handleLogout}>
                            <span className="material-icons">logout</span>
                            Sair
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
