import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToDoForm from "../components/ToDoForm";

function Create() {
  function handleCreateToDo() {
    console.log("Create");
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ToDoForm OnCreate={handleCreateToDo} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Create;
