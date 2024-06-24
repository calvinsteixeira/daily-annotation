import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ gestureEnabled: false, headerShown: false }}></Stack>;
}
