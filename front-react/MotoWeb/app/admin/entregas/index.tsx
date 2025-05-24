import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../../../constants/api";
import { useRouter } from "expo-router";

type Entrega = {
  id: string;
  cliente: string;
  status: string;
};

export default function ListaEntregasAdmin() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/entregas")
      .then((res) => setEntregas(res.data))
      .catch((err) => console.error("Erro ao buscar entregas", err));
  }, []);

  const renderItem = ({ item }: { item: Entrega }) => (
    <TouchableOpacity onPress={() => router.push(`/admin/entregas/${item.id}`)}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.cliente}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={entregas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
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
  titulo: { fontSize: 18, fontWeight: "bold" },
});
