import { ControlledInput } from '@/components/controllers/ControlledInput';
import Button from '@/components/ui/Button';
import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { X } from 'lucide-react-native';
import React from 'react';
import { Control, FieldArrayWithId, useFieldArray } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { SerieValues } from './WorkingOutExerciseCard';

interface SeriesManagerProps {
    field: FieldArrayWithId<SerieValues>;
    control: Control<SerieValues>
    index: number;
    handleRemove: (index: number) => void;
}

export default function SeriesManager({ field, control, index, handleRemove }: SeriesManagerProps) {

    return (
        <Animated.View key={field.id} entering={FadeInDown} style={[s.flexRow, s.gap8]}>
            <ControlledInput
                name={`serie.${index}.weight`}
                control={control}
                value={field.weight}
                placeholder='Carga em kg'
                keyboardType='numeric'
            />

            <ControlledInput
                name={`serie.${index}.reps`}
                control={control}
                keyboardType='numeric'
                placeholder='Repetições'
                value={field.reps}
            />
            {!!index &&
                <Button onPress={() => handleRemove(index)} variant='ghost'>
                    <X color={COLORS.black} />
                </Button>
            }
        </Animated.View>
    )
}
