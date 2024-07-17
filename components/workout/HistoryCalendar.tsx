import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';

import { LocaleConfig } from 'react-native-calendars';
import Modal from '../ui/Modal';
import { useModal } from '@/hooks/useModal';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { IWorkoutHistory } from '@/types/workout';
import { useFetchWorkoutsHistory } from '@/hooks/useFetchWorkoutHistory';
import LoadingView from '../views/LoadingView';

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: [
        'Jan.',
        'Fev.',
        'Mar.',
        'Abr.',
        'Mai.',
        'Jun.',
        'Jul.',
        'Ago.',
        'Set.',
        'Out.',
        'Nov.',
        'Dez.'
    ],
    dayNames: [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ],
    dayNamesShort: [
        'Dom.',
        'Seg.',
        'Ter.',
        'Qua.',
        'Qui.',
        'Sex.',
        'Sáb.'
    ],
    today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt-br';

function format(date: Date) {
    return date.toISOString().split('T')[0]
}

let today = format(new Date())


const theme = {
    stylesheet: {
        calendar: {
            header: {
                dayHeader: {
                    fontWeight: '600',
                    color: COLORS.indigo
                }
            }
        }
    },
    'stylesheet.day.basic': {
        today: {
            borderColor: COLORS.gray900,
            borderWidth: 0.8
        },
        todayText: {
            color: COLORS.indigo,
            fontWeight: '800'
        }
    }
};

type MarkedDate = Record<string, { selected: boolean }>

export const HistoryCalendar = () => {
    const [selected, setSelected] = useState<IWorkoutHistory | null>(null);

    // const { history, isPending } = useFetchWorkoutsHistory()
    const history: IWorkoutHistory[] = [{ "done_at": "2024-07-16T20:32:18.042681+00:00", "id": "f88d51d9-c1d2-4a41-bcd8-97a9b9860f89", "workouts": { "createdat": "2024-02-17T13:20:22.130968+00:00", "description": "vatomanocu", "id": "39254871-cdaf-4a2c-8836-fe9a3dad4107", "name": "treineira de peitola", "ownerid": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }, { "done_at": "2024-07-17T20:32:18.042681+00:00", "id": "32dbb0c6-b533-424a-a6a2-29ea5a29084c", "workouts": { "createdat": "2024-02-17T13:20:22.130968+00:00", "description": "vatomanocu", "id": "39254871-cdaf-4a2c-8836-fe9a3dad4107", "name": "treineira de peitola", "ownerid": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }, { "done_at": "2024-07-15T20:32:18.042681+00:00", "id": "95807d28-7ac1-41b8-ba12-b58e704bf357", "workouts": { "createdat": "2024-06-26T17:11:52.58114+00:00", "description": "descrição de frango", "id": "48f2846e-7f8e-495d-afda-f2ff607c339a", "name": "treino de frango", "ownerid": "84f13dde-923f-4aa7-a706-4d2810f12c3c" } }]



    // Convert dates to calendar format (yyyy-mm-dd)
    const dates = history?.map(item => format(new Date(item.done_at)));

    // Remove duplicate values
    const markedDates = [...new Set(dates)];

    // Create an object with each date as a key and the desired properties
    const marked:
        MarkedDate =
        markedDates.reduce<MarkedDate>((acc, date) => {
            acc[date] = { selected: true };
            return acc;
        }, {});


    const onDayPress = useCallback((day: DateData) => {

        const workoutOfDay =
            history?.find(history => format(new Date(history.done_at)) === day.dateString)

        console.log(workoutOfDay);

        if (workoutOfDay) {
            setSelected(workoutOfDay);
            open();
        }
    }, []);


    const { ref, open, close } = useModal()

    return (
        <>
            {
                false
                    ? <LoadingView />
                    : <>
                        <CalendarList
                            current={today}
                            pastScrollRange={12}
                            futureScrollRange={0}
                            onDayPress={onDayPress}
                            markedDates={marked}
                            renderHeader={renderCustomHeader}
                            theme={{
                                textDayStyle: s.medium,
                                selectedDayBackgroundColor: COLORS.indigo,
                                selectedDayTextColor: COLORS.white
                            }}
                        />

                        {selected &&
                            <Modal ref={ref} snapPoints={['50%']} >
                                <BottomSheetView
                                    style={[s.p12]}
                                >
                                    <Text>{selected?.workouts.name}</Text>

                                </BottomSheetView>
                            </Modal>
                        }

                    </>
            }


        </>


    );
};


function renderCustomHeader(date: any) {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');

    return (
        <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, s.py8, s.flex1]}>
            <Text style={[s.textXL, s.semibold, s.textIndigo600]}>{month}</Text>
            <Text style={[s.textXL, s.semibold, s.textIndigo600]}>{year}</Text>
        </View>
    );
}
