import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ToDo } from "../../models/ToDo";
import { storage } from "../../services/services";
import ToDoForm from "../components/ToDoForm";
import { service } from "../../services/notifications";

function Create() {
  const handleCreateToDo = async (todo: ToDo) => {
    const storageToDo = (await storage.load<ToDo[]>("ToDoList")) || [];

    const newId =
      storageToDo.length > 0
        ? Math.max(...storageToDo.map((t) => t.id)) + 1
        : 1;

    let newToDo = {
      ...todo,
      id: newId,
    };

    const notificationId = await service.scheduleDeadLineNotify(
      newToDo.id,
      newToDo.title,
      newToDo.deadline
    )

    if (notificationId)
      newToDo.notificationId = notificationId;

    const newToDoList = [...storageToDo, newToDo];

    await storage.save("ToDoList", newToDoList);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ToDoForm OnCreate={handleCreateToDo} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Create;
