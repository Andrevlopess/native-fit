import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerLargeTitle: true
      }} />
  );
}
