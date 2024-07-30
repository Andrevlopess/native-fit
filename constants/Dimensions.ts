import { Dimensions } from "react-native";

const dimensios = Dimensions.get("window");

const SCREEN_WIDTH = dimensios.width;
const SCREEN_HEIGHT = dimensios.height;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
