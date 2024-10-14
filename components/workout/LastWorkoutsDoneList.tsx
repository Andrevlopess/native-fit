import { WorkoutApi } from '@/api/workout-api'
import { s } from '@/styles/global'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, View } from 'react-native'
import LoadingView from '../views/LoadingView'
import { WorkoutListCard } from './WorkoutListCard'
import SkeletonList from '../ui/SkeletonList'

export default function LastWorkoutsDoneList() {

    const { data: workouts = [], isPending, isError } = useQuery({
        queryKey: ['latest-done-workouts'],
        queryFn: WorkoutApi.fetchLastestWorkoutsDone
    })


    return (
        <View style={[s.gap12]}>
            <Text style={[s.semibold, s.textXL, s.px12]}>Últimos treinos</Text>

            {isPending
                ? <SkeletonList length={3} contentContainerStyles={[s.p12]} skeletonHeight={80} />
                : workouts.length ?
                    workouts.map(workout =>
                        <View style={[s.px12, s.gap6]} key={workout.done_at}>
                            {/* <Text style={[s.medium, s.textBase, s.textGray600]}>{new Date(workout.done_at).toLocaleDateString('pt-br', { dateStyle: 'medium' })}</Text> */}
                            <WorkoutListCard workout={workout.workouts} />

                        </View>
                    )
                    : <Text> Você ainda nao fez nenhum treino</Text>
            }
        </View>
    )
}