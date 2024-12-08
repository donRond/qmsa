"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a Landing Page
    router.push("/landing");
  }, [router]);

  return null; // Não renderiza nada aqui, já que o redirecionamento ocorre
  // comentei o codigo abaixo para caso for necessario voltar
  // return (
  //   <div className={styles.container}>
  //     <Header />
  //
  //     <main className={styles.main}>
  //       <Image className={styles.logomarca} src={logo} alt="logo" />
  //     </main>
  //     <footer className={styles.footer}>
  //       <p>QMSA Consultoria 2024</p>
  //     </footer>
  //   </div>
  // );
}
