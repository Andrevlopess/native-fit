import { s } from "@/styles/global";
import { width } from "@/utils/dimensions";
import React, { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

function HeaderStepBar({
    steps,
    currStep,
}: {
    steps: number;
    currStep: number;
}) {

    const screenWidth = width();
    const percentage = currStep / steps;

    return (
        <View
            style={[
                s.bgGray100, s.radiusFull, { height: 3, width: screenWidth },
            ]}
        >
            <Animated.View
                style={[s.bgBlue, s.radiusFull, { height: 3, width: screenWidth * percentage }]}
            />
        </View>

    );
}


// export default HeaderStepBar
export default memo(HeaderStepBar)
