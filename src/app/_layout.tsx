import { ThemeProvider } from "@/providers/theme-provide";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../../global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <View style={{ paddingTop: insets.top, flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </Provider>
    </ThemeProvider>
  );
}
