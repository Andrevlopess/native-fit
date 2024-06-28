import { s } from '@/styles/global';
import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Badge } from './Badge';

interface BadgesControlProps {
    badges: string[];
    onSelect: (bagde: string) => void
    selectedBadge: string;
    disabled?: boolean;

}

export function BadgesControl({ badges, selectedBadge, disabled, onSelect }: BadgesControlProps) {

    const renderItem = ({ item }: { item: string }) =>
        <Badge
            disabled={disabled}
            isSelected={selectedBadge === item}
            text={item}
            onPress={() => onSelect(selectedBadge === item ? '' : item)} />

    return (
        <Animated.FlatList
            layout={LinearTransition.springify().stiffness(500).damping(60)}
            data={badges}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[s.bgWhite, s.py8]}
            contentContainerStyle={[s.gap8]}
            renderItem={renderItem}
            keyExtractor={item => item}
        />
    )
}