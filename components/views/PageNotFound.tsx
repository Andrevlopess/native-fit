import { View, Text } from 'react-native'
import React from 'react'
import MessageView from './MessageView'
import { ShieldOff } from 'lucide-react-native'

export default function PageNotFound() {
    return (
        <MessageView
            icon={ShieldOff}
            message='Essa página não existe'
            description='É um erro você ter chegado até aqui, já estamos resolvendo!'
        />
    )
}