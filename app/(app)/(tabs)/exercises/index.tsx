import { ExerciseApi } from '@/api/exercise-api'
import SwipeableExerciseListCard from '@/components/exercise/ExerciseListSwipeableCard'
import LibraryFeed from '@/components/LibraryFeed'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { BadgesControl } from '@/components/ui/BadgesControl'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercise } from '@/hooks/useSearchExercise'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { CircleX, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'

const badges = ['Cardio', 'Quadríceps', 'Costas', 'Peito', 'Ombro', 'Panturrilha'];

export default function LibraryIndexScreen() {

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useScrollViewOffset(scrollRef);

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


  const NotFoundComponent = () =>
    <MessageView
      icon={SearchX}
      message='Sem resultados'
      description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
    />

  const ErrorComponent = () =>
    <MessageView
      icon={CircleX}
      message="Ocorreu um erro!"
      description={error?.message || 'Estamos tentando resolver este problema!'} />

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
          ref={scrollRef}
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
            isPending={isFetching}
            hasData={!!exercises?.length}
            hasSearch={!!debouncedSearch}
            EmptyComponent={<LibraryFeed />}
            NotFoundComponent={<NotFoundComponent />}
            ErrorComponent={<ErrorComponent />}
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