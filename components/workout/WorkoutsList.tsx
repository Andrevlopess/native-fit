import { useFetchWorkouts } from '@/hooks/useFetchWorkouts';
import { s } from '@/styles/global';
import { Inbox, SearchX, CircleX, X, Plus } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Divisor from '../ui/Divisor';
import MessageView from '../views/MessageView';
import RequestResultsView from '../views/RequestResultView';
import { WorkoutListCard } from './WorkoutListCard';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';
import { Link } from 'expo-router';
import COLORS from '@/constants/Colors';
import SkeletonList from '../ui/SkeletonList';


const NewWorkoutCard = () =>
    <Link asChild href={'/new-workout'} style={[s.flexRow, s.gap12, s.itemsCenter]}>
        <TouchableOpacity activeOpacity={0.8}>
            <View style={[s.radius12, s.bgGray200, s.itemsCenter, s.justifyCenter, { height: 60, width: 60 }]}>
                <Plus color={COLORS.white} />
            </View>
            <Text style={[s.textBase, s.medium]}>Adicionar um novo treino</Text>
        </TouchableOpacity>
    </Link>

const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Você ainda não criou nenhum treino!'
        description='Começe criando um treino para se exercitar'>
        <Button text='Criar treino' size='small' variant='secondary' asLink={'/new-workout'} />
    </MessageView>

const ErrorComponent = () =>
    <MessageView
        icon={X}
        message='Não conseguimos buscar seus treinos!'
        description='Verifique sua conexão e tente novamente' />





export default function WorkoutsList() {
    const { data: workouts, isPending, isError, error } = useFetchWorkouts('', '');


    return (

        <View style={[s.p12]}>
            <Text style={[s.textGray800, s.semibold, s.textXL]}>Meus treinos</Text>
            <View style={[s.py24, s.gap12]}>

                {isError && <ErrorComponent />}

                {isPending
                    ? <SkeletonList length={3} />
                    : !workouts?.length
                        ? <EmptyComponent />
                        : <View style={[s.gap12]}>
                            {workouts?.map((workout, i) => (
                                <WorkoutListCard workout={workout} key={`${i},${workout.id}`} index={i}/>
                            ))}
                            <NewWorkoutCard />
                        </View>
                }


            </View>
        </View>
    )
}