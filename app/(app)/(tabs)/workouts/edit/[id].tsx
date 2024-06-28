import { s } from '@/styles/global';
import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const EditButton = () => (
    <Link href={'/'}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </Link>
)


export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();


    return (
        <>
            <Stack.Screen options={{
                 title: '' 

            }} />

            <View style={[s.flex1, s.bgWhite]}>
                <Text>editing {id}</Text>
            </View>
        </>
    )
}