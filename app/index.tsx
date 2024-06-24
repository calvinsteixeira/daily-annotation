import { Text, View } from "react-native";
import { MainContainer } from "@/components";
import { globalTextStyles } from "@/styles/text";

export default function Index() {
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <Text style={globalTextStyles.titlePage}>Meus Processos</Text>
      </View>
    </MainContainer>
  );
}
