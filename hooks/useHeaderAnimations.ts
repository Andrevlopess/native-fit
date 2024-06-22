import { View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";

export const useHeaderAnimations = () => {
    // const ref = useAnimatedRef<Animated.ScrollView>();
    const offset = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            "worklet";
            offset.value = event.contentOffset.y;
        },
    });

   
 
    const animations = { headerTitleAnimation };



    return { scrollHandler, animations };
};
