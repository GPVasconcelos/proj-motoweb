import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  console.log("Usuário logado:", user);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Olá, {user?.name}</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/entregas")}
      >
        <Image
          source={require("../assets/images/caixa.png")}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Minhas Entregas</Text>
          <Text style={styles.cardDesc}>Veja e atualize suas entregas</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/veiculos")}
      >
        <Image
          source={require("../assets/images/veiculos.png")}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Meus Veículos</Text>
          <Text style={styles.cardDesc}>
            Gerencie seus veículos cadastrados
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
