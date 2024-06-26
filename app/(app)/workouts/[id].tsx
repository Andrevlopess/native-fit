import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { s } from '@/styles/global';

export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();



    return (
        <>
            <Stack.Screen options={{ title: id }} />

            <View style={[s.flex1, s.bgWhite]}>
                <Text>{id}</Text>
            </View>
        </>
    )
}