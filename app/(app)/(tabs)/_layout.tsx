import COLORS from "@/constants/Colors";
import { device } from "@/utils/device";
import * as Haptics from 'expo-haptics';
import { Tabs } from "expo-router";
import {
    Home,
    LibrarySquare,
    Search,
    UserRound
} from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";
import 'react-native-reanimated';

export default function AppLayout() {


    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        padding: 16,
                        height: Platform.OS === 'ios' ? 95 : 60,
                        borderTopColor: "#fff",
                        // elevation: 4
                    },
                    title: '',
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarInactiveTintColor: COLORS.textGray,
                    tabBarActiveTintColor: COLORS.indigo,
                    headerShadowVisible: false,
                    // tabBarShowLabel: false,
                }}
                screenListeners={{
                    tabPress: () =>
                        !device.web &&
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                initialRouteName="workouts"
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Home
                                strokeWidth={focused ? 1.8 : 1.5}
                                size={30}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="exercises"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Search
                                strokeWidth={focused ? 1.8 : 1.5}
                                size={30}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="workouts"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <LibrarySquare
                                strokeWidth={focused ? 1.8 : 1.5}
                                size={30}
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <UserRound
                                strokeWidth={focused ? 1.8 : 1.5}
                                size={30}
                                color={color}
                            />
                        )
                    }}
                />

                {/* <Tabs.Screen name="(modals)/add-to-workout" options={{ href: null }} /> */}
            </Tabs>
        </>
    );
}
