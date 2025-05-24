import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter, Stack } from "expo-router";

export default function AdminLayout() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return <Stack screenOptions={{ headerShown: true }} />;
}
