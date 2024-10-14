
import { s } from "@/styles/global";
import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props extends ViewProps{
  height?: number;
  width?: number;
  circle?: boolean;
}

export default function Skeleton({ height = 100, width, circle, style }: Props) {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 0.5, 1], [1, 0.4, 1]),
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1 - opacity.value, { duration: 1000 }), -1);
  }, [])

  return (
    <Animated.View
      style={[
        s.bgGray200,
        animatedStyle,
        { height: height, width: width && width },
        circle && { width: height },
        circle ? s.radiusFull : [s.radius12],
        style
      ]}
    />
  );
}
