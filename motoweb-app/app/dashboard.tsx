import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Motoboy</Text>
      <Button title="Minhas Entregas" onPress={() => router.push("/entregas")} />
      <Button title="Meus Veículos" onPress={() => router.push("/veiculos")} />
      <Button title="Sair" color="#FF3B30" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
