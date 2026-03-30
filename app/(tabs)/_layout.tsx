import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAppSelector } from "../../services/hooks";
import { selectCount } from "../slices/mesuSlice";

export default function TabLayout() {
  const count = useAppSelector(selectCount);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "ToDo List",
          headerShown: false,
          tabBarBadge: count,
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Details"
        options={{
          title: "ToDo Details",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "ToDo Create",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="NotificationsPage"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Animation"
        options={{
          title: "Animation",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="color-filter-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cards"
        options={{
          title: "Cards",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="caret-forward-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="db"
        options={{
          title: "db",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
