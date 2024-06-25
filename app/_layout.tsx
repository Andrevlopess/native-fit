
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
import { PortalProvider } from '@gorhom/portal';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


function RootLayout() {
  const [loaded, error] = useFonts({
    'DMSans-Black': require('@/assets/fonts/DMSans-Black.ttf'),
    'DMSans-Bold': require('@/assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Medium': require('@/assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('@/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-SemiBold': require('@/assets/fonts/DMSans-SemiBold.ttf'),
    // 'DMSans-SemiBold': require('@/assets/fonts/DMSans-SemiBold.ttf'),
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
      <PortalProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName='(app)'/>
      </PortalProvider>
    </QueryClientProvider>

    // </ThemeProvider>
  );
}

export default gestureHandlerRootHOC(RootLayout);