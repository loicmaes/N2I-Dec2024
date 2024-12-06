<script setup lang="ts">
import { Crown, LogOut } from "@iconoir/vue";

await useProtectedAccess();

definePageMeta({
  layout: "game",
});
useHead({
  title: "Prêt à dérouiller tes adversaires ?",
});

connectWebsocket();

const me = usePlayer();
const players = useConnectedPlayers();
const room = useRoom();

async function requestStartQuiz() {
  if (!room.value) return;
  await startGame();
}
</script>

<template>
  <div
    v-if="room && me"
    data-page="game-idle"
    class="min-h-dvh grid place-items-center"
  >
    <Button
      class="absolute top-4 right-4"
      size="icon"
      variant="outline"
    >
      <LogOut />
    </Button>
    <div
      data-role="content"
      class="w-[min(calc(100%-3rem),max-content,512px)] flex flex-col gap-4"
    >
      <header class="text-center">
        <span class="text-sm font-bold text-muted-foreground">{{ room.code }}</span>
        <h1 class="text-4xl font-extrabold uppercase">
          {{ room.name }}
        </h1>
        <p class="text-muted-foreground mt-4">
          ({{ players.length }}/{{ room.maxPlayers }}) En attente du lancement par le créateur...
        </p>
      </header>

      <Separator />

      <section
        data-section="player-container"
        class="flex flex-wrap gap-4"
      >
        <Table>
          <TableBody>
            <TableRow
              v-for="player in players"
              :key="player.name"
              class="flex items-center gap-3 py-2 px-3"
            >
              <div class="w-4 grid place-items-center">
                <Crown
                  v-if="player.owner"
                  class="text-primary"
                />
              </div>
              <p class="flex items-center gap-2">
                {{ player.name }} <span
                  v-if="me.name === player.name"
                  class="text-xs text-muted-foreground"
                >(moi)</span>
              </p>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <div
        v-if="room.state === 'idle'"
        class="flex flex-col self-center items-center gap-2"
      >
        <Button
          v-if="me.owner"
          class="mt-6"
          @click="requestStartQuiz"
        >
          Lancer le quizz
        </Button>

        <span class="text-xs text-muted-foreground text-pretty w-2/3 text-center italic">Attention, commencer la partie fermera la possibilité de la rejoindre !</span>
      </div>
      <p
        v-if="room.state === 'starting'"
        class="text-center font-medium"
      >
        Lancement de la partie ({{ useRemainingTime() }})...
      </p>
    </div>
  </div>
</template>
