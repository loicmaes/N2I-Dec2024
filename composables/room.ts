import type { IPlayer } from "~/types/player";
import type { IRoom } from "~/types/room";

export const useConnectedPlayers = () => useState<IPlayer[]>("connectedPlayers", () => []);
export const usePlayer = () => useState<IPlayer | null>("player", () => null);
export const useRoom = () => useState<IRoom | null>("room", () => null);

// TODO: fire
export const useFakeConnectedPlayers = () => useState<IPlayer[]>("connectedPlayers", () => [
  /* {
    id: 1,
    name: "Patrick",
    owner: false,
  }, */
  {
    id: 2,
    name: "Moi",
    owner: true,
  },
]);
export const useFakePlayer = () => useState<IPlayer>("player", () => ({
  id: 2,
  name: "Moi",
  owner: true,
}));
export const useFakeRoom = () => useState<IRoom>("room", () => ({
  code: "EDFEDC",
  name: "My Room",
  questionCount: 1,
  maxPlayerCount: 3,
  difficulty: "easy",
}));
