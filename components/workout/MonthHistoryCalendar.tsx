import COLORS from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { s } from '@/styles/global';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import Button from '../ui/Button';
import { WorkoutApi } from '@/api/workout-api';


let today = new Date().toISOString().split('T')[0]


export default function MonthHistoryCalendar() {

    const { data: dates, isPending } = useQuery({
        queryKey: ['workout-history'],
        queryFn: () => WorkoutApi.fetchHistory({ interval: 'month' })
    })

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
        const [month] = header.split(' ');

        return (
            <View style={[s.flexRow, s.justifyBetween, s.itemsStart, s.py8, s.flex1]}>
                <Text style={[s.textXL, s.semibold, s.textIndigo600]}>Atividades de {month}</Text>
                {isPending && <ActivityIndicator color={COLORS.indigo} />}
                {/* <Text style={[s.textXL, s.semibold, s.textIndigo600]}>{year}</Text> */}
                <Button text='Ver mais' size='small' variant='tertiary' asLink={'/workouts/history'} rounded />

            </View>
        );
    }


    return (
        <Calendar
            hideArrows={true}
            onDayPress={onDayPress}
            // displayLoadingIndicator={isPending}
            markingType='period'
            current={today}
            markedDates={marked}
            renderHeader={renderCustomHeader}
            hideExtraDays
            disabledByDefault
            disableMonthChange
            disableAllTouchEventsForDisabledDays
            disableAllTouchEventsForInactiveDays
            enableSwipeMonths={false}
            theme={{
                textMonthFontFamily: 'Inter_500Medium',
                textDayFontFamily: 'Inter_500Medium',
                todayTextColor: COLORS.indigo,
                textDayStyle: s.medium,
                textDisabledColor: COLORS.iosTextGray,
                selectedDayBackgroundColor: COLORS.indigo,
                selectedDayTextColor: COLORS.white
            }}
        />

    )
}