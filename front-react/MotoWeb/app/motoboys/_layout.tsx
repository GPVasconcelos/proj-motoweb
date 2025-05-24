import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter, Tabs } from "expo-router";

export default function MotoboyLayout() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role !== "motoboy") {
      router.replace("/");
    }
  }, [user]);

  if (!user || user.role !== "motoboy") return null;

  return (
    <Tabs>
      <Tabs.Screen
        name="minhas-entregas"
        options={{ title: "Minhas Entregas" }}
      />
    </Tabs>
  );
}
