import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const AuthenticatedComponent = (props: P & JSX.IntrinsicAttributes) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Certifique-se de que o código está sendo executado apenas no lado do cliente
      if (typeof window === "undefined") return; // Verifica se está no cliente

      setIsClient(true); // Define que o código está sendo executado no cliente

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redireciona se não houver token
      }
    }, [router]);

    // Impede a renderização durante a execução no servidor
    if (!isClient) return null;

    // Renderiza o componente apenas se o token estiver presente
    return localStorage.getItem("token") ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return AuthenticatedComponent;
}

export default withAuth;
