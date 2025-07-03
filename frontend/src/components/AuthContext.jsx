import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("🔍 Loaded from localStorage:", { token, role });

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (role) {
      setUserRole(role);
    } else {
      setUserRole(null);
    }

    setAuthLoaded(true);
  }, []);

  // 🔥 Logout Function: Clears Authentication Data
  const logout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, authLoaded, logout }}>
      {children}
    </AuthContext.Provider>
  );
};