import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../../src/services/api";

export default function CadastroMotoboy() {
  const router = useRouter();
  const { userId, name } = useLocalSearchParams<{
    userId: string;
    name: string;
  }>();

  const [cpf, setCpf] = useState("");
  const [cnh, setCnh] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleRegisterMotoboy = async () => {
    if (!cpf || !cnh || !gender || !emergencyContact) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/motoboy", {
        userId: Number(userId),
        cpf,
        cnh,
        gender,
        emergencyContact,
        status: "DISPONIVEL",
        name, // Adicionado aqui
      });

      Alert.alert("Sucesso", "Cadastro concluído!");
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error(
        "Erro no cadastro de motoboy:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível concluir o cadastro.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Cadastro de Motoboy</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="CNH"
        value={cnh}
        onChangeText={setCnh}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato de Emergência"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterMotoboy}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
