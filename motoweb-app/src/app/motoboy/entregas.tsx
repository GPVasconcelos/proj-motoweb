import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getMotoboyDeliveries,
  updateDeliveryStatus,
} from "../../services/deliveryService";

type Delivery = {
  id: number;
  pickup: string;
  destination: string;
  recipient: string;
  status: string;
};

export default function Entregas() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const motoboyId = await AsyncStorage.getItem("motoboyId");
      if (!motoboyId) return;

      const data = await getMotoboyDeliveries();
      setDeliveries(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as entregas.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (delivery: Delivery) => {
    const motoboyId = await AsyncStorage.getItem("motoboyId");
    if (!motoboyId) return;

    let newStatus = "";
    if (delivery.status === "PENDING") {
      newStatus = "IN_PROGRESS";
    } else if (delivery.status === "IN_PROGRESS") {
      newStatus = "COMPLETED";
    } else {
      Alert.alert("Aviso", "Entrega já finalizada.");
      return;
    }

    try {
      await updateDeliveryStatus(delivery.id, newStatus);
      Alert.alert("Sucesso", `Status atualizado para ${newStatus}`);
      fetchDeliveries();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Entregas</Text>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>
              <Text style={styles.bold}>Coleta:</Text> {item.pickup}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Destino:</Text> {item.destination}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Destinatário:</Text> {item.recipient}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Status:</Text> {item.status}
            </Text>

            {item.status !== "COMPLETED" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdateStatus(item)}
              >
                <Text style={styles.buttonText}>
                  {item.status === "PENDING"
                    ? "Iniciar Entrega"
                    : "Finalizar Entrega"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma entrega encontrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
