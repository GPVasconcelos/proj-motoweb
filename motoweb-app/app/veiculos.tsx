import { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import api from "../src/services/api";
import { useAuth } from "../src/contexts/AuthContext";

interface Vehicle {
  id: number;
  model: string;
  color: string;
  type: string;
  renavam: string;
  year: number;
  plate: string;
}

export default function Veiculos() {
  const { user } = useAuth();
  const motoboyId = user?.motoboyId;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(true);

  const loadVehicles = async () => {
    if (!motoboyId) {
      console.log("Motoboy ID não encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/motoboy/${motoboyId}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!model || !plate) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    try {
      await api.post(`/motoboy/${motoboyId}/vehicles`, {
        model,
        color: "Preto",
        type: "Motocicleta",
        renavam: "1234567890",
        year: 2023,
        plate,
      });
      Alert.alert("Sucesso", "Veículo cadastrado!");
      setModel("");
      setPlate("");
      loadVehicles();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/motoboy/${motoboyId}/vehicles/${id}`);
      Alert.alert("Sucesso", "Veículo removido!");
      loadVehicles();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover.");
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [motoboyId]);

  const renderItem = ({ item }: { item: Vehicle }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.model}</Text>
      <Text>Placa: {item.plate}</Text>
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
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
      <Text style={styles.header}>Cadastrar Veículo</Text>
      <TextInput
        placeholder="Modelo"
        style={styles.input}
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        placeholder="Placa"
        style={styles.input}
        value={plate}
        onChangeText={setPlate}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum veículo cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 10, marginBottom: 10, backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#007AFF", padding: 15,
    borderRadius: 8, alignItems: "center", marginBottom: 15
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff", padding: 15,
    borderRadius: 10, marginBottom: 10, elevation: 3
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  buttonDelete: {
    backgroundColor: "red", padding: 8,
    borderRadius: 8, marginTop: 10, alignItems: "center"
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 20, color: "#999" },
});
