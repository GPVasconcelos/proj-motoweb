import { View, Text, StyleSheet } from "react-native";

export default function AdminHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador</Text>
      <Text>Gerencie entregas, usuários e motoboys.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
