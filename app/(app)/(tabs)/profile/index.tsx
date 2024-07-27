import Button from '@/components/ui/Button'
import { AuthContext } from '@/contexts/AuthContext'
import { s } from '@/styles/global'
import { Stack } from 'expo-router'
import React, { useContext } from 'react'
import { View } from 'react-native'

export default function ProfileIndexScreen() {


  // const handleMoveTouch = useCallback(() => { }, [])
  const { Logout } = useContext(AuthContext)

  return (

    <>
      <Stack.Screen
        options={{
          title: '',
          // headerLeft: () => <LogoImage />,
          // headerTitle:
          //   device.android
          //     ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
          //     : undefined,
          // headerLargeTitle: true,
          headerTitleAlign: 'center'
        }}
      />


      <View style={[s.flex1, s.bgWhite, s.p12, s.itemsCenter, s.justifyCenter]}>

        <Button text='Logout' onPress={() => {
          console.log('cliqued');
          Logout()

        }} />
      </View>
    </>

  )
}