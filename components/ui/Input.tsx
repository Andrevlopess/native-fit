import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import React, { ForwardedRef, forwardRef, memo, useState } from "react";
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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export interface IInputProps extends TextInputProps {
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  error?: string;
  secondaryLabel?: string
}

const Input = ({
  icon: Icon,
  label,
  labelStyles,
  error,
  secondaryLabel,
  iconPosition = "left",
  containerStyles,
  secureTextEntry: isPassword,
  ...props
}: IInputProps, ref: ForwardedRef<TextInput>) => {
  const [secure, setSecure] = useState(isPassword);

  const focused = useSharedValue(false);

  const textAnimation = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: withTiming(focused.value ? 0.8 : 1)
      },
      { translateY: withTiming(focused.value ? -14 : 0) }]
    }
  })

  return (
    // !props.editable is not working and i dont know why
    <View style={[s.gap6, containerStyles, [props.editable === false && { opacity: 0.5 }]]}
    //  onLayout={({ nativeEvent }) => console.log(label, nativeEvent.layout)}
    >
      {secondaryLabel && (
        <Text
          style={[s.medium, s.textStone400]}
        >
          {secondaryLabel}
        </Text>
      )}


      {label && (
        <Animated.Text
          style={[s.semibold, s.textGray500, s.textLG, s.px4, labelStyles]}
        >
          {label}
        </Animated.Text>
      )}

      <View
        style={[
          // s.radius12,
          s.borderBottom1,
          s.p4,
          error ? s.borderRed500 : s.borderGray200,
        ]}
      >

        <TextInput
          {...props}
          ref={ref}
          placeholderTextColor={error ? COLORS.red : COLORS.placeholderGray}
          secureTextEntry={secure}
          cursorColor={COLORS.indigo}
          selectionColor={`${COLORS.indigo}30`}
          enablesReturnKeyAutomatically
          clearButtonMode="always"
          style={[
            s.semibold,
            s.textBlack,
            s.textBase,
            s.p6,
            [(Icon || isPassword) && s.px8],
            { lineHeight: 20 },
            props.style,
          ]}
        />

        {isPassword && (
          <TouchableOpacity
            style={[s.p12]}
            activeOpacity={0.5}
            onPress={() => setSecure((prev) => !prev)}
          >
            {secure ? (
              <Eye color={error ? COLORS.red : COLORS.textGray} />
            ) : (
              <EyeOff color={error ? COLORS.red : COLORS.textGray} />
            )}
          </TouchableOpacity>
        )}

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

export default memo(forwardRef(Input))