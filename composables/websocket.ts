import { io } from "socket.io-client";
import { useLocalStorage } from "@vueuse/core";
import { buildApiUrl } from "~/lib/utils";
import type { IPlayer } from "~/types/player";
import type { IRoom } from "~/types/room";

type RoomDataResponse = {
  players: IPlayer[];
  room: IRoom;
};

export function connectWebsocket() {
  const token = useLocalStorage("game-token", "").value;

  const socket = io(buildApiUrl("/rooms"), {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.on("connect", () => {
    console.log("Connected!");
  });

  socket.on("update", ({ players, room }: RoomDataResponse) => {
    useConnectedPlayers().value = players;
    useRoom().value = {
      ...room,
      state: "idle",
    };
  });
}
