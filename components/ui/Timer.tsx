import { s } from '@/styles/global';
import React, { useEffect, useState } from 'react';
import { Text, Vibration } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';


interface TimerProps {
    timer: number,
    onTimerEnd: () => void;
}

export default function Timer({ timer: initialTimer, onTimerEnd }: TimerProps) {

    const [timer, setTimer] = useState<number>(initialTimer);
    const timerBar = useSharedValue(initialTimer);

    useEffect(() => {
        if (timer <= 0) {
            // setTimer(10)
            Vibration.vibrate()
            onTimerEnd();
            return;
        }

        const timeout = setTimeout(() => {
            setTimer(prev => prev - 1);

            timerBar.value = withTiming(timer - 1, {
                duration: 1000,
                easing: Easing.linear,
            });
        }, 1000);

        return () => clearTimeout(timeout);
    }, [timer]);

    const formatTime = (timer: number) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // const handleAddSeconds = (seconds: number) => {
    //     const newTimer = timer + seconds;

    //     setTimer(newTimer);

    //     setMaxTimer(prev => Math.max(prev, newTimer));

    //     timerBar.value = withTiming(newTimer, {
    //         duration: 500,
    //         easing: Easing.out(Easing.ease),
    //     });
    // }

    // const handleRemoveSeconds = (seconds: number) => {
    //     if (timer > seconds) {
    //         const newTimer = timer - seconds;

    //         setTimer(newTimer);
    //         setMaxTimer(prev => Math.min(prev, newTimer));

    //         timerBar.value = withTiming(newTimer, {
    //             duration: 500,
    //             easing: Easing.out(Easing.ease),
    //         });
    //     }
    // }

    // const anim = useAnimatedStyle(() => {
    //     return {
    //         width: `${(timerBar.value / timer) * 100}%`, // Use maxTimer for width calculation
    //     };
    // });


    return  <Text style={[s.bold, s.text7XL, s.textCenter]}>{formatTime(timer)}</Text>
 


    // return (
    //     <View style={[
    //         s.gap12,
    //         s.p12,
    //         s.justifyBetween,
    //         s.radius12,
    //         s.relative,
    //         s.bgGray50,
    //         { overflow: 'hidden' }
    //     ]}>
    //         {/* <Animated.View style={[s.bgIndigo600, s.absolute, anim, { bottom: 0, height: 3 }]} /> */}
    //         <View style={[s.flexRow, s.gap12, s.itemsCenter, s.justifyBetween]}>
    //             <Button
    //                 disabled={timer < 30}
    //                 text='-30'
    //                 variant='tertiary'
    //                 // onPress={() => handleRemoveSeconds(30)}
    //             />
    //             <Button
    //                 text='+30'
    //                 variant='tertiary'
    //                 // onPress={() => handleAddSeconds(30)}
    //             />
    //         </View>
    //     </View>
    // );
}
