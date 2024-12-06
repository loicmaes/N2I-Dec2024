<script setup lang="ts">
import PlayersRecap from "~/components/composed/game/summary/PlayersRecap.vue";
import type { IPlayer } from "~/types/player";

definePageMeta({
  layout: "game",
});

const connectedPlayers = useConnectedPlayers();
const winner = computed((): IPlayer & {
  score?: number;
  roomCode?: string;
} => {
  const _players = connectedPlayers.value;
  return _players.sort((a, b) => {
    return (a.score ?? 0) >= (b.score ?? 0) ? 1 : -1;
  })[0];
});
</script>

<template>
  <div
    data-page="game-overview"
    class="min-h-dvh grid place-items-center"
  >
    <div class="w-[max(60%,350px)] flex flex-col items-center gap-8">
      <header class="flex flex-col items-center">
        <h1 class="text-4xl font-extrabold uppercase">
          C'est la fin !
        </h1>
        <p class="text-pretty">
          Voici un petit récap des scores ! Bravo à {{ winner.name }} pour sa victoire avec {{ winner.score ?? 0 }}
        </p>
      </header>

      <PlayersRecap class="mx-auto w-full" />

      <footer class="flex flex-col items-center gap-3">
        <Button as-child>
          <NuxtLink to="/game">
            Retourner à l'accueil
          </NuxtLink>
        </Button>

        <Button
          variant="link"
          as-child
        >
          <NuxtLink to="/team">
            Les crédits
          </NuxtLink>
        </Button>
      </footer>
    </div>
  </div>
</template>
