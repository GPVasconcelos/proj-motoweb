import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
          <Text style={styles.title}>Gerenciar Veículos</Text>

          <View style={styles.form}>
            <TextInput placeholder="Modelo" style={styles.input} value={model} onChangeText={setModel} />
            <TextInput placeholder="Cor" style={styles.input} value={color} onChangeText={setColor} />
            <TextInput placeholder="Tipo (Ex.: Motocicleta)" style={styles.input} value={type} onChangeText={setType} />
            <TextInput placeholder="Renavam" style={styles.input} value={renavam} onChangeText={setRenavam} />
            <TextInput placeholder="Ano" style={styles.input} keyboardType="numeric" value={year} onChangeText={setYear} />
            <TextInput placeholder="Placa" style={styles.input} value={plate} onChangeText={setPlate} />

            <TouchableOpacity style={styles.addButton} onPress={handleRegister}>
              <Text style={styles.addButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum veículo cadastrado.</Text>}
          />
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },

  form: { marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 10, marginBottom: 10, backgroundColor: "#fff"
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  cardDetail: { color: "#666" },

  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  deleteText: { color: "#fff", fontWeight: "bold" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
