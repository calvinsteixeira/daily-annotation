import { FlatList, View, Alert, ScrollView } from "react-native";
import { Text, Skeleton, Button, Input, useTheme } from "@rneui/themed";
import React, { ReactElement } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import { TextInputMask } from "react-native-masked-text";
import Toast from "react-native-toast-message";

export default function Index() {
  const annotations = useAnnotationData((state) => state);
  const [monthFilterValue, setMonthFilterValue] = React.useState(dbMonths[0]);
  const [yearsFilterValue, setYearsFilterValue] = React.useState(dbYears[0]);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [editableAnnotation, setEditableAnnotation] =
    React.useState<IAnnotation | null>(null);
  const [modalMode, setModalMode] = React.useState<"edit" | "create">("create");
  const [modalTitle, setModalTitle] = React.useState<
    | "Nova anotação"
    | "Editar anotação"
    | "Novo processo"
    | "Editar processo"
    | ""
  >("");

  const annotationModalSchema = yup.object({
    id: yup.string().required(),
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    humorLevel: yup.string().required("Campo obrigatório"),
    createdAt: yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(annotationModalSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      humorLevel: "",
      createdAt: format(new Date(), "dd/MM/yyyy").toString(),
    },
  });

  function createAnnotation(annotationData: IAnnotation) {
    try {
      const isDuplicatedAnnotation = annotations.data.find(
        (annotation) => annotation.id == annotationData.id
      );

      if (isDuplicatedAnnotation) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Falha na requisição!",
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 17 },
        });
        throw Error("Registros duplicados");
      }

      annotations.createAnnotation(annotationData);
      const latestAnnotationRecords = annotations.getRecords();
      const recentlyAddedAnnotation = latestAnnotationRecords.find(
        (annotation) => annotation.id == annotationData.id
      );

      if (recentlyAddedAnnotation) {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Sua anotação acabou de ser criada!",
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 17 },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Falha na requisição!",
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 17 },
        });
        throw Error("Registro não cadastrado");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha na requisição!",
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 17 },
      });
    }
  }

  function updateAnnotation(annotationData: IAnnotation) {
    try {
      const annotationExists = annotations.data.find(
        (annotation) => annotation.id == annotationData.id
      );

      if (!annotationExists) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Falha na requisição!",
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 17 },
        });
        throw Error("Registro inexistente na base");
      }

      annotations.updateAnnotation(annotationData);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Anotação atualizada com sucesso!",
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 17 },
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha na requisição!",
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 17 },
      });
    }
  }

  const onSubmit = (data: {
    id: string;
    title: string;
    description: string;
    humorLevel: string;
    createdAt: string;
  }) => {
    setVisibleModal(false);
    resetForm();
    simulateRequest(
      () => {
        const annotationData = {
          ...data,
          id:
            modalMode == "edit"
              ? data.id
              : (annotations.data.length + 1).toString(),
          humorLevel: data.humorLevel.toString(),
        };

        if (modalMode == "create") {
          createAnnotation(annotationData);
        } else {
          updateAnnotation(annotationData);
        }
      },
      {
        timeUntilRender: 2000,
      }
    );
  };

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
            simulateRequest(
              () => {
                try {
                  const annotationToDelete = annotations.data.find(
                    (annotation) => annotation.id == annotationId
                  );

                  if (annotationToDelete) {
                    annotations.deleteAnnotation(annotationId);
                    const latestAnnotationRecords = annotations.getRecords();
                    const deletedAnnotation = latestAnnotationRecords.find(
                      (annotation) => annotation.id == annotationId
                    );

                    if (deletedAnnotation) {
                      Toast.show({
                        type: "error",
                        text1: "Erro",
                        text2: "Falha na requisição!",
                        text1Style: { fontSize: 18 },
                        text2Style: { fontSize: 17 },
                      });
                      throw Error("Registro não removido");
                    } else {
                      Toast.show({
                        type: "success",
                        text1: "Sucesso",
                        text2: "Anotação removida!",
                        text1Style: { fontSize: 18 },
                        text2Style: { fontSize: 17 },
                      });
                    }
                  }
                } catch (error) {
                  console.log(error);
                  Toast.show({
                    type: "error",
                    text1: "Erro",
                    text2: "Falha na requisição!",
                    text1Style: { fontSize: 18 },
                    text2Style: { fontSize: 17 },
                  });
                }
              },
              {
                timeUntilRender: 1000,
              }
            ),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <MainContainer>
        <CustomModal
          title={modalTitle}
          visible={visibleModal}
          onRequestClose={() => {
            resetForm();
            setVisibleModal(false);
          }}
        >
          <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    maxLength={25}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Título"
                    errorMessage={errors.title?.message}
                  />
                )}
                name="title"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    maxLength={50}
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Descrição"
                    errorMessage={errors.description?.message}
                  />
                )}
                name="description"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputMask
                    type={"datetime"}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    editable={!(modalMode == "edit")}
                    customTextInput={Input}
                    style={{ opacity: modalMode == "edit" ? 0.5 : 1 }}
                    customTextInputProps={{
                      maxLength: 10,
                      placeholder: "Data",
                      errorMessage: errors.createdAt?.message,
                    }}
                  />
                )}
                name="createdAt"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectBox
                    data={dbHumorLevel.map((humorLevel) => {
                      return {
                        label:
                          humorLevel.symbol + "  " + humorLevel.description,
                        value: humorLevel.id,
                      };
                    })}
                    value={value}
                    placeholder="Classificação do dia"
                    onChange={(selectedItem) => {
                      onChange(selectedItem.value);
                    }}
                    onBlur={onBlur}
                    errorMessage={errors.humorLevel?.message}
                  />
                )}
                name="humorLevel"
              />
            </ScrollView>
            <Button
              buttonStyle={{ marginTop: 40 }}
              title={modalMode == "edit" ? "Salvar alterações" : "Criar"}
              onPress={handleSubmit(onSubmit)}
            />
          </>
        </CustomModal>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <Text style={globalTextStyles.titlePage}>Meus processos</Text>
          <Text style={{ marginTop: 6 }}>
            Aqui você encontra todas as suas anotações, filtre pelo ano e mês se
            preferir.
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                flex: 1,
                marginTop: 26,
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Text>Filtre pelo ano</Text>
              <SelectBox
                data={dbYears}
                value={yearsFilterValue.value}
                placeholder="Selecionar ano"
                onChange={(item) => {
                  setYearsFilterValue(item);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 26,
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Text>Filtre pelo mês</Text>
              <SelectBox
                data={dbMonths}
                value={monthFilterValue.value}
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
              setModalMode("create");
              setVisibleModal(true);
            }}
            type="solid"
            titleStyle={{ color: "#fa7523" }}
            buttonStyle={{
              marginTop: 14,
              backgroundColor: "transparent",
              borderWidth: 1,
            }}
          >
            <Plus size={20} color={"#fa7523"} /> Nova anotação
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
              ItemSeparatorComponent={() => (
                <View style={{ height: 10 }}></View>
              )}
              renderItem={({ item }) => (
                <PreviewAnnotation
                  id={item.id}
                  createdAt={item.createdAt}
                  description={item.description}
                  humorLevel={item.humorLevel}
                  title={item.title}
                  onPress={() => {
                    const annotation = annotations.data.find(
                      (annotation) => annotation.id == item.id
                    );
                    if (annotation) {
                      resetForm({
                        id: annotation.id,
                        title: annotation.title,
                        humorLevel: annotation.humorLevel,
                        description: annotation.description,
                        createdAt: annotation.createdAt,
                      });
                      // setEditableAnnotation(annotation);
                      setModalTitle("Editar processo");
                      setModalMode("edit");
                      setVisibleModal(true);
                    } else {
                      Toast.show({
                        type: "error",
                        text1: "Erro",
                        text2: "Falha ao carregar os dados!",
                        text1Style: { fontSize: 18 },
                        text2Style: { fontSize: 17 },
                      });
                    }
                  }}
                  onDelete={handleDeleteAnnotation}
                />
              )}
            />
          )}
        </View>
      </MainContainer>
      <Toast />
    </>
  );
}
