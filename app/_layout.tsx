import { Stack } from "expo-router";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    // primary: "#3632a8",
    primary: "#fa7523",
  },
  darkColors: {
    primary: "blue",
  },
  components: {
    Input: {
      leftIconContainerStyle: {
        marginRight: 8,
      },
      errorStyle: {
        fontSize: 16
      }
    },
    Button: {
      buttonStyle: {
        // borderColor: "#3632a8"
        borderColor: "#fa7523"
      }
    }
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
