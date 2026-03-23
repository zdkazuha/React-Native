import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Animation = () => {
  const width = useSharedValue(0);
  const [percent, setPercent] = useState(0);

  const handleStart = () => {
    // width.value = 400; // різка зміна
    // withTiming - плавна зміна
    // withRepeat - повторення анімації
    // withSpring - пружинна анімація
    // withDelay - затримка анімації
    // withSequence - послідовна анімація

    if (width.value >= 100) {
      width.value = withTiming(0);
      setPercent(0);
    } else {
      width.value = withTiming(width.value + 25);
      setPercent((prev) => prev += 25);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    backgroundColor: interpolateColor(
      width.value,
      [25, 50, 75, 100],
      ["green", "skyblue", "yellow", "red"],
    ),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations</Text>
      <Button title="next" onPress={handleStart} />
      <View style={styles.view}>
        <Animated.View
          style={[
            {
              height: 25,
              alignItems: "center",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            },
            animatedStyles,
          ]}
        >
          <Text style={{ color: "white", fontWeight: "bold", marginTop: 2 }}>{percent} %</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  view: {
    width: 350,
    borderRadius: 20,
    height: 25,
    backgroundColor: "gray",
    color: "white",
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});
