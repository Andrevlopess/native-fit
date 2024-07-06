import COLORS from "@/constants/Colors";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { ForwardedRef, forwardRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const Background = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        style,
      ]}
    />
  );
};

export const Backdrop = ({ ...props }: BottomSheetBackdropProps) => {
  return <BottomSheetBackdrop
    enableTouchThrough={false}
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    style={{ backgroundColor: "#00000080", ...StyleSheet.absoluteFillObject }} />
};

interface ModalProps extends BottomSheetModalProps {
  children: React.ReactNode;
}

function Modal(
  { children, ...props }: ModalProps,
  ref: ForwardedRef<BottomSheetModal>
) {
  console.log('render a modal');

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
