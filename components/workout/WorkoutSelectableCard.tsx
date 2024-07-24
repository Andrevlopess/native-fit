import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import { IWorkout } from "@/types/workout";
import { CheckCircle, CheckCircle2, Circle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";


interface SelectableWorkoutListCardProps {
    workout: IWorkout;
    onSelect: (id: string) => void;
    isSelected: boolean
}
export const SelectableWorkoutListCard =
    ({ workout: { id, name, description }, isSelected, onSelect }: SelectableWorkoutListCardProps) => {
        return (
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => onSelect(id)}
                style={[s.flexRow, s.gap12, s.itemsCenter]}>
                <View style={[s.bgGray200, s.radius14, { height: 60, width: 60 }]} />
                <View style={[s.gap4]}>
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {name}
                    </Text>
                    <Text style={[s.regular, s.textGray400]}>{description}</Text>
                </View>

                <View style={[s.radiusFull, s.bgGray100, s.p6, s.mlAuto]}>
                    {isSelected
                        ? <CheckCircle2 size={28} color={COLORS.indigo} />
                        : <Circle size={28} color={COLORS.gray} />}
                </View>
            </TouchableOpacity>

        )
    }