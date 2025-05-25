import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getMotoboyDeliverySummary } from "../../services/deliveryService";

export default function Dashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const fetchSummary = async () => {
    try {
      const motoboyId = await AsyncStorage.getItem("motoboyId");
      if (!motoboyId) return;

      const deliveries = await getMotoboyDeliverySummary();

      const pending = deliveries.filter(
        (d: any) => d.status === "PENDING"
      ).length;
      const inProgress = deliveries.filter(
        (d: any) => d.status === "IN_PROGRESS"
      ).length;
      const completed = deliveries.filter(
        (d: any) => d.status === "COMPLETED"
      ).length;

      setSummary({ pending, inProgress, completed });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Motoboy</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pendentes</Text>
          <Text style={styles.cardNumber}>{summary.pending}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Em Andamento</Text>
          <Text style={styles.cardNumber}>{summary.inProgress}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Finalizadas</Text>
          <Text style={styles.cardNumber}>{summary.completed}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/entregas")}
      >
        <Text style={styles.buttonText}>Minhas Entregas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/veiculos")}
      >
        <Text style={styles.buttonText}>Gerenciar Veículos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ff4d4d",
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
