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
type SummaryDataResponse = {
  players: (IPlayer & {
    score: number;
    roomCode: string;
  })[];
  question: IQuestion;
  endAt: string;
};
type GameEndDataResponse = {
  room: IRoom;
  players: (IPlayer & {
    score: number;
    roomCode: string;
  })[];
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
    useSubmitted().value = false;

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

  socket.on("onRoundSummary", ({ players, question, endAt }: SummaryDataResponse) => {
    useConnectedPlayers().value = players;
    useQuestion().value = question;
    useRoundEndAt().value = new Date(endAt);

    navigateTo(`/game/${useRoom().value?.code}/summary`);
  });

  socket.on("onRoomEnd", ({ room, players }: GameEndDataResponse) => {
    useConnectedPlayers().value = players;

    const usedRoom = useRoom();
    usedRoom.value = {
      ...room,
      state: "ending",
    };

    navigateTo(`/game/${usedRoom.value.code}/overview`);
  });
}
