import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import "expo-router/entry";

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <Text>Bem-vindo ao MotoWeb</Text>
      <Pressable onPress={() => router.push("/usuarios")}>
        <Text>Ver usuários</Text>
      </Pressable>
    </View>
  );
}
