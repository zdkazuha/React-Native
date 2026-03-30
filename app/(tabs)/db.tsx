import React, { useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";

import { MiniToDo } from "../../models/MiniToDo";
import { getItems, deleteItem } from "../../services/db";
import ToDoListItem from "../components/ToDoListItem"; 

export default function Db() {
  const db = useSQLiteContext(); 
  const [toDos, setToDos] = useState<MiniToDo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getItems();
      setToDos(data);
    } catch (error) {
      console.error("Помилка при завантаженні з БД:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id);
      setToDos((prev) => prev.filter((item) => item.id !== id)); 
    } catch (error) {
      console.error("Не вдалося видалити запис:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundTop} />
      <View style={styles.backgroundBottom} />

      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>SQLite ToDo List</Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={toDos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ToDoListItem 
                toDo={{
                  ...item,
                  completed: false,
                  priority: "low"   
                } as any} 
                onDelete={handleDelete} 
              />
            )}
            contentContainerStyle={styles.listPadding}
            ListEmptyComponent={
              <Text style={styles.emptyText}>База даних порожня</Text>
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTop: {
    position: "absolute",
    top: 0, left: 0, right: 0, height: "50%",
    backgroundColor: "#f8d56f", zIndex: -1,
  },
  backgroundBottom: {
    position: "absolute",
    bottom: 0, left: 0, right: 0, height: "50%",
    backgroundColor: "#5b87de", zIndex: -1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1a1a1a",
  },
  listPadding: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: "center",
    color: "#444",
    fontSize: 16,
    marginTop: 50,
  },
});