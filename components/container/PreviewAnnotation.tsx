import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { IAnnotation } from "@/data/types";
import { dbHumorLevel } from "@/data/db";
import { X } from "@/icons";
import { useTheme } from "@rneui/themed";

interface IPreviewAnnotationComponent extends IAnnotation {
  onDelete: (annotationId: IAnnotation["id"]) => void;
  onPress: (annotationId: IAnnotation["id"]) => void;
}

const PreviewAnnotation = ({
  id,
  createdAt,
  onDelete,
  onPress,
  humorLevel,
  title,
}: IPreviewAnnotationComponent) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={() => onPress(id)}>
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
        <Text style={{ color: "white", fontSize: 13 }}>{createdAt} - </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 13, color: "white", flex: 1 }}
        >
          {dbHumorLevel.find((humor) => humor.id == humorLevel)?.symbol}
          {"  "}
          {title}
        </Text>
        <X onPress={() => onDelete(id)} color={theme.colors.white} size={16} />
      </View>
    </Pressable>
  );
};

export default PreviewAnnotation;

const styles = StyleSheet.create({});
