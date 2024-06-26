import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import * as Haptics from 'expo-haptics';
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import {
    GraduationCap,
    Home,
    LibraryBig,
    LibrarySquare,
    Search,
    UserRound
} from "lucide-react-native";
import React from "react";
import { Platform, Text } from "react-native";
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
                    tabBarHideOnKeyboard: true,
                    tabBarInactiveTintColor: COLORS.textGray,
                    tabBarActiveTintColor: COLORS.indigo,
                    tabBarLabelStyle: [],
                    // tabBarShowLabel: false,
                }}
                screenListeners={{
                    tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "",
                        headerShown: false,
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
                        title: "",
                        headerShown: false,
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
                        title: "",
                        headerShown: false,
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
                        title: "",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <UserRound
                                strokeWidth={focused ? 1.8 : 1.5}
                                size={30}
                                color={color}
                            />
                        )
                    }}
                />

                {/* <Tabs.Screen name="index" options={{ href: null }} /> */}
            </Tabs>
        </>
    );
}
