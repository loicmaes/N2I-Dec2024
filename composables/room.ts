import { useLocalStorage } from "@vueuse/core";
import type { IPlayer } from "~/types/player";
import type { ICreateRoom, IJoinRoom, IRoom } from "~/types/room";
import { buildApiUrl } from "~/lib/utils";
import type { IFillEmptySpacesQuestionBuilder, IQuestion } from "~/types/questions";

export const useConnectedPlayers = () => useState<(IPlayer & {
  score?: number;
  roomCode?: string;
})[]>("connectedPlayers", () => []);
export const usePlayer = () => useState<IPlayer | null>("player", () => null);
export const useRoom = () => useState<IRoom | null>("room", () => null);
export async function useProtectedAccess() {
  const player = usePlayer().value;
  const room = useRoom().value;

  if (player && room)
    return;

  navigateTo("/game");
}

export const useRoundEndAt = () => useState<Date | null>("roundEndAt", () => null);
export const useQuestion = () => useState<IQuestion | null>("question", () => null);
export const useAnswer = () => useState<number[]>("answer", () => []);
export const useSubmitted = () => useState<boolean>("submitted", () => false);

export async function createRoom(payload: ICreateRoom) {
  try {
    const { token } = await $fetch<{ token: string }>(buildApiUrl("/rooms/create"), {
      method: "POST",
      body: {
        ...payload,
        difficulty: payload.difficulty.toUpperCase(),
      },
    });
    useLocalStorage("game-token", "").value = token;

    const { players, room } = await $fetch<{
      players: IPlayer[];
      room: IRoom;
    }>(buildApiUrl("/rooms/current"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    useRoom().value = {
      ...room,
      state: "idle",
    };
    useConnectedPlayers().value = players;
    usePlayer().value = players[0];
  }
  catch (e) {
    console.error(e);
  }
}

export async function joinRoom(payload: IJoinRoom) {
  try {
    const { token } = await $fetch<{ token: string }>(buildApiUrl("/rooms/join"), {
      method: "POST",
      body: {
        ...payload,
      },
    });
    useLocalStorage("game-token", "").value = token;

    const { players, room } = await $fetch<{
      players: IPlayer[];
      room: IRoom;
    }>(buildApiUrl("/rooms/current"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    useRoom().value = {
      ...room,
      state: "idle",
    };
    useConnectedPlayers().value = players;
    usePlayer().value = players[0];
  }
  catch (e) {
    console.error(e);
  }
}

export async function startGame() {
  const token = useLocalStorage("game-token", "").value;

  try {
    await $fetch(buildApiUrl("/rooms/start"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const room = useRoom();
    if (!room.value) return;
    room.value = {
      ...room.value,
      state: "starting",
    };
  }
  catch (e) {
    console.error(e);
  }
}
export async function submitAnswer() {
  const token = useLocalStorage("game-token", "").value;

  try {
    await $fetch(buildApiUrl("/questions/submit"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: buildBody(),
    });
    useSubmitted().value = true;
  }
  catch (e) {
    console.error(e);
  }
}

function buildBody() {
  const question = useQuestion().value;
  const answer = useAnswer().value;

  if (!question || !answer)
    return {};

  switch (question.type) {
    case "TEXT": case "IMAGE":
      return {
        answer: answer,
      };
    case "NEAREST":
      return {
        answer: Number(answer[0]),
      };
    case "FILL":
      return {
        answer: question.question
          .split(" ")
          .map(p =>
            p.startsWith("{") && p.endsWith("}")
              ? (question as IFillEmptySpacesQuestionBuilder).specific.candidates[answer[Number(p.substring(1, p.length - 1))]]
              : p)
          .join(" "),
      };
    default:
      return {
        answer: [],
      };
  }
}
