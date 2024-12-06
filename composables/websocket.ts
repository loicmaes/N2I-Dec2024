import { io } from "socket.io-client";
import { useLocalStorage } from "@vueuse/core";
import { buildApiUrl } from "~/lib/utils";
import type { IPlayer } from "~/types/player";
import type { IRoom } from "~/types/room";
import type { IQuestion } from "~/types/questions";

type RoomDataResponse = {
  players: IPlayer[];
  room: IRoom;
};
type QuestionDataResponse = {
  question: IQuestion;
  endAt: string;
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

  socket.on("onRoundStart", ({ question, endAt }: QuestionDataResponse) => {
    useAnswer().value = [];

    useQuestion().value = question;
    useRoundEndAt().value = new Date(endAt);
    const room = useRoom();
    if (!room.value) return;
    room.value = {
      ...room.value,
      state: "playingRound",
    };

    navigateTo(`/game/${room.value.code}/challenge`);
  });
}
