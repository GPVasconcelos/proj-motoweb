import { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import api from "../../constants/api";

type Usuario = {
  id: string;
  nome: string;
};

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/usuarios").then((res) => setUsuarios(res.data));
  }, []);

  return (
    <View>
      <Text>Lista de Usuários</Text>
      {usuarios.map((user) => (
        <Pressable
          key={user.id}
          onPress={() => router.push(`/usuarios/${user.id}`)}
        >
          <Text>{user.nome}</Text>
        </Pressable>
      ))}
    </View>
  );
}
