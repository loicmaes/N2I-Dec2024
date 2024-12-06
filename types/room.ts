import type { EDifficulty } from "~/types/questions";

type EState = "idle" | "starting" | "playingRound" | "roundResume" | "ending" | "ended";

export interface IRoom {
  code: string;
  name: string;
  questionCount: number;
  maxPlayers: number;
  difficulty: EDifficulty;
  state: EState;
}

export interface ICreateRoom {
  difficulty: EDifficulty;
  playerName: string;
  roomName: string;
  maxPlayers: number;
  questionCount: number;
}
export interface IJoinRoom {
  roomCode: string;
  playerName: string;
}
