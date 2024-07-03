import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { s } from "@/styles/global";
import { IExercise } from "@/types/exercise";
import { Inbox } from "lucide-react-native";
import ExerciseDetailedCard from "./ExerciseDetailedCard";
import Button from "./ui/Button";
import { CarouselList } from "./ui/CarouselList";
import MessageView from "./views/MessageView";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

const MARGIN_HORIZONTAL = 12;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8


interface WorkoutExercisesCarouselProps { exercises: IExercise[], workoutId: string }


export const WorkoutExercisesCarousel = ({ exercises, workoutId }: WorkoutExercisesCarouselProps) => {

    const renderItem = ({ item }: { item: IExercise }) =>
        <ExerciseDetailedCard
            exercise={item}
            cardWitdh={ITEM_WIDTH}
            marginHorizontal={MARGIN_HORIZONTAL}
        />


    return (
        <Animated.View entering={FadeIn}>

            <View style={[s.justifyBetween, s.itemsCenter, s.flexRow, s.p12]}>
                <Text style={[s.bold, s.textXL]}>Exercícios</Text>
                <Link asChild href={`/(app)/(modals)/exercises-to-add/${workoutId}`}>
                    <Button text='Adicionar' variant='tertiary' size='small' rounded />
                </Link>
            </View>

            {
                exercises.length
                    ? <CarouselList
                        data={exercises}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        itemWidth={ITEM_WIDTH}
                        marginHorizontal={MARGIN_HORIZONTAL}
                    />
                    : <MessageView
                        icon={Inbox}
                        message="Começe adicionando exercícios"
                        description="Busque exercícios para adicionar a este treino"
                        actionButton={
                            <Button
                                variant="secondary"
                                size="small"
                                text="Adicionar exercício"
                                asLink={`/(app)/(modals)/exercises-to-add/${workoutId}`}
                            />
                        }
                    />

            }

        </Animated.View>
    )
}