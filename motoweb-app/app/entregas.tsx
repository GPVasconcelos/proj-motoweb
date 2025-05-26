import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
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
      console.log("Motoboy ID não encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/motoboy/${motoboyId}/delivery`);
      setDeliveries(response.data);
    } catch (error: any) {
      console.log("Erro ao carregar entregas:", error.response?.data || error.message);
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
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, [motoboyId]);

  const renderItem = ({ item }: { item: Delivery }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Entrega #{item.id}</Text>
      <Text>De: {item.pickup}</Text>
      <Text>Para: {item.destination}</Text>
      <Text>Destinatário: {item.recipient}</Text>
      <Text>Status: {item.status}</Text>

      <View style={styles.buttons}>
        {item.status === "PENDING" && (
          <TouchableOpacity
            style={styles.buttonAccept}
            onPress={() => updateStatus(item.id, "IN_PROGRESS")}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        )}

        {item.status === "IN_PROGRESS" && (
          <TouchableOpacity
            style={styles.buttonComplete}
            onPress={() => updateStatus(item.id, "COMPLETED")}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma entrega encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  buttons: { flexDirection: "row", marginTop: 10, gap: 10 },
  buttonAccept: { backgroundColor: "#007AFF", padding: 10, borderRadius: 8, flex: 1, alignItems: "center" },
  buttonComplete: { backgroundColor: "green", padding: 10, borderRadius: 8, flex: 1, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 20, color: "#999" },
});
