import { Platform } from 'react-native'


type Device = "ios" | "android";

export const device: Record<Device, boolean> = {
  android: Platform.OS === 'android',
  ios: Platform.OS === 'ios',
}