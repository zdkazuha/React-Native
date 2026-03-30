import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../services/store";

import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "../services/db";

const DATABASE_NAME = "todos.db";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <GestureHandlerRootView>
        <Provider store={store}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ title: "Home", headerShown: false }}
            ></Stack.Screen>
          </Stack>
        </Provider>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
