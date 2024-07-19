export type BodyPart =
  | "costas"
  | "cardio"
  | "peito"
  | "antebraço"
  | "panturrilha"
  | "pescoço"
  | "ombro"
  | "bíceps/tríceps"
  | "quadriceps/posterior"
  | "core";
export type Target =
  | "abdutores"
  | "abdômen"
  | "adutores"
  | "bíceps"
  | "panturrilha"
  | "deltóides"
  | "antebraços"
  | "glúteos"
  | "isquiotibiais"
  | "dorsal"
  | "peitoral"
  | "quadríceps"
  | "serrátil"
  | "coluna"
  | "trapézio"
  | "tríceps"
  | "superioriores"
  | "latíssimo"
  | "cardio"
  | "escapula";

export type Equipment =
  | "com ajuda"
  | "elástico"
  | "barra"
  | "peso do corpo"
  | "meia bola"
  | "cabo"
  | "halter"
  | "barra W"
  | "martelo"
  | "kettlebell"
  | "graviton"
  | "bola"
  | "barra olímpica"
  | "elástico de resistência"
  | "rolo"
  | "corda naval"
  | "maquina SkiErg"
  | "hack"
  | "maquina smith"
  | "bola de estabiliade"
  | "bicicleta ergométrica"
  | "escada"
  | "pneu"
  | "barra hexagonal"
  | "cicloergômetro"
  | "anilha"
  | "roda"
  | "elíptico";

export type Filter = BodyPart | Equipment | Target;

export interface IExercise {
  id: string;
  name: string;
  bodypart: string;
  target: string;
  equipment: string;
  gifurl: string;
}

export interface IDetailedExercise extends IExercise {
  notes?: string;
}
