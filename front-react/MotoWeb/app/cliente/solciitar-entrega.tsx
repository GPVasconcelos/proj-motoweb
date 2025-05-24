import { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import api from "../../constants/api";

export default function SolicitarEntrega() {
  const { user } = useContext(AuthContext);

  const solicitar = async () => {
    try {
      await api.post("/entregas", {
        clienteId: user?.id,
        origem: "Rua A",
        destino: "Rua B",
        descricao: "Documentos",
      });
      Alert.alert("Sucesso", "Entrega solicitada!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível solicitar a entrega.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Nova Entrega</Text>
      <Button title="Solicitar" onPress={solicitar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
});
