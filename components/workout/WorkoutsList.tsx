
import { WorkoutApi } from '@/api/workout-api';
import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Inbox, Plus, X } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';
import SkeletonList from '../ui/SkeletonList';
import MessageView from '../views/MessageView';
import { WorkoutListCard } from './WorkoutListCard';
import { useAuth } from '@/contexts/AuthContext';
import Search from '@/assets/icons/Search';


const NewWorkoutCard = () =>
    <Link asChild href={'/new-workout'} style={[s.flexRow, s.gap12, s.itemsCenter]}>
        <TouchableOpacity activeOpacity={0.8}>
            <View style={[s.radius12, s.bgGray200, s.itemsCenter, s.justifyCenter, { height: 60, width: 60 }]}>
                <Plus color={COLORS.white} />
            </View>
            <Text style={[s.textBase, s.medium]}>Criar um novo treino</Text>
        </TouchableOpacity>
    </Link>

const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Você ainda não criou nenhum treino!'
        description='Começe criando um treino para se exercitar'>
        <Button text='Criar treino' variant='secondary' asLink={'/new-workout'} />
    </MessageView>


export default function WorkoutsList({ search }: { search: string }) {


    const { data: workouts = [], isFetching, isError, isRefetching, refetch } = useQuery({
        queryKey: ['workouts', { search }],
        queryFn: () => WorkoutApi.findAll({ search })
    })


    return (
        <View style={[s.p12]}>
            {/* <Text style={[s.textGray800, s.semibold, s.textXL]}>Meus treinos</Text> */}
            {/* <View style={[s.py24, s.gap12]}> */}

            {isFetching
                ? <SkeletonList length={3} />
                : isError
                    ? <MessageView
                        icon={X}
                        message='Não conseguimos buscar seus treinos!'
                        description='Verifique sua conexão e tente novamente'
                    >
                        <Button
                            isLoading={isRefetching}
                            onPress={() => refetch()}
                            variant='secondary'
                            text='Tentar novamente' />
                    </MessageView>

                    : !workouts.length
                        ? search ?
                            <MessageView
                                icon={Search}
                                message='Sem resultados'
                                description={`Não encontramos um resultado para '${search}'`}
                            />
                            : <EmptyComponent />
                        : <View style={[s.gap12]}>
                            {workouts.map((workout, i) => (
                                <WorkoutListCard workout={workout} key={`${i},${workout.id}`} index={i} />
                            ))}
                            <NewWorkoutCard />
                        </View>
            }

            {/* </View> */}
        </View>
    )
}