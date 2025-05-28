import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../src/services/api";
import { useAuth } from "../src/contexts/AuthContext";

interface Delivery {
  id: number;
  pickup: string;
  destination: string;
  recipient: string;
  status: string;
}

export default function Entregas() {
  const { user } = useAuth();
  const motoboyId = user?.motoboyId;

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeliveries = async () => {
    if (!motoboyId) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/motoboy/${motoboyId}/delivery`);
      setDeliveries(response.data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as entregas.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (deliveryId: number, status: string) => {
    try {
      await api.patch(`/motoboy/${motoboyId}/delivery/${deliveryId}/status`, {
        status,
      });
      Alert.alert("Sucesso", `Status atualizado para ${status}`);
      loadDeliveries();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, [motoboyId]);

  const statusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "#FFA500" };
      case "IN_PROGRESS":
        return { color: "#007AFF" };
      case "COMPLETED":
        return { color: "green" };
      case "CANCELED":
        return { color: "red" };
      default:
        return { color: "#000" };
    }
  };

  const renderItem = ({ item }: { item: Delivery }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Entrega #{item.id}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Retirada:</Text>
        <Text style={styles.value}>{item.pickup}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.value}>{item.destination}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Destinatário:</Text>
        <Text style={styles.value}>{item.recipient}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.status, statusColor(item.status)]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.buttons}>
        {item.status === "PENDING" && (
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => updateStatus(item.id, "IN_PROGRESS")}
          >
            <Text style={styles.buttonText}>Aceitar Entrega</Text>
          </TouchableOpacity>
        )}

        {item.status === "IN_PROGRESS" && (
          <TouchableOpacity
            style={styles.buttonSuccess}
            onPress={() => updateStatus(item.id, "COMPLETED")}
          >
            <Text style={styles.buttonText}>Finalizar Entrega</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Minhas Entregas</Text>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma entrega encontrada.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
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
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF",
  },

  infoContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    fontWeight: "600",
    width: 100,
    color: "#333",
  },
  value: {
    flex: 1,
    color: "#555",
  },

  status: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  buttons: {
    marginTop: 14,
    flexDirection: "column",
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSuccess: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    color: "#8E8E93",
    marginTop: 24,
    fontSize: 16,
  },
});
