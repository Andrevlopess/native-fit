import ExerciseListCard from '@/components/exercise/ExerciseListCard'
import Button from '@/components/ui/Button'
import { s } from '@/styles/global'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Stack, router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'

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
                    text="Acessar meus treinos with link"
                    asLink='/(app)/home' />
                <Button
                    text="Acessar meus treinos"
                    onPress={() => router.push('/(app)/home')}  />

                <Button
                    text="Criar minha conta"
                    variant='ghost'
                    onPress={() => router.push('/(auth)/(sign-up-form)/datas-step')} />


            </Animated.View>



            <ExerciseListCard exercise={{
                "id": "65683a57-b5bd-4ce5-bbfd-f7cecd1649db",
                "name": "Puxada Paralela Assistida De Perto",
                "equipment": "Graviton",
                "bodypart": "Costas",
                "target": "Dorsal",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0015.gif"
            }} />


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

            {/* <Animated.View

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
            </Animated.View> */}
        </>
    )
}