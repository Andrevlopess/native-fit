import { View, Text } from 'react-native'
import React, { ElementType } from 'react'
import { s } from '@/styles/global';
import { Inbox } from 'lucide-react-native';
import COLORS from '@/constants/Colors';

interface MessageViewProps {
    icon?: ElementType;
    message: string;
    description: string;
    actionButton?: React.ReactNode
}


export default function MessageView({ icon: Icon, message, description, actionButton }: MessageViewProps) {
    return (
        <View style={[
            s.flex1,
            s.itemsCenter,
            s.justifyCenter,
            s.gap4,
            s.bgWhite,
            s.p12,
            s.mt42
            ]}>

            {Icon && <Icon size={96} color={COLORS.gray} strokeWidth={1.4} />}

            <Text style={[s.bold, s.textXL, s.mt12, s.textCenter]}>{message}</Text>
            <Text style={[s.medium, s.textBase, s.textGray500, s.textCenter, {marginBottom: 24}]}>{description}</Text>

            {actionButton}
        </View>
    )
}