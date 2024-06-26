import { StyleSheet, Text, View } from "react-native";
import { StickyNote } from "@/icons/index";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "@rneui/themed";

const _layout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="annotations"
        options={{
          tabBarIcon: () => <StickyNote color={theme.colors.primary} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
