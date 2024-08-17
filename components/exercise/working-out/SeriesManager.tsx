import { ControlledMaskedInput } from '@/components/controllers/ControlledMaskedInput';
import Button from '@/components/ui/Button';
import { IInputProps } from '@/components/ui/Input';
import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { Gauge, Weight, X } from 'lucide-react-native';
import React from 'react';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { createNumberMask } from 'react-native-mask-input';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SerieValues } from './WorkingOutExerciseCard';

const WEIGHT_MASK = createNumberMask({
    prefix: [''],
    separator: ',',
    delimiter: '.',
    precision: 2,
});

interface SeriesManagerProps extends Pick<IInputProps, 'onFocus' | 'onBlur'> {
    field: FieldArrayWithId<SerieValues>;
    control: Control<SerieValues>
    index: number;
    handleRemove: (index: number) => void;
}

export default function SeriesManager({ field, control, index, handleRemove, onFocus, onBlur }: SeriesManagerProps) {

    return (
        <Animated.View key={field.id} entering={FadeInDown} style={[s.flexRow, s.gap8]}>
            <ControlledMaskedInput
                containerStyles={[s.flex1]}
                name={`serie.${index}.weight`}
                control={control}
                value={field.weight}
                placeholder='Carga'
                keyboardType='numeric'
                onFocus={onFocus}
                onBlur={onBlur}
                icon={Weight}
                mask={WEIGHT_MASK}
            />

            <ControlledMaskedInput
                containerStyles={[s.flex1]}
                name={`serie.${index}.reps`}
                control={control}
                keyboardType='numeric'
                placeholder='Repetições'
                value={field.reps}
                onFocus={onFocus}
                onBlur={onBlur}
                icon={Gauge}
            />
            {!!index &&
                <Button onPress={() => handleRemove(index)} variant='ghost'>
                    <X color={COLORS.black} />
                </Button>
            }
        </Animated.View>
    )
}
