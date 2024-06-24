import { SafeAreaView } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>{children}</SafeAreaView>;
};

export default MainContainer;