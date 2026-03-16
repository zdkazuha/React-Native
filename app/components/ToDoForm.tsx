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
  View
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
  const { control, handleSubmit } = useForm<ToDo>();
  const [show, setShow] = useState(false);
  const onSubmit: SubmitHandler<ToDo> = (data) => {
    console.log(data);
    OnCreate(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New ToDo</Text>

      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter ToDo title"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />

      <Text style={styles.label}>ToDo</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter ToDo description"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="todo"
      />

      <Text style={styles.label}>Priority</Text>
      <Controller
        control={control}
        name="priority"
        defaultValue={Priority.low}
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              marginVertical: 10,
            }}
          >
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="low" value={Priority.low} />
              <Picker.Item label="medium" value={Priority.medium} />
              <Picker.Item label="high" value={Priority.high} />
            </Picker>
          </View>
        )}
      />

      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        name="date"
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text>Дата виконання: {value.toLocaleDateString()}</Text>

            <Pressable style={styles.button} onPress={() => setShow(true)}>
              <Text style={styles.buttonText}>Обрати дату</Text>
            </Pressable>

            {(show || Platform.OS === "ios") && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShow(false);
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
          </View>
        )}
      />

      <Text style={styles.label}>Completed</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Switch
            onValueChange={onChange}
            value={value}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
          />
        )}
        defaultValue={false}
        name="completed"
      />

      <Text style={styles.label}>User Id</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter ToDo userId"
            onChangeText={onChange}
            value={value?.toString() ?? ""}
          />
        )}
        name="userId"
      />

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Create ToDo</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ToDoForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    minHeight: 500,
    height: 2000,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
