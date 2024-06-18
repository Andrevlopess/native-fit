
import { Slot, Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useLayoutEffect } from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black
    , Inter_700Bold
    , Inter_600SemiBold
    , Inter_400Regular
    , Inter_500Medium
    , Inter_800ExtraBold
  });



  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }







  const queryClient = new QueryClient();
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <QueryClientProvider client={queryClient}>

      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>

    // </ThemeProvider>
  );
}
