import Link from "next/link";
// import Header from "../componentes/header/header";
import pageStyles from "./landing.module.css";
// import Logomarca from "../componentes/logomarca/logomarca";
import Image from "next/image";
import headerStyles from "../componentes/header/Header.module.css";

export default function LandingPage() {
  return (
    <div className={pageStyles.container}>
      <header className={headerStyles.header}>
        <div className={pageStyles.headerContainer}>
          <Image
            src="/logo.png"
            className={headerStyles.logo}
            alt="Logomarca"
            height={60}
            width={200}
          />
        </div>
        <ul className={pageStyles.navList}>
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#sobre">SOBRE</a>
          </li>
          <li>
            <a href="#Consultoria">CONSULTORIA</a>
          </li>
          <li>
            <a href="#clientes">CLIENTES</a>
          </li>
          <li>
            <Link href="/login">LOGIN</Link>
          </li>
        
        </ul>
      </header>
      <hr className={headerStyles.separator} />
      <main className={pageStyles.mainContent}></main>
      <main className={pageStyles.mainContent}>
        <aside>
          <h2 className={pageStyles.contactTitle}>
            Fale com nossos especialistas
          </h2>
          <p className={pageStyles.textHighlight}></p>
          <p className={pageStyles.consultoriaText}>
            Consultoria que transforma desafios em resultados.
          </p>

          <form className={pageStyles.form}>
            <input
              className={pageStyles.input}
              type="text"
              placeholder="Nome:"
            />
            <input
              className={pageStyles.input}
              type="email"
              placeholder="Email Corporativo:"
            />
            <input
              className={pageStyles.input}
              type="text"
              placeholder="Celular:"
            />
            <input
              className={pageStyles.input}
              type="text"
              placeholder="Empresa:"
            />
            <input
              className={pageStyles.input}
              type="text"
              placeholder="Cargo:"
            />
            <input
              className={pageStyles.input}
              type="text"
              placeholder="Faixa de Faturamento Anual:"
            />
            <input
              className={`${pageStyles.input} ${pageStyles.submitButton}`}
              type="submit"
              value="Enviar"
            />
          </form>
        </aside>

        <div className={pageStyles.infoContainer}>
          <h3>
            A QMSA Consultoria Empresarial compreende profundamente as
            necessidades das organizações.
          </h3>
          <p>
            Desenvolvemos projetos personalizados que atendem às demandas de
            capital de giro e à otimização da geração de caixa dos nossos
            clientes nos setores de indústria, varejo e serviços.
          </p>
          <p>
            Atuamos e contribuímos na melhora de resultados e performance de
            profissionais, empresários e equipes, nas áreas de Gente e Gestão
            com palestras, treinamentos e desenvolvimento.
          </p>
        </div>
      </main>

      <main className={pageStyles.mainContent}>
        <section id="sobre" className={pageStyles.section}>
          <h2>Sobre Nós</h2>
          <p>
            Descubra a QMSA Consultoria. Somos uma empresa dedicada a fornecer
            soluções eficazes e personalizadas, comprometida em transformar
            desafios em oportunidades. Com uma equipe de especialistas, buscamos
            constantemente inovações que impulsionem o sucesso de nossos
            clientes.
          </p>
        </section>

        <section id="Consultoria" className={pageStyles.section}>
          <h2>Soluções de gestão</h2>
          <p>
            Soluções de Gestão Sob Medida. Após a realização de um diagnóstico
            detalhado, desenvolvemos estratégias de gestão adaptadas às
            necessidades específicas de cada cliente. Nossas abordagens visam o
            crescimento sustentável da organização, abrangendo todos os níveis
            empresariais — desde o estratégico até o operacional. Com um foco
            contínuo em resultados, garantimos que sua empresa esteja sempre um
            passo à frente.{" "}
          </p>
        </section>

        <section id="clientes" className={pageStyles.section}>
          <h2>Nossos Clientes</h2>
          <p>
            Confiamos em Parcerias Fortes. Trabalhamos com uma ampla gama de
            clientes em diferentes setores, sempre com o compromisso de entregar
            resultados excepcionais. Nossas parcerias são baseadas na confiança,
            transparência e no entendimento profundo das necessidades de cada
            cliente.
          </p>
        </section>
      </main>
      <footer className={pageStyles.footer}>
        <img
          src="/logo.png"
          alt="Logo da QMSA Consultoria"
          className={pageStyles.logo}
        />
      </footer>
    </div>
  );
}
