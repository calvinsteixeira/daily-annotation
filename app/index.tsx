import { FlatList, View } from "react-native";
import { Text } from "@rneui/themed";
import React from "react";
import { MainContainer, PreviewAnnotation, SelectBox } from "@/components";
import { globalTextStyles } from "@/styles/text";
import { dbAnnotation } from "@/data/db";
import { dbMonths, dbYears } from "@/data/auxData"

export default function Index() {
  const [monthFilterValue, setMonthFilterValue] = React.useState(dbMonths[0]);
  const [yearsFilterValue, setYearsFilterValue] = React.useState(dbYears[0]);

  return (
    <MainContainer>
      <View style={{ flex: 1, paddingTop: 30 }}>
        <Text style={globalTextStyles.titlePage}>Meus processos</Text>
        <Text style={{ marginTop: 6 }}>
          Aqui você encontra todas as suas anotações, filtre pelo ano e mês se
          preferir.
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{ flex: 1, marginTop: 26, flexDirection: "column", gap: 6 }}
          >
            <Text>Filtre pelo ano</Text>
            <SelectBox
              data={dbYears}
              value={yearsFilterValue}
              placeholder="Selecionar ano"
              onChange={(item) => {
                setYearsFilterValue(item);
              }}
            />
          </View>
          <View
            style={{ flex: 1, marginTop: 26, flexDirection: "column", gap: 6 }}
          >
            <Text>Filtre pelo mês</Text>
            <SelectBox
              data={dbMonths}
              value={monthFilterValue}
              placeholder="Selecionar mês"
              onChange={(item) => {
                setMonthFilterValue(item);
              }}
            />
          </View>
        </View>
        <Text style={{ marginTop: 30, marginBottom: 12 }}>
          Confira suas anotações do mês de{" "}
          <Text style={{ fontWeight: 700 }}>{monthFilterValue.label}</Text>:
        </Text>
        <FlatList
          data={dbAnnotation}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          renderItem={({ item }) => (
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
