import Account from "@/assets/icons/Account";
import Home from "@/assets/icons/Home";
import Library from "@/assets/icons/Library";
import Search from "@/assets/icons/Search";
import COLORS from "@/constants/Colors";
import { device } from "@/utils/device";
import * as Haptics from 'expo-haptics';
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import 'react-native-reanimated';

export default function AppLayout() {


    return (
        <>
            <Tabs
                // backBehavior="initialRoute"
                screenOptions={{
                    tabBarStyle: {
                        padding: 16,
                        height: Platform.OS === 'ios' ? 70 : 60,
                        borderTopColor: "#fff",
                        borderWidth: 0
                    },
                    title: '',
                    
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarInactiveTintColor: COLORS.textGray,
                    tabBarActiveTintColor: COLORS.black,
                    headerShadowVisible: false,
                    // tabBarShowLabel: false,
                }}
                screenListeners={{
                    tabPress: () =>
                        !device.web &&
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                initialRouteName="home"
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Home focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="exercises"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Search focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="workouts"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Library focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Account focused={focused} />
                        )
                    }}
                />

                {/* <Tabs.Screen name="(modals)/add-to-workout" options={{ href: null }} /> */}
            </Tabs>
        </>
    );
}
