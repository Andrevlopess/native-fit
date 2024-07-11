import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { s } from '@/styles/global'

export default function Timer() {

    const [timer, setTimer] = useState<number>(0);


    useEffect(() => {
        let timer = null;

        timer = setTimeout(() => {

            setTimer(prev => prev + 1)
        }, 1000)


        return () => { clearTimeout(timer) }

    }, [timer])

    return (
        <View style={[s.mxAuto]}>
            <Text style={[s.bold, s.textLG]}>{timer}</Text>
        </View>
    )
}