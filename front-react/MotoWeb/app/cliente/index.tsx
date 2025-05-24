import { View, Text, StyleSheet } from "react-native";

export default function ClienteHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Cliente</Text>
      <Text>Solicite entregas e acompanhe o status.</Text>
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
