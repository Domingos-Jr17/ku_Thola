import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// 👤 Tipos
interface Recruiter {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  photoUrl?: string;
}

export interface AuthContextType {
  user: Recruiter | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<Recruiter>) => void;
}

// 🔐 Criação do Contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// 🧠 Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Recruiter | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Carregar do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("recruiter_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // 💾 Salvar no localStorage quando user mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("recruiter_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("recruiter_user");
    }
  }, [user]);

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("recruiter_user");
  };

  // 🔐 Login Simulado (pode substituir com chamada real à API)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulação de login
      const fakeUser: Recruiter = {
        id: "1",
        name: "Recrutador Exemplo",
        email,
        role: "Coordenador de Recrutamento",
        lastLogin: new Date().toISOString(),
        photoUrl: "",
      };

      // Espera artificial (simulando request)
      await new Promise((res) => setTimeout(res, 1000));

      setUser(fakeUser);
    } catch (err) {
      console.error("Erro ao fazer login", err);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Atualizar dados do usuário (ex: nome, senha)
  const updateUser = (data: Partial<Recruiter>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
