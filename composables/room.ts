import { useLocalStorage } from "@vueuse/core";
import type { IPlayer } from "~/types/player";
import type { ICreateRoom, IJoinRoom, IRoom } from "~/types/room";
import { buildApiUrl } from "~/lib/utils";

export const useConnectedPlayers = () => useState<IPlayer[]>("connectedPlayers", () => []);
export const usePlayer = () => useState<IPlayer | null>("player", () => null);
export const useRoom = () => useState<IRoom | null>("room", () => null);
export async function useProtectedAccess() {
  const player = usePlayer().value;
  const room = useRoom().value;

  if (player && room)
    return;

  navigateTo("/game");
}

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
