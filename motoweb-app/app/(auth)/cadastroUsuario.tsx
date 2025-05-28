import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../src/services/api";

export default function CadastroUsuario() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileType, setProfileType] = useState("");

  const handleNext = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword ||
      !profileType
    ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        phone,
        address,
        password,
        profileType,
      });

      console.log("Resposta da API:", response.data);

      const userId = response.data.id;

      if (!userId) {
        Alert.alert("Erro", "ID do usuário não retornado!");
        return;
      }

      Alert.alert("Sucesso", "Usuário cadastrado!");

      if (profileType === "MOTOBOY") {
        router.push({
          pathname: "/(auth)/cadastroMotoboy",
          params: { userId, name }, 
        });
      } else {
        Alert.alert(
          "Aviso",
          "Cadastro de outros perfis não implementado ainda."
        );
      }
    } catch (error: any) {
      console.log("Erro no cadastro:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Text style={styles.label}>Tipo de Perfil:</Text>
      <TextInput
        style={styles.input}
        placeholder="MOTOBOY"
        value={profileType}
        onChangeText={setProfileType}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
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
  label: { fontWeight: "bold", marginBottom: 4 },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
