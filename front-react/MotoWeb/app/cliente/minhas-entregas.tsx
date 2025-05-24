import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../../constants/api";

type Entrega = {
  id: string;
  descricao: string;
  status: string;
  motoboy?: {
    nome: string;
  } | null;
};

export default function MinhasEntregas() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);

  useEffect(() => {
    api
      .get("/entregas/minhas")
      .then((res) => setEntregas(res.data))
      .catch((err) => console.error("Erro ao buscar entregas", err));
  }, []);

  const renderItem = ({ item }: { item: Entrega }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.descricao}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Motoboy: {item.motoboy?.nome ?? "Aguardando atribuição"}</Text>
    </View>
  );

  return (
    <FlatList
      data={entregas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhuma entrega encontrada.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  empty: { padding: 20, textAlign: "center", color: "#666" },
});
