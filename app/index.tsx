import { Text, View } from "react-native";
import { MainContainer } from "@/components";

export default function Index() {
  return (
    <MainContainer>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Conteúdo inicial</Text>
      </View>
    </MainContainer>
  );
}
