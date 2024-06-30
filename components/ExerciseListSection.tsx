import { useDebounce } from '@/hooks/useDebounceCallback';
import { useSearchExercises } from '@/hooks/useSearchExercises';
import { BodyPart, Equipment, Filter, IExercise, Target } from '@/types/exercise';
import { CircleX, SearchX } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MessageView from './views/MessageView';
import { s } from '@/styles/global';
import SwipeableExerciseListCard from './ExerciseListSwipeableCard';
import LibraryFeed from './LibraryFeed';
import RequestResultsView from './views/RequestResultView';
import Button from './ui/Button';
import ExerciseListCard from './ExerciseListCard';
import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';


const padding = 12;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4

interface ExerciseListSectionProps {
  title: string;
  filter: Filter
}

export default function ExerciseListSection({ title, filter }: ExerciseListSectionProps) {


  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500).trim();

  const {
    exercises,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
    isError,
    isFetching,
    fetchStatus,
    fetchNextPage }
    = useSearchExercises(debouncedSearch, filter, 10);

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

  const renderItem = ({ item }: { item: IExercise }) => <ExerciseListCard exercise={item} showsAddButton />

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (

      <ActivityIndicator color={COLORS.indigo} style={[s.p12, s.mxAuto]} />

    );
  };

  return (
    <View>
      <Text style={[s.textXL, s.semibold]}>{title}</Text>

      <RequestResultsView
        isError={isError}
        isPending={isFetching && fetchStatus === 'fetching'}
        hasData={!!exercises?.length}
        hasSearch={false}
        EmptyComponent={<NotFoundComponent />}
        NotFoundComponent={<NotFoundComponent />}
        ErrorComponent={<ErrorComponent />}
      >
        <FlatList
          data={exercises}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={renderFooter}
          style={[s.flex1, s.gap12]}

        />


      </RequestResultsView>

    </View>
  )
}