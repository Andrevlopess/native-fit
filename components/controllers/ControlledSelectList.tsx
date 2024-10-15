// import { MapPinned } from 'lucide-react-native'
// import React from 'react'
// import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
// import { SelectList, SelectProps } from '../ui/SelectList'

// export function ControlledSelectList<FormType extends FieldValues>({
//     control, name, rules, data, ...selectProps }
//     : UseControllerProps<FormType> & SelectProps) {
//     return (
//         <Controller
//             name={name}
//             control={control}
//             rules={rules}
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//                 <SelectList
//                     {...selectProps}
//                     data={data}
//                     error={error?.message}
//                     defaultValue={value}
//                     onChange={(option) => onChange(option)}
//                 />
//             )}
//         />
//     )
// }

