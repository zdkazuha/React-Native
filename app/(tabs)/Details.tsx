import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToDoListItem from "../components/ToDoListItem";
import { Priority, ToDo } from "../models/ToDo";
import { storage } from "../services/services";

const Details = () => {
  const [toDo, setToDo] = useState<ToDo>();

  useEffect(() => {
    fetch("https://dummyjson.com/todos/1")
      .then((res) => res.json())
      .then((data) => {
        const fullToDo: ToDo = {
          ...data,
          title: "Task from API",
          priority: Priority.high,
          date: new Date(),
        };
        setToDo(fullToDo);
      });
  }, []);

  const handleDeleteToDo = async (id: number) => {
    const storageToDo = await storage.load<ToDo[]>("ToDoList") || []

    let newToDoList = storageToDo.filter((toDo) => toDo.id !== id);

    await storage.save("ToDoList", newToDoList)
    setToDo(undefined)
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {toDo ? (
          <ToDoListItem toDo={toDo} onDelete={handleDeleteToDo} />
        ) : (
          <Text>Завантаження...</Text>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Details;
