import React, { createContext, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useToast } from "../hooks";
import { useNavigate } from "react-router-dom";
import { User, UserContextType, ResponseLoginUser } from "../types";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { handleToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (mail: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post<{ message: string }>(
        "http://localhost:3001/usuario/login",
        { mail, password }
      );

      if (response.status === 200) {
        setUser({ mail, password });
        setIsLogin(true);
        navigate("/confirm-token");
        handleToast(response.data.message, "success");
      } else {
        handleToast(response.data.message, "error");
      }
    } catch (error) {
      handleToast("Falha ao realizar o login.", "error");
    } finally {
      setLoading(false);
    }
  }, [handleToast, navigate]);

  const confirmUser = useCallback(async (mail: string, confirmToken: string) => {
    try {
      setLoading(true);
      const response = await axios.post<ResponseLoginUser>(
        "http://localhost:3001/usuario/confirm-token",
        { mail, confirmToken }
      );

      if (response.status === 200) {
        setIsAuth(true);
        navigate("/signup");
        handleToast(response.data.message, "success");
      } else {
        handleToast(response.data.message, "error");
      }
    } catch (error) {
      handleToast("Falha ao realizar a confirmação do email.", "error");
    } finally {
      setLoading(false);
    }
  }, [handleToast, navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLogin(false);
    setIsAuth(false);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login,
    confirmUser,
    logout,
    isLogin,
    loading,
    isAuth,
  }), [user, login, confirmUser, logout, isLogin, loading, isAuth]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
