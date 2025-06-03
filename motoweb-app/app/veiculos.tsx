import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import api from "../src/services/api";
import { useAuth } from "../src/contexts/AuthContext";
import { router, useRouter } from "expo-router";

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
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [renavam, setRenavam] = useState("");
  const [year, setYear] = useState("");
  const [plate, setPlate] = useState("");

  const [loading, setLoading] = useState(true);

  const loadVehicles = async () => {
    if (!motoboyId) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/motoboy/${motoboyId}/vehicles`);
      setVehicles(response.data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!model || !color || !type || !renavam || !year || !plate) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    try {
      await api.post(`/motoboy/${motoboyId}/vehicles`, {
        model,
        color,
        type,
        renavam,
        year: Number(year),
        plate,
      });
      Alert.alert("Sucesso", "Veículo cadastrado!");
      setModel("");
      setColor("");
      setType("");
      setRenavam("");
      setYear("");
      setPlate("");
      loadVehicles();
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/motoboy/${motoboyId}/vehicles/${id}`);
      Alert.alert("Sucesso", "Veículo removido!");
      loadVehicles();
    } catch {
      Alert.alert("Erro", "Não foi possível remover.");
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [motoboyId]);

  const renderItem = ({ item }: { item: Vehicle }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.model}</Text>
      <Text style={styles.cardDetail}>Placa: {item.plate}</Text>
      <Text style={styles.cardDetail}>Cor: {item.color}</Text>
      <Text style={styles.cardDetail}>Tipo: {item.type}</Text>
      <Text style={styles.cardDetail}>Renavam: {item.renavam}</Text>
      <Text style={styles.cardDetail}>Ano: {item.year}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => router.push("/dashboard")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>Gerenciar Veículos</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Modelo"
            style={styles.input}
            value={model}
            onChangeText={setModel}
          />
          <TextInput
            placeholder="Cor"
            style={styles.input}
            value={color}
            onChangeText={setColor}
          />
          <TextInput
            placeholder="Tipo (Ex.: Motocicleta)"
            style={styles.input}
            value={type}
            onChangeText={setType}
          />
          <TextInput
            placeholder="Renavam"
            style={styles.input}
            value={renavam}
            onChangeText={setRenavam}
          />
          <TextInput
            placeholder="Ano"
            style={styles.input}
            keyboardType="numeric"
            value={year}
            onChangeText={setYear}
          />
          <TextInput
            placeholder="Placa"
            style={styles.input}
            value={plate}
            onChangeText={setPlate}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleRegister}>
            <Text style={styles.addButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum veículo cadastrado.</Text>
          }
        />
      </KeyboardAvoidingView>
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
    marginBottom: 20,
  },

  form: {
    marginBottom: 24,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 6,
  },
  cardDetail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },

  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
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
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
