import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  try {
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return null;
  }
});

const [pendingUser, setPendingUser] = useState(null);


  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setPendingUser(null);
    setUser(userData);
  };

  const register = (userData) => {
    setPendingUser(userData);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, pendingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
