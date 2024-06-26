import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export const useScrollValue = () => {
  const offset = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet";
      offset.value = event.contentOffset.y;
      // console.log(sv.value);
    },
  });

  return { offset, scrollHandler };
};
