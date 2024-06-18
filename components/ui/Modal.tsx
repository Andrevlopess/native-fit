import COLORS from "@/constants/Colors";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Background = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        style,
      ]}
    />
  );
};

export const Backdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#00000060",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};

interface ModalProps extends BottomSheetModalProps {
  children: React.ReactNode;
}

function Modal(
  { children, ...props }: ModalProps,
  ref: ForwardedRef<BottomSheetModal>
) {

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          animationConfigs={{ stiffness: 547, damping: 45, mass: 1 }}
          backdropComponent={Backdrop}
          backgroundComponent={Background}
          handleIndicatorStyle={{
            width: 50,
            backgroundColor: COLORS.gray,
          }}
          // enableDynamicSizing
          // maxDynamicContentSize={height(0.9)}
          ref={ref}
          {...props}
        >
          {children}
        </BottomSheetModal>
      </BottomSheetModalProvider>
   </Portal>
  );
}

export default forwardRef(Modal);
