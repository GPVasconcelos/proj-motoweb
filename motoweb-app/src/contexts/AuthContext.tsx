import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;
  email: string;
  profileType: string;
}

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    };
    loadStoredData();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken } = response.data;

    await AsyncStorage.setItem("token", accessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setToken(accessToken);

    const decoded: JwtPayload = jwtDecode(accessToken);
    const userId = decoded.sub;

    let fullUser: any = {
      id: userId,
      email: decoded.email,
      profileType: decoded.profileType,
    };

    if (decoded.profileType === "MOTOBOY") {
      const motoboyResponse = await api.get(`/motoboy/user/${userId}`);
      const motoboyData = motoboyResponse.data;

      fullUser = {
        ...fullUser,
        motoboyId: motoboyData.id,
        name: motoboyData.name, // Adiciona o nome do motoboy
      };
    }

    await AsyncStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
