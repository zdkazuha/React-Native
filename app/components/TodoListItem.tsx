import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ToDo, Priority } from "../../models/ToDo";

type ToDoItemProps = {
  toDo: ToDo;
  onDelete: (id: number) => void;
};

export default function ToDoListItem({ toDo, onDelete }: ToDoItemProps) {
  const currentPriority = toDo?.priority || Priority.low;
  const displayTitle = toDo?.title || "No Title";
  const displayTodo = toDo?.todo || "No description provided";
  
  const getSafeDate = () => {
    if (!toDo?.date) return new Date();
    const d = new Date(toDo.date);
    return isNaN(d.getTime()) ? new Date() : d;
  };
  
  const displayDate = getSafeDate();

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.high: return "#ff4d4d";
      case Priority.medium: return "#ffa500";
      case Priority.low: return "#4caf50";
      default: return "#888";
    }
  };

  return (
    <View
      style={[
        styles.card,
        toDo?.completed ? styles.completedBackground : styles.pendingBackground,
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(currentPriority) }]}>
          <Text style={styles.priorityText}>{String(currentPriority).toUpperCase()}</Text>
        </View>
        <Text style={styles.idText}>#{toDo?.id || "0"}</Text>
      </View>

      <Text style={styles.titleText}>{displayTitle}</Text>
      
      <Text style={[styles.todoText, toDo?.completed && styles.completedText]}>
        {displayTodo}
      </Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.dateText}>📅 {displayDate.toLocaleDateString()}</Text>
          <Text style={styles.userIdText}>User ID: {toDo?.userId || "N/A"}</Text>
        </View>
        
        <View style={styles.actions}>
          <Text style={[styles.statusText, { color: toDo?.completed ? "#2e7d32" : "#696766" }]}>
            {toDo?.completed ? "✓ Done" : "To-Do"}
          </Text>
          
          <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(toDo?.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#eee",
  },
  completedBackground: {
    backgroundColor: "#f9f9f9",
    opacity: 0.8,
  },
  pendingBackground: {
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  idText: {
    fontSize: 12,
    color: "#bbb",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  todoText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  userIdText: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 2,
  },
  actions: {
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#ffebee",
  },
  deleteButtonText: {
    color: "#d32f2f",
    fontSize: 12,
    fontWeight: "bold",
  },
});