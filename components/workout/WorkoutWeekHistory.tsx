import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import LoadingView from '../views/LoadingView';
import { useFetchWorkoutsHistory } from '@/hooks/useFetchWorkoutHistory';

// const history = [{ "done_at": "2024-07-16T20:32:18.042681+00:00", "id": "f88d51d9-c1d2-4a41-bcd8-97a9b9860f89", "workouts": { "created_at": "2024-02-17T13:20:22.130968+00:00", "description": "vatomanocu", "id": "39254871-cdaf-4a2c-8836-fe9a3dad4107", "name": "treineira de peitola", "owner_id": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }, { "done_at": "2024-07-16T20:32:18.042681+00:00", "id": "32dbb0c6-b533-424a-a6a2-29ea5a29084c", "workouts": { "created_at": "2024-02-17T13:20:22.130968+00:00", "description": "vatomanocu", "id": "39254871-cdaf-4a2c-8836-fe9a3dad4107", "name": "treineira de peitola", "owner_id": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }, { "done_at": "2024-07-16T20:32:18.042681+00:00", "id": "95807d28-7ac1-41b8-ba12-b58e704bf357", "workouts": { "created_at": "2024-06-26T17:11:52.58114+00:00", "description": "descrição de frango", "id": "48f2846e-7f8e-495d-afda-f2ff607c339a", "name": "treino de frango", "owner_id": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }]

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

    const { history, isPending } = useFetchWorkoutsHistory();

    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

    var firstday = new Date(curr.setDate(first))

    let weekDays = Array.from({ length: 7 }, (_, i) => {
        let date = new Date(firstday);
        date.setDate(firstday.getDate() + i);
        return date;
    });

    const doneDays = history?.map(history => new Date(history.done_at).getDate());

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