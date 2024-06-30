import { IExercise } from "./exercise";

export interface IWorkout {
  id: string;
  name: string;
  description: string;
  createdat: string;
  ownerid: string;
}
export interface IWorkoutDetails extends IWorkout {
  ownername:string;
  exercises: IExercise[];
}