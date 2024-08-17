import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import React, { ForwardedRef, forwardRef, useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";

export interface MaskedInputProps extends MaskInputProps {
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  error?: string;
  secondaryLabel?: string

}


const MaskedInput = ({
  icon: Icon,
  label,
  labelStyles,
  error,
  iconPosition = "left",
  containerStyles,
  secondaryLabel,
  ...props
}: MaskedInputProps, ref: ForwardedRef<TextInput>) => {
  return (
    // !props.editable is not working and i dont know
    <View style={[s.gap6, containerStyles, [props.editable === false && { opacity: 0.5 }]]}
    //  onLayout={({ nativeEvent }) => console.log(label, nativeEvent.layout)}
    >
      <View style={[s.itemsCenter, s.flexRow, s.justifyBetween, s.px6]}>
        {label && (
          <Text
            style={[s.semibold, s.textStone800, s.textLG, labelStyles]}
          >
            {label}
          </Text>
        )}
        {secondaryLabel && (
          <Text
            style={[s.medium, s.textStone400]}
          >
            {secondaryLabel}
          </Text>
        )}
      </View>

      <View
        style={[
          s.radius14,
          s.gap4,
          s.justifyBetween,
          s.itemsCenter,
          s.flexRow,
          error ? s.bgRed50 : s.bgGray100,
          s.py6, s.px12
        ]}
      >
        {Icon && iconPosition === "left" && (
          <Icon color={error ? COLORS.red : COLORS.textGray} />
        )}

        <MaskInput
          {...props}
          ref={ref}
          style={[
            s.flex1,
            s.semibold,
            s.textBlack,
            s.textBase,
            s.py6,
            s.px8,
            { lineHeight: 20 },
            props.style,
          ]}
          selectTextOnFocus
          placeholderTextColor={error ? COLORS.red : COLORS.placeholderGray}
          cursorColor={COLORS.blue}
          selectionColor={`${COLORS.blue}30`}
          enablesReturnKeyAutomatically
        />

        {Icon && iconPosition === "right" && (
          <Icon color={error ? COLORS.red : COLORS.textGray} />
        )}
      </View>

      {error && (
        <View style={[s.flexRow, s.itemsCenter, s.px12]}>
          <AlertCircle
            size={18}
            color={COLORS.red}
          />
          <Text style={[s.medium, s.textRed500, s.px6]}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default forwardRef(MaskedInput)