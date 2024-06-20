import React from "react";
import { Stack } from "expo-router";
import LogoImage from "@/components/LogoImage";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{

        headerShadowVisible: false,
        headerLeft: () => <LogoImage />,
        headerLargeTitle: true
      }} />
  );
}
