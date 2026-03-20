import { ToDo } from "@/models/ToDo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";

type Props = {
  OnCreate: (toDo: ToDo) => void;
};

enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

const ToDoForm: React.FC<Props> = ({ OnCreate }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ToDo>({
    defaultValues: {
      title: "",
      todo: "",
      priority: Priority.low,
      deadline: new Date(),
      completed: false,
      userId: 1,
    },
  });

  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

  const onSubmit: SubmitHandler<ToDo> = (data) => {
    console.log("Form Data:", data);
    OnCreate(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New ToDo</Text>

      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        rules={{ required: "Назва обов'язкова" }}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.title && { borderColor: "red" }]}
            placeholder="Enter ToDo title"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        rules={{ required: "Опис обов'язковий" }}
        name="todo"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.todo && { borderColor: "red" }]}
            placeholder="Enter ToDo description"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Priority</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Low" value={Priority.low} />
              <Picker.Item label="Medium" value={Priority.medium} />
              <Picker.Item label="High" value={Priority.high} />
            </Picker>
          </View>
        )}
      />

      <Text style={styles.label}>Deadline</Text>
      <Controller
        control={control}
        name="deadline"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.dateDisplay}>
              {value instanceof Date
                ? value.toLocaleString()
                : "Оберіть дедлайн"}
            </Text>

            <Pressable
              style={styles.buttonDate}
              onPress={() => setPickerMode("date")} 
            >
              <Text style={styles.buttonText}>Встановити дату та час</Text>
            </Pressable>

            {pickerMode && (
              <DateTimePicker
                value={value instanceof Date ? value : new Date()}
                mode={pickerMode}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  if (event.type === "dismissed") {
                    setPickerMode(null);
                    return;
                  }

                  if (selectedDate) {
                    onChange(selectedDate);

                    if (Platform.OS === "android") {
                      if (pickerMode === "date") {
                        setPickerMode(null);
                        setTimeout(() => setPickerMode("time"), 100);
                      } else {
                        setPickerMode(null);
                      }
                    } else {
                      setPickerMode(null);
                    }
                  }
                }}
              />
            )}
          </View>
        )}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Completed</Text>
        <Controller
          control={control}
          name="completed"
          render={({ field: { onChange, value } }) => (
            <Switch
              onValueChange={onChange}
              value={value}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          )}
        />
      </View>

      <Text style={styles.label}>User Id</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        name="userId"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter User ID"
            onChangeText={(text) => onChange(Number(text))}
            value={value?.toString()}
          />
        )}
      />

      <Pressable
        style={[styles.buttonCreate, { marginTop: 30 }]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Create ToDo</Text>
      </Pressable>

      {Object.keys(errors).length > 0 && (
        <Text style={styles.errorText}>
          Будь ласка, заповніть всі обов'язкові поля
        </Text>
      )}
    </ScrollView>
  );
};

export default ToDoForm;

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    overflow: "hidden",
  },
  dateDisplay: { marginTop: 10, fontSize: 16, color: "#333" },
  buttonDate: {
    backgroundColor: "#5856D6",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonCreate: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});
