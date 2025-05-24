import { View, Text, StyleSheet } from "react-native";

export default function MotoboyHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Motoboy</Text>
      <Text>Veja as entregas disponíveis e seu histórico.</Text>
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
