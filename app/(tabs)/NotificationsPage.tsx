import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { service } from "../../services/notifications";

export default function NotificationsPage() {
  let id: string = "";

  React.useEffect(() => {
    service.setup();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Example</Text>
      <Button
        title="Notify Now!"
        onPress={service.notify}
        testID="notifyNowBtn"
      />
      <Button
        title="Schedule Notification!"
        onPress={async () => (id = await service.scheduleNotify())}
      />
      <Button
        title="Cancel Scheduled Notification!"
        onPress={() => service.cancel(id)}
      />
      <Button
        title="Cancel All!"
        onPress={() => service.cancelAll()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});
