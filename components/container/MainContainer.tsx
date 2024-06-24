import { SafeAreaView, StatusBar } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return <SafeAreaView style={{ flex: 1, paddingHorizontal: 30, paddingTop: StatusBar.currentHeight }}>{children}</SafeAreaView>;
};

export default MainContainer;