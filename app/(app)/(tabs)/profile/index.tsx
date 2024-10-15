import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { LineDivisor } from '@/components/ui/Divisors'
import { HistoryCalendar } from '@/components/workout/HistoryCalendar'
import COLORS from '@/constants/Colors'
import { AuthContext, useAuth } from '@/contexts/AuthContext'
import { useScrollValue } from '@/hooks/useScrollValue'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Image } from 'expo-image'
import { Stack } from 'expo-router'
import { ChevronRight, Instagram, Mail } from 'lucide-react-native'
import React, { useContext } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

export default function ProfileIndexScreen() {


  // const handleMoveTouch = useCallback(() => { }, [])
  const { Logout } = useContext(AuthContext)
  const { user } = useAuth()
  const { offset, scrollHandler } = useScrollValue('y');


  return (

    <>
      <Stack.Screen
        options={{
          title: 'Minha conta',
          headerLargeTitle: true,
          headerTitleAlign: 'center',
          headerLeft: () => <LogoImage />,
          headerTitle:
            device.android
              ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
              : undefined

        }}
      />


      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={[s.gap12]}
        contentInsetAdjustmentBehavior='automatic'
        style={[s.flex1, s.bgWhite]}>
        {device.android &&
          <AnimatedLargeTitle title='Minha conta' offset={offset} style={[s.px12]} />}

        <View style={[s.p12, s.flexRow, s.gap12]}>
          <Avatar size={100} />
          <View>
            <Text style={[s.text2XL, s.semibold, s.mt12]}>
              {user?.user_metadata.full_name ?? user?.user_metadata.username}</Text>
            <Text style={[s.textLG, s.textGray800, s.medium]}>{user?.email}</Text>
          </View>
        </View>

        <LineDivisor />
        <HistoryCalendar period='month' />
        <LineDivisor />

        <View style={[s.p12, s.gap12]}>
          <Text style={[s.textGray800, s.medium, s.textBase]}>Entre em contato com o criador</Text>
          <View style={[s.flexRow, s.p12, s.border1, s.borderGray200, s.justifyEnd, s.radius12, s.itemsCenter, s.gap12]}>
            <Instagram color={COLORS.gray900} size={32} />

            <TouchableOpacity style={[s.mrAuto]}
              onPress={() => Linking.openURL('https://www.instagram.com/andrevlopess/')} >
              <Text style={[s.textLG, s.semibold, s.textGray800]}>@andrevlopess</Text>
            </TouchableOpacity>

            <ChevronRight color={COLORS.gray900} />
          </View>
          <View style={[s.flexRow, s.p12, s.border1, s.borderGray200, s.justifyEnd, s.radius12, s.itemsCenter, s.gap12]}>
            <Mail color={COLORS.gray900} size={32} />

            <TouchableOpacity style={[s.mrAuto]}
              onPress={() => Linking.openURL('mailto:andrellopes021@gmail.com')}
            >
              <Text style={[s.textLG, s.semibold, s.textGray800]}>andrellopes021@gmail.com</Text>
            </TouchableOpacity>

            <ChevronRight color={COLORS.gray900} />
          </View>
        </View>


        <Button text='Sair' onPress={Logout} style={[s.mt24, s.m12]} />
      </Animated.ScrollView>
    </>

  )
}