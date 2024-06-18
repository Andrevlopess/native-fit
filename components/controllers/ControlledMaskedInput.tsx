import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native';
import MaskedInput, { MaskedInputProps } from '../ui/MaskedInput';

type ControlledMaskedInput<FormType extends FieldValues> = UseControllerProps<FormType> & MaskedInputProps;

function ControlledMaskedInputInner<FormType extends FieldValues>(
    { control, name, rules, ...maskedInputProps }: ControlledMaskedInput<FormType>,
    ref: React.Ref<TextInput>
) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MaskedInput
                    {...maskedInputProps}
                    ref={ref}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message ?? maskedInputProps.error}
                    onChangeText={onChange}
                    autoCapitalize='none'
                />
            )}
        />
    );
}

export const ControlledMaskedInput = React.forwardRef(ControlledMaskedInputInner) as <FormType extends FieldValues>(
    props: ControlledMaskedInput<FormType> & { ref?: React.Ref<TextInput> }
) => React.ReactElement;
