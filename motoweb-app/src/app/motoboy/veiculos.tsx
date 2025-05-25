import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../services/vehicleService";

type Vehicle = {
  id: number;
  model: string;
  color: string;
  type: string;
  year: number;
  plate: string;
  renavam: string;
};

export default function Veiculos() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [plate, setPlate] = useState("");
  const [renavam, setRenavam] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const motoboyId = await AsyncStorage.getItem("motoboyId");
      if (!motoboyId) throw new Error("ID do motoboy não encontrado.");

      const data = await getVehicles(motoboyId);
      setVehicles(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setModel("");
    setColor("");
    setType("");
    setYear("");
    setPlate("");
    setRenavam("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!model || !color || !type || !year || !plate || !renavam) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const motoboyId = await AsyncStorage.getItem("motoboyId");
    if (!motoboyId) return;

    const data = {
      model,
      color,
      type,
      year: Number(year),
      plate,
      renavam,
    };

    try {
      if (editingId) {
        await updateVehicle(motoboyId, editingId, data);
        Alert.alert("Sucesso", "Veículo atualizado.");
      } else {
        await createVehicle(motoboyId, data);
        Alert.alert("Sucesso", "Veículo cadastrado.");
      }

      clearForm();
      fetchVehicles();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o veículo.");
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setModel(vehicle.model);
    setColor(vehicle.color);
    setType(vehicle.type);
    setYear(String(vehicle.year));
    setPlate(vehicle.plate);
    setRenavam(vehicle.renavam);
  };

  const handleDeleteVehicle = async (vehicleId: number) => {
    try {
      const motoboyId = await AsyncStorage.getItem("motoboyId");
      if (!motoboyId) return;

      await deleteVehicle(motoboyId, vehicleId);
      Alert.alert("Sucesso", "Veículo removido.");
      fetchVehicles();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o veículo.");
    }
  };

  useEffect(() => {
    fetchVehicles();
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
      <Text style={styles.title}>Gerenciar Veículos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (Moto, Carro)"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="Placa"
          value={plate}
          onChangeText={setPlate}
        />
        <TextInput
          style={styles.input}
          placeholder="Renavam"
          value={renavam}
          onChangeText={setRenavam}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {editingId ? "Salvar Alterações" : "Cadastrar Veículo"}
          </Text>
        </TouchableOpacity>

        {editingId && (
          <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
            <Text style={styles.cancelButtonText}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>
              <Text style={styles.bold}>Modelo:</Text> {item.model}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Cor:</Text> {item.color}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Tipo:</Text> {item.type}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Ano:</Text> {item.year}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Placa:</Text> {item.plate}
            </Text>
            <Text style={styles.label}>
              <Text style={styles.bold}>Renavam:</Text> {item.renavam}
            </Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditVehicle(item)}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteVehicle(item.id)}
              >
                <Text style={styles.deleteButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum veículo cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  cancelButtonText: { color: "#333", fontWeight: "bold" },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: { marginBottom: 5 },
  bold: { fontWeight: "bold" },
  cardButtons: { flexDirection: "row", gap: 10, marginTop: 10 },
  editButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  editButtonText: { color: "#fff", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
