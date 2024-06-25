import { StyleSheet, Text, View } from "react-native";
import { StickyNote } from "@/icons/index";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {

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
          tabBarIcon: ({ color }) => <StickyNote color={color} />,
          headerShown: false
        }}
      />      
    </Tabs>
  );
};

export default _layout;