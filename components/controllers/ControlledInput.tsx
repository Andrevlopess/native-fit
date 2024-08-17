// import React from 'react'
// import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
// import Input, { IInputProps } from '../ui/Input'

// export function ControlledInput<FormType extends FieldValues>({
//     control, name, rules, ...inputProps }
//     : UseControllerProps<FormType> & IInputProps) {
//     return (
//         <Controller

//             name={name}
//             control={control}
//             rules={rules}
//             render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
//                 <Input
//                     ref={ref}
//                     {...inputProps}
//                     value={value}
//                     onBlur={onBlur}
//                     error={error?.message ?? inputProps.error}
//                     onChangeText={onChange}
//                     autoCapitalize='none'
//                 />
//             )}
//         />
//     )
// }

// import React from 'react';
// import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
// import Input, { IInputProps } from '../ui/Input';
// import { TextInput } from 'react-native';

// type ControlledInputProps<T>
//     = UseControllerProps<T> & IInputProps;

// export const ControlledInput = React.forwardRef<TextInput, ControlledInputProps<FormType extends FieldValues>>(
//     ({ control, name, rules, ...inputProps }, ref) => {
//         return (
//             <Controller
//                 name={name}
//                 control={control}
//                 rules={rules}
//                 render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
//                     <Input
//                         {...inputProps}
//                         ref={ref}
//                         value={value}
//                         onBlur={onBlur}
//                         error={error?.message ?? inputProps.error}
//                         onChangeText={onChange}
//                         autoCapitalize='none'
//                     />
//                 )}
//             />
//         );
//     }
// );

import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native';
import Input, { IInputProps } from '../ui/Input';

type ControlledInputProps<FormType extends FieldValues> = UseControllerProps<FormType> & IInputProps;

function ControlledInputInner<FormType extends FieldValues>(
    { control, name, rules, ...inputProps }: ControlledInputProps<FormType>,
    ref: React.Ref<TextInput>
) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                    {...inputProps}
                    ref={ref}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message ?? inputProps.error}
                    onChangeText={onChange}
                    autoCapitalize="none"
                />
            )}
        />
    );
}

export const ControlledInput = React.forwardRef(ControlledInputInner) as <FormType extends FieldValues>(
    props: ControlledInputProps<FormType> & { ref?: React.Ref<TextInput> }
) => React.ReactElement;


