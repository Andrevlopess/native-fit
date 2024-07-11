import { IExercise } from "./exercise";

export interface IWorkout {
  id: string;
  name: string;
  description: string;
  createdat: string;
  ownerid: string;
  ownername?: string;
  exercises?: IExercise[];
}