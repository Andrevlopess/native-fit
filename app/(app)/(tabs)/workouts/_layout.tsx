import { Stack } from "expo-router";
import React from "react";


export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function WorkoutsLayout() {
  return (
    // <WorkoutProvider>
    <Stack
      screenOptions={{ headerShadowVisible: false }}
      initialRouteName="index" />
        
    // </WorkoutProvider> 
  );
}
