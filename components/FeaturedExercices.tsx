import { View, Text } from 'react-native'
import React from 'react'
import { IExercise } from '@/types/exercise'
import Animated from 'react-native-reanimated'
import { s } from '@/styles/global'
import { Image } from 'expo-image'
import ExerciseListCard from './ExerciseListCard'
import { SCREEN_WIDTH } from '@/constants/Dimensions'

const padding = 12;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4

const FeaturedExercisesSection = ({ exercices }: { exercices: IExercise[] }) => {

    return (
        <View style={[s.gap12, s.flex1]}>
            {exercices.map(exercise => (
                <ExerciseListCard
                    key={exercise.id}
                    exercise={exercise}
                    width={CARD_WIDTH}
                />
            ))}
        </View>
    )
}


export default function FeaturedExercices() {
    const exercises: IExercise[] =
        [
            {
                "id": "65683a57-b5bd-4ce5-bbfd-f7cecd1649db",
                "name": "Puxada Paralela Assistida De Perto",
                "equipment": "Graviton",
                "bodypart": "Costas",
                "target": "Dorsal",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0015.gif"
            },
            {
                "id": "8f500525-dad1-437c-9052-e8f27a185cc1",
                "name": "Elevação De Perna Deitada Assistida Com Lançamento Lateral",
                "equipment": "Com Ajuda",
                "bodypart": "Core",
                "target": "Abdômen",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0012.gif"
            },
            {
                "id": "6049f1ba-eb01-4cef-a163-e65154af6f02",
                "name": "Puxada Assistida Em Pé",
                "equipment": "Graviton",
                "bodypart": "Costas",
                "target": "Dorsal",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1432.gif"
            },
            {
                "id": "63d9d5e4-050c-4b6d-9c70-bd29e61129d3",
                "name": "Balanços De Braço Com Pernas Estendidas Penduradas",
                "equipment": "Peso Do Corpo",
                "bodypart": "Core",
                "target": "Abdômen",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_2333.gif"
            },
            {
                "id": "2a515ab3-6692-472a-ac30-7ae0323f4cb2",
                "name": "Saltos À Distância (Masculino)",
                "equipment": "Peso Do Corpo",
                "bodypart": "Cardio",
                "target": "Cardio",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_3220.gif"
            },
            {
                "id": "784bffdd-c2b6-40fb-a846-5bab97fff12c",
                "name": "Balanços De Braço Com Pernas Dobradas Penduradas",
                "equipment": "Peso Do Corpo",
                "bodypart": "Core",
                "target": "Abdômen",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_2355.gif"
            },
            {
                "id": "b4470bb2-7466-4751-ae08-24c6c66e9e1c",
                "name": "Puxada De Pé Assistida Em Pé",
                "equipment": "Graviton",
                "bodypart": "Costas",
                "target": "Dorsal",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1431.gif"
            },
            {
                "id": "fd33de15-5023-48f3-b7f1-f57003d31ecf",
                "name": "Alongamento De Glúteos E Piriforme Deitado Assistido",
                "equipment": "Com Ajuda",
                "bodypart": "Quadriceps/Posterior",
                "target": "Glúteos",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1710.gif"
            },
            {
                "id": "ab2acaa8-bb5a-4f33-a5db-8daa3b61c6ab",
                "name": "Alongamento De Panturrilha Deitado Assistido",
                "equipment": "Com Ajuda",
                "bodypart": "Panturrilha",
                "target": "Panturrilha",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1708.gif"
            },
            {
                "id": "3737c14d-ddc3-49ba-accd-d01525ce741f",
                "name": "Mergulho Assistido No Peito (Ajoelhado)",
                "equipment": "Graviton",
                "bodypart": "Peito",
                "target": "Peitoral",
                "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0009.gif"
            }
        ]



    const teste = [exercises.splice(0, 3), exercises.splice(4, 6), exercises.splice(7, 9)]

    const renderItem = ({ item }: { item: IExercise[] }) => <FeaturedExercisesSection exercices={item} />

    return (
        <View style={[s.gap12]}>

            <Text style={[s.bold, s.textXL, s.px12]}>Destaques</Text>

            <Animated.FlatList
                // ref={animatedRef}
                scrollEventThrottle={16}
                snapToInterval={SCREEN_WIDTH + padding}
                decelerationRate={'fast'}
                contentContainerStyle={[s.gap12, s.p12]}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={teste}
                // keyExtractor={item => item.id}
                renderItem={renderItem}
            />

        </View>
    )
}
