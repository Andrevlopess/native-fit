import { FadeIn, LinearTransition,  } from "react-native-reanimated";

const FadeInTransition = FadeIn.springify().stiffness(500).damping(60);
const LayoutTransition = LinearTransition.springify().stiffness(500).damping(60);

export {FadeInTransition, LayoutTransition}