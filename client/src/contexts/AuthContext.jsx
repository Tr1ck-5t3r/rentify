import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    userType: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = localStorage.getItem("userType");
    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user: user,
        userType: userType,
      });
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await authLogin(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userType", response.user.type);
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        userType: response.user.type,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authRegister(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userType", response.user.type);
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        userType: response.user.type,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    authLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setAuthState({
      isAuthenticated: false,
      user: null,
      userType: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
