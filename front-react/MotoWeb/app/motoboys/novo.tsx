// app/motoboys/novo.tsx
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../../constants/api";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  telefone: z.string().min(1, "Telefone obrigatório"),
});

export default function NovoMotoboy() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post("/motoboys", data);
      Alert.alert("Motoboy cadastrado!");
      reset();
    } catch (err) {
      Alert.alert("Erro ao salvar motoboy.");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Motoboy</Text>

      <Text>Nome:</Text>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text>Telefone:</Text>
      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 },
});
