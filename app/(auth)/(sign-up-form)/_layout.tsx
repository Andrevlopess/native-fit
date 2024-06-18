import { FormProvider } from '@/contexts/FormContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function SignUpFormLayout() {

  const initialValues = {
    
  }

  return (
    <FormProvider initialValues={initialValues}>
      <Stack screenOptions={{ headerShadowVisible: false }}/>
    </FormProvider>
  )
}