
import { IWorkout } from "@/types/workout";
import { createContext, useContext, useState } from "react";





interface WorkoutContextValues {
    workout: IWorkout;
    setCurrentWorkout: (workout: IWorkout) => void;
}

const WorkoutContext = createContext<WorkoutContextValues>({} as WorkoutContextValues)

export const WorkoutProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const [workout, setWorkout] = useState<IWorkout>({} as IWorkout)

    const setCurrentWorkout = (workout: IWorkout) => {
        setWorkout(workout)
    }


    return (
        <WorkoutContext.Provider value={{ workout, setCurrentWorkout }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkout = () => useContext(WorkoutContext);
