import { ControlledInput } from '@/components/controllers/ControlledInput';
import Button from '@/components/ui/Button';
import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react-native';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';


const SerieSchema = z.object({
    serie: z.object({
        weight: z.number(),
        reps: z.number()
    }).array()
})

export type SerieValues = z.infer<typeof SerieSchema>

export default function SeriesManager() {

    const { control, register } = useForm<SerieValues>({
        resolver: zodResolver(SerieSchema),
        defaultValues: {
            serie: [{ }]
        }
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "serie",
    });

    return (
        <View style={[s.flex1, s.p12, s.flexRow, s.justifyBetween, s.itemsCenter]}>
            <Text style={[s.bold, s.textXL, s.px12]}>Séries</Text>
            <Button variant='secondary' text='Nova série' size='small' onPress={() => append({reps: 0, weight: 0})} />

            {fields.map((field, index) =>
                <View key={field.id}>
                    <ControlledInput
                        name={`serie.${index}.weight`}
                        control={control}
                        value={field.weight.toString()}
                    />

                    <ControlledInput
                        name={`serie.${index}.reps`}
                        control={control}
                        value={field.reps.toString()}
                    />
                    <Button onPress={() => remove(index)}>
                        <X color={COLORS.red}/>
                    </Button>
                </View>
            )}
        </View>
    )
}
