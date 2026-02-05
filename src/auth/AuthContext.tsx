import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const login = (newToken: string) => {
    console.log("🔑 Saving token:", newToken);
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.log("🚪 Logging out");
    localStorage.removeItem("authToken");
    setToken(null);
  };

  useEffect(() => {
    console.log("🔐 Current token:", token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
