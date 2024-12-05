import type { EDifficulty } from "~/types/questions";

export interface IRoom {
  code: string;
  name: string;
  questionCount: number;
  maxPlayerCount: number;
  difficulty: EDifficulty;
}
