import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface CardProps {
  symbol: string;
  isTop: boolean;
  onSwipeOff: () => void;
}

const Card: React.FC<CardProps> = ({ symbol, isTop, onSwipeOff }) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  React.useEffect(() => {
    if (!isTop) {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    }
  }, [isTop]);

  const handleSwipeComplete = () => {
    onSwipeOff();
    offsetX.value = 0;
    offsetY.value = 0;
  };

  const gesture = Gesture.Pan()
    .enabled(isTop)
    .onUpdate((e) => {
      offsetX.value = e.translationX;
      offsetY.value = e.translationY;
    })
    .onEnd(() => {
      if (Math.abs(offsetX.value) > 120) {
        const dest = offsetX.value > 0 ? 500 : -500;

        offsetX.value = withTiming(dest, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(handleSwipeComplete)();
          }
        });
      } else {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { rotate: `${offsetX.value / 15}deg` },
    ],
    zIndex: isTop ? 100 : 1,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.text}>{symbol}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const Gestures = () => {
  const [cards, setCards] = useState(["♥", "♣", "♠", "♦"]);

  const shiftCard = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        {cards
          .map((symbol, index) => {
            const isTop = index === 0;

            return (
              <Card
                key={symbol}
                symbol={symbol}
                isTop={isTop}
                onSwipeOff={shiftCard}
              />
            );
          })
          .reverse()}
      </View>
    </View>
  );
};

export default Gestures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  stack: {
    width: 200,
    height: 300,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: 200,
    height: 300,
    backgroundColor: "white",
    borderWidth: 10,
    borderColor: "gray",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backgroundCard: {
    transform: [{ scale: 0.95 }],
  },
  text: {
    color: "black",
    fontSize: 80,
  },
});
