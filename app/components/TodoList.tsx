import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ToDo } from "../models/ToDo";
import { storage } from "../services/services";
import ToDoListItem from "./ToDoListItem";
import { useIsFocused } from '@react-navigation/native';

function ToDoList() {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      loadToDo();
    }
  }, [isFocused]);

  useEffect(() => {
    if (toDos.length > 0) {
      saveToDo();
    }
  }, [toDos]);

  const loadToDo = async () => {
    const storageToDo = await storage.load<ToDo[]>("ToDoList") || [];

    if (storageToDo && storageToDo.length > 0) {
      setToDos(storageToDo);
    } else {
      const response = await fetch("https://dummyjson.com/todos");
      const json = await response.json();
      const mappedTodos = json.todos.map((item: ToDo) => ({
        id: item.id,
        title: "Resp API",
        todo: item.todo,
        completed: item.completed,
        priority: "low",
        date: new Date(),
        userId: item.userId
      }));
      setToDos(mappedTodos);
      console.log(toDos)
    }
  };

  const saveToDo = async () => {
    await storage.save("ToDoList", toDos);
  };

  const handleDeleteToDo = async (id: number) => {
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundTop} />
      <View style={styles.backgroundBottom} />

      <Text style={styles.title}>ToDo List</Text>
      <Text style={styles.title}>4th March 2026</Text>
      <FlatList
        data={toDos}
        renderItem={({ item }) => (
          <ToDoListItem toDo={item} onDelete={handleDeleteToDo} />
        )}
        initialNumToRender={10}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

export default ToDoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#f8d56f",
    zIndex: -1,
  },
  backgroundBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#5b87de",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: "transparent",
  },
});
