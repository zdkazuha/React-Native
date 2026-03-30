// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from "expo-notifications";
// import { SchedulableTriggerInputTypes } from "expo-notifications";
// import { Alert, Platform } from "react-native";

// const deleteTodoFromStorage = async (id: number) => {
//   try {
//     const storedTodos = await AsyncStorage.getItem("ToDoList");
//     if (storedTodos) {
//       const todos = JSON.parse(storedTodos);
//       const updatedTodos = todos.filter((todo: any) => todo.id !== id);
//       await AsyncStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
//     }
//   } catch (e) {
//     console.error(e)
//   }
// };

// const setTodoComplete = async (id: string) => {
//   try {
//     const storedTodos = await AsyncStorage.getItem("ToDoList");
//     if (storedTodos) {
//       const todos = JSON.parse(storedTodos);

//       const updatedTodos = todos.map((todo: any) => {
//         if (todo.id === id) {
//           return { ...todo, completed: true };
//         }
//         return todo;
//       });

//       await AsyncStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
//     }
//   } catch (e) {
//     console.error(e)
//   }
// };

// Notifications.setNotificationCategoryAsync("myCategory", [
//   {
//     buttonTitle: "Complete",
//     identifier: "Complete",
//     options: { opensAppToForeground: false },
//   },
//   {
//     buttonTitle: "Delete",
//     identifier: "Delete",
//     options: { isDestructive: true },
//   },
// ]);

// export const service = {
//   async setup() {
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldPlaySound: true,
//         shouldSetBadge: true,
//         shouldShowAlert: true,
//       }),
//     });

//     Notifications.addNotificationResponseReceivedListener(async (res) => {
//       if (res.actionIdentifier === "Complete") {
//         const todoId = res.notification.request.content.data.id;
//         if (todoId) {
//           await setTodoComplete(todoId);
//           Alert.alert("Complete", "Завдання успішно виконано.");
//           await service.cancel(res.notification.request.identifier);
//         }
//       }

//       if (res.actionIdentifier === "Delete") {
//         const todoId = res.notification.request.content.data.id;
//         if (todoId) {
//           await deleteTodoFromStorage(todoId);
//           Alert.alert("Delete", "Завдання успішно стерто з пам'яті.");
//           await service.cancel(res.notification.request.identifier);
//         }
//       }
//     });
//   },

//   async notify() {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Привіт!",
//         body: "Це просте тестове повідомлення",
//         data: { data: "Test" },
//       },
//       trigger: null,
//     });
//   },

//   async scheduleNotify() {
//     const id = await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Заплановане сповіщення",
//         body: "Минуло 5 секунд!",
//       },
//       trigger: {
//         type: SchedulableTriggerInputTypes.TIME_INTERVAL,
//         seconds: 5,
//       },
//     });
//     return id;
//   },

//   async scheduleDeadLineNotify(todoId: number, title: string, deadlineDate: Date) {
//     if (deadlineDate <= new Date()) {
//       return null;
//     }
    
//     const id = await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Час дедлайну",
//         body: `${title}`,
//         categoryIdentifier: "myCategory",
//         data: {id: todoId}
//       },
//       trigger: {
//         type: SchedulableTriggerInputTypes.DATE,
//         date: deadlineDate
//       },
//     });

//     return id;
//   },

//   async notificationWithActions(id: number) {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "ToDo Task",
//         body: "Потрібно виконати завдання",
//         categoryIdentifier: "myCategory",
//         data: { taskId: 1, id: id },
//       },
//       trigger: null,
//     });
//   },

//   async cancel(id: string | null) {
//     if (!id) return; 
    
//     await Notifications.cancelScheduledNotificationAsync(id);
//   },

//   async cancelAll() {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//   },
// };