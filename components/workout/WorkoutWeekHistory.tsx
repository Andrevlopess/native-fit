import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import LoadingView from '../views/LoadingView';
import { useFetchWorkoutsHistory } from '@/hooks/useFetchWorkoutHistory';
import { useFetchWorkedOutDays } from '@/hooks/useFetchWorkedOutDarys';

interface WeekDayCardProps {
    day: Date;
    hasDone: boolean;
}

const WeekDayCard = ({ day, hasDone }: WeekDayCardProps) =>

    <View style={[s.itemsCenter, s.flex1]}>
        <Text style={[s.textBase, s.bold, s.textCapitalize]}>
            {day.toLocaleDateString('pt-br', { weekday: 'short' })}
        </Text>
        <Text style={[s.textLG, s.bold]}>{day.getDate()}</Text>
        {hasDone &&
            <Check color={COLORS.green} />
        }
    </View>



interface WorkoutWeekHistoryProps {
    workoutId?: string;
}

export default function WorkoutWeekHistory({ workoutId }: WorkoutWeekHistoryProps) {

    const { data: dates, isPending } = useFetchWorkedOutDays()


    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

    var firstday = new Date(curr.setDate(first))

    let weekDays = Array.from({ length: 7 }, (_, i) => {
        let date = new Date(firstday);
        date.setDate(firstday.getDate() + i);
        return date;
    });

    const doneDays = dates?.map(date => new Date(date.done_at).getDate());

    return (
        <View style={[s.flex1, s.flexRow, s.px12]}>

            {isPending
                ? <LoadingView />
                : doneDays &&
                weekDays.map(day =>
                    <WeekDayCard
                        day={day}
                        hasDone={doneDays.includes(day.getDate())}
                        key={day.getDate()} />)



            }

        </View>
    )
}