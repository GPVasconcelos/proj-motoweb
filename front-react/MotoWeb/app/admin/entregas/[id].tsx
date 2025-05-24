import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native";
import api from "../../../constants/api";

type Entrega = {
  id: string;
  cliente: string;
  endereco: string;
  status: string;
  motoboy?: Motoboy;
};

type Motoboy = {
  id: string;
  nome: string;
};

export default function DetalheEntregaAdmin() {
  const { id } = useLocalSearchParams();
  const [entrega, setEntrega] = useState<Entrega | null>(null);
  const [motoboys, setMotoboys] = useState<Motoboy[]>([]);
  const [motoboySelecionado, setMotoboySelecionado] = useState<string | null>(
    null
  );

  useEffect(() => {
    api
      .get(`/entregas/${id}`)
      .then((res) => setEntrega(res.data))
      .catch((err) => console.error("Erro ao buscar entrega", err));
    api
      .get("/motoboys")
      .then((res) => setMotoboys(res.data))
      .catch((err) => console.error("Erro ao buscar motoboys", err));
  }, [id]);

  const atribuirMotoboy = async () => {
    if (!motoboySelecionado) {
      Alert.alert("Selecione um motoboy");
      return;
    }

    try {
      await api.put(`/entregas/${id}`, { motoboyId: motoboySelecionado });
      Alert.alert("Motoboy atribuído com sucesso");

      const motoboy = motoboys.find((m) => m.id === motoboySelecionado);
      setEntrega((prev) => (prev ? { ...prev, motoboy } : prev));
    } catch (err) {
      console.error("Erro ao atribuir motoboy", err);
      Alert.alert("Erro ao atribuir motoboy");
    }
  };

  if (!entrega)
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando entrega...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrega de {entrega.cliente}</Text>
      <Text>Endereço: {entrega.endereco}</Text>
      <Text>Status: {entrega.status}</Text>

      <Text style={styles.subtitulo}>Atribuir Motoboy:</Text>
      <Picker
        selectedValue={motoboySelecionado}
        onValueChange={(itemValue) => setMotoboySelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um motoboy" value={null} />
        {motoboys.map((motoboy) => (
          <Picker.Item
            key={motoboy.id}
            label={motoboy.nome}
            value={motoboy.id}
          />
        ))}
      </Picker>

      <Button title="Atribuir" onPress={atribuirMotoboy} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
});
