
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
import { StatusBar } from 'react-native';


function RootLayout() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  });

  const [loaded, error] = useFonts({
    // 'DMSans-Black': require('@/assets/fonts/DMSans-Black.ttf'),
    // 'DMSans-Bold': require('@/assets/fonts/DMSans-Bold.ttf'),
    // 'DMSans-Medium': require('@/assets/fonts/DMSans-Medium.ttf'),
    // 'DMSans-Regular': require('@/assets/fonts/DMSans-Regular.ttf'),
    // 'DMSans-SemiBold': require('@/assets/fonts/DMSans-SemiBold.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <QueryClientProvider client={queryClient}>
      <PortalProvider>
        <StatusBar barStyle='dark-content' />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(app)' />
        </Stack>
        {/* <Slot /> */}
      </PortalProvider>
    </QueryClientProvider>

    // </ThemeProvider>
  );
}

export default gestureHandlerRootHOC(RootLayout);