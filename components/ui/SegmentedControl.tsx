import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import * as Haptics from 'expo-haptics';
import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface ISegmentedControlProps {
  tabs: string[];
  width: number;
  onChange: (index: number) => void;
  currentIndex: number;
  paddingVertical?: number;
  disabled?: boolean;
  activeColors?: string[];
}

const SegmentedControl = ({
  tabs,
  width,
  currentIndex,
  paddingVertical = 12,
  activeColors = [COLORS.blue, COLORS.yellow],
  onChange,
}: ISegmentedControlProps) => {

  const translateValue = useMemo(() => (width - 6) / tabs.length, [width, tabs.length]);
  const translateX = useSharedValue(translateValue * currentIndex);

  const handleTabPress = useCallback((index: number) => {
    onChange(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    translateX.value = withSpring(translateValue * index, {
      duration: 300,
      dampingRatio: 1,
      stiffness: 195,
      overshootClamping: false,
    });
  }, [onChange, translateValue, translateX]);

  const inputRange = useMemo(() => Array.from({ length: tabs.length }, (_, index) => index * translateValue), [tabs.length, translateValue]);
  const segmentWidth = useMemo(() => (width - 8) / tabs.length, [width, tabs.length]);

  const animatedSegmentStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(translateX.value, inputRange, activeColors),
    width: segmentWidth,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[s.itemsCenter, s.radius14, s.flexRow, s.bgGray100, { width }]}>
      <Animated.View style={[s.radius14, styles.segment, animatedSegmentStyle]} />
      {tabs.map((tab, index) => {
        const isCurrentIndex = currentIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[s.flex1, s.px6, { paddingVertical }]}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
            disabled={isCurrentIndex}
          >
            <Text
              numberOfLines={1}
              style={[s.textCenter, s.semibold, { color: isCurrentIndex ? "#fff" : "#020202" }]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  segment: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
  },
});

export default memo(SegmentedControl, (prev, next) => prev.currentIndex === next.currentIndex);
