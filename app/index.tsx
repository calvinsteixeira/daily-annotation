import { Text, View, FlatList } from "react-native";
import { MainContainer, PreviewAnnotation } from "@/components";
import { globalTextStyles } from "@/styles/text";
import { dbAnnotation } from "@/data/db";

export default function Index() {
  return (
    <MainContainer>
      <View style={{ flex: 1, paddingTop: 30 }}>
        <Text style={globalTextStyles.titlePage}>Meus Processos</Text>
        <FlatList
          data={dbAnnotation}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <PreviewAnnotation
              id={item.id}
              createdAt={item.createdAt}
              description={item.description}
              humorLevel={item.humorLevel}
              resume={item.resume}
            />
          )}
        />
      </View>
    </MainContainer>
  );
}
