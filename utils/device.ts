import { Platform } from "react-native";

type Device = "ios" | "android" | "web";

export const device: Record<Device, boolean> = {
  android: Platform.OS === "android",
  ios: Platform.OS === "ios",
  web: Platform.OS === "web",
};
