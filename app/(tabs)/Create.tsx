import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToDoForm from "../components/ToDoForm";
import { storage } from "../services/services";
import { ToDo } from "../models/ToDo";

function Create() {

  const handleCreateToDo = async (todo: ToDo) => {
    const storageToDo = await storage.load<ToDo[]>("ToDoList") || []

    const newId = storageToDo.length > 0 
            ? Math.max(...storageToDo.map(t => t.id)) + 1 
            : 1;
    let newToDo = {
      ...todo,
      id: newId,
    };
    
    const newToDoList = [...storageToDo, newToDo]

    await storage.save("ToDoList", newToDoList);
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
