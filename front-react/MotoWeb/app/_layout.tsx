import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthChecked(true);
    }, 1000);
  }, []);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
