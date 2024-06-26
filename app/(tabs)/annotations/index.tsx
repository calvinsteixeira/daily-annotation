import { FlatList, View, Alert } from "react-native";
import { Text, Skeleton, Button, Input, useTheme } from "@rneui/themed";
import React from "react";
import {
  MainContainer,
  PreviewAnnotation,
  SelectBox,
  CustomModal,
} from "@/components";
import { globalTextStyles } from "@/styles/text";
import { Plus, Pen } from "@/icons";
import { dbMonths, dbYears } from "@/data/auxData";
import { useAnnotationData } from "@/store";
import { dbHumorLevel } from "@/data/db";
import { IAnnotation } from "@/data/types";
import { ISelectBoxOption } from "@/components/inputs/SelectBox";

export default function Index() {
  const annotations = useAnnotationData((state) => state);
  const { theme } = useTheme();
  const [monthFilterValue, setMonthFilterValue] = React.useState(dbMonths[0]);
  const [yearsFilterValue, setYearsFilterValue] = React.useState(dbYears[0]);
  const [humorLevelValue, setHumorLevelValue] =
    React.useState<ISelectBoxOption | null>(null);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<
    "Novo processo" | "Editar processo" | ""
  >("");

  React.useEffect(() => {
    setTimeout(() => {
      setLoadingData(false);
    }, 3500);
  }, []);

  function simulateRequest(
    callBack: () => void,
    timerOpts?: { timeUntilRender: number }
  ) {
    setLoadingData(true);
    setTimeout(() => {
      setLoadingData(false);
      callBack();
    }, timerOpts?.timeUntilRender || 3500);
  }

  function handleDeleteAnnotation(annotationId: IAnnotation["id"]) {
    Alert.alert(
      "Deletar anotação",
      "Tem certeza que deseja deletar essa anotação?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () =>
            simulateRequest(() => annotations.deleteAnnotation(annotationId), {
              timeUntilRender: 1000,
            }),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <MainContainer>
      <CustomModal
        title={modalTitle}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <View>
          <Input placeholder="Título" />
          <Input placeholder="Descrição" />
          <SelectBox
            data={dbHumorLevel.map((humorLevel) => {
              return {
                label: humorLevel.symbol + "  " + humorLevel.description,
                value: humorLevel.id,
              };
            })}
            value={humorLevelValue}
            placeholder="Nível de humor"
            onChange={(item) => {
              setHumorLevelValue(item);
            }}
          />
        </View>
      </CustomModal>
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
        <Button
          onPress={() => {
            setModalTitle("Novo processo");
            setVisibleModal(true);
          }}
          type="solid"
          titleStyle={{ color: "#3d93e3" }}
          buttonStyle={{
            marginTop: 14,
            backgroundColor: "transparent",
            borderColor: "#3d93e3",
            borderWidth: 1,
          }}
        >
          <Plus size={20} color={"#3d93e3"} /> Novo processo
        </Button>
        <Text style={{ marginTop: 20, marginBottom: 12 }}>
          Confira suas anotações do mês de{" "}
          <Text style={{ fontWeight: 700 }}>{monthFilterValue.label}</Text>:
        </Text>
        {loadingData ? (
          <View style={{ flexDirection: "column", gap: 10 }}>
            {Array.from({ length: 15 }).map((_, index) => {
              return (
                <Skeleton key={index} style={{ opacity: 0.5 }} height={30} />
              );
            })}
          </View>
        ) : (
          <FlatList
            data={annotations.data}
            style={{ marginBottom: 14 }}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
            renderItem={({ item }) => (
              <PreviewAnnotation
                id={item.id}
                createdAt={item.createdAt}
                description={item.description}
                humorLevel={item.humorLevel}
                resume={item.resume}
                onDelete={handleDeleteAnnotation}
              />
            )}
          />
        )}
      </View>
    </MainContainer>
  );
}
