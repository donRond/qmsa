import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    sub: string;
  email: string;
  name: string;
  exp: number; // Timestamp de expiração
  // Outros campos que você incluiu no payload do token
}

function getUserFromToken(): DecodedToken | null{
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        // Verifica se o token expirou
        if (decoded.exp * 1000 > Date.now()) {
          return decoded;
        } else {
          console.error("Token expirado");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }
  return null;
};

export default getUserFromToken;