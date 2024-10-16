// import { router } from 'expo-router';
// import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

// export interface IFormContext<T> {
//     values: T;
//     updateValues: (data: Partial<T>) => void;
//     dimissFormStack: () => void;
// }

// export const FormContext = createContext<IFormContext<any>>({} as IFormContext<any>);

// interface FormProviderProps<T> {
//     children: ReactNode;
//     initialValues: T;
// }

// export function FormProvider<T>({ children, initialValues }: FormProviderProps<T>) {
//     const [formData, setFormData] = useState<T>(initialValues);

//     const updateFormData = useCallback((updatedData: Partial<T>) => {
//         setFormData((prevData) => ({ ...prevData, ...updatedData }));
//     }, []);

//     const contextValue = useMemo(() => ({
//         values: formData,
//         updateValues: updateFormData,
//         dimissFormStack
//     }), [formData, updateFormData, dimissFormStack]);

//     function dimissFormStack() {
//         router.dismissAll(); // dimiss all form stacks
//         router.canGoBack() && router.back(); // exit from the form _layout
//     }


//     return (
//         <FormContext.Provider value={contextValue}>
//             {children}
//         </FormContext.Provider>
//     );
// }

