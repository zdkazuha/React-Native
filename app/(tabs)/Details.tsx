import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToDoListItem from "../components/ToDoListItem";
import { Priority, ToDo } from "../../models/ToDo";
import { Text } from "react-native";
const api = "https://dummyjson.com/todos/1";

const Details = () => {
  const [toDo, setToDo] = useState<ToDo>()

useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const fullToDo: ToDo = {
          ...data,
          title: "Task from API", 
          priority: Priority.high, 
          date: new Date(),        
        };
        setToDo(fullToDo);
      })
  }, []);

  function handleDeleteToDo() {
    console.log("Delete")
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {toDo ?
          <ToDoListItem toDo={toDo} onDelete={handleDeleteToDo} />
          :
          <Text>Завантаження...</Text>
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Details;
