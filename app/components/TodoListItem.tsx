import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToDo } from "../../models/ToDo";

type ToDoItemProps = {
  toDo: ToDo;
};

export default function TodoListItem({ toDo }: ToDoItemProps) {
  return (
    <View
      style={[
        styles.card,
        toDo.completed ? styles.completedBackground : styles.pendingBackground,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.idText}>#{toDo.id}</Text>
        <Text style={styles.userIdText}>User: {toDo.userId}</Text>
      </View>

      <Text style={[styles.todoText, toDo.completed && styles.completedText]}>
        {toDo.todo}
      </Text>

      <Text style={styles.statusText}>
        {toDo.completed ? "✓ Completed" : "○ In Progress"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginTop: 15,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  completedBackground: {
    backgroundColor: "#e8f5e9",
    borderColor: "#c8e6c9",
  },
  pendingBackground: {
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  idText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  userIdText: {
    fontSize: 12,
    color: "#aaa",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#757575",
  },
  statusText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
    color: "#666",
  },
});
