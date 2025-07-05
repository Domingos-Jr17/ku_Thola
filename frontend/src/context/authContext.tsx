import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type UserType = "candidato" | "recrutador";

interface BaseUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  photoUrl?: string;
  lastLogin?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType | null;
  user: BaseUser | null;
  loading: boolean;
  login: (type: UserType, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<BaseUser>) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const storageKey = "auth_user";

  // 🔁 Recupera do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const { user, type } = JSON.parse(stored);
      setUser(user);
      setUserType(type);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // 💾 Salvar no localStorage
  useEffect(() => {
    if (user && userType) {
      localStorage.setItem(storageKey, JSON.stringify({ user, type: userType }));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [user, userType]);

  // 🔐 Login Simulado (pode integrar com API depois)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (type: UserType, email: string, password: string) => {
  setLoading(true);

  try {
    // ⚠️ Verificação simples simulada
    if (
      (type === "recrutador" && (email !== "recrutador@empresa.com" || password !== "123456")) ||
      (type === "candidato" && (email !== "candidato@empresa.com" || password !== "123456"))
    ) {
      throw new Error("Email ou senha incorretos.");
    }

    const fakeUser: BaseUser = {
      id: "1",
      name: type === "recrutador" ? "Recrutador Exemplo" : "Candidato Exemplo",
      email,
      role: type === "recrutador" ? "Coordenador de Recrutamento" : "Candidato",
      lastLogin: new Date().toISOString(),
      photoUrl: "",
    };

    // Simular tempo de requisição
    await new Promise((res) => setTimeout(res, 1000));

    setIsAuthenticated(true);
    setUserType(type);
    setUser(fakeUser);
  } catch (error) {
    console.error("Erro ao fazer login", error);
    throw error; // ← importante: relançar o erro para o componente tratar
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
    localStorage.removeItem(storageKey);
  };

  const updateUser = (data: Partial<BaseUser>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

