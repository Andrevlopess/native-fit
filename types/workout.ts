import { IExercise } from "./exercise";

export interface IWorkout {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  createdAt: string;
}
export interface IWorkoutDetails extends IWorkout {
  ownerName:string;
  exercises: IExercise[];
}