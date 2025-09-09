/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { decodeJwt } from "../utils/jwt";
import { useAlert } from "./AlertContext";

const AuthContext = createContext(null);
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  // Cek expired JWT
  const isTokenExpired = (token) => {
    const decoded = decodeJwt(token);
    if (!decoded?.exp) return true;
    const now = Date.now() / 1000; // detik
    return decoded.exp < now;
  };

  // Restore session saat reload
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser && !isTokenExpired(token)) {
      setUser(JSON.parse(storedUser));
    } else {
      sessionStorage.clear();
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (userData, token) => {
    try {
      if (isTokenExpired(token)) {
        return { success: false, message: "Token sudah expired" };
      }
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.clear();
    showAlert("success", "Logout Successfully!");
    setUser(null);
  };

  // ⏰ Auto logout saat token expired
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const decoded = decodeJwt(token);
    if (!decoded?.exp) return;

    const timeout = decoded.exp * 1000 - Date.now(); // ms sampai expired

    if (timeout > 0) {
      const timer = setTimeout(() => {
        logout();
        window.dispatchEvent(new Event("unauthorized")); // biar App.jsx redirect ke /login
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      logout();
    }
  }, [user]);

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
