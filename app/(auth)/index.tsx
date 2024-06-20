import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { s } from '@/styles/global'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Link, Stack, router } from 'expo-router'
import Modal from '@/components/ui/Modal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Animated, { LinearTransition, CurvedTransition, EntryExitTransition, FadeIn, FadeInUp, FadeOutUp, SlideOutUp, SlideOutDown, FadeOutDown } from 'react-native-reanimated'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Dimensions'

export default function AuthIndexScreen() {

    const ref = useRef<BottomSheetModal>(null)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        console.log('modal presented');

        ref.current?.present();
        // ref.current?.forceClose
    }, [])

    return (


        <>

            <Stack.Screen
                options={{
                    title: ''
                }}

            />

            <Animated.View
                style={[s.bgWhite, s.flex1, s.p12, s.justifyEnd]}>

                <Button
                    text="Acessar meus treinos"
                    onPress={() => router.push('/(app)/home')} />

                <Button
                    text="Criar minha conta"
                    variant='ghost'
                    onPress={() => router.push('/(auth)/(sign-up-form)/datas-step')} />


            </Animated.View>

            {/* <Modal
                ref={ref}
                index={1}
                snapPoints={["10%", "50%", "60%"]}
                enablePanDownToClose={true}
                enableDismissOnClose >
                    <Animated
                <Button
                    text="Acessar meus treinos"
                    onPress={() => router.replace('(app)/home')} />

                    {

                    }
            </Modal> */}

            <Animated.View

                layout={LinearTransition.springify().stiffness(500).damping(60)}
                style={[s.p12, s.gap12, s.bgWhite, s.border1, {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0
                }]}>
                <Button
                    text="Open modal"
                    onPress={() => setIsVisible(prev => !prev)} />


                {
                    isVisible &&

                    <View style={[s.bgGray200, s.m12, { minHeight: SCREEN_WIDTH }]} />

                }
            </Animated.View>
        </>
    )
}