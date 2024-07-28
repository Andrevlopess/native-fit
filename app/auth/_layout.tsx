import React from "react";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout() {

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Redirect href={'/home'} />
  SplashScreen.hideAsync()

  return (
    <Stack screenOptions={{ headerShadowVisible: false }} />
  );
}
