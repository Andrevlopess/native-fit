import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

type direction = 'x' | 'y';

export const useScrollValue = (direction: direction = 'y') => {
  const offset = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet";
      offset.value = event.contentOffset[direction];
    },
  });

  return { offset, scrollHandler };
};
