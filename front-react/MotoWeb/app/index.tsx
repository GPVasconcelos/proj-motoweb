import { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/(auth)/login");
    } else if (user.role === "admin") {
      router.replace("/admin/entregas");
    } else if (user.role === "cliente") {
      router.replace("/cliente/minhas-entregas");
    } else if (user.role === "motoboy") {
      router.replace("/motoboys/minhas-entregas");
    }
  }, [user]);

  if (user === null) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
        <ActivityIndicator size="large" style={{ marginTop: 10 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Redirecionando...</Text>
      <ActivityIndicator size="large" style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
