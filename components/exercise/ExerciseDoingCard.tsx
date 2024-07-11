import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Check, Link, PlusCircle } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutUp, LinearTransition, SlideInDown, SlideOutDown, SlideOutUp, useSharedValue, withTiming, ZoomInEasyUp, ZoomOutEasyDown } from 'react-native-reanimated'
import Button from '../ui/Button'


interface IExerciseDoingCardProps {
  exercise: IExercise;
  onConclude: () => void;
  active: boolean;
  done: boolean;
}


export default function ExerciseDoingCard({ active, exercise, done, onConclude }: IExerciseDoingCardProps) {


  const IMAGE_SIZE = active ? SCREEN_WIDTH * 0.8 : 70;

  const height = useSharedValue(70);

  height.value = withTiming(active ? IMAGE_SIZE : 70)


  return (
    <Animated.View
      // onLayout={({ nativeEvent }) => console.log(nativeEvent.layout)}
      layout={LinearTransition.springify().stiffness(500).damping(60)}
      style={[
        s.bgWhite,
        s.flex1,
        s.gap12,
        s.p12,
        s.radius12,
        // s.border2,
        // s.borderIndigo500,
        active && s.bgIndigo600,
        // done && s.itemsCenter,
        done && { opacity: 0.5 }
      ]}>

      {active &&
        <Animated.View
          layout={LinearTransition.springify().stiffness(500).damping(60)}
          // entering={}
          // exiting={ZoomOutEasyDown}
          style={[s.flexRow, s.itemsCenter, s.justifyBetween]}>
          <Text
            style={[s.bold, s.textXL, s.textCenter, s.py12]}>Fazendo agora</Text>
          <Button text='Concluir' size='small' onPress={onConclude} rounded />
        </Animated.View>

      }
      <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100, 
        done &&  s.mrAuto
      ]}>

        <Animated.Image
          source={{ uri: exercise.gifurl }}
          style={[s.radius8,
          { height, width: height, }
          ]} />
      </View>

      {active
        ? <View style={[s.gap36, s.flex1]}>
          <Text
            style={[
              active ? s.bold : s.medium,
              active ? s.textXL : s.textBase]}
          >
            {exercise.name}
          </Text>

          <View style={[s.flex1, s.gap4, s.justifyBetween, s.flexRow, s.itemsCenter, s.px4]}>
            <Animated.View >
              <Text style={[s.regular, s.textGray400]}>Parte do corpo</Text>
              <Text style={[s.medium, s.textGray800, s.textLG]}>{exercise.bodypart}</Text>
            </Animated.View>
            <Animated.View >
              <Text style={[s.regular, s.textGray400]}>Equipamento</Text>
              <Text style={[s.medium, s.textGray800, s.textLG]}>{exercise.equipment}</Text>
            </Animated.View>
            <Animated.View >
              <Text style={[s.regular, s.textGray400]}>Músculo alvo</Text>
              <Text style={[s.medium, s.textGray800, s.textLG]}>{exercise.target}</Text>
            </Animated.View>
          </View>

        </View>

        :
        <View style={[s.flex1]}>
          <Text
            style={[
              active ? s.bold : s.medium,
              active ? s.textXL : s.textBase]}
          >
            {exercise.name}
          </Text>
          <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>

        </View>

      }

    </Animated.View >
  )
}