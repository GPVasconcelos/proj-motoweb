import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>Olá, {user?.name}</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/entregas")}
      >
        <Text style={styles.cardTitle}>Minhas Entregas</Text>
        <Text style={styles.cardDesc}>Veja e atualize suas entregas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/veiculos")}
      >
        <Text style={styles.cardTitle}>Meus Veículos</Text>
        <Text style={styles.cardDesc}>Gerencie seus veículos cadastrados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  cardDesc: { color: "#666" },

  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
