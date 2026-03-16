import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { ToDo } from "../../models/ToDo";
import ToDoListItem from "./ToDoListItem";
import ToDoForm from "./ToDoForm";

const api = "https://dummyjson.com/todos";

export default function ToDoList() {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    getToDo();
  }, []);

  const getToDo = async () => {
    try {
      const response = await fetch(api);
      const json = await response.json();
      setToDos(json.todos);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const handleCreateToDo = (todo: ToDo) => {
    let newId = toDos.length + 1
    let newToDo = {
      ...todo,
      id: newId
    }
    setToDos((prevToDos) => [...prevToDos, newToDo])
  }

  const handleDeleteToDo = (id: number) => {
    setToDos((prevToDos) => 
      prevToDos.filter((toDo) => toDo.id !== id)
  )}

  return (
    <View style={styles.container}>

      <ToDoForm OnCreate={handleCreateToDo}/>

        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />

      <Text style={styles.title}>ToDo List</Text>
      <Text style={styles.title}>4th March 2026</Text>
      <FlatList
        data={toDos}
        renderItem={({ item }) => <ToDoListItem toDo={item} onDelete={handleDeleteToDo}  />}
        initialNumToRender={10}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#f8d56f', 
    zIndex: -1, 
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#5b87de', 
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: 'transparent',
  }
});