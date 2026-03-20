import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToDoList from "../components/ToDoList";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ToDoList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
