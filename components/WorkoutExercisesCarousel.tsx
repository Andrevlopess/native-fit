import { IExercise } from "@/types/exercise";
import ExerciseDetailedCard from "./ExerciseDetailedCard";
import { CarouselList } from "./ui/CarouselList";
import { SCREEN_WIDTH } from "@/constants/Dimensions";

const MARGIN_HORIZONTAL = 12;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8


export const WorkoutExercisesCarousel = ({ exercises }: { exercises: IExercise[] }) => {

    const renderItem = ({ item }: { item: IExercise }) =>
        <ExerciseDetailedCard
            exercise={item}
            cardWitdh={ITEM_WIDTH}
            marginHorizontal={MARGIN_HORIZONTAL}
        />

    return (
        <>
            <CarouselList
                data={exercises}
                renderItem={renderItem}
                itemWidth={ITEM_WIDTH}
                marginHorizontal={MARGIN_HORIZONTAL}
            />
        </>
    )
}