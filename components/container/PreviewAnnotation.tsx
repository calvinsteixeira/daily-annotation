import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IAnnotation } from "@/data/types";
import { dbHumorLevel } from "@/data/db";

const PreviewAnnotation = ({
  id,
  createdAt,
  description,
  humorLevel,
  resume,
}: IAnnotation) => {
  return (
    <View
      style={{
        backgroundColor: "#5e5e5e",
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6        
      }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>{createdAt} - </Text>
      <Text numberOfLines={1} style={{ fontSize: 14, color: "white", flex: 1 }}>{dbHumorLevel.find(humor => humor.level == humorLevel)?.symbol}{"  "}{resume}</Text>
    </View>
  );
};

export default PreviewAnnotation;

const styles = StyleSheet.create({});
