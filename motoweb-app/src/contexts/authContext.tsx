import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserRole = "motoboy" | "admin" | "cliente";

interface AuthContextData {
  userId: string | null;
  role: UserRole | null;
  login: (id: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const loadStorage = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      const storedRole = (await AsyncStorage.getItem("role")) as UserRole;
      if (storedId && storedRole) {
        setUserId(storedId);
        setRole(storedRole);
      }
    };
    loadStorage();
  }, []);

  const login = async (id: string, role: UserRole) => {
    await AsyncStorage.setItem("userId", id);
    await AsyncStorage.setItem("role", role);
    setUserId(id);
    setRole(role);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        login,
        logout,
        isAuthenticated: !!userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
