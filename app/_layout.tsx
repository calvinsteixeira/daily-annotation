import { Stack } from "expo-router";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#FF7A0F",
  },
  darkColors: {
    primary: "blue",
  }, 
});
export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{ gestureEnabled: false, headerShown: false }}
      ></Stack>
    </ThemeProvider>
  );
}
