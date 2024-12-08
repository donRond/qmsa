"use client";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "./../images/qmsalogo.jpeg";
import { signup } from "../actions/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Verifica se o usuário está logado (token no localStorage)

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita da reload na pagina

    try {
      const response = await signup({ email, password }); // Chame a função signup com os dados do formulário

      if (response) {
        toast.success("Login realizado com sucesso!");
        setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    }
    else {
        toast.error("Usuário ou senha incorretos!", response.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao tentar realizar o login. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bem vindo de volta!</h1>
      <div className={styles.content}>
        <div className={styles.formDiv}>
          <form onSubmit={handleSubmit} className={styles.formLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Senha"
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
        <div className={styles.imageDiv}>
          <Image className={styles.logomarca} src={logo} alt=""></Image>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
