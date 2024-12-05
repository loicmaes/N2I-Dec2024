<script setup lang="ts">
import PlayerBadge from "~/components/composed/game/room/player/PlayerBadge.vue";

definePageMeta({
  layout: "game",
});
useHead({
  title: "Prêt à dérouiller tes adversaires ?",
});

const players = useFakeConnectedPlayers();
const room = useFakeRoom();
</script>

<template>
  <div
    data-page="game-idle"
    class="min-h-dvh grid place-items-center"
  >
    <div
      data-role="content"
      class="w-[min(calc(100%-3rem),max-content,512px)] flex flex-col items-center gap-4"
    >
      <header class="text-center">
        <h1 class="text-4xl font-extrabold uppercase">
          {{ room.name }}
        </h1>
        <p class="text-muted-foreground">
          En attente du lancement par le créateur... ({{ players.length }}/{{ room.maxPlayerCount }})
        </p>
      </header>

      <Separator />

      <section
        data-section="player-container"
        class="flex flex-wrap gap-4"
      >
        <PlayerBadge
          v-for="player in players"
          :key="player.id"
          :player="player"
        />
      </section>

      <Button
        class="mt-6"
        :disabled="players.length < 2"
      >
        Lancer le quizz
      </Button>
    </div>
  </div>
</template>
