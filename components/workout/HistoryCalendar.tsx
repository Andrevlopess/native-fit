import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import React, { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';

import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import LoadingView from '../views/LoadingView';
import { useModal } from '@/hooks/useModal';
import { router } from 'expo-router';
import MessageView from '../views/MessageView';
import Divisor from '../ui/Divisor';
import { WorkoutApi } from '@/api/workout-api';

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


let today = new Date().toISOString().split('T')[0]

export const HistoryCalendar = () => {

    const { data: dates, isPending } = useQuery({
        queryKey: ['history-dates'],
        queryFn: WorkoutApi.fetchHistory
    });

    

    const marked = dates?.reduce<MarkedDates>((acc, item, index, arr) => {
        const isStartingDay =
            index === 0 || new Date(arr[index - 1]).getTime()
            !== new Date(item).getTime() - 86400000;
        const isEndingDay =
            index === arr.length - 1
            || new Date(arr[index + 1]).getTime() !== new Date(item).getTime() + 86400000;

        acc[item] =
        {
            selected: true,
            disabled: false,
            color: COLORS.indigo,
            textColor: COLORS.white,
            customContainerStyle: s.radius12
        };

        if (isStartingDay) {
            acc[item].startingDay = true;
        } else if (isEndingDay) {
            acc[item].endingDay = true;
        }

        return acc;
    }, {});

    const onDayPress = useCallback((day: DateData) => {

        // avoid clicking an non workedout day
        if (marked && !Object.keys(marked).includes(day.dateString)) return;

        router.push(`/workouts/history/${day.dateString}`)

    }, [marked]);

    function renderCustomHeader(date: any) {
        const header = date.toString('MMMM yyyy');
        const [month, year] = header.split(' ');

        return (
            <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, s.py8, s.flex1]}>
                <Text style={[s.textXL, s.semibold, s.textIndigo600]}>{month}</Text>
                {isPending && <ActivityIndicator color={COLORS.indigo} />}

                <Text style={[s.textXL, s.semibold, s.textIndigo600]}>{year}</Text>
            </View>
        );
    }


    const pastScrollRange = (() => {
        if (!dates || dates.length < 2) {
            return 0;
        }

        const startDateStr = dates[0];
        const endDateStr = dates[dates.length - 1];

        const startMonth = new Date(startDateStr).getMonth();
        const endMonth = new Date(endDateStr).getMonth();

        return endMonth - startMonth;
    })();

    return (
        <>
            {
                isPending
                    ? <LoadingView />
                    : <CalendarList
                        markingType='period'
                        current={today}
                        pastScrollRange={pastScrollRange}
                        futureScrollRange={0}
                        onDayPress={onDayPress}
                        markedDates={marked}
                        ListHeaderComponent={<Text style={[s.bold, s.text3XL, s.bgWhite, s.p12]}>Histórico</Text>}
                        ItemSeparatorComponent={() => <Divisor />}
                        disabledByDefault
                        disableAllTouchEventsForDisabledDays
                        disableAllTouchEventsForInactiveDays
                        renderHeader={renderCustomHeader}
                        theme={{
                            textDayFontFamily: 'Inter_500Medium',
                            textMonthFontFamily: 'Inter_500Medium',
                            todayTextColor: COLORS.indigo,
                            textDayStyle: s.medium,
                            textDisabledColor: COLORS.iosTextGray,
                            selectedDayBackgroundColor: COLORS.indigo,
                            selectedDayTextColor: COLORS.white,
                        }}
                    />


            }

        </>
    );
};