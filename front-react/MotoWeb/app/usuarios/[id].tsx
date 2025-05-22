import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "../../constants/api";

type Usuario = {
  id: string;
  nome: string;
  email: string;
};

export default function UsuarioDetail() {
  const { id } = useLocalSearchParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    api.get(`/usuarios/${id}`).then((res) => setUsuario(res.data));
  }, [id]);

  if (!usuario) return <Text>Carregando...</Text>;

  return (
    <View>
      <Text>Nome: {usuario.nome}</Text>
      <Text>Email: {usuario.email}</Text>
    </View>
  );
}
