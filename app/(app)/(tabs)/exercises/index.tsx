import Search from '@/assets/icons/Search'
import SwipeableExerciseListCard from '@/components/exercise/ExerciseListSwipeableCard'
import FeaturedExercices from '@/components/exercise/FeaturedExercices'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { BadgesControl } from '@/components/ui/BadgesControl'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useScrollValue } from '@/hooks/useScrollValue'
import { useSearchExercise } from '@/hooks/useSearchExercise'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { Stack } from 'expo-router'
import { CircleX, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
const bestQuadsExercises: IExercise[] =

  [
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Kettlebell",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0533.gif",
      "id": "0361bbc2-3b8d-4529-ad22-bd46a5cd163f",
      "name": "Agachamento frontal com kettlebell",
      "target": "Glúteos"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Peso do corpo",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0668.gif",
      "id": "047cddd7-867f-45aa-a00f-6ce19b045da6",
      "name": "Ponte posterior declinada",
      "target": "Glúteos"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Barra",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_2810.gif",
      "id": "05aec223-5019-466c-8b13-6fe1cc50b5e2",
      "name": "Afundo com barra v. 2",
      "target": "Quadríceps"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Barra",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0127.gif",
      "id": "06a98d6d-e84f-473b-8058-d7ff637131e8",
      "name": "Agachamento zercher com barra",
      "target": "Glúteos"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Elástico",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_3007.gif",
      "id": "0775d6d0-0b82-41b8-aa87-d1df35ea7ea2",
      "name": "Extensão de perna com banda de resistência",
      "target": "Quadríceps"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Bola de estabiliade",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1417.gif",
      "id": "07ee0633-9989-4311-8f25-ca53c1dfc6fd",
      "name": "Flexão diagonal com chute de isquiotibiais com uma perna na bola de exercício",
      "target": "Glúteos"
    },
    {
      "bodypart": "Quadriceps/posterior",
      "equipment": "Peso do corpo",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_3470.gif",
      "id": "0b34e7fb-83c4-4c44-8271-f8457ce16e9c",
      "name": "Avanço para frente (masculino)",
      "target": "Glúteos"
    }
  ]


const badges = ['Cardio', 'Quadríceps', 'Costas', 'Peito', 'Ombro', 'Panturrilha'];

export default function LibraryIndexScreen() {

  const { offset, scrollHandler } = useScrollValue('y')

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const debouncedSearch = useDebounce(search, 500).trim();

  const {
    data: exercises = [],
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage }
    = useSearchExercise({
      search: debouncedSearch,
      filter: filter,
      select: (data) => data.pages.flatMap((page) => page),
    })


  // const NotFoundComponent = () =>
  //   <MessageView
  //     icon={SearchX}
  //     message='Sem resultados'
  //     description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
  //   />

  // const ErrorComponent = () =>
  //   <MessageView
  //     icon={CircleX}
  //     message="Ocorreu um erro!"
  //     description={error?.message || 'Estamos tentando resolver este problema!'} />


  return (
    <>
      <Stack.Screen
        options={{
          title: 'Biblioteca',
          headerTitleAlign: 'center',
          // headerLargeTitle: true,
          headerLeft: () => <LogoImage />,
          headerTitle:
            device.android
              ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
              : undefined,
          headerLargeTitle: true,
          headerSearchBarOptions:
            device.ios
              ? {
                hideNavigationBar: false,
                hideWhenScrolling: false,
                placement: `automatic`,
                placeholder: 'Busque por um exercício',
                onChangeText: ({ nativeEvent }) => setSearch(nativeEvent.text)
              }
              : undefined
        }}
      />

      <View style={[s.flex1, s.bgWhite, s.gap12]}>

        <Animated.ScrollView
          // ref={scrollRef}
          onScroll={scrollHandler}
          style={[s.flex1]}
          keyboardDismissMode='on-drag'
          contentContainerStyle={[s.gap8]}
          contentInsetAdjustmentBehavior='automatic'
        // stickyHeaderIndices={[2]}
        >
          <View style={[s.gap8]}>
            {device.android &&
              <AnimatedLargeTitle title='Biblioteca' offset={offset} style={[s.px12]} />}
            <SearchInput
              onChangeText={setSearch}
              placeholder='Busque por um exercício'
              value={search}
              containerStyles={[s.mx12]}
            />
            <BadgesControl
              badges={badges}
              selectedBadge={filter}
              onSelect={setFilter}
              disabled={isFetching} />
          </View>

          <RequestResultsView
            isError={isError}
            isPending={isFetching && !isFetchingNextPage}
            hasData={!!exercises?.length}
            hasSearch={!!debouncedSearch}
            EmptyComponent={
              <MessageView icon={Search} message='Busque por um exercício' description='Procure entre as mais de 1300 atividades' />
              // <LibraryFeed />
            }
            NotFoundComponent={
              <MessageView
                icon={SearchX}
                message='Sem resultados'
                description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
              />}
            ErrorComponent={<MessageView
              icon={CircleX}
              message="Ocorreu um erro!"
              description={error?.message || 'Estamos tentando resolver este problema!'} />}
          >

            <View style={[s.flex1, s.gap12]}>
              <Text style={[s.semibold, s.text2XL, s.px12]}>Resultados</Text>

              <View style={[s.p4]}>
                {exercises?.map((exercise, index) => (
                  <SwipeableExerciseListCard
                    exercise={exercise}
                    key={`${exercise.id}${index}`}
                    disableSwipeToRemove
                  />
                ))}
              </View>

              {hasNextPage &&
                <Button
                  style={[s.m12]}
                  variant='secondary'
                  text='Buscar mais'
                  onPress={() => fetchNextPage()}
                  isLoading={isFetchingNextPage}
                />
              }
            </View>
          </RequestResultsView>
        </Animated.ScrollView>


      </View>


    </>
  )
}