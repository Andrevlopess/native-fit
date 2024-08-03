import { ControlledInput } from '@/components/controllers/ControlledInput';
import Button from '@/components/ui/Button';
import { s } from '@/styles/global';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function SeriesManager() {

    const { control, register } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, 
        name: "serie", 
    });

    return (
        <View style={[s.flex1, s.p12, s.flexRow, s.justifyBetween, s.itemsCenter]}>
            <Text style={[s.bold, s.textXL, s.px12]}>Séries</Text>
            <Button variant='secondary' text='Nova série' size='small' onPress={() => { }} />

            {fields.map((field, index) =>
                <ControlledInput
                    name={`serie.${index}.`}
                    control={control}
                />)}
        </View>
    )
}
