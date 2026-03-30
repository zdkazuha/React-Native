import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../services/store";

import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "../services/db";

import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";

const DATABASE_NAME = "todos.db";

export default function RootLayout() {

  const expo = SQLite.openDatabaseSync("DATABASE_NAME");
  const db = drizzle(expo);
  const { success, error } = useMigrations(db, migrations)

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
