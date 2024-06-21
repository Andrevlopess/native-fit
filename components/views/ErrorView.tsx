import { View, Text } from 'react-native'
import React, { ElementType } from 'react'
import { s } from '@/styles/global';
import { Inbox } from 'lucide-react-native';
import COLORS from '@/constants/Colors';

interface ErrorViewProps {
    icon?: ElementType;
    title: string;
    description: string
}


export default function ErrorView({ icon: Icon, title, description }: ErrorViewProps) {
    return (
        <View style={[s.flex1, s.itemsCenter, s.justifyCenter, s.gap4, s.bgWhite, s.p24]}>
            {Icon
                ? <Icon size={144} color={COLORS.gray} />
                : <Inbox size={144} color={COLORS.gray} />
            }
            <Text style={[s.bold, s.text2XL, s.mt12, s.textCenter]}>{title}</Text>
            <Text style={[s.medium, s.textBase, s.textGray500, s.textCenter]}>{description}</Text>
        </View>
    )
}