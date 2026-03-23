import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../services/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{title: "Home", headerShown: false}}></Stack.Screen>
      </Stack>
    </Provider>
  );
}