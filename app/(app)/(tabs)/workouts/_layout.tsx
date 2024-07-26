import { WorkoutProvider } from "@/contexts/WorkoutContext";
import { Stack } from "expo-router";
import React from "react";

export default function WorkoutsLayout() {
  return (
    // <WorkoutProvider>
      <Stack screenOptions={{headerShadowVisible: false}} initialRouteName="index" />
    // </WorkoutProvider> 
  );
}
