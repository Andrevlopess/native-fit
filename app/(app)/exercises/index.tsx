import ExerciseListCard from '@/components/ExerciseListCard'
import LibraryFeed from '@/components/LibraryFeed'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import LoadingView from '@/components/views/LoadingView'
import NotFoundView from '@/components/views/NotFoundView'
import COLORS from '@/constants/Colors'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { supabase } from '@/lib/supabase'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'


const ITEMS_PER_PAGE = 10;

async function fetchSearchedExercises({
  queryKey,
  pageParam,
}: {
  queryKey: unknown[];
  pageParam: unknown;
}) {
  try {

    let { data, error } = await supabase
      .rpc('search-exercises', {
        page_num: pageParam,
        page_size: ITEMS_PER_PAGE,
        query: queryKey[1]
      })


    if (error) throw error;

    return data as IExercise[];
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    throw new Error(error.response?.data.error || 'Ocorreu um erro inesperado!');
  }
}



export default function LibraryIndexScreen() {


  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useScrollViewOffset(scrollRef);

  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500);

  const { data: results, fetchNextPage, isFetchingNextPage, isPending, fetchStatus, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["searched-exercises", debouncedSearch.trim()],
      queryFn: fetchSearchedExercises,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length + 1 : undefined,
      enabled: !!search,
    });

  const exercises = results?.pages.map((page) => page).flat();

  const renderItem = ({ item }: { item: IExercise }) => <ExerciseListCard exercise={item} />


  const renderLoadingFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <ActivityIndicator
        color={COLORS.indigo}
        style={[s.py12]}
        size={36}
      />
    );
  };

  console.log(exercises);




  return (
    <>
      <Stack.Screen
        options={{
          title: 'Biblioteca',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoImage />,
          headerTitle: ({ children }) => device.ios ? undefined : <AnimatedHeaderTitle offset={offset} title={children} />,
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


      {/* <Animated.ScrollView
        ref={scrollRef}
        style={[s.flex1, s.bgWhite]}
        contentContainerStyle={[s.gap12, s.p12]}
      >
        <AnimatedLargeTitle title='Biblioteca' offset={offset} />
        {device.android && <SearchInput />}

      </Animated.ScrollView> */}

      <View style={[s.flex1, s.bgWhite, s.gap12]}>

        <Animated.ScrollView
          contentInsetAdjustmentBehavior='automatic'
          keyboardDismissMode='on-drag'
          ref={scrollRef}
          contentContainerStyle={[s.gap8]}
          style={[s.flex1]}
        // stickyHeaderIndices={[0]}
        >
          <View style={[s.p12, s.gap8]}>
            <AnimatedLargeTitle title='Biblioteca' offset={offset} />
            <SearchInput
              onChangeText={setSearch}
              placeholder='Busque por um exercício'
              value={search}
              onFocus={() => scrollRef.current?.scrollTo({ y: 60 })}
              onBlur={() => scrollRef.current?.scrollTo({ y: 0 })}
            />
          </View>

          {isPending && fetchStatus === 'fetching' ? (
            <LoadingView />
          ) : (
            exercises && search ?
              exercises.length ?
                <View style={[s.flex1, s.gap12]}>
                  <Text style={[s.semibold, s.text2XL]}>Resultados</Text>
                  {exercises.map((exercise, index) => (
                    <ExerciseListCard
                      exercise={exercise}
                      key={`${exercise.id}${index}`}
                      disableSwipe='left' />
                  ))}

                  {hasNextPage &&
                    <Button
                      variant='tertiary'
                      text='Buscar mais'
                      onPress={() => fetchNextPage()}
                      isLoading={isFetchingNextPage}
                    />
                  }
                </View>
                : <NotFoundView
                  title='Sem resultados'
                  description={`Não encontramos nada para '${search}'`}
                />
              : <LibraryFeed />
          )}

        </Animated.ScrollView>






      </View>


    </>
  )
}