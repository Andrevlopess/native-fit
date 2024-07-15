import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { s } from "@/styles/global";
import React, { memo } from "react";
import { useAnimatedValue, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

function HeaderStepBar({
    progress,
}: {
    progress: SharedValue<number>;
}) {

    const anim = useAnimatedStyle(() => {
        return {
            width: SCREEN_WIDTH * progress.value / 100,
            height: 3
        }
    })


    return (
        <View
            style={[
                s.bgGray100, s.radiusFull, { height: 3, width: SCREEN_WIDTH },
            ]}
        >
            <Animated.View
                style={[s.bgIndigo500, s.radiusFull, anim]}
            />
        </View>

    );
}


// export default HeaderStepBar
export default memo(HeaderStepBar)
