import React from "react";
import { SplashScreen, Stack } from "expo-router";

export default function AuthLayout() {
console.log('render auth');

  return (
    <Stack screenOptions={{ headerShadowVisible: false }} />
  );
}
