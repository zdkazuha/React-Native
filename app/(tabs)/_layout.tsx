import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";  

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "ToDo List",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Details"
        options={{
          title: "ToDo Details",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "ToDo Create",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}