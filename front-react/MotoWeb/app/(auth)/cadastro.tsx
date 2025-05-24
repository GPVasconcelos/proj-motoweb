import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import api from "../../constants/api";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const RoleEnum = z.enum(["admin", "cliente", "motoboy"]);

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(4, "Senha deve ter pelo menos 4 caracteres"),
  role: RoleEnum,
});

type FormData = z.infer<typeof schema>;

export default function Cadastro() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<FormData["role"]>("cliente");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "cliente" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/usuarios", data);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/(auth)/login"); 
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text>Nome</Text>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text>Senha</Text>
      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

      <Text>Tipo de Perfil</Text>
      <Picker
        selectedValue={selectedRole}
        style={styles.picker}
        onValueChange={(itemValue) => {
          const role = itemValue as FormData["role"];
          setSelectedRole(role);
          setValue("role", role);
        }}
      >
        <Picker.Item label="Cliente" value="cliente" />
        <Picker.Item label="Motoboy" value="motoboy" />
        <Picker.Item label="Administrador" value="admin" />
      </Picker>

      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
