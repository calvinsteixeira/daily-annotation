import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IAnnotation } from "@/data/types";
import { dbHumorLevel } from "@/data/db";
import { X } from "@/icons";
import { useTheme } from "@rneui/themed";

interface IPreviewAnnotationComponent extends IAnnotation {
  onDelete: (annotationId: IAnnotation["id"]) => void;
}

const PreviewAnnotation = ({
  id,
  createdAt,
  onDelete,
  humorLevel,
  resume,
}: IPreviewAnnotationComponent) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6,
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>{createdAt} - </Text>
      <Text numberOfLines={1} style={{ fontSize: 14, color: "white", flex: 1 }}>
        {dbHumorLevel.find((humor) => humor.level == humorLevel)?.symbol}
        {"  "}
        {resume}
      </Text>
      <X
        onPress={() => onDelete(id)}
        color={theme.colors.white}
        size={16}
      />
    </View>
  );
};

export default PreviewAnnotation;

const styles = StyleSheet.create({});
